import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  return localStorage.getItem('user') !== null;
};

const PrivateRoute = ({ children }) => {
  const isAuth = isAuthenticated(); 
  return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;