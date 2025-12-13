// Load environment variables FIRST
import dotenv from "dotenv";
dotenv.config();

// Now import everything else
import express from "express";
import cors from "cors";
import assignment from "./Routes/assignment.js";
import pushRoutes from "./Routes/push.js";
import connectDB from "./DataBase/db.js";
import "./utils/reminderScheduler.js"; // Initialize cron job

connectDB();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/assignments", assignment);
app.use("/api", pushRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
