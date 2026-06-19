import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// ================= FIREBASE CONFIG =================
const firebaseConfig = {
  apiKey: "AIzaSyA5kMSGMg_Tze8IkAcaLhA2ENBZHt8JXOo",
  authDomain:  "your-reasty.firebaseapp.com",
  projectId: "your-reasty",
  storageBucket: "your-reasty.firebasestorage.app",
  messagingSenderId: "250481347025",
  appId:"1:250481347025:web:e7cf9a4f6ded39c0a5b8f0"
};

// ================= INIT =================
const app = initializeApp(firebaseConfig);

// ================= SERVICES =================
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// ================= EXPORT =================
export { db, storage, auth };
