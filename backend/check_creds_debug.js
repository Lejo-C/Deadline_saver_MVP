
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.join(__dirname, "config", "serviceAccountKey.json");

try {
    if (fs.existsSync(serviceAccountPath)) {
        const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
        console.log("Service Account Project ID:", serviceAccount.project_id);
        console.log("Service Account Client Email:", serviceAccount.client_email);
    } else {
        console.log("No serviceAccountKey.json found at", serviceAccountPath);
    }
} catch (error) {
    console.error("Error reading service account:", error);
}
