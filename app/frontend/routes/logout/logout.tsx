import React from 'react';
import { Navigate } from 'react-router-dom';

export function Logout() {
    // More can be done here, like clearing an auth token from localStorage
    
    // Redirect the user to the root page
    return <Navigate to="/" replace />;
}