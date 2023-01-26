import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import { BASE_URL, photosApiUrl } from "../../config/urls";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const SidePost = ({ post }) => {
  const imageUrl = `${BASE_URL}${photosApiUrl}/${post?.imageId}`;

  const alignItems = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
  };

  const stateBoxLayout = {
    ...alignItems,
    gap: 3,
  };

  const stateBox = {
    ...alignItems,
    gap: 1,
    fontSize: "1.4rem",
  };
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
        {post?.imageMimType && (
          <Box item>
            <Link to={"/posts/" + post?.id}>
              <Img
                alt="complex"
                src={imageUrl}
                sx={{ maxHeight: "23rem", width: "100%", height: "100%" }}
              />
            </Link>
          </Box>
        )}
        {/* <Divider sx={{ color: "red" }} /> */}
        <Box sx={{ p: 0.5 }}>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="h5" component="div">
                {post?.title}
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
          <Box sx={{ ...alignItems, mt: 4 }}>
            <Box sx={stateBoxLayout}>
              <Box sx={stateBox}>
                <AiOutlineLike />
                <Typography>{post?.likes}</Typography>
              </Box>
              <Box sx={stateBox}>
                <AiOutlineComment />
                <Typography>{post?.comments}</Typography>
              </Box>
            </Box>
            <Link to={`/posts/${post?.id}`}>
              <Typography sx={{ cursor: "pointer" }} variant="body1">
                {moment(post.createDateTime).fromNow()}
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
      <Divider />
    </Paper>
  );
};

export default SidePost;
