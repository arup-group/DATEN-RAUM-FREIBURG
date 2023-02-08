import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { translateWFSCoordinateStream } from "../../utils/WfsCoordinateTransform";

/**
 * Redux query to return WFS plot data
 */
export const GrundstuecksparzellierungWFSService = createApi({
  reducerPath: "grundstuecksparzellierungWFSService",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.FB_GEOPORTAL,
  }),

  endpoints: (builder) => ({
    getGrundstuecksparzellierungWFSService: builder.query<any, void>({
      query: () =>
        `/wfs/verma_dietenbach/verma_dietenbach?service=WFS&version=2.0.0&request=GetFeature&typeNames=ms:grundstuecksparzellierung_ba1&outputFormat=geojson`,
      transformResponse: (data: any) => {
        return translateWFSCoordinateStream(data); //{ translatedData, centreCoord }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetGrundstuecksparzellierungWFSServiceQuery } =
  GrundstuecksparzellierungWFSService;
