// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/cordova";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmRcBZoNUgt3I3edF6I1cMvFX94hkx9Ds",
  authDomain: "socialmedia-d4f8c.firebaseapp.com",
  projectId: "socialmedia-d4f8c",
  storageBucket: "socialmedia-d4f8c.appspot.com",
  messagingSenderId: "798991968132",
  appId: "1:798991968132:web:fd5ad2e9ae4fcaf2addfd1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)