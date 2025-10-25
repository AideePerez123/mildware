import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";


const fakeToken = (expiresInSeconds = 60) => {
    const header = btoa(JSON.stringify({ alg: "none", typ: "JWT" }));
    const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
    const payload = btoa(JSON.stringify({ sub: "123", email: "ya@example.com", exp }));
    return `${header}.${payload}.`; 
};

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";

    const handleLogin = async () => {
        setLoading(true);
    const token = fakeToken(60);
    login(token);
    setLoading(false);
    navigate(from, { replace: true });
    };

    return (
        <div style={{ padding: 20 }}>
        <h2>Login (DEMO)</h2>
        <button onClick={handleLogin} disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar (token demo 60s)"}
        </button>
        </div>
    );
}
