import React from 'react'
import { useAuth } from '../context/Auth.context'
import { Navigate, Outlet } from 'react-router';

function ProtectedRoute() {
    const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default ProtectedRoute