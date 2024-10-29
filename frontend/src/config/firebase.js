// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7QOad2eZWCKkYKEVvXaXmx2ML9k4EHGs",
  authDomain: "odissey-gd.firebaseapp.com",
  projectId: "odissey-gd",
  storageBucket: "odissey-gd.appspot.com",
  messagingSenderId: "156040108013",
  appId: "1:156040108013:web:e6427573d9961fb83a79e4",
  measurementId: "G-Z15QVNC1SL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

export default app
