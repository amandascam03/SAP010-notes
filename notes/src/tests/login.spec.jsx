import LoginPage from "../pages/login/Login";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthGoogleContext } from "../../context/AuthContext";
import AuthGoogleProvider from "../../context/AuthContext";
import { MemoryRouter } from "react-router-dom";

it("render login", () => {
    render(
        <AuthGoogleProvider>
            <LoginPage />
        </AuthGoogleProvider>
    );

    screen.getByText("Lab Notes");
});

it("login button click", () => {
    const signInWithGoogle = jest.fn();
    render(
        <AuthGoogleProvider>
            <AuthGoogleContext.Provider value={{ signInWithGoogle }}>
                <LoginPage />
            </AuthGoogleContext.Provider>
        </AuthGoogleProvider>
    );
    fireEvent.click(screen.getByText(/Entrar com o Google/i));
    expect(signInWithGoogle).toHaveBeenCalledTimes(1);
});

function renderWithAuthContext(ui, contextValues) {
    return render(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <AuthGoogleContext.Provider value={contextValues}>
                {ui}
            </AuthGoogleContext.Provider>
        </MemoryRouter>
    );
}

it("confirms that the user is signed", async () => {
    const contextValues = {
        signed: true,
        signInWithGoogle: jest.fn(),
    };

    renderWithAuthContext(<LoginPage />, contextValues);

});