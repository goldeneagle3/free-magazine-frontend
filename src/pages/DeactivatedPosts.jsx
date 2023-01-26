import React from "react";
import ResourceNotFound from "../components/error/ResourceNotFound";
import MainLoadingComp from "../components/loading/MainLoadingComp";
import DeactivatedPostsComp from "../components/post-list/DeactivatedPostsComp";
import { useGetDeactivatedPostsQuery } from "../features/posts/postSlice";
import MainLayout from "../layouts/MainLayout";

const DeactivatedPosts = () => {
  const { data, isLoading, isError, error } = useGetDeactivatedPostsQuery();

  return (
    <MainLayout>
      {isLoading && <MainLoadingComp isLoading={isLoading} />}
      {isError && <ResourceNotFound isError={isError} error={error} />}
      <DeactivatedPostsComp posts={data} />
    </MainLayout>
  );
};

export default DeactivatedPosts;
