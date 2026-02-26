import axiosInstance from "../lib/axios";

export const problemApi = {
  getProblems: async (params = {}) => {
    // params: { search, difficulty, tags, page, limit }
    const query = new URLSearchParams();
    if (params.search) query.append("search", params.search);
    if (params.difficulty) query.append("difficulty", params.difficulty);
    if (params.tags && params.tags.length > 0) query.append("tags", params.tags.join(","));
    if (params.page) query.append("page", params.page);
    if (params.limit) query.append("limit", params.limit);
    const response = await axiosInstance.get(`/problems?${query.toString()}`);
    return response.data;
  },
  getProblemById: async (id) => {
    const response = await axiosInstance.get(`/problems/${id}`);
    return response.data;
  },
  createProblem: async (payload) => {
    const response = await axiosInstance.post("/problems", payload);
    return response.data;
  },
  markProblemSolved: async (payload) => {
    const response = await axiosInstance.post("/problems/solved", payload);
    return response.data;
  },
  getMySolvedProblems: async () => {
    const response = await axiosInstance.get("/problems/my-solved");
    return response.data;
  },
  searchProblems: async (q) => {
    const response = await axiosInstance.get(`/problems/search?q=${encodeURIComponent(q)}`);
    return response.data;
  },
};
