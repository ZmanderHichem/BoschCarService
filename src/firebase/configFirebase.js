// configFirebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, db } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';  // Import the storage service

const firebaseConfig = {  apiKey: "AIzaSyBcQeMCFinG14e9CI3Ysvf23MA1-YIP6SI",
  authDomain: "projet-personnel-e7b43.firebaseapp.com",
  projectId: "projet-personnel-e7b43",
  storageBucket: "projet-personnel-e7b43.appspot.com",
  messagingSenderId: "524695472175",
  appId: "1:524695472175:web:135ba53f670656951f5eda",
  measurementId: "G-3TNCKT9XH7"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
export const storage = getStorage(app);  // Export the storage service


export { auth,  getFirestore, firestore, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail };
