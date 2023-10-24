import { render } from "@testing-library/react";
import NoteMaker from "../pages/notemaker/New-note";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { fireEvent, waitFor } from "@testing-library/react";
import { addDoc } from "firebase/firestore";

jest.mock("../lib/firebase-config", () => ({
    auth: {
        currentUser: {
            uid: "aw69hf",
        },
    },
}));

jest.mock("firebase/firestore");

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedUsedNavigate,
}));

it("render notemaker", () => {
    const { getByTestId } = render(
        <MemoryRouter>
            <NoteMaker />
        </MemoryRouter>
    );

    expect(getByTestId("Note")).toBeInTheDocument();
});

it("save note click", async () => {
    const { getByTestId } = render(
        <MemoryRouter>
            <NoteMaker />
        </MemoryRouter>
    );

    fireEvent.click(getByTestId("testSaveNote"));

    await waitFor(() => {
        expect(addDoc).toHaveBeenCalled();
        expect(mockedUsedNavigate).toHaveBeenCalledWith("/home");
    });
});

it("return click", () => {
    const { getByTestId } = render(
        <MemoryRouter>
            <NoteMaker />
        </MemoryRouter>
    );

    const navbar = getByTestId("Navbar");

    fireEvent.click(navbar.querySelector(".returnBtn"));
    expect(mockedUsedNavigate).toHaveBeenCalled();
});

it("onchange title event in textbox", () => {
    const { getByPlaceholderText } = render(
        <MemoryRouter>
            <NoteMaker />
        </MemoryRouter>
    );

    const textareaTitle = getByPlaceholderText("Título");

    fireEvent.change(textareaTitle, {
        target: { value: "new title" },
    });

    expect(textareaTitle.value).toBe("new title");
});

it("onchange note event in textbox", () => {
    const { getByPlaceholderText } = render(
        <MemoryRouter>
            <NoteMaker />
        </MemoryRouter>
    );

    const textareaNote = getByPlaceholderText("Nota");

    fireEvent.change(textareaNote, {
        target: { value: "new note" },
    });

    expect(textareaNote.value).toBe("new note");
});
