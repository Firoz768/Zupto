// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "zupto-edc15.firebaseapp.com",
  projectId: "zupto-edc15",
  storageBucket: "zupto-edc15.firebasestorage.app",
  messagingSenderId: "79131263680",
  appId: "1:79131263680:web:a4727d7559e60df3a2a325"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {app,auth}