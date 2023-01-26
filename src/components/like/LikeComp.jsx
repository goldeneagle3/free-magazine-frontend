import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectCurrentUsername } from "../../features/auth/authSlice";
import { useLikePostMutation } from "../../features/posts/postSlice";
import SnackbarMUI from "../snackbar/SnackbarMUI";

const LikeComp = ({ postId, likes }) => {
  const user = useSelector(selectCurrentUsername);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [counts, setCounts] = useState(likes?.length);
  const [like, setLike] = useState(
    likes?.find((u) => u === user) ? true : false
  );

  const [likePost, { isLoading }] = useLikePostMutation();

  const submitLikeFn = async (e) => {
    try {
      const reqBody = {
        postId: postId && postId,
      };

      const response = await likePost(reqBody);
      if (!response?.error) {
        if (like) {
          setLike((perv) => !perv);
          setCounts((c) => c - 1);
        } else {
          setLike((perv) => !perv);
          setCounts((c) => c + 1);
        }
      } else {
        setText(response?.error?.data?.clientMessage);
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <IconButton
        sx={{ width: 30, height: 30 }}
        onClick={submitLikeFn}
        disabled={isLoading}
      >
        {like ? <AiFillLike /> : <AiOutlineLike />}
      </IconButton>
      <Typography sx={{ fontSize: 13 }}>{counts}</Typography>
      <SnackbarMUI open={open} setOpen={setOpen} text={text} />
    </Box>
  );
};

export default LikeComp;
