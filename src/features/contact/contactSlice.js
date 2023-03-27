import { apiSlice } from "../api/apiSlice";

export const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (reqBody) => ({
        url: "/contact",
        method: "post",
        body: reqBody,
      }),
      invalidatesTags: [{ type: "Content", id: "LIST" }],
    }),
    getMessages: builder.query({
      query: () => ({
        url: "/administration/contact",
        method: "get",
      }),
      providesTags: [{ type: "Content", id: "LIST" }],
    }),
    getSingleMessage: builder.query({
      query: (messageId) => ({
        url: "/administration/contact/" + messageId,
        method: "get",
      }),
      providesTags: [{ type: "Content", id: "LIST" }],
    }),
    makeReadMessage: builder.mutation({
      query: (messageId) => ({
        url: "/administration/contact/read/" + messageId,
        method: "put",
      }),
      invalidatesTags: [{ type: "Content", id: "LIST" }],
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetMessagesQuery,
  useGetSingleMessageQuery,
  useMakeReadMessageMutation,
} = contactApiSlice;
