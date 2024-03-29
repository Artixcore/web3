import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers.post.Accept = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (res) {
    const responseObject = {
      data: res?.data,
      meta: res?.data?.meta,
    };

    return responseObject;
  },
  function (err) {
    const responseObject = {
      statusCode: err?.response?.status || 500,
      message: err?.response?.data?.message || "Something went wrong",
    };
    return Promise.reject(responseObject);
  }
);

export { instance };
