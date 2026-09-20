import api from "./axios";

export const analyzeResume = async () => {
    const response = await api.post("/resume/analyze");
    return response.data;
};