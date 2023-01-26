import React from "react";
import SingleComment from "./SingleComment";

const CommentsList = ({ comments }) => {
  return comments?.map((c) => <SingleComment key={c?.id} comment={c} />);
};

export default CommentsList;
