import React from 'react';
import { Navigate } from 'react-router-dom';

const isLogged = () => {
  return localStorage.getItem('user') === null;
};

const LoggedRoute = ({ children }) => {
  const isLogged = isAuthenticated(); 
  return isAuth ? children : <Navigate to="/login" />;
};

export default LoggedRoute;