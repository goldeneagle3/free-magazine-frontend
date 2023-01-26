import React from "react";
import { Stack } from "@mui/material";

import "./../../styles/sass/main.scss";

const ResourceNotFound = ({ isError, error }) => {
  console.log(error)
  return isError ? (
    <Stack spacing={1}>
      <p className="error-text"> Veri(ler) bulunamadı. </p>
      <p className="error-text">
        Büyük ihtimalle serverlerimizde bir sorun var.
      </p>
      <p className="error-text">
        {error?.error
          ? error.error
          : error?.data
          ? typeof error.data === "string" ? error.data : error?.data?.message
          : error?.message 
          ? error.message
          : typeof error === "string"
          ? error
          : ""}
      </p>
    </Stack>
  ) : null;
};

export default ResourceNotFound;
