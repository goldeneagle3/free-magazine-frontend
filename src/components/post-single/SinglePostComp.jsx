import React from "react";
import {
  Avatar,
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import PostFooter from "./PostFooter";
import AddComment from "../comment/AddComment";
import CommentsList from "../comment/CommentsList";
import { selectCurrentUsername } from "../../features/auth/authSlice";
import { useDeactivatePostMutation } from "../../features/posts/postSlice";
import { parseHtmlText } from "../../utils/htmlParseConfig";

const SinglePostComp = ({ post, comments }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const username = useSelector(selectCurrentUsername);
  const [deletePost, { isLoading }] = useDeactivatePostMutation();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const resp = await deletePost(post?.id);

    if (!resp?.error) {
      navigate("/posts");
    }
  };

  return (
    <Stack spacing={4} sx={{ p: { xs: 0.5, md: 1.5 } }}>
      <h2 className="heading-secondary p-padding-top-medium">{post.title}</h2>

      <h4 className="heading-tertiary" style={{ textAlign: "left" }}>
        {post.subtitle}
      </h4>
      <p className="paragraph--parsed">{parseHtmlText(post.content)}</p>

      {/* Post Edit/Delete */}
      {username && post?.username === username && (
        <Stack direction="row" spacing={3} sx={{ justifyContent: "center" }}>
          <Button
            onClick={() => navigate("/posts/editPost/" + post?.id)}
            sx={{
              width: 125,
              backgroundColor: theme.palette.primary.main,
              color: "white",
              ":hover": {
                bgcolor: theme.palette.primary.contrastText,
              },
            }}
            variant="contained"
            startIcon={<AiOutlineEdit />}
          >
            Düzenle
          </Button>
          <Button
            disabled={isLoading}
            onClick={onSubmitHandler}
            sx={{
              width: 125,
              backgroundColor: theme.palette.secondary.main,
              color: "white",
              ":hover": {
                bgcolor: theme.palette.secondary.contrastText,
              },
            }}
            variant="contained"
            startIcon={<AiOutlineDelete />}
          >
            Sil
          </Button>
        </Stack>
      )}

      {/* Post Author */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "left",
          justifyContent: "flex-start",
          gap: 5,
        }}
      >
        <Avatar sx={{ width: 90, height: 90 }} />
        <Stack spacing={1}>
          <h4 className="heading-tertiary">{post?.username}</h4>
          <Typography variant="h6">{post?.category}</Typography>
        </Stack>
      </Box>

      <PostFooter
        postId={post?.id}
        likes={post?.likes}
        comments={post.comments}
        createDateTime={post?.createDateTime}
      />

      <AddComment postId={post?.id} />

      <CommentsList comments={comments} />
    </Stack>
  );
};

export default SinglePostComp;
