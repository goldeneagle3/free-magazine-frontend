import { axiosPublic } from "../../axios/publicAxios";
import { apiSlice } from "../api/apiSlice";

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({ url: "/administration/categories", method: "get" }),
      transformResponse: async (responseData) => {
        const categories = await Promise.all(
          responseData?.map(async (category) => {
            await axiosPublic
              .get("/posts/countsByCategory/" + category?.name)
              .then((resp) => (category.postCounts = resp?.data))
              .catch((err) => console.log(err));
            return category;
          })
        );
        return categories;
      },
      transformErrorResponse: (resp) => {
        return resp.error;
      },
      providesTags: [{ type: "Category", id: "LIST" }],
    }),
    addCategory: builder.mutation({
      query: (reqBody) => ({
        url: "/administration/categories",
        method: "post",
        body: reqBody,
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
    updateCategory: builder.mutation({
      query: (args) => ({
        url: `/administration/categories/${args.categoryId}`,
        method: "put",
        body: args.name,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/administration/categories/deleteCategory/${id}`,
        method: "put",
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApiSlice;
