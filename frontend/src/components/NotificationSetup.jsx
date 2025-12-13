import { useEffect } from "react";
import { sendSubscription } from "../api/push";

export default function NotificationSetup({ publicKey }) {
  useEffect(() => {
    async function setupPush() {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") return;

      const registration = await navigator.serviceWorker.ready;

      const existing = await registration.pushManager.getSubscription();
      // If subscription exists, we might want to update it or return (depending on logic). For now, returning is fine.
      if (existing) return;

      const convertedVapidKey = urlBase64ToUint8Array(publicKey);

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
      });

      function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
          .replace(/\-/g, '+')
          .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
      }


      await sendSubscription(subscription);
    }

    setupPush();
  }, [publicKey]);

  return null;
}
