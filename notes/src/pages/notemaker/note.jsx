import { useEffect, useState } from "react";
import { addNote } from "../../lib/firebase-config";

export default function NoteMaker() {
    const [title, setTitle] = useState("Título");
    const [inputTitle, setinputTitle] = useState("");
    const [inputNote, setInputNote] = useState("");
    const [newNote, setNewNote] = useState("Nota");

    useEffect(() => {
        setTitle(inputTitle);
    }, [inputTitle]);

    return (
        <div>
            <input
                type="text"
                placeholder="título"
                value={inputTitle}
                onChange={(e) => setinputTitle(e.target.value)}
            />
            <button
                onClick={() => {
                    setTitle(inputTitle);
                }}
            >
                Mudar título
            </button>

            <h1></h1>
            <input
                type="text"
                placeholder="nova nota"
                onChange={(e) => setInputNote(e.target.value)}
            />
            <button onClick={() => setNewNote(inputNote)}>Mudar conteúdo</button>
            <button onClick={() => addNote(title, newNote)}>Salvar nota</button>
        </div>
    );
}
