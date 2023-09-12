import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import LoginPage from "../login";
import HomePage from "../home";
import { AuthGoogleContext } from "../../../context/AuthContext";
import { useContext } from "react";

function PrivateRoute() {
    const {signed} = useContext(AuthGoogleContext);
    return signed ? <Outlet /> : <Navigate to="/" />
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <LoginPage /> } />
                <Route path="/home" element={<PrivateRoute />}>
                    <Route path="/home" element={<HomePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}