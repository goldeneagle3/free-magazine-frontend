import {
  Autocomplete,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { TbRadioactive, TbRadioactiveOff } from "react-icons/tb";
import {
  useActivateSubCategoryMutation,
  useDeActivateSubCategoryMutation,
  useGetSubCategoriesByCategoryQuery,
} from "../../features/sub-categories/subCategorySlice";
import FormButton from "../button/FormButton";
import EditSubCategoryComp from "./EditSubCategoryComp";

const SubCategoryListComp = ({ categories }) => {
  const [skip, setSkip] = React.useState(true);
  const [value, setValue] = React.useState(
    categories?.length > 0 ? categories[categories?.length - 1].name : null
  );
  const [category, setCategory] = useState("");

  const { data } = useGetSubCategoriesByCategoryQuery(category, { skip });
  const [deleteSubCategory, { isLoading }] = useDeActivateSubCategoryMutation();
  const [activateSubCategory, { isLoading: isLoadingActivation }] =
    useActivateSubCategoryMutation();

  return (
    <>
      <Stack spacing={1} sx={{ alignItems: "center" }}>
        <Autocomplete
          disablePortal
          id="category"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={category}
          onInputChange={(event, newInputValue) => {
            setCategory(newInputValue);
          }}
          options={categories?.map((c) => c.name).sort()}
          sx={{ width: "100%" }}
          renderInput={(params) => (
            <TextField
              id="category"
              label="Kategori"
              placeholder="Kategori Seç"
              fullWidth
              {...params}
            />
          )}
        />
        <FormButton
          onClick={() => setSkip((prev) => !prev)}
          text="Alt Kategorileri Getir"
          color="#ccc"
          bgcolor="#033f67"
          width={200}
        />
      </Stack>
      <List
        sx={{ mt: 2, width: "100%", maxWidth: 500, bgcolor: "transparent" }}
      >
        {data?.length > 0 &&
          data?.map((u) => (
            <ListItem
              key={u.id}
              secondaryAction={
                <Stack direction="row" spacing={1}>
                  <EditSubCategoryComp
                    categories={categories}
                    currentCategory={category}
                    subCategory={u}
                  />
                  {u?.active ? (
                    <IconButton
                      disabled={isLoading}
                      onClick={() => deleteSubCategory(u?.id)}
                    >
                      <TbRadioactiveOff color="red" />
                    </IconButton>
                  ) : (
                    <IconButton
                      disabled={isLoadingActivation}
                      onClick={() => activateSubCategory(u?.id)}
                    >
                      <TbRadioactive color="green" />
                    </IconButton>
                  )}
                </Stack>
              }
            >
              <ListItemText
                primary={<Typography variant="h5">{u.name} </Typography>}
              />
            </ListItem>
          ))}
      </List>
    </>
  );
};

export default SubCategoryListComp;
