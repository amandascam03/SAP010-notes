import { useState } from "react";

export function Modal({ title, description, close, deleteOption }) {
    const [isEditing, setIsEditing] = useState(false);

    function handleClickEdit() {
        setIsEditing(true);
    }

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
                        <textarea id="editTitleModal" defaultValue={title} />
                        <textarea id="editContentModal" defaultValue={description} />
                    </>
                ) : (
                    <>
                        <h2 className="titleModal">{title}</h2>
                        <p className="descModal">{description}</p>
                        <hr />
                <div className="optionsBtn">
                    <button onClick={handleClickEdit}>EDITAR</button>
                    <button onClick={handleClickDelete}>EXCLUIR</button>
                </div>
                    </>
                )}
            </div>
        </div>
    );
}