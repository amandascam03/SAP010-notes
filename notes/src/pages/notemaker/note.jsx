import { useState } from "react";

export default function Note() {
    const [title, setTitle] = useState("Título");
    const [inputTitle, setinputTitle] = useState("");
    const [inputNote, setInputNote] = useState("");
    const [newNote, setNewNote] = useState("Nota");

    return (
        <div>
            <h1>{title}</h1>
            <input
                type="text"
                placeholder="título"
                value={inputTitle}
                onChange={(e) => setinputTitle(e.target.value)}
            />
            <button
                onClick={() => {
                    setTitle(inputTitle);
                    setinputTitle("");
                }}
            >
                Mudar título
            </button>

            <h1>{newNote}</h1>
            <input type="text" placeholder="nova nota" onChange={(e) => setInputNote(e.target.value)} />
            <button onClick={() => setNewNote(inputNote)}>Editar nota</button>
            <button>Salvar nota</button>
        </div>
    );
}
