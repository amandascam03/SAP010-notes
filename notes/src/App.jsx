import AuthGoogleProvider from "../context/AuthContext";
import AppRoutes from "./pages/routes/routes";

export default function App() {
    return (
   <AuthGoogleProvider>
    <AppRoutes />
   </AuthGoogleProvider>
    )
}
