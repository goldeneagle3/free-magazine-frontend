import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

import { selectCurrentUserRoles } from "../features/auth/authSlice";
import { checkAuthByCookie } from "../validation/conditions/checkAuthByBrowserCookie";

const RequireAuth = ({ accessToken, allowedRoles, children }) => {
  const roles = useSelector(selectCurrentUserRoles);
  const location = useLocation();

  return checkAuthByCookie() &&
    (roles?.find((role) => allowedRoles?.includes(role)) ||
      allowedRoles.length === 0) ? (
    children
  ) : accessToken ? (
    <Navigate to="/posts" state={{ from: location }} replace />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};

export default RequireAuth;
