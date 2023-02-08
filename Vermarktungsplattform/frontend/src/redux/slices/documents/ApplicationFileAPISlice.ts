import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SESSION_TOKEN_ID } from "../../../utils/AuthSessionHelper";

/**
 * Redux queries to return application documents
 */
export const FileAPISlice = createApi({
  reducerPath: "fileAPISlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_URL}/application/attachment`,
    prepareHeaders: (headers, { getState }) => {
      const token = sessionStorage.getItem(SESSION_TOKEN_ID);
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["ApplicationFiles"],
  endpoints: (builder) => ({
    //get all files linked with application
    getApplicationFiles: builder.query<any, number>({
      query: (id) => `/all/${id}`,
    }),
    //upload file to application
    uploadFile: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ApplicationFiles"],
    }),
    //delete file from application
    deleteFile: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ApplicationFiles"],
    }),
  }),
});

export const {
  useGetApplicationFilesQuery,
  useUploadFileMutation,
  useDeleteFileMutation,
} = FileAPISlice;
