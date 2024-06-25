import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "ping-cb71d.firebaseapp.com",
  projectId: "ping-cb71d",
  storageBucket: "ping-cb71d.appspot.com",
  messagingSenderId: "20421406927",
  appId: "1:20421406927:web:dd6f6dd2af0b522bcec7ba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
