import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../lib/firebase-config";
import { Navbar } from "../components/Navbar/Navbar";
import { TextBox } from "../components/TextBox/TextBox";

export default function NoteMaker() {
    const [title, setTitle] = useState("");
    const [inputTitle, setinputTitle] = useState("");
    const [inputNote, setInputNote] = useState("");
    const [newNote, setNewNote] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const updatedTitle = inputTitle.trim() === "" ? "Sem Título" : inputTitle;
        setTitle(updatedTitle);
        setNewNote(inputNote);
    }, [inputTitle, inputNote]);

    async function addNote(titulo, conteudo) {
        const docRef = await addDoc(collection(db, "notes"), {
            titulo,
            conteudo,
            uid: auth.currentUser.uid,
            timestamp: serverTimestamp(),
        });
        return docRef;
    }

    async function handleSaveNoteClick() {
        await addNote(title, newNote);
        navigate("/home");
    }

    return (
        <div className="NotePage" data-testid="Note">
            <Navbar
                returnClick={() => navigate("/home")}
                saveNoteClick={handleSaveNoteClick}
            />
            <TextBox
                onChangeTitle={(e) => setinputTitle(e.target.value)}
                onChangeNote={(e) => setInputNote(e.target.value)}
            />
        </div>
    );
}
