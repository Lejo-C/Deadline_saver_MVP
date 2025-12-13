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
        const sub = await Subscription.create(req.body);
        res.status(201).json({ message: "Subscribed" });
    } catch (err) {
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
