// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKj7js9_nvSBYx95MjbUdsegE00DJzcpo",
  authDomain: "tinder-2-d7e19.firebaseapp.com",
  projectId: "tinder-2-d7e19",
  storageBucket: "tinder-2-d7e19.appspot.com",
  messagingSenderId: "704412862611",
  appId: "1:704412862611:web:20559dd812a3d16d53e566",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const storage = getStorage();

export { auth, db, storage };
