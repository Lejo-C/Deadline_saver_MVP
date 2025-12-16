import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    // Using credentials from your provided sw.js
    apiKey: "AIzaSyDkDAfij86hVIJCR6VHMIwFASXtCYpZUnY",
    authDomain: "deadlinesaver.firebaseapp.com",
    projectId: "deadlinesaver",
    storageBucket: "deadlinesaver.firebasestorage.app",
    messagingSenderId: "290765982146",
    appId: "1:290765982146:web:2aaab0af64477ce90e2e5b",
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
