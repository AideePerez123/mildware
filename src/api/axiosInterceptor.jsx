import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "./axiosSetup";
import { useAuth } from "../auth/AuthContext";

export const AxiosInterceptor = ({ children }) => {
    const navigate = useNavigate();
    const { token, logout } = useAuth();

    useEffect(() => {
        const reqId = api.interceptors.request.use((config) => {
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
        });

        const resId = api.interceptors.response.use(
        (resp) => resp,
        (error) => {
            const status = error?.response?.status;
            if (status === 401) {
            try { logout(); } catch {}
            navigate("/login", { replace: true });
            }
            return Promise.reject(error);
        }
        );

        return () => {
        api.interceptors.request.eject(reqId);
        api.interceptors.response.eject(resId);
        };
    }, [token, navigate, logout]);

    return <>{children}</>;
};
