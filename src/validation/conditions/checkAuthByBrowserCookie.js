import Cookies from "js-cookie";
import { rememberCookie } from "../../config/constants";

export const checkAuthByCookie = () => {
  return Cookies.get(rememberCookie) ? true : false;
};
