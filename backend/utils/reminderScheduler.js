import cron from "node-cron";
import { sendToAllDevices } from "../Controllers/fcmController.js";
import Assignment from "../Models/assignment.js";

cron.schedule("0 8 * * *", async () => {
    const today = new Date();
    const assignments = await Assignment.find();

    assignments.forEach(a => {
        if (a.reminders.includes("Today")) {
            sendToAllDevices(
                "Assignment Due Today",
                `${a.name} is due today!`
            );
        }
    });
});
