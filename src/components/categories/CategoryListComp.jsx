import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDeleteCategoryMutation } from "../../features/categories/categorySlice";

import EditCategoryComp from "./EditCategoryComp";

const CategoryListComp = ({ categories, isError, error }) => {
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();

  return (
    <List sx={{ mt: 3, width: "100%", maxWidth: 500, bgcolor: "transparent" }}>
      {categories?.map((u) => (
        <ListItem
          key={u.id}
          secondaryAction={
            <Stack direction="row" spacing={3}>
              <EditCategoryComp category={u} />
              <IconButton
                disabled={isLoading}
                onClick={() => deleteCategory(u?.id)}
              >
                <MdOutlineDeleteOutline />
              </IconButton>
            </Stack>
          }
        >
          <ListItemText
            primary={<Typography variant="h5">{u.name} </Typography>}
          />
        </ListItem>
      ))}
      {isError && (
        <Typography variant="h5" color="red">
          {error?.data?.message}
        </Typography>
      )}
    </List>
  );
};

export default CategoryListComp;
