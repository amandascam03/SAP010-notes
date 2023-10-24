import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "../pages/components/Navbar/Navbar";
import '@testing-library/jest-dom'

it("render navbar", async () => {
    const { getByTestId } = render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
    );

    expect(getByTestId("Navbar")).toBeInTheDocument()
    
});
