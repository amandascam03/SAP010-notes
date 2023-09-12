import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../src/lib/firebase-config";
import { createContext, useEffect, useState } from "react";

const provider = new GoogleAuthProvider();

export const AuthGoogleContext = createContext({});

export default function AuthGoogleProvider({ children }) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadStorageAuth = () => {
            const sessionToken = sessionStorage.getItem("@AuthFirebase:token");
            const sessionUser = sessionStorage.getItem("@AuthFirebase:user");
            if (sessionToken && sessionUser) {
                setUser(sessionUser);
            }
        };
        loadStorageAuth();
    }, [])

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          setUser(user);
          sessionStorage.setItem("@AuthFirebase:token", token);
          sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
        }).catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
        });
    };

    return (
        <AuthGoogleContext.Provider value={{ signInWithGoogle, signed: !!user }}>
            {children}
        </AuthGoogleContext.Provider>
    )
}