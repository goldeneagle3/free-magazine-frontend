import React from "react";
import { useParams } from "react-router-dom";
import PostsByCategory from "../features/posts/PostsByCategory";
import MainLayout from "../layouts/MainLayout";

const PostsByCategoryPage = () => {
  const { categoryName } = useParams();
  return (
    <MainLayout>
      <PostsByCategory category={categoryName} />
    </MainLayout>
  );
};

export default PostsByCategoryPage;
