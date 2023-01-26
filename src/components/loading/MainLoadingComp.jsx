import { Box, CircularProgress } from "@mui/material";
import React from "react";

const MainLoadingComp = ({ isLoading }) => {
  return (
    isLoading && (
      <Box sx={{ height: "100vh", width: "100%", position: "relative" }}>
        <CircularProgress sx={{ position: "absolute", top: "40%", left: "50%" }} />
      </Box>
    )
  );
};

export default MainLoadingComp;
