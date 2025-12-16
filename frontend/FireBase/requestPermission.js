import { messaging } from "../src/firebase";
import { getToken } from "firebase/messaging";

export const requestNotificationPermission = async () => {
    try {
        const permission = await Notification.requestPermission();

        if (permission !== "granted") {
            console.log("Notification permission denied");
            return;
        }

        const token = await getToken(messaging, {
            vapidKey: "BLvGIQsE3nTVDWJW33VHy9siZ_KenlGlsIZIpZA1X21qUihsereFFWC_ElTiQwKMEZgrpzmemyfRHTz4OL4DdLY"
        });

        console.log("✅ FCM Token:", token);

        // Send token to backend
        await fetch("/api/save-fcm-token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token })
        });

    } catch (err) {
        console.error("Error getting FCM token:", err);
    }
};
