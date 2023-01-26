import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import moment from "moment/moment";
import 'moment/locale/tr' 

import "./../../styles/sass/main.scss";
import { useSelector } from "react-redux";
import { selectCurrentUsername } from "../../features/auth/authSlice";
import { useLikePostMutation } from "../../features/posts/postSlice";
import SnackbarMUI from "../snackbar/SnackbarMUI";

const PostFooter = ({ postId, likes, comments,createDateTime }) => {
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
        postId: postId,
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

  const alignItems = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
  };

  return (
    <Box sx={{ ...alignItems, p: 1 }}>
      <Box sx={{ gap: 3, ...alignItems }}>
        <Box sx={{ ...alignItems, columnGap: 1, justifyContent: "center" }}>
          <IconButton
            sx={{ width: 30, height: 30 }}
            onClick={submitLikeFn}
            disabled={isLoading}
          >
            {like ? <AiFillLike /> : <AiOutlineLike />}
          </IconButton>
          <Typography sx={{ fontSize: 13 }}>{counts}</Typography>
        </Box>
        <Box sx={{ gap: 1, ...alignItems }}>
          <IconButton sx={{ width: 30, height: 30 }}>
            <FaRegComment />
          </IconButton>
          <Typography sx={{ fontSize: 13 }}>{comments}</Typography>
        </Box>
      </Box>
      <Box sx={{ mr: 2 }}>
        <p className="stats-text">{moment(createDateTime).fromNow()}</p>
      </Box>
      <SnackbarMUI open={open} setOpen={setOpen} text={text} />
    </Box>
  );
};

export default PostFooter;
