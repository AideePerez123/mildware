import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useAuth } from "./AuthContext";

export const RequireAuth = ({ children }) => {
    const { token } = useAuth();
    const location = useLocation();

    if (!token) return <Navigate to="/login" replace state={{ from: location }} />;

    try {
        const payload = jwt_decode(token);
        const now = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < now) {
        return <Navigate to="/login" replace state={{ from: location, reason: "expired" }} />;
        }
    } catch {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
};
