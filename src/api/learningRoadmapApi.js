import api from "./axios";

export const getJobRoles = async () => {
    const response = await api.get("/job-roles");
    return response.data;
};

export const getLearningRoadmap = async (jobRoleId) => {
    const response = await api.get(
        `/learning-roadmap/${jobRoleId}`
    );

    return response.data;
};