import webpush from "web-push";
import Subscription from "../Models/subscription.js";

// Initialize VAPID details lazily to ensure dotenv is loaded
let vapidInitialized = false;

const initializeVapid = () => {
    if (!vapidInitialized) {
        webpush.setVapidDetails(
            "mailto:your@email.com",
            process.env.PUBLIC_VAPID_KEY,
            process.env.PRIVATE_VAPID_KEY
        );
        vapidInitialized = true;
    }
};

export const saveSubscription = async (req, res) => {
    initializeVapid(); // Initialize on first use
    try {
        // Use findOneAndUpdate with upsert to handle duplicates gracefully
        // Assuming endpoint is unique for a client
        await Subscription.findOneAndUpdate(
            { endpoint: req.body.endpoint },
            req.body,
            { upsert: true, new: true }
        );
        res.status(201).json({ message: "Subscribed" });
    } catch (err) {
        console.error("Subscription error:", err);
        res.status(500).json({ error: "Failed to save subscription" });
    }
};

export const sendPushToAll = async (payload) => {
    initializeVapid(); // Initialize on first use
    const subs = await Subscription.find();
    subs.forEach(sub => {
        webpush.sendNotification(sub, JSON.stringify(payload)).catch(console.error);
    });
};
