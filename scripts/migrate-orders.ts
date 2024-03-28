import { collection, addDoc, getFirestore } from "firebase/firestore";
import { Order, orderConverter } from "../src/order.ts";
import { initializeApp } from "firebase/app";
import { orders } from "./fixtures.ts";

import "dotenv/config";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_API_KEY,
  authDomain: process.env.VITE_AUTH_DOMAIN,
  projectId: process.env.VITE_PROJECT_ID,
  storageBucket: process.env.VITE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_MESSAGING_SENDERID,
  appId: process.env.VITE_APP_ID,
};

export const db = getFirestore(initializeApp(firebaseConfig));


const orderCollection = collection(db, "orders").withConverter(orderConverter);

const addOrder = async (order: Omit<Order, 'firebaseId'>) => {
  try {
    const docRef = await addDoc(orderCollection, order);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// push all orders to Firestore
(async () => {
  for (const order of orders) {
    await addOrder(order);
  }
  console.log('Migration complete');
  process.exit(0);
})()