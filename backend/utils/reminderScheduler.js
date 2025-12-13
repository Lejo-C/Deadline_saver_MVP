import cron from "node-cron";
import { sendPushToAll } from "../Controllers/pushController.js";
import Assignment from "../Models/assignment.js";

cron.schedule("0 8 * * *", async () => {
    const today = new Date();
    const assignments = await Assignment.find();

    assignments.forEach(a => {
        if (a.reminders.includes("Today")) {
            sendPushToAll({
                title: "Assignment Due Today",
                body: `${a.name} is due today!`
            });
        }
    });
});
