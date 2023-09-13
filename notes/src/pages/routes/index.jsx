import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import LoginPage from "../login";
import HomePage from "../home";
import { AuthGoogleContext } from "../../../context/AuthContext";
import { useContext } from "react";
import Note from "../notemaker/note";

function PrivateRoute({children}) {
    const { signed } = useContext(AuthGoogleContext);
    return signed ? children : <Navigate to="/" />;
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                <Route path="/note" element={<PrivateRoute><Note /></PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    );
}
