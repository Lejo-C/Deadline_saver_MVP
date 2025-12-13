// Load environment variables FIRST
import dotenv from "dotenv";
dotenv.config();

// Now import everything else
import express from "express";
import path from "path";
import cors from "cors";
import assignment from "./Routes/assignment.js";
import pushRoutes from "./Routes/push.js";
import connectDB from "./DataBase/db.js";
import "./utils/reminderScheduler.js"; // Initialize cron job
import { fileURLToPath } from "url";


connectDB();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares - these must come FIRST
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(process.cwd(), "public")));

// Test route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// API Routes
app.use("/api/assignments", assignment);
app.use("/api", pushRoutes);

// Catch-all for frontend routing - serve index.html for non-API routes
app.use((req, res, next) => {
  // Only serve index.html if it's not an API request
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  } else {
    next();
  }
});

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
