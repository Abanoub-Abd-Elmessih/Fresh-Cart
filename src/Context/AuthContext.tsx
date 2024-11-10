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
    const [token, setToken] = useState<string>('');

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
