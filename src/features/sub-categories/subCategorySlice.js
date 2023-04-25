import { apiSlice } from "../api/apiSlice";

export const subCategorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubCategoriesByCategory: builder.query({
      query: (category) => ({
        url: `/administration/subCategories/byCategoryName/${category}`,
        method: "get",
      }),
      providesTags: [{ type: "SubCategory", id: "LIST" }],
    }),
    getActiveSubCategoriesByCategory: builder.query({
      query: (category) => ({
        url: `/administration/subCategories/byCategoryName/activeSubCategories/${category}`,
        method: "get",
      }),
      providesTags: [{ type: "SubCategory", id: "LIST" }],
    }),
    createSubCategory: builder.mutation({
      query: (reqBody) => ({
        url: "/administration/subCategories",
        method: "post",
        body: { name: reqBody.name, categoryName: reqBody.categoryName },
      }),
      invalidatesTags: [{ type: "SubCategory", id: "LIST" }],
    }),
    updateSubCategory: builder.mutation({
      query: (reqBody) => ({
        url: `/administration/subCategories/updateSubCategory/${reqBody.subCategoryId}`,
        method: "put",
        body: { name: reqBody.name, categoryName: reqBody.category },
      }),
      invalidatesTags: [{ type: "SubCategory", id: "LIST" }],
    }),
    activateSubCategory: builder.mutation({
      query: (subCategoryId) => ({
        url: `/administration/subCategories/activateSubCategory/${subCategoryId}`,
        method: "put",
      }),
      invalidatesTags: [{ type: "SubCategory", id: "LIST" }],
    }),
    deActivateSubCategory: builder.mutation({
      query: (subCategoryId) => ({
        url: `/administration/subCategories/deactivateSubCategory/${subCategoryId}`,
        method: "put",
      }),
      invalidatesTags: [{ type: "SubCategory", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateSubCategoryMutation,
  useGetSubCategoriesByCategoryQuery,
  useGetActiveSubCategoriesByCategoryQuery,
  useLazyGetSubCategoriesByCategoryQuery,
  useUpdateSubCategoryMutation,
  useActivateSubCategoryMutation,
  useDeActivateSubCategoryMutation,
} = subCategorySlice;
