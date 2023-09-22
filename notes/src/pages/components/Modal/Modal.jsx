export function Modal({title, description, close, deleteOption}) {

    function handleClick() {
        deleteOption();
        close();
    }

    return (
        <div className="bgModal">
            <div className="modal">
                <button className="returnBtn" onClick={close}></button>
                <h2 className="titleModal">{title}</h2>
                <p className="descModal">{description}</p>
                <hr />
                <div className="optionsBtn">
                <button>Editar</button>
                <button onClick={handleClick}>Excluir</button>
                </div>
            </div>
        </div>
    )
}