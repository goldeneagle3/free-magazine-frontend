import React from "react";
import { MdClose } from "react-icons/md";
import { IconButton, Snackbar } from "@mui/material";

const SnackbarMUI = ({ open = false, setOpen, text }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <MdClose fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={text}
      action={action}
    />
  );
};

export default SnackbarMUI;
