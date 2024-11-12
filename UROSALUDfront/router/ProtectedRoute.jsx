// src/router/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ element, allowedRoles }) => {
    const user = JSON.parse(localStorage.getItem('userUROSALUD'));
    
    if (user && allowedRoles.includes(user.role)) {
        return element;
    } else {
        return <Navigate to="*" replace />;
    }
};


 