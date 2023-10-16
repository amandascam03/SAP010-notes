import { render } from "@testing-library/react"
import NoteMaker from "../pages/notemaker/New-note"
import { MemoryRouter } from "react-router-dom"
import { AuthGoogleContext } from "../../context/AuthContext";
import '@testing-library/jest-dom'
import { fireEvent, waitFor } from "@testing-library/react";
import { addDoc } from "firebase/firestore";

jest.mock("firebase/firestore")

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));


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

    // const addNote = jest.fn();
    // const navigate = jest.fn();
    /*useNavigate.mockImplementation(() =>({
        navigate: navigate
    }))*/

    const { getByTestId } = render(
        <MemoryRouter>
            <AuthGoogleContext.Provider value={mockAuth}>
                <NoteMaker />
            </AuthGoogleContext.Provider>
        </MemoryRouter>
    );

    fireEvent.click(getByTestId("testSaveNote"));

    await waitFor(() => {
        expect(addDoc).toHaveBeenCalled();
        expect(mockedUsedNavigate).toHaveBeenCalledWith("/home");
    })
});
