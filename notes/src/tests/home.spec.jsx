import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import HomePage from '../pages/home/Home'
import { MemoryRouter } from 'react-router-dom'
import { AuthGoogleContext } from '../../context/AuthContext'

const mockAuth = {
    currentUser: {
        uid: '9f8dcn',
        displayName: 'Amanda',
    },
};

it("render home", () => {
    const { getByText } = render(
       <MemoryRouter>
        <AuthGoogleContext.Provider value={mockAuth}>
            <HomePage />
        </AuthGoogleContext.Provider>
       </MemoryRouter>
    )

    expect(getByText("User Notes")).toBeInTheDocument();
    
})