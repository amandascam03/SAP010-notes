import { useContext, useEffect, useState } from "react";
import { AuthGoogleContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../lib/firebase-config";
import { Modal } from "../components/Modal/Modal";

export default function HomePage() {
    const { user, signOut } = useContext(AuthGoogleContext);
    const [notes, setNotes] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const navigate = useNavigate();

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

    const userSigned = JSON.parse(user);

    return (
        <div className="HomePage">
            <header className="Home-header">
                <h1 className="UserNotes">{userSigned.displayName} Notes</h1>
                <button
                    className="logoutBtn"
                    onClick={() => signOut()}
                ></button>
            </header>
            <div className="notes">
                {notes.map((note) => (
                    <div key={note.id} className="note" onClick={() => {setModalIsOpen(true)
                    setModalContent(note)
                    }}>
                        <h1>{note.titulo}</h1>
                        <p>{note.conteudo}</p>
                    </div>
                ))}
            </div>
            {modalIsOpen && <Modal title={modalContent.titulo} description={modalContent.conteudo} close={() => setModalIsOpen(false)} />}
            <button
                className="addBtn"
                title="Add"
                onClick={() => navigate("/new-note")}
            ></button>
        </div>
    );
}
