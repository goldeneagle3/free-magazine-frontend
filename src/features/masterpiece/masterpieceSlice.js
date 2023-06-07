import { apiSlice } from "../api/apiSlice";

export const masterpieceSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMusic: builder.mutation({
      query: (reqBody) => ({
        url: "/musics",
        method: "post",
        body: reqBody,
        headers: {
          Accept: "application/json",
        },
      }),
      invalidatesTags: [{ type: "Masterpiece", id: "LIST" }],
    }),
    createPicture: builder.mutation({
      query: (reqBody) => ({
        url: "/pictures",
        method: "post",
        body: reqBody,
        headers: {
          Accept: "application/json",
        },
      }),
      invalidatesTags: [{ type: "Masterpiece", id: "LIST" }],
    }),
    getTopMusicOfTheWeek: builder.query({
      query: () => ({
        url: "/musics/getTopOfTheWeek",
        method: "get",
      }),
      providesTags: [{ type: "Masterpiece", id: "LIST" }],
    }),
    getTopPictureOfTheWeek: builder.query({
      query: () => ({
        url: "/pictures/getTopOfTheWeek",
        method: "get",
      }),
      providesTags: [{ type: "Masterpiece", id: "LIST" }],
    }),
    getMusicById: builder.query({
      query: (id) => ({
        url: "/musics/getMasterpieceById/" + id,
        method: "get",
      }),
      providesTags: [{ type: "Masterpiece", id: "LIST" }],
    }),
    getPictureById: builder.query({
      query: (id) => ({
        url: "/pictures/getMasterpieceById/" + id,
        method: "get",
      }),
      providesTags: [{ type: "Masterpiece", id: "LIST" }],
    }),
    updateMusicById: builder.mutation({
      query: (reqBody) => ({
        url: "/musics/updateMasterpieceById/" + reqBody.id,
        method: "put",
        body: reqBody.body,
      }),
      invalidatesTags: [{ type: "Masterpiece", id: "LIST" }],
    }),
    updatePictureById: builder.mutation({
      query: (reqBody) => ({
        url: "/pictures/updateMasterpieceById/" + reqBody.id,
        method: "put",
        body: reqBody.body,
      }),
      invalidatesTags: [{ type: "Masterpiece", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateMusicMutation,
  useCreatePictureMutation,
  useGetTopMusicOfTheWeekQuery,
  useGetTopPictureOfTheWeekQuery,
  useGetMusicByIdQuery,
  useGetPictureByIdQuery,
  useUpdateMusicByIdMutation,
  useUpdatePictureByIdMutation,
} = masterpieceSlice;
