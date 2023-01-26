import React from "react";
import * as _ from "lodash";

import { InputLabel, TextField } from "@mui/material";

export default function FormField({
  fieldName,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  type = "text",
  placeholder,
  fullwidth = false,
}) {
  return (
    <React.Fragment>
      <InputLabel
        sx={{ fontWeight: 600, fontSize: 12, marginTop: 1, color: "#000000" }}
        htmlFor={fieldName}
      >
        {_.startCase(fieldName)}
      </InputLabel>
      <TextField
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        helperText={error ? helperText : ""}
        type={type}
        name={fieldName}
        id={fieldName}
        fullWidth={fullwidth}
        size="small"
        placeholder={placeholder ? placeholder : ""}
        sx={{ borderColor: "red" }}
      />
    </React.Fragment>
  );
}
