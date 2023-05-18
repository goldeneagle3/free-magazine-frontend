import React from "react";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import { MdOutlineDeleteOutline } from "react-icons/md";
import moment from "moment/moment";
import "moment/locale/tr";

import { useDeleteCommentMutation } from "../../features/comments/commentsSlice";
import { useSelector } from "react-redux";
import { selectCurrentUsername } from "../../features/auth/authSlice";
import LikeCommentComp from "../like/LikeCommentComp";
import EditComment from "./EditComment";
import { BASE_URL, photosApiUrl } from "../../config/urls";

const SingleComment = ({ comment }) => {
  moment.locale("tr");
  const imageUrl =
    comment?.userImage && `${BASE_URL}${photosApiUrl}/${comment?.userImage}`;
  const alignItems = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  };

  const username = useSelector(selectCurrentUsername);
  const [deleteCmnt, { isLoading }] = useDeleteCommentMutation();

  const deleteComment = async (e) => {
    try {
      await deleteCmnt(comment?.commentId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack spacing={2} sx={{ pb: 4 }}>
      {/* Top */}
      <Box
        sx={{
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 2,
        }}
      >
        <Avatar
          src={imageUrl}
          sx={{ width: { xs: 35, md: 56 }, height: { xs: 35, md: 56 } }}
        />
        <Stack sx={{ textAlign: "left", alignItems: "flex-start" }}>
          <h6 className="heading-tertiary">{comment?.username}</h6>
          <p className="stats-text">
            {moment(comment?.createDateTime).fromNow()}
          </p>
        </Stack>
      </Box>
      {/* Content */}
      <p className="paragraph--min u-margin-left-medium u-margin-right-small ">
        {comment?.content}
      </p>
      {/* Edited */}
      {moment(comment?.createDateTime).calendar() !==
      moment(comment?.updateDateTime).calendar() ? (
        <Typography align="right" sx={{ fontStyle: "italic", pr: 5 }}>
          {moment(comment?.updateDateTime).fromNow() + " değiştirildi."}
        </Typography>
      ) : (
        ""
      )}
      {/* Footer */}
      <Box
        sx={{
          pt: 1,
          display: "flex",
          textAlign: "center",
          justifyContent:
            username === comment?.username ? "space-between" : "flex-start",
          alignItems: "center",
        }}
      >
        <Box className="u-margin-left-medium">
          <LikeCommentComp
            commentId={comment?.commentId}
            likes={comment?.likes}
          />
        </Box>
        {username === comment?.username && (
          <Box className="u-margin-right-medium" sx={{ gap: 1, ...alignItems }}>
            <EditComment comment={comment} />
            <IconButton disabled={isLoading} onClick={deleteComment}>
              <MdOutlineDeleteOutline />
            </IconButton>
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default SingleComment;
