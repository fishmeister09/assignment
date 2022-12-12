import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
const ProtectedRouteAdmin = ({ children }) => {
  const { user } = useUserAuth();
  if (Object.keys(user).length === 0) {
    return <Navigate to="/login" />;
  }
  if (!user.email === 'admin@stickman.com') {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRouteAdmin;
