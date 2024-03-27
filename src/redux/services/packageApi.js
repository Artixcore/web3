import { baseApi } from "./baseApi";

const packageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPackages: builder.query({
      query: () => ({
        url: "/packages",
        method: "GET",
      }),
    }),

    addPackage: builder.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
    }),

    updatePackage: builder.mutation({
      query: (data) => ({
        url: "",
        method: "PATCH",
        body: data,
      }),
    }),

    deletePackage: builder.mutation({
      query: (data) => ({
        url: "",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllPackagesQuery,
  useAddPackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
} = packageApi;
