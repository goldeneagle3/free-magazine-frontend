import React, { useState } from "react";
import FormPageLayout from "../layouts/FormPageLayout";
import { MenuItem, TextField } from "@mui/material";
import NewMasterpieceComp from "../components/masterpiece/NewMasterpieceComp";

const NewMasterpiece = () => {
  const genres = ["music", "picture"];

  const [genre, setGenre] = useState("");

  const handleChange = (e) => setGenre(e.target.value);

  return (
    <FormPageLayout>
      <TextField
        id="genre"
        required
        select
        fullWidth
        label="Select Genre"
        value={genre}
        onChange={handleChange}
        sx={{
          m: 2,
          maxWidth: 300,
        }}
        helperText="Please select genre"
        variant="standard"
      >
        {genres.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <NewMasterpieceComp genre={genre} />
    </FormPageLayout>
  );
};

export default NewMasterpiece;
