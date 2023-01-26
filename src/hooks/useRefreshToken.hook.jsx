import { useDispatch } from "react-redux";

import { axiosPrivate } from "../axios/privateAxios";
import { authApiUrl } from "../config/urls";
import { setCredentials } from "../features/auth/authSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    const response = await axiosPrivate.post(`${authApiUrl}/refreshToken`);
    console.log("response", response);
    dispatch(
      setCredentials({
        accessToken: response?.data?.accessToken,
        username: response?.data?.username,
        userRoles: response?.data?.roles,
        image: response?.data?.imageId,
        imageExist: response?.data?.mimType,
      })
    );
    return response?.data?.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
