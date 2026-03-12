import axiosInstance from "../lib/axios";

export const submissionApi = {
    submitSolution: async (payload) => {
        const response = await axiosInstance.post("/submissions", payload);
        return response.data;
    },
    getSubmissionsByProblem: async (problemId) => {
        const response = await axiosInstance.get(`/submissions/${problemId}`);
        return response.data;
    },
};
