
import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.join(__dirname, "config", "serviceAccountKey.json");

console.log("--- Checking Credentials ---");

const envProjectId = process.env.FIREBASE_PROJECT_ID;
const envClientEmail = process.env.FIREBASE_CLIENT_EMAIL;

console.log(`ENV Project ID: ${envProjectId}`);
console.log(`ENV Client Email: ${envClientEmail}`);

try {
    if (fs.existsSync(jsonPath)) {
        const jsonContent = fs.readFileSync(jsonPath, "utf8");
        const serviceAccount = JSON.parse(jsonContent);

        console.log(`JSON Project ID: ${serviceAccount.project_id}`);
        console.log(`JSON Client Email: ${serviceAccount.client_email}`);

        if (envProjectId !== serviceAccount.project_id) {
            console.error("❌ MISMATCH: ENV Project ID does not match JSON Project ID");
        } else {
            console.log("✅ Project IDs match");
        }

        if (envClientEmail !== serviceAccount.client_email) {
            console.error("❌ MISMATCH: ENV Client Email does not match JSON Client Email");
        } else {
            console.log("✅ Client Emails match");
        }

    } else {
        console.log("⚠️ serviceAccountKey.json not found at expected path: " + jsonPath);
    }
} catch (error) {
    console.error("Error reading serviceAccountKey.json:", error);
}

console.log("----------------------------");
