// Scripts for firebase messaging service worker
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyDkDAfij86hVIJCR6VHMIwFASXtCYpZUnY",
    authDomain: "deadlinesaver.firebaseapp.com",
    projectId: "deadlinesaver",
    storageBucket: "deadlinesaver.firebasestorage.app",
    messagingSenderId: "290765982146",
    appId: "1:290765982146:web:2aaab0af64477ce90e2e5b",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const notificationTitle =
        payload.notification?.title || payload.data?.title || "Notification";

    const notificationOptions = {
        body: payload.notification?.body || payload.data?.body || "",
        icon: "/icon.png"
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

