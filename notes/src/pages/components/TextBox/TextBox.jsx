import styles from "../TextBox/TextBox.module.css";

export function TextBox({
    onChangeTitle,
    onChangeNote,
    defaultTitle,
    defaultContent,
}) {
    return (
        <div className={styles.textBox}>
            <textarea
                type="text"
                placeholder="Título"
                onChange={onChangeTitle}
                defaultValue={defaultTitle}
            />
            <textarea
                className={styles.noteContent}
                type="text"
                placeholder="Nota"
                onChange={onChangeNote}
                defaultValue={defaultContent}
            />
        </div>
    );
}
