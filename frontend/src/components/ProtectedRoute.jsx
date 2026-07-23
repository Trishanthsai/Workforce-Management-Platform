import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        // Not logged in, redirect to login page
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        // Role mismatch, redirect to login page (or access denied page if you have one)
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;
