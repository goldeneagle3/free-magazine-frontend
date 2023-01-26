import { axiosPublic } from "../../axios/publicAxios";
import { apiSlice } from "../api/apiSlice";

export const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (postId) => ({ url: `/comments/byPost/${postId}`, method: "get" }),
      transformResponse: async (responseData) => {
        const comments = await Promise.all(
          responseData?.map(async (comment) => {
            await axiosPublic
              .get("/likes/likedUsersByComment/" + comment?.commentId)
              .then((resp) => (comment.likes = resp?.data))
              .catch((err) => console.log(err));
            return comment;
          })
        );
        return comments;
      },
      providesTags: [{ type: "Comment", id: "LIST" }],
    }),
    addComment: builder.mutation({
      query: (comment) => ({
        url: "/comments",
        method: "post",
        body: { content: comment.comment, postId: comment.postId },
      }),
      invalidatesTags: [{ type: "Comment", id: "LIST" }],
    }),
    updateComment: builder.mutation({
      query: (reqBody) => ({
        url: `/comments/updateComment/${reqBody.commentId}`,
        method: "put",
        body: { content: reqBody.content },
      }),
      invalidatesTags: [{ type: "Comment", id: "LIST" }],
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/comments/${commentId}`,
        method: "delete",
      }),
      invalidatesTags: [{ type: "Comment", id: "LIST" }],
    }),
    likeComment: builder.mutation({
      query: (reqBody) => ({
        url: "/likes",
        method: "put",
        body: { commentId: reqBody.commentId },
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
} = commentsApiSlice;
