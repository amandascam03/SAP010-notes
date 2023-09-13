import AuthGoogleProvider from "../context/AuthContext";
import AppRoutes from "./pages/routes";

export default function App() {
    return (
   <AuthGoogleProvider>
    <AppRoutes />
   </AuthGoogleProvider>
    )
}
