import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import SinglePost from "../features/posts/SinglePost";

const PostByID = () => {
  const { postId } = useParams();
  return (
    <MainLayout>
      <SinglePost postId={postId} />
    </MainLayout>
  );
};

export default PostByID;
