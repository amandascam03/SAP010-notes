import { fireEvent, render } from "@testing-library/react"
import NoteMaker from "../pages/notemaker/New-note"
import { MemoryRouter } from "react-router-dom"
import { AuthGoogleContext } from "../../context/AuthContext";
import '@testing-library/jest-dom'

const mockAuth = {
    currentUser: {
        uid: '9f8dcn',
    },
};

it("render notemaker", () => {
    const { getByTestId } = render(
    <MemoryRouter>
        <NoteMaker />
    </MemoryRouter>,
    {
        wrapper: ({children}) => (
            <AuthGoogleContext.Provider value={mockAuth}>{children}</AuthGoogleContext.Provider>
        ),
    }
    );

    expect(getByTestId('Note')).toBeInTheDocument();
})

it("save note click", async () => {
    const handleSaveNoteClick = jest.fn();
    const { getByTestId } = render(
        <MemoryRouter>
            <NoteMaker saveNoteClick={handleSaveNoteClick} />
        </MemoryRouter>
        );

    fireEvent.click(getByTestId("testSaveNote"));
    // expect(handleSaveNoteClick).toHaveBeenCalledTimes(1);
})