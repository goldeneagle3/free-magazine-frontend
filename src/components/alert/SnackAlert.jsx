import React from "react";
import { Alert, Snackbar, Typography } from "@mui/material";

const SnackAlert = ({ open, setOpen, text, status }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={status} sx={{ width: "100%" }}>
          <Typography variant="h5" fontWeight={800}>
            {text}
          </Typography>
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackAlert;
