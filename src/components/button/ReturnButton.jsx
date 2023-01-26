import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, useTheme } from "@mui/material";

const ReturnButton = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Button
      sx={{
        width: 110,
        alignItems: "center",
        py: 1.1,
        borderRadius:"15px",
        bgcolor: theme.palette.secondary.light,
        color: theme.palette.secondary.dark,
        ":hover": {
          bgcolor: theme.palette.secondary.dark,
          color: theme.palette.secondary.light,
        },
      }}
      variant="contained"
      onClick={() => navigate(-1)}
    >
      Geri Dön
    </Button>
  );
};

export default ReturnButton;
