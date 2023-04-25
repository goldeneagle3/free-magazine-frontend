import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import React from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useUpdateSubCategoryMutation } from "../../features/sub-categories/subCategorySlice";
import FormField from "../form/FormField";
import SnackbarMUI from "../snackbar/SnackbarMUI";

const EditSubCategoryComp = ({ categories, currentCategory, subCategory }) => {
  const [value, setValue] = React.useState(currentCategory);
  const [category, setCategory] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [name, setName] = React.useState(subCategory?.name);
  const [error, setError] = React.useState("");

  const [updateSubCategory, { isLoading }] = useUpdateSubCategoryMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleClear = () => {
    setName("");
  };

  const submitHandler = async () => {
    if (name === "") {
      return;
    }

    const reqBody = {
      subCategoryId: subCategory?.id,
      name: name,
      category: category,
    };
    const rep = await updateSubCategory(reqBody);

    if (rep?.error) {
      setError(rep?.error?.data?.message);
      setOpenSnack(true);
    }
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen} disabled={isLoading}>
        <MdOutlineModeEditOutline />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle align="center">Yorumu Düzenle</DialogTitle>
        <DialogContent sx={{ justifyContent: "center", textAlign: "center" }}>
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
            value={name}
            onChange={handleChange}
            helperText="En fazla 250 karakter olabilir."
            type="text"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClear}>Clear</Button>
          <Button onClick={submitHandler}>Gönder</Button>
        </DialogActions>
      </Dialog>
      <SnackbarMUI open={openSnack} setOpen={setOpenSnack} text={error} />
    </>
  );
};

export default EditSubCategoryComp;
