import api from "./axios";

export const getResume = async () => {
    const response = await api.get("/resume");
    return response.data;
};

export const uploadResume = async (file) => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(
        "/resume",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

export const getResumeSkills = async () => {
    const response = await api.get("/resume/skills");
    return response.data;
};

export const getResumeText = async () => {
    const response = await api.get("/resume/text");
    return response.data;
};

export const downloadResume = async () => {
    const response = await api.get(
        "/resume/download",
        {
            responseType: "blob",
        }
    );

    return response;
};

export const deleteResume = async () => {
    await api.delete("/resume");
};