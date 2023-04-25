import React from 'react'
import { useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import PostsBySubCategory from '../features/sub-categories/PostsBySubCategory';

const PostsBySubCategoryPage = () => {
  const { subCategoryId } = useParams();
  return (
    <MainLayout>
      <PostsBySubCategory subCategory={subCategoryId} />
    </MainLayout>
  );
}

export default PostsBySubCategoryPage