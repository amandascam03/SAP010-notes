import { useContext, useEffect, useState } from "react";
import { AuthGoogleContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { auth, db } from "../../lib/firebase-config";
import { Modal } from "../components/Modal/Modal";
import Note from "../components/Note/Note";

export default function HomePage() {
    const { user, signOut } = useContext(AuthGoogleContext);
    const [notes, setNotes] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const navigate = useNavigate();
    const userSigned = user ? JSON.parse(user) : null;

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authObj) => {
            unsubscribe();
            if (authObj) {
                const q = query(
                    collection(db, "notes"),
                    where("uid", "==", auth.currentUser.uid)
                );
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.docs.length) {
                    return { querySnapshot, array: [] };
                }
                const notesData = querySnapshot.docs.map((doc) => {
                    const note = doc.data();
                    return { ...note, id: doc.id, uid: auth.currentUser.uid };
                });

                console.log(notesData);

                setNotes(notesData);
            } else {
                console.log("usuário não logado");
            }
        });
    }, []);

    async function deleteNote(noteId) {
        await deleteDoc(doc(db, "notes", noteId));
        const newNotes = notes.filter((n) => n.id !== noteId);
        setNotes(newNotes);
    }

    function formatTimestamp(timestamp) {
        if (!timestamp) return "";
        const date = timestamp.toDate();
        const formattedDate = date.toLocaleDateString("pt-BR", {
            dateStyle: "medium",
        });
        const formattedTime = date.toLocaleTimeString("pt-BR", {
            timeStyle: "short",
        });

        return `${formattedTime}, ${formattedDate}`
    }

    return (
        <div className="HomePage">
            <header className="Home-header">
                <h1 className="UserNotes">{userSigned?.displayName ?? "User"} Notes</h1>
                <button
                    className="logoutBtn"
                    onClick={() => signOut()}
                ></button>
            </header>
            <div className="notes">
                {notes.map((note) => (
                    <Note
                        key={note.id}
                        title={note.titulo}
                        content={note.conteudo}
                        timestamp={formatTimestamp(note.timestamp)}
                        openModalClick={() => {
                            setModalIsOpen(true);
                            setModalContent(note);
                        }}
                    />
                ))}
            </div>
            {modalIsOpen && (
                <Modal
                    title={modalContent.titulo}
                    description={modalContent.conteudo}
                    close={() => setModalIsOpen(false)}
                    deleteOption={() => deleteNote(modalContent.id)}
                    idNote={modalContent.id}
                    date={modalContent.timestamp
                        .toDate()
                        .toLocaleDateString("pt-BR", { dateStyle: "medium" })}
                    time={modalContent.timestamp
                        .toDate()
                        .toLocaleTimeString("pt-BR", { timeStyle: "short" })}
                />
            )}
            <button
                className="addBtn"
                title="Add"
                onClick={() => navigate("/new-note")}
            ></button>
        </div>
    );
}
