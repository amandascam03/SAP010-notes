import LoginPage from "../pages/login/Login"
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthGoogleContext } from "../../context/AuthContext";

// jest.mock("../../context/AuthContext");

it("render login", () => {
    render(<LoginPage />)

    screen.getByText("Lab Notes");
})

it("login button click", () => {
    const loginSpy = jest.spyOn(AuthGoogleContext, "signInWithGoogle").mockImplementation("string")
    render(<LoginPage />)
    fireEvent.click(screen.getByText(/Entrar com o Google/i))
    expect(loginSpy).toHaveBeenCalledTimes(1);
})