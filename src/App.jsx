import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import { RequireAuth } from "./auth/RequireAuth";

export default function App(){
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={
        <RequireAuth><Dashboard/></RequireAuth>
      } />
      <Route path="*" element={<div>Home - <a href="/dashboard">Ir a dashboard</a></div>} />
    </Routes>
  );
}
