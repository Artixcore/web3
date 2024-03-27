import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "@/helpers/axios/axiosBaseQuery";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://organic-life-server.vercel.app/api/v1",
  }),
  endpoints: () => ({}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export default baseApi;
