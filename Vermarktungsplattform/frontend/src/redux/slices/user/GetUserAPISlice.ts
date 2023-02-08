import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SESSION_TOKEN_ID } from "../../../utils/AuthSessionHelper";

/**
 * Redux queries to return user info
 */
export const GetMeAPISlice = createApi({
  reducerPath: "getMeAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_URL}/users`,
    prepareHeaders: (headers, { getState }) => {
      const token = sessionStorage.getItem(SESSION_TOKEN_ID);
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["GetMe"],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => "/me",
    }),
  }),
});
export const { useGetMeQuery } = GetMeAPISlice;
