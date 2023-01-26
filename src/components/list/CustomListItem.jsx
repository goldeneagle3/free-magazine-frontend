import React from "react";
import { Box } from "@mui/material";

import "./../../styles/sass/main.scss";
import { Link } from "react-router-dom";

const CustomListItem = ({ item }) => {
  return (
    <Link to={"/posts/category/" + item?.name}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 1.5,
          mb: 0.1,
        }}
      >
        <h3 className="side-list-text">{item?.name?.toUpperCase()}</h3>
        <h3 className="side-list-text">({item?.postCounts})</h3>
      </Box>
    </Link>
  );
};

export default CustomListItem;
