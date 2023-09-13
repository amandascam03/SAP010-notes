import { useContext } from "react";
import gif from "../../assets/Add-notes.gif";
import { AuthGoogleContext } from "../../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
    const { signInWithGoogle, signed } = useContext(AuthGoogleContext);

    const signInClick = async (e) => {
        e.preventDefault();
        await signInWithGoogle();
    };

    if (!signed) {
        return (
            <div className="LoginPage">
                <header className="Login-header">
                    <h1>Lab Notes</h1>
                    <p>Tome suas notas de uma forma simples e objetiva</p>
                </header>
                <div className="imagem">
                    <img src={gif} style={{ height: 550 }} />
                </div>
                <form className="formulario">
                    <button className="googleBtn" onClick={signInClick}>
                        Entrar com o Google
                    </button>
                </form>
                <a href="https://storyset.com/work">
                    Work illustrations by Storyset
                </a>
            </div>
        );
    }
        return <Navigate to="/home" />;
}
