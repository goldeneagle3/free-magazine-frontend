import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import Cookies from "js-cookie";

import { rememberCookie } from "../../config/constants";
import { BASE_URL } from "../../config/urls";
import { logOut, setCredentials } from "../auth/authSlice";

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    let {
      authSlice: { token },
    } = getState();

    if (headers.has("RefreshToken")) {
      token = null;
      headers.set("Authorization", token);
    } else {
      headers.set("Authorization", token ? `Bearer ${token}` : "");
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error?.status === 401) {
    // try to get a new token
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          {
            url: "/auth/refreshToken",
            method: "post",
            headers: { RefreshToken: "not token" },
          },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          api.dispatch(
            setCredentials({
              accessToken: refreshResult.data?.accessToken,
              username: refreshResult?.data?.username,
              userRoles: refreshResult?.data?.roles,
              image: refreshResult?.data?.image,
              imageExist: refreshResult?.data?.mimType,
            })
          );
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logOut());
          Cookies.remove(rememberCookie);
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api", // optional
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Post", "User", "Category", "Comment"],
  endpoints: (builder) => ({}),
});
