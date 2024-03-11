import { useContext, useEffect, useState } from "react";
import { AuthGoogleContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
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
            if (authObj) {
                const q = query(
                    collection(db, "notes"),
                    where("uid", "==", auth.currentUser.uid)
                );
                const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
                    const notesData = snapshot.docs.map((doc) => {
                        const note = doc.data();
                        return {
                            ...note,
                            id: doc.id,
                            uid: auth.currentUser.uid,
                        };
                    });
                    console.log(notesData);

                    setNotes(notesData);
                });

                return unsubscribeSnapshot;
            } else {
                signOut();
            }
        });

        return () => {
            unsubscribe();
        };
        // NOTE: Run effect once on component mount, please
        // recheck dependencies if effect is updated.
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

        return `${formattedTime}, ${formattedDate}`;
    }

    return (
        <div className="HomePage">
            <header className="Home-header">
                <h1 className="UserNotes">
                    {userSigned?.displayName ?? "User"} Notes
                </h1>
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
                    updateNotes={notes}
                    deleteOption={() => deleteNote(modalContent.id)}
                    idNote={modalContent.id}
                    timestamp={formatTimestamp(modalContent.timestamp)}
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

