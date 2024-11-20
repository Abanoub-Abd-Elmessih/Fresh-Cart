import React, { createContext, useEffect, useState, ReactNode } from "react";

export const AuthContext = createContext<{
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
}>({
    token: "", // Default token value
    setToken: () => {}, // Empty function as a fallback
});

interface AuthContextProviderProps {
    children: ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string>(() => {
        // Retrieve the token from localStorage if available
        return localStorage.getItem('token') || '';
    });

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token); // Store the token in localStorage
        } else {
            localStorage.removeItem('token'); // Remove the token from localStorage
        }
    }, [token]); // Only run when token changes

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
