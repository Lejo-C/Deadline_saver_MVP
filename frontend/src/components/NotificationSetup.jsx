import { useEffect, useState } from "react";
import { messaging } from "../firebase";
import { getToken } from "firebase/messaging";
import axios from "axios";

export default function NotificationSetup() {
  const [permission, setPermission] = useState(Notification.permission);

  // VAPID Key from Project Settings > Cloud Messaging > Web configuration
  const VAPID_KEY = process.env.VAPID_KEY;

  useEffect(() => {
    async function requestPermission() {
      try {
        const permission = await Notification.requestPermission();
        setPermission(permission);

        if (permission === "granted") {
          // Check if Service Worker is supported
          if ('serviceWorker' in navigator) {
            // Register the Firebase specific SW
            const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
            console.log("Service Worker registered with scope:", registration.scope);

            // Get Token
            const token = await getToken(messaging, {
              vapidKey: VAPID_KEY,
              serviceWorkerRegistration: registration
            });

            if (token) {
              console.log("✅ FCM Token generated");
              // Send to backend
              await axios.post(`${import.meta.env.VITE_API_URL}/fcm/save-token`, { token });
            } else {
              console.log("No registration token available. Request permission to generate one.");
            }
          }
        }
      } catch (err) {
        console.error("An error occurred while retrieving token. ", err);
      }
    }

    requestPermission();
  }, []);

  return null;
}
