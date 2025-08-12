import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectIsAuthenticated } from "../../reducers/authSlice";

export const RequireAuth = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/welcome" />
}