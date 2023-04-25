import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { BASE_URL, photosApiUrl } from "../../config/urls";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const SidePost = ({ post }) => {
  const imageUrl = post?.image && `${BASE_URL}${photosApiUrl}/${post?.image}`;

  return (
    <Paper
      sx={{
        margin: "auto",
        maxWidth: "100%",
        width: "100%",
        bgcolor: "transparent",
        mb: 5,
      }}
      elevation={0}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box item>
          <Link to={"/posts/" + post?.id}>
            <Img
              alt="complex"
              src={imageUrl}
              sx={{ maxHeight: "23rem", width: "100%", height: "100%" }}
            />
          </Link>
        </Box>
        {/* <Divider sx={{ color: "red" }} /> */}
        <Box sx={{ p: 0.5 }}>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography
                className="typography-util--paragraph--parsed"
                align="left"
                gutterBottom
                fontWeight={900}
                sx={{ fontSize: 13 }}
                component="div"
              >
                {post?.title?.length > 22 ? post.title?.substring(0,22) + "..." : post.title}
              </Typography>
              <Box
                sx={{
                  mt: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Link to={"/users/" + post?.username}>
                  <Typography variant="body1" color="black" fontWeight={900}>
                    {post?.username}
                  </Typography>
                  <Divider />
                  <Typography>Yazar</Typography>
                </Link>
                <Link to={`/posts/category/${post?.category}`}>
                  <Typography variant="body1" color="black" fontWeight={700}>
                    {post?.category}
                  </Typography>
                  <Divider />
                  <Typography>Kategori</Typography>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};

export default SidePost;
