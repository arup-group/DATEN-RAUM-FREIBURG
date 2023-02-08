import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SESSION_TOKEN_ID } from "../../../utils/AuthSessionHelper";

/**
 * Redux queries to return applicant information from database
 */
export const ApplicantAPISlice = createApi({
  reducerPath: "applicantAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_URL}/applicant`,
    prepareHeaders: (headers, { getState }) => {
      const token = sessionStorage.getItem(SESSION_TOKEN_ID);
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Get"],
  endpoints: (builder) => ({
    getApplicant: builder.query<any, number>({
      query: (id) => `/${id}`,
      providesTags: ["Get"],
    }),
    getApplicants: builder.query<any, void>({
      query: () => "/",
    }),
  }),
});
export const { useGetApplicantQuery, useGetApplicantsQuery } =
  ApplicantAPISlice;
