// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvYWmrKo_KktfZeZ7u-2YcByOLG7eFCI4",
  authDomain: "fintra-bbdb2.firebaseapp.com",
  projectId: "fintra-bbdb2",
  storageBucket: "fintra-bbdb2.firebasestorage.app",
  messagingSenderId: "572468329912",
  appId: "1:572468329912:web:e4163b519270d34c1aa34d",
  measurementId: "G-2TCR45JGFM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };