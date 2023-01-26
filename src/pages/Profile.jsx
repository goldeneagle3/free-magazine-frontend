import { useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import ResourceNotFound from "../components/error/ResourceNotFound";
import MainLoadingComp from "../components/loading/MainLoadingComp";
import PostCard from "../components/post-card/PostCard";
import ProfileBox from "../components/profile/ProfileBox";
import ExPostCard from "../external_components/posts/ExPostCard";
import { useGetPostsByAuthorQuery } from "../features/posts/postSlice";
import { useGetAuthorByQuery } from "../features/user/usersSlice";
import ProfileLayout from "../layouts/ProfileLayout";

const Profile = () => {
  const { username } = useParams();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const { data, isLoading, isError, error } = useGetAuthorByQuery(username);
  const { data: posts, isLoading: postLoading } =
    useGetPostsByAuthorQuery(username);

  return isError ? (
    <ProfileLayout>
      <ResourceNotFound isError={isError} error={error} />
    </ProfileLayout>
  ) : (
    <ProfileLayout>
      {isLoading ? (
        <MainLoadingComp isLoading={isLoading} />
      ) : (
        <ProfileBox user={data} />
      )}
      {postLoading ? (
        <MainLoadingComp isLoading={postLoading} />
      ) : matches ? (
        posts?.map((post) => <ExPostCard key={post.id} post={post} />)
      ) : (
        posts?.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </ProfileLayout>
  );
};

export default Profile;
