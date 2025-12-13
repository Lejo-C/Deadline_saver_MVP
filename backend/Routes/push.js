import express from "express";
import { saveSubscription } from "../Controllers/pushController.js";

const router = express.Router();
router.post("/subscribe", saveSubscription);

export default router;
