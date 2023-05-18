import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { Backdrop, CircularProgress, Stack, Typography } from "@mui/material";

import userInput from "../../hooks/user.input.hook";
import { validatePasswordLength } from "../../validation/methods/length.method.validation";
import FormField from "../form/FormField";
import FormButton from "../button/FormButton";
import useAuth from "../../hooks/useAuth.hook";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { setCredentials } from "../../features/auth/authSlice";
import { cookieExpireTime, rememberCookie } from "../../config/constants";

const SignInForm = () => {
  const { persist } = useAuth();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const from = location.state?.from?.pathname || "/home";

  const {
    text: userID,
    shouldDisplayError: userIDHasError,
    textChangeHandler: userIDChangeHandler,
    inputBlurHandler: userIDBlurHandler,
    clearHandler: userIDClearHandler,
  } = userInput();

  const {
    text: password,
    shouldDisplayError: passwordHasError,
    textChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    clearHandler: passwordClearHandler,
  } = userInput(validatePasswordLength);

  const clearForm = () => {
    userIDClearHandler();
    passwordClearHandler();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (userIDHasError || passwordHasError) return false;

    const userLoginRequest = {
      usernameOrEmail: userID,
      password,
    };

    setProgress(true);

    const response = await login(userLoginRequest);
    setProgress(false);

    if (response?.error) {
      setErrMsg(response?.error?.data?.message);
    } else if (response?.data) {
      dispatch(
        setCredentials({
          accessToken: response?.data?.accessToken,
          username: response?.data?.username,
          userRoles: response?.data?.roles,
          image: response?.data?.imageId,
          imageExist: response?.data?.imageExist,
        })
      );
      const inFifteenMinutes = new Date(
        new Date().getTime() + cookieExpireTime
      );
      Cookies.set(rememberCookie, "okey", { expires: inFifteenMinutes });
      navigate(from, { replace: true });
    }

    clearForm();
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <form onSubmit={onSubmitHandler}>
      <Stack spacing={2} sx={{ alignItems: "center" }}>
        <FormField
          fieldName="Kullanıcı Adı veya Email"
          value={userID}
          onChange={userIDChangeHandler}
          onBlur={userIDBlurHandler}
          error={userIDHasError}
          helperText="Lütfen e-postanızı veya kullanıcı adınızı giriniz."
          type="text"
          placeholder="test@test.com | testUserName"
        />
        <FormField
          fieldName="Şifre"
          value={password}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          error={passwordHasError}
          helperText="Lütfen şifrenizi girin."
          type="password"
          placeholder="En az 8 karakter olmalıdır."
          
        />
        <FormButton
          text="Giriş Yap"
          color="#ccc"
          bgcolor="#033f67"
          width={100}
          isDisabled={passwordHasError || userIDHasError || isLoading}
        />
        {errMsg && (
          <Typography sx={{ color: "red" }} align="center" variant="h6">
            {errMsg}
          </Typography>
        )}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={progress}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Stack>
    </form>
  );
};

export default SignInForm;
