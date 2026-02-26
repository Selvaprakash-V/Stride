import axiosInstance from "../lib/axios";

export const userApi = {
  getMe: async () => {
    const res = await axiosInstance.get("/users/me");
    return res.data;
  },
  updateMe: async (payload) => {
    const res = await axiosInstance.put("/users/me", payload);
    return res.data;
  },
  searchUsers: async (q) => {
    const res = await axiosInstance.get(`/users/search?query=${encodeURIComponent(q)}`);
    return res.data;
  },
};
import axiosInstance from "../lib/axios";

export const userApi = {
  getMe: async () => {
    const response = await axiosInstance.get("/users/me");
    return response.data;
  },
  updateMe: async (payload) => {
    const response = await axiosInstance.put("/users/me", payload);
    return response.data;
  },
  searchUsers: async (query) => {
    const response = await axiosInstance.get(`/users/search?query=${encodeURIComponent(query)}`);
    return response.data;
  },
  syncUsersFromClerk: async () => {
    const response = await axiosInstance.post("/users/sync-from-clerk");
    return response.data;
  },
};
