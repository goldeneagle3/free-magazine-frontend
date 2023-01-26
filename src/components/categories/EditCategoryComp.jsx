import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useUpdateCategoryMutation } from "../../features/categories/categorySlice";
import FormField from "../form/FormField";
import SnackbarMUI from "../snackbar/SnackbarMUI";

const EditCategoryComp = ({ category }) => {
  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [name, setName] = React.useState(category?.name);
  const [error, setError] = React.useState("");

  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

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
      categoryId: category?.id,
      name: JSON.stringify(name),
    };
    const rep = await updateCategory(reqBody);

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

export default EditCategoryComp;
