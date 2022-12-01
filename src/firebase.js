import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const createUser = createUserWithEmailAndPassword;
export const signInUser = signInWithEmailAndPassword;
// NOTES
// reference a collection using
// collection(db, "collectionName"), the number of paths of a collection must
// be an odd number eg
// 1. collection(db, "collectionName")
// 2. collection(db, "collectionName", "documentId1", "collectionName2")

// reference a document using
// doc(db, "collectionName1", "documentId"), the number of paths of a document must
// be an even number eg
// 1. doc(db, "collectionName", "documentId")
// 2. doc(db, "collectionName1", "documentId1", "collectionName2", "documentId2")
