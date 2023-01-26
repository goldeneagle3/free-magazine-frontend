import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: null,
    token: null,
    userRoles: [],
    image: null,
    imageExist: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { username, userRoles, image, imageExist, accessToken } =
        action.payload;
      state.username = username;
      state.userRoles = userRoles;
      state.image = image;
      state.imageExist = imageExist;
      state.token = accessToken;
    },
    logOut: (state, action) => {
      state.username = null;
      state.userRoles = null;
      state.image = null;
      state.imageExist = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUsername = (state) => state.authSlice.username;
export const selectCurrentUserRoles = (state) => state.authSlice.userRoles;
export const selectCurrentImage = (state) => state.authSlice.image;
export const selectCurrentUserImageExist = (state) =>
  state.authSlice.imageExist;
export const selectCurrentToken = (state) => state.authSlice.token;
