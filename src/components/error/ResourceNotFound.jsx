import React from "react";
import { Stack } from "@mui/material";

import "./../../styles/sass/main.scss";

const ResourceNotFound = ({ isError, error }) => {
  return isError ? (
    <Stack spacing={1}>
      <p className="error-text"> Veri(ler) bulunamadı. </p>
      <p className="error-text">
        {error?.error
          ? error.error
          : error?.data
          ? typeof error.data === "string"
            ? error.data
            : error?.data?.message
          : error?.message
          ? error.message
          : typeof error === "string"
          ? error
          : "Büyük ihtimalle serverlerimizde bir sorun var."}
      </p>
    </Stack>
  ) : null;
};

export default ResourceNotFound;
