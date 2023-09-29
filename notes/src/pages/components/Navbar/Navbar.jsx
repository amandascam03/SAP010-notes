import styles from "../Navbar/Navbar.module.css";

export function Navbar({ returnClick, saveNoteClick }) {

    return (
        <div>
            <nav className={styles.navNote}>
                <button
                    className={styles.returnBtn}
                    onClick={returnClick}
                ></button>
                <button
                    className={styles.saveBtn}
                    onClick={saveNoteClick}
                ></button>
            </nav>
        </div>
    )
}