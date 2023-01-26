import React from "react";

import PostsList from "../features/posts/PostsList";
import MainLayout from "../layouts/MainLayout";
import "../styles/sass/main.scss";

const Home = () => {
  return (
    <MainLayout>
      <PostsList />
    </MainLayout>
  );
};

export default Home;
