import {
  Alert,
  Backdrop,
  CircularProgress,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import userInput from "../../hooks/user.input.hook";
import { validatePasswordLength } from "../../validation/methods/length.method.validation";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../features/auth/authApiSlice";
import FormButton from "../button/FormButton";
import FormField from "../form/FormField";

const ResetPasswordComp = ({ token }) => {
  const navigate = useNavigate();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [errMsg, setErrMsg] = useState("");
  const [progress, setProgress] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const {
    text: password,
    shouldDisplayError: passwordHasError,
    textChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    clearHandler: passwordClearHandler,
  } = userInput(validatePasswordLength);

  const {
    text: confirmPassword,
    textChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    clearHandler: confirmPasswordClearHandler,
  } = userInput(validatePasswordLength);

  const clearHandle = () => {
    passwordClearHandler();
    confirmPasswordClearHandler();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrMsg("Şifreler eşleşmiyor");
      // setOpen(true);
      return;
    }

    if (passwordHasError) {
      return;
    }

    const resetPasswordBody = {
      token,
      password,
    };

    setProgress(true);
    const response = await changePassword(resetPasswordBody);
    setProgress(false);

    if (response?.error) {
      setErrMsg(response?.error?.data?.message);
    } else if (response?.data) {
      setOpen(true);
      clearHandle();
      setTimeout(() => navigate("/auth"), 7000);
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Stack spacing={1} sx={{ alignItems: "center" }}>
        <FormField
          fieldName="yeni şifre"
          value={password}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          error={passwordHasError}
          helperText="Lütfen şifrenizi girin."
          type="password"
          placeholder="En az 8 karakter olmalıdır."
        />
        <FormField
          fieldName="yeni şifre onay"
          value={confirmPassword}
          onChange={confirmPasswordChangeHandler}
          onBlur={confirmPasswordBlurHandler}
          error={
            confirmPassword.length > 0 &&
            password?.length !== confirmPassword?.length
          }
          helperText={
            password?.length !== confirmPassword?.length
              ? "Şifreler eşleşmiyor!"
              : ""
          }
          type="password"
        />
        <FormButton
          text="Şifre Yenile"
          color="#ccc"
          bgcolor="#033f67"
          width={100}
          isDisabled={isLoading}
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
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%", fontSize: 11 }}
          >
            Tebrikler! Şifreniz başarıyla değiştirilmiştir. Şimdi giriş
            sayfasına yöneleceksiniz.
          </Alert>
        </Snackbar>
      </Stack>
    </form>
  );
};

export default ResetPasswordComp;
