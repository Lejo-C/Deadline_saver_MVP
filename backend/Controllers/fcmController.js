import FCMToken from "../Models/FCMToken.js";
import admin from "../config/firebaseAdmin.js";

// Save or Update FCM Token
export const saveToken = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ success: false, error: "Token is required" });
    }

    try {
        await FCMToken.findOneAndUpdate(
            { token },
            { token },
            { upsert: true, new: true }
        );

        console.log("✅ FCM Token saved successfully");
        res.status(200).json({ success: true, message: "Token saved successfully" });
    } catch (err) {
        console.error("Error saving FCM token:", err);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

// Send Notification Logic (Reusable)
export const sendToAllDevices = async (title, body) => {
    console.log("✅ Notification send function triggered");

    if (!title || !body) {
        throw new Error("Title and body are required");
    }

    const tokensDocs = await FCMToken.find();
    const tokens = tokensDocs.map(doc => doc.token).filter(Boolean);

    console.log(`📨 Sending push to ${tokens.length} subscribers`);

    if (tokens.length === 0) {
        console.log("⚠️ No subscribers found");
        return { success: false, message: "No subscribers found" };
    }

    const message = {
        notification: { title, body },
        tokens
    };

    try {
        // Debug: Check which project we are authenticated as
        // const projectId = admin.app().options.credential.projectId; // This might not be directly accessible depending on credential type
        console.log(`ℹ️ Sending from Backend Project: ${process.env.FIREBASE_PROJECT_ID || 'Unknown'}`);

        const response = await admin.messaging().sendEachForMulticast(message);
        console.log(`✅ Successfully sent ${response.successCount} messages.`);

        if (response.failureCount > 0) {
            response.responses.forEach((resp, idx) => {
                if (!resp.success) {
                    console.log(`❌ Failed to send to a token: ${resp.error.code}`);
                    if (resp.error.code === "messaging/registration-token-not-registered" || resp.error.code === "messaging/invalid-argument") {
                        // These are truly invalid tokens (uninstalled, etc.)
                        FCMToken.deleteOne({ token: tokens[idx] })
                            .then(() => console.log(`🗑️ Removed invalid token (${resp.error.code})`))
                            .catch(console.error);
                    } else if (resp.error.code === "messaging/third-party-auth-error") {
                        // This is a CONFIGURATION error (mismatched keys), not a bad token.
                        // Do NOT delete the token, or you'll run out of subscribers while debugging.
                        console.error(`🚨 CONFIG ERROR: VAPID Key in frontend doesn't match Firebase Project in backend! (${resp.error.code})`);
                    }
                }
            });
        }

        return {
            success: true,
            successCount: response.successCount,
            failureCount: response.failureCount
        };
    } catch (error) {
        console.error("❌ Error in sendEachForMulticast:", error);
        throw error;
    }
};

// Send Notification to All Users (Controller)
export const sendNotificationToAll = async (req, res) => {
    const { title, body } = req.body;

    try {
        const result = await sendToAllDevices(title, body);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error sending notification:", err);
        res.status(500).json({ success: false, error: err.message || "Failed to send notification" });
    }
};
