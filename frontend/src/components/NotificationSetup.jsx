import { useEffect } from "react";
import { sendSubscription } from "../api/push";

export default function NotificationSetup({ publicKey }) {
  useEffect(() => {
    async function setupPush() {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") return;

      const registration = await navigator.serviceWorker.ready;

const existing = await registration.pushManager.getSubscription();
if (existing) return;

const subscription = await registration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: publicKey
});


      await sendSubscription(subscription);
    }

    setupPush();
  }, [publicKey]);

  return null;
}
