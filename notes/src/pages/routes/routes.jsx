import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import LoginPage from "../login/Login";
import HomePage from "../home/Home";
import { AuthGoogleContext } from "../../../context/AuthContext";
import { useContext } from "react";
import NoteMaker from "../notemaker/New-note";

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
                <Route path="/new-note" element={<PrivateRoute><NoteMaker /></PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    );
}
