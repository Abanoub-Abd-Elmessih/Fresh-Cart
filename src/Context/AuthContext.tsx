import React, { createContext, useEffect, useState, ReactNode } from "react";
// eslint-disable-next-line react-refresh/only-export-components

export const AuthContext = createContext<{
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
} | undefined>(undefined);


interface AuthContextProviderProps {
    children: ReactNode; // Define the type for children
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
