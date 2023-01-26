import { apiSlice } from "../api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({ url: "/authors/getUsers", method: "get" }),
      providesTags: [{ type: "User", id: "LIST" }],
    }),
    getAuthors: builder.query({
      query: () => ({ url: "/authors/getAuthors", method: "get" }),
      providesTags: [{ type: "User", id: "LIST" }],
    }),
    getAuhorsForCard: builder.query({
      query: () => ({
        url: "/authors/getAuthorsForCard",
        method: "get",
      }),
      providesTags: [{ type: "Post", id: "List" }],
    }),
    getAuthorBy: builder.query({
      query: (username) => ({
        url: `/authors/getUserById/${username}`,
        method: "get",
      }),
      providesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: (reqBody) => ({
        url: `/authors/updateAuthor/${reqBody.userId}`,
        method: "put",
        body: reqBody.updateUser,
        headers: {
          Accept: "application/json",
        },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    makeAuthor: builder.mutation({
      query: (userId) => ({
        url: "/authors/makeAuthor/" + userId,
        method: "put",
      }),
      invalidatesTags: [{ type: "USER", id: "LIST" }],
    }),
    makeEditor: builder.mutation({
      query: (userId) => ({
        url: "/authors/makeEditor/" + userId,
        method: "put",
      }),
      invalidatesTags: [{ type: "USER", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetAuthorsQuery,
  useGetAuhorsForCardQuery,
  useGetAuthorByQuery,
  useUpdateUserMutation,
  useMakeAuthorMutation,
  useMakeEditorMutation,
} = usersApiSlice;
