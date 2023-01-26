import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ roles, children }) => {
  if (!roles) {
    return <Navigate to="/" />;
  }
  return children;
};

export default PrivateRoute;
