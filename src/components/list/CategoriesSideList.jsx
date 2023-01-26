import React from "react";
import { Divider } from "@mui/material";

import CustomListItem from "./CustomListItem";

const CategoriesSideList = ({ category }) => {
  return (
    <>
      <CustomListItem item={category} />
      <Divider />
    </>
  );
};

export default CategoriesSideList;
