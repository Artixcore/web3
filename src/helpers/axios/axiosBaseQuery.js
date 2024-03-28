import { instance as axiosInstance } from "./axiosInstance";

const axiosBaseQuery =
  ({ baseUrl }) =>
  async ({ url, method, data, params, contentType }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          "Content-Type": contentType || "application/json",
        },
        // withCredentials: true,
      });

      return result;
    } catch (axiosError) {
      return Promise.reject(axiosError);
    }
  };

export default axiosBaseQuery;
