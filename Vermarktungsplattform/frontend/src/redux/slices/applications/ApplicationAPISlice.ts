import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { SESSION_TOKEN_ID } from "../../../utils/AuthSessionHelper";

/**
 * Redux queries to return application data from database
 */
export const ApplicationAPISlice = createApi({
  reducerPath: "applicationAPISlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_URL}`,

    prepareHeaders: (headers, { getState }) => {
      const token = sessionStorage.getItem(SESSION_TOKEN_ID);
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Applications"],
  endpoints: (builder) => ({
    //returns all applications
    getApplications: builder.query({
      query: () => "/application",
      providesTags: ["Applications"],
    }),
    //returns application with id
    getApplication: builder.query<any, number>({
      query: (id) => `/application/${id}`,
    }),
    //returns application award status
    getGrundApplicationAwardStatus: builder.query<any, number>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const getApplicationByGrund = await fetchWithBQ(
          `/application/grund/${_arg}`
        );

        //error check
        if (getApplicationByGrund.error) {
          return { error: getApplicationByGrund.error as FetchBaseQueryError };
        }

        //data from response
        const applicationsData = getApplicationByGrund.data as any;

        //map all application statuses
        const applicationStatuses = applicationsData.map((application: any) => {
          return {
            award_status: application.award_status,
            block_anchor: application.block_anchor,
          };
        });

        //return awarded/pending state
        if (
          applicationStatuses.find(
            (application: any) =>
              application.award_status === "Vergeben" &&
              !application.block_anchor
          )
        )
          return { data: "Vergeben" };

        //return awarded/pending state
        if (
          applicationStatuses.find(
            (application: any) =>
              application.award_status === "Verplant" &&
              !application.block_anchor
          )
        )
          return { data: "Verplant" };

        //return free state
        return { data: "Frei" };
      },
    }),
    //return all applications linked with applicant id
    getApplicationsWithApplicant: builder.query<any, void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        //get applications
        const applicationsResult = await fetchWithBQ("/application");
        if (applicationsResult.error) {
          return { error: applicationsResult.error as FetchBaseQueryError };
        }
        const applicationsData = applicationsResult.data as any;
        //get applicants
        const applicantsResult = await fetchWithBQ("/applicant");
        if (applicantsResult.error) {
          return { error: applicantsResult.error as FetchBaseQueryError };
        }
        const applicantData = applicantsResult.data as any;

        //map applications to applicant
        const applications = applicationsData.map((application: any) => {
          const applicant = applicantData.find(
            (a: any) => parseInt(a.id) == application.user_id
          );
          const applicantRef = structuredClone(applicant);
          applicantRef["applicant_id"] = applicantRef["id"]; //rename id for join
          delete applicantRef["id"];

          return {
            ...application,
            ...applicantRef,
          };
        });
        return { data: { applications } };
      },
    }),
    //get anchor of block id
    getGrundIdAnchor: builder.query<any, number>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const grundApplicationsResult = await fetchWithBQ(
          `/application/grund/${_arg}`
        );
        if (grundApplicationsResult.error) {
          return {
            error: grundApplicationsResult.error as FetchBaseQueryError,
          };
        }
        //get applications for plot id
        const grundApplicationsData = grundApplicationsResult.data as any;
        //get plots with anchor
        const plotWithAnchor = grundApplicationsData.find(
          (application: any) =>
            application.block_anchor && application.award_status === "Vergeben"
        );

        if (!plotWithAnchor) return { data: undefined };

        //return applicant info
        const applicantsResult = await fetchWithBQ(
          `/applicant/${plotWithAnchor.user_id}`
        );

        if (applicantsResult.error) {
          return { error: applicantsResult.error as FetchBaseQueryError };
        }

        interface ApplicantResult {
          email: string;
          phone_number: string;
          full_name: string;
          company_name: string;
        }

        //return applicant info params
        const { email, phone_number, full_name, company_name } =
          applicantsResult.data as ApplicantResult;

        //map info to anchor
        const anchor = { email, phone_number, full_name, company_name };

        return { data: { anchor } };
      },
    }),
    //add application to database
    addApplication: builder.mutation({
      query: (payload) => ({
        url: "/application/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Applications"],
    }),
    //update application in database
    updateApplication: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/application/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Applications"],
    }),
    //delete application from database
    deleteApplication: builder.mutation({
      query: ({ id }) => ({
        url: `/application/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Applications"],
    }),
  }),
});
export const {
  useGetApplicationsQuery,
  useGetApplicationQuery,
  useGetApplicationsWithApplicantQuery,
  useGetGrundApplicationAwardStatusQuery,
  useGetGrundIdAnchorQuery,
  useAddApplicationMutation,
  useUpdateApplicationMutation,
  useDeleteApplicationMutation,
} = ApplicationAPISlice;
