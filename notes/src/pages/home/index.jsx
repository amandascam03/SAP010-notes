import { useContext } from "react";
import { AuthGoogleContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const { user, signOut } = useContext(AuthGoogleContext);

    const userSigned = JSON.parse(user);

    const navigate = useNavigate();

    return (
        <div className="HomePage">
            <header className="Home-header">
                <h1 className="UserNotes">{userSigned.displayName} Notes</h1>
                <button
                    className="logoutBtn"
                    onClick={() => signOut()}
                ></button>
            </header>
            <div id="nota"></div>
            <button
                className="Add"
                title="Add"
                onClick={() => navigate("/note")}
            ></button>
        </div>
    );
}
