import webpush from "web-push";
import Subscription from "../Models/subscription.js";

// Initialize VAPID details lazily to ensure dotenv is loaded
let vapidInitialized = false;

const initializeVapid = () => {
    if (!vapidInitialized) {
        if (!process.env.PUBLIC_VAPID_KEY || !process.env.PRIVATE_VAPID_KEY) {
            console.error("❌ Missing VAPID keys in environment!");
        }

        webpush.setVapidDetails(
            "mailto:your@email.com",
            process.env.PUBLIC_VAPID_KEY,
            process.env.PRIVATE_VAPID_KEY
        );

        vapidInitialized = true;
    }
};

export const saveSubscription = async (req, res) => {
    initializeVapid();

    try {
        await Subscription.findOneAndUpdate(
            { endpoint: req.body.endpoint },
            req.body,
            { upsert: true, new: true }
        );

        console.log("✅ Subscription saved:", req.body.endpoint);
        res.status(201).json({ message: "Subscribed" });
    } catch (err) {
        console.error("❌ Subscription error:", err);
        res.status(500).json({ error: "Failed to save subscription" });
    }
};

export const sendPushToAll = async (payload) => {
    console.log("📨 Sending push to", subs.length, "subscribers");
    initializeVapid();
    if (!process.env.PUBLIC_VAPID_KEY || !process.env.PRIVATE_VAPID_KEY) {
    console.error("❌ Missing VAPID keys in environment!");
}

   
    const subs = await Subscription.find();

    const safePayload = JSON.stringify(
    payload || { title: "No title", body: "Empty payload" }
);

    subs.forEach((sub) => {
        webpush
            .sendNotification(sub, safePayload)
            .then(() => console.log("✅ Push sent to:", sub.endpoint))
            .catch(err => {
    console.error("❌ Push error:", err.body || err);

    if (err.statusCode === 410 || err.statusCode === 404) {
        Subscription.deleteOne({ endpoint: sub.endpoint }).then(() =>
            console.log("🗑️ Removed expired subscription:", sub.endpoint)
        );
    }
            });
    });
};
