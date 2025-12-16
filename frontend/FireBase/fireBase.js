// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkDAfij86hVIJCR6VHMIwFASXtCYpZUnY",
  authDomain: "deadlinesaver.firebaseapp.com",
  projectId: "deadlinesaver",
  storageBucket: "deadlinesaver.firebasestorage.app",
  messagingSenderId: "290765982146",
  appId: "1:290765982146:web:2aaab0af64477ce90e2e5b",
  measurementId: "G-9WC2GDQ0C4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);