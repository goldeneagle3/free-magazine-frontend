import { useDispatch } from "react-redux";

import { useRefreshTokenMutation } from "../features/auth/authApiSlice";
import { setCredentials } from "../features/auth/authSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const [refreshToken] = useRefreshTokenMutation();

  const refresh = async () => {
    const response = await refreshToken();
    if (response?.data) {
      dispatch(
        setCredentials({
          accessToken: response?.data?.accessToken,
          username: response?.data?.username,
          userRoles: response?.data?.roles,
          image: response?.data?.imageId,
          imageExist: response?.data?.mimType,
        })
      );
    } else {
      console.log("error");
    }
    return response?.data?.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
