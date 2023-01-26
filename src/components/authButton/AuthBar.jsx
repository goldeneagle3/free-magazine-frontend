import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import "../../styles/sass/main.scss";

const AuthBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "right",
        mb: 3,
      }}
    >
      <Link to="/auth" className="btn btn--white btn--animated">
        Aramıza Katl !
      </Link>
    </Box>
  );
};

export default AuthBar;
