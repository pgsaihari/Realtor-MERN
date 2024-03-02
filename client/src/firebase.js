// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_KEY ,
  authDomain: "clearestate-3ac46.firebaseapp.com",
  projectId: "clearestate-3ac46",
  storageBucket: "clearestate-3ac46.appspot.com",
  messagingSenderId: "80856327377",
  appId: "1:80856327377:web:5501d31d8dd949d76811f0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

