import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ role }) => {
    const { isAuthenticated, user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated || (role && user?.role !== role)) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
