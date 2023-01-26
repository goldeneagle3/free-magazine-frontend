import React from "react";
import AddCategoryComp from "../components/categories/AddCategoryComp";
import CategoryListComp from "../components/categories/CategoryListComp";
import MainLoadingComp from "../components/loading/MainLoadingComp";
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
    </MainLayout>
  );
};

export default CategoryPage;
