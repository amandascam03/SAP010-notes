import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import HomePage from '../pages/home/Home'
import { MemoryRouter } from 'react-router-dom'
import { AuthGoogleContext } from '../../context/AuthContext'

jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    getDocs: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
    currentUser: { uid: 'user123' },
}))

it("render home", () => {
    const { getByText } = render(
       <MemoryRouter>
        <AuthGoogleContext.Provider>
            <HomePage />
        </AuthGoogleContext.Provider>
       </MemoryRouter>
    )

    expect(getByText("User Notes")).toBeInTheDocument();
    
})