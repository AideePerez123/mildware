import React, { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(() => {
        if (!token) return null;
        try {
        const p = jwt_decode(token);
        return { id: p.sub, email: p.email };
        } catch {
        return null;
        }
    });

    useEffect(() => {
        if (token) {
        localStorage.setItem("token", token);
        try {
            const p = jwt_decode(token);
            setUser({ id: p.sub, email: p.email });
        } catch {
            setUser(null);
        }
        } else {
        localStorage.removeItem("token");
        setUser(null);
        }
    }, [token]);

    const login = (newToken) => setToken(newToken);
    const logout = () => setToken(null);

    return (
        <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!user }}>
        {children}
        </AuthContext.Provider>
    );
    };

    export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be inside AuthProvider");
    return ctx;
};
