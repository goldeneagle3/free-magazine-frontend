import React from "react";
import { Divider } from "@mui/material";

import AddCategoryComp from "../components/categories/AddCategoryComp";
import CategoryListComp from "../components/categories/CategoryListComp";
import ResourceNotFound from "../components/error/ResourceNotFound";
import MainLoadingComp from "../components/loading/MainLoadingComp";
import AddSubCategoryComp from "../components/subCategories/AddSubCategoryComp";
import SubCategoryListComp from "../components/subCategories/SubCategoryListComp";
import { useGetCategoriesQuery } from "../features/categories/categorySlice";
import FormLayout from "../layouts/FormLayout";
import MainLayout from "../layouts/MainLayout";

const CategoryPage = () => {
  const { data, isLoading, isError, error } = useGetCategoriesQuery();
  return (
    <MainLayout>
      {isLoading && <MainLoadingComp isLoading={isLoading} />}
      <CategoryListComp categories={data} isError={isError} error={error} />
      <FormLayout text="Yeni bir kategori ekle">
        <AddCategoryComp />
      </FormLayout>
      <Divider
        sx={{ my: 5, bgcolor: "black", color: "black", width: "100%" }}
      />
      <SubCategoryListComp categories={data} />
      <FormLayout text="Yeni bir alt kategori ekle">
        {isError ? (
          <ResourceNotFound isError={isError} error={error} />
        ) : (
          <AddSubCategoryComp categories={data} />
        )}
      </FormLayout>
    </MainLayout>
  );
};

export default CategoryPage;
