import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore/lite";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDYvBMGMpvMFIuGXmqrs22ZWAMRjTjbruk",
  authDomain: "vue3-pinia-firebase-501e3.firebaseapp.com",
  projectId: "vue3-pinia-firebase-501e3",
  storageBucket: "vue3-pinia-firebase-501e3.appspot.com",
  messagingSenderId: "892045610195",
  appId: "1:892045610195:web:0b7280a76d4abf85bf9826"
};

/* const app = initializeApp(firebaseConfig); */
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth()

const db = getFirestore()

const storage = getStorage(firebaseApp)

export { auth, db, storage}