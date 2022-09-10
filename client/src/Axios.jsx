import axios from "axios";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
  },
});

//request interceptor to add the auth token header to requests
Axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("crud-operation-access-token");
    if (accessToken) {
      config.headers.authorization = accessToken;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

//response interceptor to refresh token on receiving token expired error
Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    console.log(error.response.status);
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const res = await Axios.get(
        `${import.meta.env.VITE_BACKEND_URL}admin/access-token`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        localStorage.setItem(
          "crud-operation-access-token",
          `Bearer ${res.data.accessToken}`
        );
        return Axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default Axios;
