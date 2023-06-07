import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "post",
        body: credentials,
      }),
    }),
    sendActivationRequest: builder.mutation({
      query: (credentials) => ({
        url: "/auth/sendActivationRequest",
        method: "post",
        body: credentials,
      }),
    }),
    confirmUser: builder.mutation({
      query: (token) => ({
        url: "/auth/confirmUser/" + token,
        method: "post",
      }),
    }),
    forgotPassword: builder.mutation({
      query: (credentials) => ({
        url: "/auth/forgotPassword",
        method: "post",
        body: credentials,
      }),
    }),
    changePassword: builder.mutation({
      query: (credentials) => ({
        url: "/auth/changePassword/" + credentials.token,
        method: "post",
        body: { password: credentials.password },
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: "/auth/refreshToken",
        method: "POST",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/signout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendActivationRequestMutation,
  useConfirmUserMutation,
  useForgotPasswordMutation,
  useChangePasswordMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
} = authApiSlice;
