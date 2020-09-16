import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (token) => {
        localStorage.setItem("token", token);
        setToken(token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        setIsAuthenticated(false);
    };

    const restoreAuth = () => {
        const token = localStorage.getItem("token");
        if (token) login(token);
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, token, login, logout, restoreAuth }}
        >
            {children}
        </AuthContext.Provider>
    );
};
