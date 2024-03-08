import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import HomePage from "../pages/home/Home";
import { MemoryRouter } from "react-router-dom";
import { AuthGoogleContext } from "../../context/AuthContext";
import { getDocs } from "firebase/firestore";
import { auth } from "../lib/firebase-config";
import { useState as useStateMock } from "react";
import { act } from "react-dom/test-utils";

jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useState: jest.fn(),
}));

const setNotes = jest.fn();

jest.mock("firebase/firestore", () => {
    const originalModule = jest.requireActual("firebase/firestore");
    return {
        __esModule: true,
        ...originalModule,
        getDocs: jest.fn(() => ({ docs: [] })),
    };
});

jest.mock("../lib/firebase-config", () => ({
    ...jest.requireActual("../lib/firebase-config"),
    auth: {
        onAuthStateChanged: jest.fn(),
        currentUser: {
            uid: "aw69hf",
        },
    },
}));

beforeEach(() => {
    useStateMock.mockImplementation((init) => [init, setNotes]);
});

function setupWithUser(user) {
    const contextValue = {
        user: JSON.stringify(user),
        signOut: jest.fn(),
    };
    return contextValue;
}

function setupAuthMock(user) {
    const unsubscribeMock = jest.fn();
    auth.onAuthStateChanged.mockImplementation((callback) => {
        callback(user);
        return unsubscribeMock;
    });
    return unsubscribeMock;
}

it("render home with displayName", () => {
    const userSigned = { displayName: "Amanda" };

    setupAuthMock(userSigned);

    const { getByText } = render(
        <AuthGoogleContext.Provider value={setupWithUser(userSigned)}>
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        </AuthGoogleContext.Provider>
    );

    expect(getByText(`Amanda Notes`)).toBeInTheDocument();
});

it("render without displayName", () => {
    const userSigned = { displayName: null };

    setupAuthMock(userSigned);

    const { getByText } = render(
        <AuthGoogleContext.Provider value={setupWithUser(userSigned)}>
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        </AuthGoogleContext.Provider>
    );

    expect(getByText(`User Notes`)).toBeInTheDocument();
});

it("render notes", async () => {
    const userSigned = { displayName: "Outro", uid: "aw69hf" };

    setupAuthMock(userSigned);
    const mockNote1 = {
        id: 1,
        data: jest.fn().mockReturnValue({
            conteudo: "nota 1",
            timestamp: { seconds: 62527, nanoseconds: 837277 },
            titulo: "titulo 1",
            uid: "aw69hf",
        }),
    };

    const mockNote2 = {
        id: 2,
        data: jest.fn().mockReturnValue({
            conteudo: "nota 2",
            timestamp: { seconds: 62527, nanoseconds: 837277 },
            titulo: "titulo 2",
            uid: "aw69hf",
        }),
    };

    const mockSnapshot = { docs: [mockNote1, mockNote2] };
    getDocs.mockResolvedValue(mockSnapshot);

    render(
        <MemoryRouter>
            <AuthGoogleContext.Provider value={setupWithUser(userSigned)}>
                <HomePage />
            </AuthGoogleContext.Provider>
        </MemoryRouter>
    );

    await waitFor(() => {
        expect(getDocs).toHaveBeenCalledTimes(1);
        expect(setNotes).toHaveBeenCalledWith([
            { id: 1, ...mockNote1.data(), uid: userSigned.uid },
            { id: 2, ...mockNote2.data(), uid: userSigned.uid },
        ]);
    });
});

it("calls signOut", async () => {
    const userSigned = { displayName: "Outro", uid: "aw69hf" };
    const contextValue = setupWithUser(userSigned);

    setupAuthMock(null);

    await act(async () => {
        render(
            <MemoryRouter>
                <AuthGoogleContext.Provider value={contextValue}>
                    <HomePage />
                </AuthGoogleContext.Provider>
            </MemoryRouter>
        );
    });

    await waitFor(() => {
        expect(contextValue.signOut).toHaveBeenCalled();
    });
});

it("unsubscribe é chamado quando o componente é desmontado", () => {
    const userSigned = { displayName: "Outro", uid: "aw69hf" };
    
    const unsubscribeMock = setupAuthMock(userSigned);

    const { unmount } = render(
        <MemoryRouter>
            <AuthGoogleContext.Provider value={setupWithUser(userSigned)}>
                <HomePage />
            </AuthGoogleContext.Provider>
        </MemoryRouter>
    );

    unmount();

    expect(unsubscribeMock).toHaveBeenCalled();
});