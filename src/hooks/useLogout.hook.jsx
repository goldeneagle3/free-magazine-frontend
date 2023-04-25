import { useDispatch } from "react-redux";
import { logOut } from "../features/auth/authSlice";
import { useLogoutMutation } from "../features/auth/authApiSlice";
import Cookies from "js-cookie";
import { rememberCookie } from "../config/constants";

const useLogout = () => {
  const dispatch = useDispatch();
  const [signOutFunc] = useLogoutMutation();

  const logout = async () => {
    try {
      dispatch(logOut());
      Cookies.remove(rememberCookie);
      await signOutFunc();
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
