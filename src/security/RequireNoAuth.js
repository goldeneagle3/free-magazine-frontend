import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { checkAuthByCookie } from "../validation/conditions/checkAuthByBrowserCookie";

const RequireNoAuth = ({ accessToken, children }) => {
  const location = useLocation();

  if (checkAuthByCookie() || accessToken) {
    return <Navigate to="/posts" state={{ from: location }} replace />;
  } else {
    return children;
  }
};

export default RequireNoAuth;
