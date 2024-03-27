import baseApi from "./baseApi";

const PACKAGE_URL = "/packages";

const packageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPackages: builder.query({
      query: () => ({
        url: `${PACKAGE_URL}`,
        method: "GET",
      }),
    }),

    addPackage: builder.mutation({
      query: (data) => ({
        url: `${PACKAGE_URL}/create`,
        method: "POST",
        data,
      }),
    }),

    updatePackage: builder.mutation({
      query: (data) => ({
        url: `${PACKAGE_URL}/update/:id`,
        method: "PATCH",
        body: data,
      }),
    }),

    deletePackage: builder.mutation({
      query: (packageId) => ({
        url: `${PACKAGE_URL}/delete/${packageId}`,
        method: "PATCH",
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
