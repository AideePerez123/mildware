import React from "react";
import { useAuth } from "../auth/AuthContext";
import { api } from "../api/axiosSetup";

export default function Dashboard() {
    const { user, logout } = useAuth();

    const fetchProtected = async () => {
        try {
        const r = await api.get("/protected");
        alert("Respuesta protegida: " + JSON.stringify(r.data));
        } catch (err) {
        alert("Error protegiendo: " + err?.response?.status);
        }
};

return (
    <div style={{ padding: 20 }}>
        <h2>Dashboard</h2>
        <p>Usuario: {user?.email}</p>
        <button onClick={fetchProtected}>Llamar endpoint protegido</button>
        <button onClick={() => logout()}>Cerrar sesión</button>
        </div>
    );
}
