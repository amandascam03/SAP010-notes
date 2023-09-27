import LoginPage from "../pages/login/Login"
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthGoogleContext } from "../../context/AuthContext";
import AuthGoogleProvider from "../../context/AuthContext";

// jest.mock("../../context/AuthContext");

it("render login", () => {
    render(<AuthGoogleProvider>
        <LoginPage />
    </AuthGoogleProvider>)

    screen.getByText("Lab Notes");
})

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