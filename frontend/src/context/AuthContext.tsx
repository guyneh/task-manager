// Contains the authentication context and custom hook for managing and accessing authentication state throughout the application

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface User {
    id: string;
    email: string;
    created_at: string;
    name: string;
    avatar?: string;
}

interface AuthState {
    user: User | null;
    session: any | null;
}

interface AuthContextProps {
    authState: AuthState;
    signIn: (user: User, session: string) => void;
    signOut: () => void;
    updateUser: (updatedUser: Partial<User>) => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

// Create the AuthContext with default undefined value
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// AuthProvider component to manage and provide authentication state
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>({ user: null, session: null });

    // Load user and session from localStorage when the component mounts
    useEffect(() => {
        const user = localStorage.getItem('user');
        const session = localStorage.getItem('session');
        if (user && session) {
            setAuthState({ user: JSON.parse(user), session: JSON.parse(session) });
        }
    }, []);

    // Function to sign in a user and save their info to localStorage
    const signIn = (user: User, session: any) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('session', JSON.stringify(session));
        setAuthState({ user, session });
    };

    // Function to sign out a user and remove their info from localStorage
    const signOut = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('session');
        setAuthState({ user: null, session: null });
    };

    // Function to update the user state
    const updateUser = (updatedUser: Partial<User>) => {
        setAuthState(prevState => {
            if (!prevState.user) return prevState;

            const updatedUserState: User = {
                ...prevState.user,
                ...updatedUser
            };
            localStorage.setItem('user', JSON.stringify(updatedUserState));
            return { ...prevState, user: updatedUserState };
        });
    };

    // Provide authState and auth actions to children components
    return (
        <AuthContext.Provider value={{ authState, signIn, signOut, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext, throws an error if used outside of AuthProvider
const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };
