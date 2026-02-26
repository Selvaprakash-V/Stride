import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // by adding this field browser will send the cookies to server automatically, on every single req
  timeout: 10000,
});

// Simple response interceptor to normalize errors
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err?.response?.data?.message || err.message || "Network Error";
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
