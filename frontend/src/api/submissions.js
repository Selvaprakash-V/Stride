import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const submissionApi = {
    submitSolution: async (payload) => {
        const response = await axios.post(`${API_URL}/submissions`, payload);
        return response.data;
    },
    getSubmissionsByProblem: async (problemId) => {
        const response = await axios.get(`${API_URL}/submissions/${problemId}`);
        return response.data;
    },
};
