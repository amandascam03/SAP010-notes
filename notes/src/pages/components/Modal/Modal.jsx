import { useState } from "react";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase-config";

export function Modal({
    title,
    description,
    close,
    deleteOption,
    idNote,
    date,
    time,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedContent, setEditedContent] = useState(description);

    async function editNote(noteId, newTitle, newContent) {
        const docRef = doc(db, "notes", noteId);
        await updateDoc(docRef, {
            titulo: newTitle,
            conteudo: newContent,
            timestamp: serverTimestamp(),
        });
        location.reload();
    }
    // test-hu1 test-hu2 test-hu3
    function handleClickDelete() {
        deleteOption();
        close();
    }

    return (
        <div className="bgModal">
            <div className="modal">
                <button className="returnBtn" onClick={close}></button>
                {isEditing ? (
                    <>
                        <button
                            className="saveBtn"
                            onClick={() =>
                                editNote(idNote, editedTitle, editedContent)
                            }
                        ></button>
                        <textarea
                            id="editTitleModal"
                            defaultValue={title}
                            onChange={(e) => setEditedTitle(e.target.value)}
                        />
                        <textarea
                            id="editContentModal"
                            defaultValue={description}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                    </>
                ) : (
                    <>
                        <h2 className="titleModal">{title}</h2>
                        <p className="descModal">{description}</p>
                        <p>
                            {time}, {date}
                        </p>
                        <hr />
                        <div className="optionsBtn">
                            <button className="editBtn" onClick={() => setIsEditing(true)}>
                            </button>
                            <button className="deleteBtn" onClick={handleClickDelete}></button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
