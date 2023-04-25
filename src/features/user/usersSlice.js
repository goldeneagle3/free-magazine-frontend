import { apiSlice } from "../api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({ url: "/authors/getAllUsers", method: "get" }),
      providesTags: [{ type: "User", id: "LIST" }],
    }),
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
      providesTags: [{ type: "User", id: "LIST" }],
    }),
    getAuthorBy: builder.query({
      query: (username) => ({
        url: `/authors/getUserByUsername/${username}`,
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
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    unMakeAuthor: builder.mutation({
      query: (userId) => ({
        url: "/authors/unMakeAuthor/" + userId,
        method: "put",
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    makeEditor: builder.mutation({
      query: (userId) => ({
        url: "/authors/makeEditor/" + userId,
        method: "put",
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    unMakeEditor: builder.mutation({
      query: (userId) => ({
        url: "/authors/unMakeEditor/" + userId,
        method: "put",
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUsersQuery,
  useGetAuthorsQuery,
  useGetAuhorsForCardQuery,
  useGetAuthorByQuery,
  useUpdateUserMutation,
  useMakeAuthorMutation,
  useUnMakeAuthorMutation,
  useMakeEditorMutation,
  useUnMakeEditorMutation,
} = usersApiSlice;
