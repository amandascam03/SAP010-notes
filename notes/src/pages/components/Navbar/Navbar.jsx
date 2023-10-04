import styles from "../Navbar/Navbar.module.css";

export function Navbar({ returnClick, saveNoteClick }) {

    return (
        <div data-testid="navbar">
            <nav className={styles.navNote}>
                <button
                    className={styles.returnBtn}
                    onClick={returnClick}
                ></button>
                <button
                    className={styles.saveBtn}
                    onClick={saveNoteClick}
                    data-testid="testSaveNote"
                ></button>
            </nav>
        </div>
    )
}