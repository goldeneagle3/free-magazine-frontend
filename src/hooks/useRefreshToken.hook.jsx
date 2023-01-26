import { useDispatch } from "react-redux";

import { useRefreshTokenMutation } from "../features/auth/authApiSlice";
import { setCredentials } from "../features/auth/authSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const [refreshToken] = useRefreshTokenMutation();

  const refresh = async () => {
    const response = await refreshToken();
    console.log(response);
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
      console.log("Laannnnnnnnnn");
    }
    return response?.data?.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
