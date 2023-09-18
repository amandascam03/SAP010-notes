import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCBKZ_cSRnNhWa-i8Cr0uGTTHfhkUkCp5o",
    authDomain: "lab-notes-1224a.firebaseapp.com",
    projectId: "lab-notes-1224a",
    storageBucket: "lab-notes-1224a.appspot.com",
    messagingSenderId: "888250526817",
    appId: "1:888250526817:web:539536c8f5918651d70e20",
    measurementId: "G-P3QMR7NS4Z",
};

export async function addNote(titulo, conteudo) {
    try {
        const docRef = await addDoc(collection(db, "notes"), {
            titulo,
            conteudo,
        });

        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
