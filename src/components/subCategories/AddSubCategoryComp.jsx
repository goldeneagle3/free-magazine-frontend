import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  Backdrop,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";

import { useCreateSubCategoryMutation } from "../../features/sub-categories/subCategorySlice";
import FormButton from "../button/FormButton";
import FormField from "../form/FormField";
import userInput from "./../../hooks/user.input.hook";
import SnackbarMUI from "../snackbar/SnackbarMUI";
import { validateSubCategoryLength } from "../../validation/methods/length.method.validation";

const AddSubCategoryComp = ({ categories }) => {
  const navigate = useNavigate();
  const [addNewSubCategory, { isLoading }] = useCreateSubCategoryMutation();
  const [value, setValue] = React.useState(
    categories?.length > 0 ? categories[categories?.length - 1].name : null
  );
  const [category, setCategory] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(false);
  const [error, setError] = React.useState("");

  const {
    text: subCategory,
    shouldDisplayError: subCategoryHasError,
    textChangeHandler: subCategoryChangeHandler,
    inputBlurHandler: subCategoryBlurHandler,
    // clearHandler: subCategoryClearHandler,
  } = userInput(validateSubCategoryLength);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (subCategoryHasError) return;

    setProgress(true);

    const newSubCategoryData = {
      name: subCategory,
      categoryName: category
    };

    const resp = await addNewSubCategory(newSubCategoryData);
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
        <Autocomplete
          disablePortal
          id="category"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={category}
          onInputChange={(event, newInputValue) => {
            setCategory(newInputValue);
          }}
          options={categories?.map((c) => c.name).sort()}
          sx={{ width: "100%" }}
          renderInput={(params) => (
            <TextField
              id="category"
              label="Kategori"
              placeholder="Kategori Seç"
              fullWidth
              {...params}
            />
          )}
        />
        <FormField
          fieldName="sub-category"
          value={subCategory}
          onChange={subCategoryChangeHandler}
          onBlur={subCategoryBlurHandler}
          error={subCategoryHasError}
          helperText="Bir alt kategori giriniz."
          type="text"
          placeholder="Alt Kategori"
        />
        <FormButton
          text="Alt Kategoriyi Ekle"
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

export default AddSubCategoryComp;
