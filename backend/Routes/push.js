import express from "express";
import { saveSubscription } from "../Controllers/pushController.js";

const router = express.Router();
router.post("/send-push", async (req, res) => {
    console.log("🚀 Push trigger called");
    await sendPushToAll(req.body);
    res.json({ message: "Push sent" });
});


export default router;
