import React, { useState } from "react";

import userInput from "./../../hooks/user.input.hook";
import MultilineFormField from "../form/MultilineFormField";
import FormButton from "../button/FormButton";
import { useAddCommentMutation } from "../../features/comments/commentsSlice";
import SnackbarMUI from "../snackbar/SnackbarMUI";
import { useSelector } from "react-redux";
import { selectCurrentUsername } from "../../features/auth/authSlice";
import { Stack } from "@mui/material";

const AddComment = ({ postId }) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const username = useSelector(selectCurrentUsername);

  const [addComment, { isLoading, isError }] = useAddCommentMutation();

  const {
    text: comment,
    shouldDisplayError: commentHasError,
    textChangeHandler: commentChangeHandler,
    inputBlurHandler: commentBlurHandler,
    clearHandler: commentClearHandler,
  } = userInput();

  const clearForm = () => {
    commentClearHandler();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (commentHasError) return;

    const updatedPost = {
      comment,
      postId,
    };

    const response = await addComment(updatedPost);

    if (response?.error) {
      setText(response?.error?.data?.clientMessage);
      setOpen(true);
    }
    clearForm();
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Stack spacing={1} sx={{ alignItems: "center" }}>
        <MultilineFormField
          value={comment}
          onChange={commentChangeHandler}
          onBlur={commentBlurHandler}
          error={commentHasError}
          helperText="Yorumunuz en fazla 250 karakter olabilir."
          type="text"
          rows={10}
          fullWidth={true}
        />
        <FormButton
          text="Yorum Ekle"
          color="#ccc"
          bgcolor="#033f67"
          width={100}
          isDisabled={isLoading || isError || !username}
        />
        <SnackbarMUI open={open} setOpen={setOpen} text={text} />
      </Stack>
    </form>
  );
};

export default AddComment;
