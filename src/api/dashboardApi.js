import api from "./axios";

export const getDashboardProfile = async () => {
    const response = await api.get("/profile");
    return response.data;
};

export const getDashboardSkills = async () => {
    const response = await api.get("/skills");
    return response.data;
};

export const getDashboardResume = async () => {
    const response = await api.get("/resume");
    return response.data;
};

export const getDashboardJobs = async () => {
    const response = await api.get(
        "/job-recommendations"
    );

    return response.data;
};

export const getDashboardApplications =
    async () => {
        const response = await api.get(
            "/applications/analytics"
        );

        return response.data;
    };