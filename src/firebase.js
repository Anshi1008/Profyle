// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// 🔑  Replace any of the values below with the ones shown
//     in Firebase Console → Project Settings → SDK snippet.
const firebaseConfig = {
  apiKey: "AIzaSyBK6yx9wGWRF39JkIdSTQoODtIHDzv9uX4",
  authDomain: "assist-832c5.firebaseapp.com",
  projectId: "assist-832c5",
  storageBucket: "assist-832c5.appspot.com",      // ← fixed typo
  messagingSenderId: "421453426743",
  appId: "1:421453426743:web:8323d2218f9d9f2e508fb2",
  measurementId: "G-KWSQCSJQQP"
};

// Initialise Firebase & Analytics
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 👉  Export whatever the rest of your code is expecting
export { app, analytics };
