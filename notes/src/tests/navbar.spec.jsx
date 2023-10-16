import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "../pages/components/Navbar/Navbar";
import { fireEvent } from "@testing-library/react";

it("save note click", async () => {
    let handleSaveNoteClick = jest.fn();
    const { getByTestId } = render(
        <MemoryRouter>
            <Navbar saveNoteClick={handleSaveNoteClick} />
        </MemoryRouter>
    );

    fireEvent.click(getByTestId("testSaveNote"));
    await waitFor(() => {
        expect(handleSaveNoteClick).toHaveBeenCalledTimes(1);
    });
});
