import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../lib/firebase-config";
import gif from "../../assets/Add-notes.gif"

export default function LoginPage() {
    const signInWithGoogle = async (e) => {
        try {
            e.preventDefault();
            const result = await signInWithPopup(auth, googleProvider);
            // The signed-in user info.
            const user = result.user;
            console.log("user signed: ", user);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <><header className="App-header">
            <h1>Lab Notes</h1>
            <p>Tome suas notas de uma forma simples e objetiva</p>
        </header><div className="imagem">
                <img src={gif} style={{ height: 550 }} />
            </div><form className="formulario">
                <button
                    className="googleBtn"
                    onClick={signInWithGoogle}
                >
                    Entrar com o Google
                </button>
            </form></>
    );
}
