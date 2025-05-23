// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9tFdm0sQLly067lxbbYiXPRIclhWYsu8",
  authDomain: "react-firebase-728cc.firebaseapp.com",
  projectId: "react-firebase-728cc",
  storageBucket: "react-firebase-728cc.firebasestorage.app",
  messagingSenderId: "826323856287",
  appId: "1:826323856287:web:e134a67000a989fa766baa",
  measurementId: "G-N7Z76S119T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
