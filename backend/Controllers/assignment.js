import Assignment from "../Models/assignment.js";
import { sendToAllDevices } from "./fcmController.js";

export const assignment = async (req, res) => {
  try {
    const { name, dueDate } = req.body;

    if (!name || !dueDate) {
      return res.status(400).json({ error: "Assignment name and due date are required" });
    }

    const now = new Date();
    const due = new Date(dueDate);

    const diffTime = due - now;
    const daysLeft = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // ✅ Handle past deadlines
    if (daysLeft < 0) {
      const pastAssignment = await Assignment.create({
        name,
        dueDate,
        daysLeft: 0,
        riskLevel: "High",
        priority: "Urgent",
        reminders: ["Past due"]
      });

      return res.json(pastAssignment);
    }

    // ✅ Risk Level
    let riskLevel = "";
    if (daysLeft <= 1) riskLevel = "High";
    else if (daysLeft <= 3) riskLevel = "Medium";
    else riskLevel = "Low";

    // ✅ Priority
    let priority = "";
    if (riskLevel === "High") priority = "Urgent";
    else if (riskLevel === "Medium") priority = "Important";
    else priority = "Normal";

    // ✅ Reminder Logic
    let reminders = [];

    if (daysLeft <= 10 && daysLeft > 7) {
      reminders.push(`${daysLeft - 7} days from now`);
    }

    if (daysLeft <= 7 && daysLeft > 3) {
      reminders.push(`${daysLeft - 3} days from now`);
    }

    if (daysLeft <= 3 && daysLeft > 1) {
      reminders.push(`${daysLeft - 1} days from now`);
    }

    if (daysLeft === 1) reminders.push("Tomorrow");
    if (daysLeft === 0) reminders.push("Today");

    // ✅ Save to MongoDB
    const newAssignment = await Assignment.create({
      name,
      dueDate,
      daysLeft,
      riskLevel,
      priority,
      reminders
    });

    // 🎯 DEMO MODE: Send push notification after 10 seconds (MVP demo only)
    if (process.env.NODE_ENV !== "production") {
      setTimeout(async () => {
        try {
          await sendToAllDevices(
            "Assignment Reminder",
            `"${newAssignment.name}" is due in ${newAssignment.daysLeft} days.`
          );
          console.log(`📲 Demo push sent for: ${newAssignment.name}`);
        } catch (error) {
          console.error("Demo push failed:", error);
        }
      }, 10000); // 10 seconds delay
    }

    return res.json(newAssignment);

  } catch (error) {
    console.error("Error saving assignment:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    return res.json(assignments);
  } catch (error) {
    console.error("error fetching assignment", error);
    return res.status(500).json({ error: "Server error" });
  }
};


export const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Assignment.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    return res.json({ message: "Assignment deleted successfully" });
  } catch (error) {
    console.error("error deleting assignment", error);
    return res.status(500).json({ error: "Server error" });
  }
};


export const updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, dueDate } = req.body;

    // Find existing assignment
    const existing = await Assignment.findById(id);
    if (!existing) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    // Recalculate logic if dueDate is updated
    let daysLeft = existing.daysLeft;
    let riskLevel = existing.riskLevel;
    let priority = existing.priority;
    let reminders = existing.reminders;

    if (dueDate) {
      const now = new Date();
      const due = new Date(dueDate);
      const diffTime = due - now;

      daysLeft = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (daysLeft < 0) {
        daysLeft = 0;
        riskLevel = "High";
        priority = "Urgent";
        reminders = ["Past due"];
      } else {
        // Risk Level
        if (daysLeft <= 1) riskLevel = "High";
        else if (daysLeft <= 3) riskLevel = "Medium";
        else riskLevel = "Low";

        // Priority
        if (riskLevel === "High") priority = "Urgent";
        else if (riskLevel === "Medium") priority = "Important";
        else priority = "Normal";

        // Reminders
        reminders = [];

        if (daysLeft <= 10 && daysLeft > 7) {
          reminders.push(`${daysLeft - 7} days from now`);
        }
        if (daysLeft <= 7 && daysLeft > 3) {
          reminders.push(`${daysLeft - 3} days from now`);
        }
        if (daysLeft <= 3 && daysLeft > 1) {
          reminders.push(`${daysLeft - 1} days from now`);
        }
        if (daysLeft === 1) reminders.push("Tomorrow");
        if (daysLeft === 0) reminders.push("Today");
      }
    }

    // Update assignment
    const updated = await Assignment.findByIdAndUpdate(
      id,
      {
        name: name || existing.name,
        dueDate: dueDate || existing.dueDate,
        daysLeft,
        riskLevel,
        priority,
        reminders
      },
      { new: true }
    );

    return res.json({
      message: "Updated Successfully",
      updated
    });

  } catch (error) {
    console.error("Error updating assignment:", error);
    return res.status(500).json({ error: "Server error" });
  }
};