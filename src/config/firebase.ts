// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import 'dotenv/config'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDERID,
  appId: process.env.APP_ID,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);