import React from "react";
import { useTheme, useMediaQuery } from "@mui/material";

import MainLoadingComp from "../../components/loading/MainLoadingComp";
import PostCard from "../../components/post-card/PostCard";
import ExPostCard from "../../external_components/posts/ExPostCard";
import { useGetPostsByCategoryQuery } from "./postSlice";
import NoPostInList from "../../components/error/NoPostInList";
import ResourceNotFound from "../../components/error/ResourceNotFound";

const PostsByCategory = ({ category }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const { data, isLoading, isSuccess, isError, error } =
    useGetPostsByCategoryQuery(category);

  let content;
  if (isLoading) {
    content = <MainLoadingComp isLoading={isLoading} />;
  } else if (isError) {
    content = <ResourceNotFound isError={isError} error={error} />;
  } else if (isSuccess) {
    if (matches) {
      if (data?.length === 0) {
        content = <NoPostInList />;
      } else {
        content = data.map((post) => <ExPostCard key={post.id} post={post} />);
      }
    } else {
      if (data?.length < 1) {
        content = <NoPostInList />;
      } else {
        content = data.map((post) => <PostCard key={post.id} post={post} />);
      }
    }
  }

  return <>{content}</>;
};

export default PostsByCategory;
