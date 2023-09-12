
import AuthGoogleProvider from "../context/AuthContext";
import AppRoutes from "./pages/routes";
// import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// import { useEffect, useState } from "react";

export default function App() {
    // const [user, setUser] = useState(null);

    // useEffect(() => {
    //
    // }, [])
    return (
   <AuthGoogleProvider>
    <AppRoutes />
   </AuthGoogleProvider>
    )
}
