import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Configuration object - user needs to fill this with their own keys
// For security in a real app, use environment variables (process.env.REACT_APP_...)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Internal checking for simulation
const isConfigured = firebaseConfig.apiKey && firebaseConfig.projectId;

let app;
let db: any;

if (isConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp?: Date;
}

export const sendMessageToFirestore = async (data: ContactFormData): Promise<boolean> => {
  // If Firebase is not configured (no keys), we simulate a successful send
  // so the UI can be tested.
  if (!db) {
    console.warn("Firebase not configured. Simulating message send:", data);
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 2000);
    });
  }

  try {
    const docRef = await addDoc(collection(db, "messages"), {
      ...data,
      timestamp: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};