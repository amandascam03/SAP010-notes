export function Modal({title, description, close}) {
    return (
        <div className="bgModal">
            <div className="modal">
                <button className="returnBtn" onClick={close}></button>
                <h2 className="titleModal">{title}</h2>
                <p className="descModal">{description}</p>
                <div className="optionsBtn">
                <button>Editar</button>
                <button>Excluir</button>
                </div>
            </div>
        </div>
    )
}