import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  return localStorage.getItem('authToken') !== null;
};

const PrivateRoute = ({ element: Component }) => {
  const isAuth = isAuthenticated(); 
  return isAuth ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;