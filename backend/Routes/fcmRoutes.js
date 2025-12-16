import express from "express";
import { saveToken, sendNotificationToAll } from "../Controllers/fcmController.js";

const router = express.Router();

router.post("/save-token", saveToken);
router.post("/send-notification", sendNotificationToAll);

export default router;
