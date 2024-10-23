import React from 'react';
import { Navigate } from 'react-router-dom';

const isLogged = () => {
  return localStorage.getItem('accessToken') === null;
};

const LoggedRoute = ({ children }) => {
  const isLog = isLogged(); 
  return isLog ? children : <Navigate to="/" />;
};

export default LoggedRoute;