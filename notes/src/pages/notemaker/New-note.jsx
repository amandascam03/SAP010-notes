import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../lib/firebase-config";

export default function NoteMaker() {
    let [title, setTitle] = useState("Sem Título");
    const [inputTitle, setinputTitle] = useState("");
    const [inputNote, setInputNote] = useState("");
    const [newNote, setNewNote] = useState("Sem conteúdo");
    const navigate = useNavigate();
    const userUid = auth.currentUser.uid;

    useEffect(() => {
        setTitle("Sem título");
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

            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <div className="NotePage">
            <nav className="navNote">
                <button
                    className="returnBtn"
                    onClick={() => navigate("/home")}
                ></button>
                <button
                    className="saveBtn"
                    onClick={ async () => {
                        title = inputTitle.trim() === "" ? "Sem Título" : inputTitle;
                        addNote(title, newNote, userUid);
                        navigate("/home");
                    }}
                ></button>
            </nav>
            <textarea
                className="noteTitle"
                type="text"
                placeholder="Título"
                onChange={(e) => setinputTitle(e.target.value)}
            />
            <textarea
                className="noteContent"
                type="text"
                placeholder="Nota"
                onChange={(e) => setInputNote(e.target.value)}
            />
        </div>
    );
}
