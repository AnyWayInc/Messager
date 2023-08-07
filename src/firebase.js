import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDM_0UssyTku4w-T3ZCtaUiKNVE2-LOZC8",
  authDomain: "education-f51a5.firebaseapp.com",
  databaseURL: "https://education-f51a5-default-rtdb.firebaseio.com",
  projectId: "education-f51a5",
  storageBucket: "education-f51a5.appspot.com",
  messagingSenderId: "1075549269155",
  appId: "1:1075549269155:web:a3fb723d6b85e8d25a2316",
  measurementId: "G-WBMGGBX4RS"
};

// Инициализация Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
