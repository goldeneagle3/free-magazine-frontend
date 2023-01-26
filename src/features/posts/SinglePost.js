import React from "react";

import MainLoadingComp from "../../components/loading/MainLoadingComp";
import SinglePostComp from "../../components/post-single/SinglePostComp";
import { useGetCommentsQuery } from "../comments/commentsSlice";
import { useGetPostByIdQuery } from "./postSlice";

const SinglePost = ({ postId }) => {
  const {
    data: post,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostByIdQuery(postId);

  const { data: comments, isLoading: cmntIsLoading } =
    useGetCommentsQuery(postId);

  let content;
  if (isLoading) {
    content = <MainLoadingComp isLoading={isLoading || cmntIsLoading} />;
  } else if (isSuccess) {
    content = <SinglePostComp post={post} comments={comments} />;
  } else if (isError) {
    content = <p>{error?.data?.message}</p>;
  }

  return content;
};

export default SinglePost;
