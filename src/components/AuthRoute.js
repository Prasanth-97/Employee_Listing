import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const AuthRoute = () => {
  const token = sessionStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default AuthRoute;
