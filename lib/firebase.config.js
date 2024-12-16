
import dotenv from 'dotenv';
dotenv.config();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDpBeJmRZ6qfPTpYNbm7BkoJ9psCGC5_FY",
  authDomain: "take-a-seat-56e45.firebaseapp.com",
  projectId: "take-a-seat-56e45",
  storageBucket: "take-a-seat-56e45.firebasestorage.app",
  messagingSenderId: "362557319769",
  appId: "1:362557319769:web:ef6a3526135b0cc9745f48",
  measurementId: "G-XR9QTFBFF5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const retaurantsRef = collection(db, 'restaurants');

export { db, app, auth, retaurantsRef };
