import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    daysLeft: {
      type: Number,
      required: true,
    },
    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },
    priority: {
      type: String,
      enum: ["Normal", "Important", "Urgent"],
      required: true,
    },
    reminders: {
      type: [String],
      default: [],
    },
    status: {
  type: String,
  enum: ["Pending", "Completed", "Past Due"],
  default: "Pending"
}

  },
  {
    timestamps: true // ✅ adds createdAt & updatedAt automatically
  }
  
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;
