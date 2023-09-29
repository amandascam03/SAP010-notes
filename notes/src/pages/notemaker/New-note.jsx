import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../lib/firebase-config";
import { Navbar } from "../components/Navbar/Navbar";
import { TextBox } from "../components/TextBox/TextBox";

export default function NoteMaker() {
    let [title, setTitle] = useState("");
    const [inputTitle, setinputTitle] = useState("");
    const [inputNote, setInputNote] = useState("");
    const [newNote, setNewNote] = useState("");
    const navigate = useNavigate();
    const userUid = auth.currentUser.uid;

    useEffect(() => {
        setTitle(inputTitle);
        setNewNote(inputNote);
    }, [inputTitle, inputNote]);

    async function addNote(titulo, conteudo, uid) {
        try {
            const docRef = await addDoc(collection(db, "notes"), {
                titulo,
                conteudo,
                uid,
                timestamp: serverTimestamp(),
            });
            location.reload();
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <div className="NotePage">
            <Navbar
                returnClick={() => navigate("/home")}
                saveNoteClick={async () => {
                    title =
                        inputTitle.trim() === "" ? "Sem Título" : inputTitle;
                    addNote(title, newNote, userUid);
                    navigate("/home");
                }}
            />
            <TextBox
                onChangeTitle={(e) => setinputTitle(e.target.value)}
                onChangeNote={(e) => setInputNote(e.target.value)}
            />
        </div>
    );
}
