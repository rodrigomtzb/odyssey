import React from "react";
import { Navigate } from "react-router-dom";
import Cookie from "js-cookie";

const isAuthenticated = () => {
  // const cookie = Cookie.get("dinamica-jwt");
  // console.log(cookie);
  return localStorage.getItem("user") !== null;
};

const PrivateRoute = ({ children }) => {
  const isAuth = isAuthenticated();
  return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
