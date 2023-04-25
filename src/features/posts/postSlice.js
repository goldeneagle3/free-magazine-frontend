// import axios from "axios";
import { axiosPublic } from "../../axios/publicAxios";
import { apiSlice } from "../api/apiSlice";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({ url: "/posts", method: "get" }),
      transformResponse: async (responseData) => {
        const posts = await Promise.all(
          responseData?.map(async (p) => {
            await axiosPublic
              .get("/likes/likedUsersByPost/" + p?.id)
              .then((resp) => (p.likes = resp?.data))
              .catch((err) => console.log(err));
            return p;
          })
        );
        return posts;
      },
      providesTags: [{ type: "Post", id: "LIST" }],
    }),
    getFirstFivePosts: builder.query({
      query: () => ({
        url: "/posts/firstFivePosts",
        method: "get",
      }),
      providesTags: [{ type: "Post", id: "LIST" }],
    }),
    getFourPostsForTop: builder.query({
      query: () => ({
        url: "/posts/fourPostsForTop",
        method: "get",
      }),
      providesTags: [{ type: "Post", id: "LIST" }],
    }),
    getMainPagePosts: builder.query({
      query: () => ({
        url: "/posts/mainPagePosts",
        method: "get",
      }),
      transformResponse: async (responseData) => {
        const posts = await Promise.all(
          responseData?.map(async (p) => {
            await axiosPublic
              .get("/likes/likedUsersByPost/" + p?.id)
              .then((resp) => (p.likes = resp?.data))
              .catch((err) => console.log(err));
            return p;
          })
        );
        return posts;
      },
      providesTags: [{ type: "Post", id: "LIST" }],
    }),
    getPostById: builder.query({
      query: (id) => ({ url: `/posts/getSinglePostBy/${id}`, method: "get" }),
      transformResponse: async (responseData) => {
        await axiosPublic
          .get("/likes/likedUsersByPost/" + responseData?.id)
          .then((resp) => (responseData.likes = resp?.data))
          .catch((err) => console.log(err));
        return responseData;
      },
      transformErrorResponse: (responseData) => {
        return responseData.error;
      },
      providesTags: [
        {
          type: "Post",
          id: "LIST",
        },
      ],
    }),
    getThreeRandomPosts: builder.query({
      query: () => ({ url: "/posts/randomThree", method: "get" }),
      transformResponse: async (responseData) => {
        const posts = await Promise.all(
          responseData?.map(async (p) => {
            await axiosPublic
              .get("/likes/likedUsersByPost/" + p?.id)
              .then((resp) => (p.likes = resp?.data?.length))
              .catch((err) => console.log(err));
            return p;
          })
        );
        return posts;
      },
    }),
    getPostsByCategory: builder.query({
      query: (categoryName) => ({
        url: `/posts/getPostByCategory/${categoryName.toString()}`,
        method: "get",
      }),
      transformResponse: async (responseData) => {
        const posts = await Promise.all(
          responseData?.map(async (p) => {
            await axiosPublic
              .get("/likes/likedUsersByPost/" + p?.id)
              .then((resp) => (p.likes = resp?.data))
              .catch((err) => console.log(err));
            return p;
          })
        );
        return posts;
      },
      providesTags: [
        {
          type: "Post",
          id: "LIST",
        },
      ],
    }),
    getPostsBySubCategory: builder.query({
      query: (subCategory) => ({
        url: `/posts/getPostBySubCategory/${subCategory.toString()}`,
        method: "get",
      }),
      transformResponse: async (responseData) => {
        const posts = await Promise.all(
          responseData?.map(async (p) => {
            await axiosPublic
              .get("/likes/likedUsersByPost/" + p?.id)
              .then((resp) => (p.likes = resp?.data))
              .catch((err) => console.log(err));
            return p;
          })
        );
        return posts;
      },
      providesTags: [
        {
          type: "Post",
          id: "LIST",
        },
      ],
    }),
    getPostsByAuthor: builder.query({
      query: (username) => ({
        url: `/posts/getPostsByAuthor/${username}`,
        method: "get",
      }),
      transformResponse: async (responseData) => {
        const posts = await Promise.all(
          responseData?.map(async (p) => {
            await axiosPublic
              .get("/likes/likedUsersByPost/" + p?.id)
              .then((resp) => (p.likes = resp?.data))
              .catch((err) => console.log(err));
            return p;
          })
        );
        return posts;
      },
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),
    getDeactivatedPosts: builder.query({
      query: () => ({
        url: `/posts/getDeactivatedPosts`,
        method: "get",
      }),
      providesTags: [{ type: "Post", id: "LIST" }],
    }),
    addPost: builder.mutation({
      query: (reqBody) => ({
        url: "/posts",
        method: "post",
        body: reqBody,
        headers: {
          Accept: "application/json",
        },
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    updatePost: builder.mutation({
      query: (req) => ({
        url: "/posts/updatePost/" + req.postId,
        method: "put",
        body: req.reqBody,
        headers: {
          Accept: "application/json",
        },
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    deactivatePost: builder.mutation({
      query: (postId) => ({
        url: "/posts/deactivatePost/" + postId,
        method: "put",
      }),
      invalidatesTags: ["Post"],
    }),
    activatePost: builder.mutation({
      query: (postId) => ({
        url: "/posts/activatePost/" + postId,
        method: "put",
      }),
      invalidatesTags: ["Post"],
    }),
    likePost: builder.mutation({
      query: (reqBody) => ({
        url: "/likes",
        method: "put",
        body: { postId: reqBody.postId },
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    // Editor
    addPostForEditor: builder.mutation({
      query: (reqBody) => ({
        url: "/posts/editor/createPost",
        method: "post",
        body: reqBody,
        headers: {
          Accept: "application/json",
        },
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    updatePostForEditor: builder.mutation({
      query: (req) => ({
        url: "/posts/editor/updatePost/" + req.postId,
        method: "put",
        body: req.reqBody,
        headers: {
          Accept: "application/json",
        },
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetFirstFivePostsQuery,
  useGetFourPostsForTopQuery,
  useGetMainPagePostsQuery,
  useGetPostByIdQuery,
  useGetThreeRandomPostsQuery,
  useGetPostsByCategoryQuery,
  useGetPostsBySubCategoryQuery,
  useGetPostsByAuthorQuery,
  useGetDeactivatedPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeactivatePostMutation,
  useActivatePostMutation,
  useLikePostMutation,
  useAddPostForEditorMutation,
  useUpdatePostForEditorMutation,
} = postsApiSlice;
