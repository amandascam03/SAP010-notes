import { useEffect, useState } from "react";
import { addNote } from "../../lib/firebase-config";

export default function NoteMaker() {
    const [title, setTitle] = useState("Título");
    const [inputTitle, setinputTitle] = useState("");
    const [inputNote, setInputNote] = useState("");
    const [newNote, setNewNote] = useState("Nota");

    useEffect(() => {
        setTitle(inputTitle);
        setNewNote(inputNote);
    }, [inputTitle, inputNote]);

    return (
        <div>
            <h1 className="Create-title">{title}</h1>
            <input
                type="text"
                placeholder="Título"
                onChange={(e) => setinputTitle(e.target.value)}
            />
            <button
                onClick={() => {
                    setTitle(inputTitle);
                }}
            >
                Mudar título
            </button>

            <h1 className="Create-note">{newNote}</h1>
            <input
                type="text"
                placeholder="Nota"
                onChange={(e) => setInputNote(e.target.value)}
            />
            <button onClick={() => setNewNote(inputNote)}>
                Mudar conteúdo
            </button>
            <button onClick={() => addNote(title, newNote)}>Salvar nota</button>
        </div>
    );
}
