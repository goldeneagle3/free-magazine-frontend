import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useSendMessageMutation } from "../../features/contact/contactSlice";
import { validateEmail } from "../../validation/methods/email.method.validation";
import {
  validateContactContentLength,
  validateContentTitleLength,
} from "../../validation/methods/length.method.validation";
import SnackAlert from "../alert/SnackAlert";
import FormButton from "../button/FormButton";

import FormField from "../form/FormField";
import MultilineFormField from "../form/MultilineFormField";
import userInput from "./../../hooks/user.input.hook";

const ContactFormComp = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [senMessage, { isLoading, isError, isSuccess }] =
    useSendMessageMutation();

  const {
    text: email,
    textChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    clearHandler: emailClearHandler,
  } = userInput();

  const {
    text: title,
    shouldDisplayError: titleHasError,
    textChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    clearHandler: titleClearHandler,
  } = userInput(validateContentTitleLength);

  const {
    text: content,
    shouldDisplayError: contentHasError,
    textChangeHandler: contentChangeHandler,
    inputBlurHandler: contentBlurHandler,
    clearHandler: contentClearHandler,
  } = userInput(validateContactContentLength);

  const clearForm = () => {
    emailClearHandler();
    titleClearHandler();
    contentClearHandler();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!validateEmail(email) || titleHasError || contentHasError) return;

    const messageBody = {
      email,
      title,
      content,
    };

    const response = await senMessage(messageBody);

    if (response.error) {
      return <SnackAlert openEx={isError} text="adllkdna" />;
    }

    setText(response?.data?.message);
    setOpen(true);
    clearForm();
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Stack spacing={1} sx={{ alignItems: "center" }}>
        <FormField
          fieldName="email"
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          error={!validateEmail(email)}
          helperText="Lütfen geçerli bir email giriniz."
          type="text"
          fullwidth={true}
          placeholder="Email"
        />
        <FormField
          fieldName="başlık"
          value={title}
          onChange={titleChangeHandler}
          onBlur={titleBlurHandler}
          error={titleHasError}
          helperText="Bir başlık giriniz."
          type="text"
          fullwidth={true}
          placeholder="Başlık"
        />
        <MultilineFormField
          value={content}
          onChange={contentChangeHandler}
          onBlur={contentBlurHandler}
          error={contentHasError}
          helperText="İçeriğinizi buraya giriniz."
          type="text"
          rows={10}
          fullWidth={true}
        />
        <FormButton
          text="Mesajı Gönder"
          color="#ccc"
          bgcolor="#033f67"
          width={100}
          isDisabled={isLoading}
        />
        <SnackAlert
          open={open}
          setOpen={setOpen}
          text={text}
          status={isError ? "error" : isSuccess ? "success" : "info"}
        />
      </Stack>
    </form>
  );
};

export default ContactFormComp;
