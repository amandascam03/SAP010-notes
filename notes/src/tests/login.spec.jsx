import LoginPage from "../pages/login/Login"
import { render, screen } from '@testing-library/react';

it("login", () => {
    render(<LoginPage />)

    screen.getByText("Lab Notes");
})