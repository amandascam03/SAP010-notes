import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBKZ_cSRnNhWa-i8Cr0uGTTHfhkUkCp5o",
  authDomain: "lab-notes-1224a.firebaseapp.com",
  projectId: "lab-notes-1224a",
  storageBucket: "lab-notes-1224a.appspot.com",
  messagingSenderId: "888250526817",
  appId: "1:888250526817:web:539536c8f5918651d70e20",
  measurementId: "G-P3QMR7NS4Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();