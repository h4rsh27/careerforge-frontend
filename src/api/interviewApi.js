import api from "./axios";

export const startInterview = async (jobRoleId) => {
    const response = await api.post(`/interviews/start/${jobRoleId}`);
    return response.data;
};

export const getInterviewQuestions = async (sessionId) => {
    const response = await api.get(`/interviews/${sessionId}/questions`);
    return response.data;
};

export const submitInterviewAnswer = async (questionId, answer) => {
    const response = await api.post(
        `/interviews/questions/${questionId}/answer`,
        {
            answer,
        }
    );

    return response.data;
};

export const completeInterview = async (sessionId) => {
    const response = await api.put(
        `/interviews/${sessionId}/complete`
    );

    return response.data;
};