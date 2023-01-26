import { Divider, Grid, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import ExPostCard from "../../external_components/posts/ExPostCard";
import PostCard from "../post-card/PostCard";
// import PostCard from "../post-card/PostCard";

const PostList = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

  return [1, 2, 3, 4, 5, 6, 7, 8].map((p) => {
    if (matches) {
      return (
        <Grid xs={12} md={12} key={p} sx={{ alignItems: "center", p: 1 }} item>
          {console.log(p)}
          <ExPostCard item={p} />
        </Grid>
      );
    } else {
      return (
        <Grid xs={12} md={12} key={p} sx={{ alignItems: "center", p: 1 }} item>
          {console.log(p)}
          <PostCard item={p} />
          <Divider/>
        </Grid>
      );
    }
  });
  
};

export default PostList;
