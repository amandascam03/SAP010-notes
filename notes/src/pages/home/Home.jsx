import { useContext } from "react";
import { AuthGoogleContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase-config";

export default function HomePage() {
    const { user, signOut } = useContext(AuthGoogleContext);

    const userSigned = JSON.parse(user);

    const navigate = useNavigate();

    async function getNotes() {
        const querySnapshot = await getDocs(collection(db, "notes"));
        if (!querySnapshot.docs.length) {
            return { querySnapshot, array: [] };
        }
        const notes = querySnapshot.docs.map((doc) => {
            const note = doc.data();
            return { ...note, id: doc.id };
        });

        console.log(notes);
        return notes;
    }

    getNotes()
    .then((notes) => {
        notes.forEach((note) => {
            const noteElement = document.createElement("article");
            noteElement.className = "nota";
            noteElement.innerHTML = `
                        <h1>${note.titulo}</h1>
                        <p>${note.conteudo}</p>
                        `;
            const feedNotes = document.getElementById("notas");
            feedNotes.appendChild(noteElement);
        })
    })
    .catch((err) => {
        console.error(err);
    })

    return (
        <div className="HomePage">
            <header className="Home-header">
                <h1 className="UserNotes">{userSigned.displayName} Notes</h1>
                <button
                    className="logoutBtn"
                    onClick={() => signOut()}
                ></button>
            </header>
            <div id="notas"></div>
            <button
                className="Add"
                title="Add"
                onClick={() => navigate("/note")}
            ></button>
        </div>
    );
}
