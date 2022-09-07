import axios from "axios";

const storeLocalStorage = async (key, value) => {
  localStorage.setItem(key, value);
};

const Axios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    authorization: localStorage.getItem("crud-operation-access-token"),
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
  },
});

//response interceptor to refresh token on receiving token expired error
Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
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
        console.log("Access Token Refreshed!");
        return Axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default Axios;
