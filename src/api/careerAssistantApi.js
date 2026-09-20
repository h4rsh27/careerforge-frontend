import api from "./axios";

export const sendCareerAssistantMessage = async (
    message,
    history = []
) => {
    const response = await api.post("/ai/chat", {
        message,
        history,
    });

    return response.data;
};