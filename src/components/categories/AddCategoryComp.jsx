import { Backdrop, CircularProgress, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAddCategoryMutation } from "../../features/categories/categorySlice";
import FormButton from "../button/FormButton";
import FormField from "../form/FormField";
import SnackbarMUI from "../snackbar/SnackbarMUI";

import userInput from "./../../hooks/user.input.hook";

const AddCategoryComp = () => {
  const navigate = useNavigate();
  const [newCategory, { isLoading }] = useAddCategoryMutation();
  const [open, setOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(false);
  const [error, setError] = React.useState("");

  const {
    text: category,
    shouldDisplayError: categoryHasError,
    textChangeHandler: categoryChangeHandler,
    inputBlurHandler: categoryBlurHandler,
    // clearHandler: categoryClearHandler,
  } = userInput();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (categoryHasError) return;

    setProgress(true);

    const newCategoryData = {
      name: category,
    };

    const resp = await newCategory(newCategoryData);
    if (resp.error) {
      setProgress(false);
      setError(resp.error?.data?.message);
      setOpen(true);
    } else {
      setProgress(false);
      navigate("/posts");
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Stack spacing={1} sx={{ alignItems: "center" }}>
        <FormField
          fieldName="category"
          value={category}
          onChange={categoryChangeHandler}
          onBlur={categoryBlurHandler}
          error={categoryHasError}
          helperText="Bir kategori giriniz."
          type="text"
          placeholder="Kategori"
        />
        <FormButton
          text="Kategoriyi Ekle"
          color="#ccc"
          bgcolor="#033f67"
          width={100}
          isDisabled={isLoading}
        />
      </Stack>
      <SnackbarMUI open={open} setOpen={setOpen} text={error} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={progress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </form>
  );
};

export default AddCategoryComp;
