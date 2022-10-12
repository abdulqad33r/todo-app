import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqt9N49gA_xGJG211kJBizNnFtP-B9Uag",
  authDomain: "fir-3hrs.firebaseapp.com",
  projectId: "fir-3hrs",
  storageBucket: "fir-3hrs.appspot.com",
  messagingSenderId: "967596083134",
  appId: "1:967596083134:web:180b960e0b5610cc6e9bef",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
