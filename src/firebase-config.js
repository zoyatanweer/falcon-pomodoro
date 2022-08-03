import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDF9HUi47SUOu20bcgBcr1pD4Us5CptXeg",
  authDomain: "falcon-pomodoro.firebaseapp.com",
  projectId: "falcon-pomodoro",
  storageBucket: "falcon-pomodoro.appspot.com",
  messagingSenderId: "996245036145",
  appId: "1:996245036145:web:2e8c97f5d0e36d9b004fd0",
  measurementId: "G-QQEGB0GZCM",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
