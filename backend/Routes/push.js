import express from "express";
import { saveSubscription, sendPushToAll } from "../Controllers/pushController.js";

const router = express.Router();

// ✅ This route was missing — this is why you got 404
router.post("/subscribe", saveSubscription);

// ✅ Your push trigger route
router.post("/send-push", async (req, res) => {
    console.log("🚀 Push trigger called");
    await sendPushToAll(req.body);
    res.json({ message: "Push sent" });
});

export default router;
