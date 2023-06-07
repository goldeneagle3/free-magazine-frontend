import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Backdrop,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import userInput from "../../hooks/user.input.hook";
import { validateEmail } from "../../validation/methods/email.method.validation";
import {
  validateNameLength,
  validatePasswordLength,
} from "../../validation/methods/length.method.validation";
import FormField from "../form/FormField";
import FormButton from "../button/FormButton";
import { useRegisterMutation } from "../../features/auth/authApiSlice";
import SnackAlert from "../alert/SnackAlert";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [errMsg, setErrMsg] = useState("");
  const [progress, setProgress] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    text: username,
    shouldDisplayError: nameHasError,
    textChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    clearHandler: nameClearHandler,
  } = userInput(validateNameLength);

  const {
    text: firstName,
    shouldDisplayError: firstNameHasError,
    textChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    clearHandler: firstNameClearHandler,
  } = userInput();

  const {
    text: lastName,
    shouldDisplayError: lastNameHasError,
    textChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    clearHandler: lastNameClearHandler,
  } = userInput();

  const {
    text: email,
    shouldDisplayError: emailHasError,
    textChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    clearHandler: emailClearHandler,
  } = userInput(validateEmail);

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
    nameClearHandler();
    emailClearHandler();
    firstNameClearHandler();
    lastNameClearHandler();
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

    if (
      nameHasError ||
      emailHasError ||
      firstNameHasError ||
      lastNameHasError ||
      passwordHasError
    ) {
      return;
    }

    const newUserReqBody = {
      username,
      firstName,
      lastName,
      email,
      password,
    };

    setProgress(true);
    const response = await registerUser(newUserReqBody);
    setProgress(false);

    if (response?.error) {
      setErrMsg(response?.error?.data?.message);
      setErrMsg(response?.error?.data?.username);
      setErrMsg(response?.error?.data?.email);
      setErrMsg(response?.error?.data?.password);
    } else if (response?.data) {
      setOpen(true);
      clearHandle();
      navigate("/auth");
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Stack spacing={1} sx={{ alignItems: "center" }}>
        <FormField
          fieldName="kullanıcı adı"
          value={username}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          error={nameHasError}
          helperText="Kullanıcı adı giriniz"
          type="text"
        />
        <FormField
          fieldName="email"
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          error={emailHasError}
          helperText="Email adresinizi giriniz"
          type="email"
          placeholder="test@test.com"
        />
        <FormField
          fieldName="firstName"
          value={firstName}
          onChange={firstNameChangeHandler}
          onBlur={firstNameBlurHandler}
          error={firstNameHasError}
          helperText="İsminizi giriniz"
          type="text"
        />
        <FormField
          fieldName="lastName"
          value={lastName}
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurHandler}
          error={lastNameHasError}
          helperText="Soyadınızı giriniz"
          type="text"
        />
        <FormField
          fieldName="şifre"
          value={password}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          error={passwordHasError}
          helperText="Lütfen şifrenizi giriniz."
          type="password"
          placeholder="En az 8 karakter olmalıdır."
        />
        <FormField
          fieldName="şifre onay"
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
          text="Üye Ol"
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
        <SnackAlert
          open={open}
          setOpen={setOpen}
          status="success"
          text="Tebrikler başarıyla üye oldunuz. Hesabınızı aktif hale getirmek için
            email adresinizi kontrol ediniz."
        />
      </Stack>
    </form>
  );
};

export default SignUpForm;
