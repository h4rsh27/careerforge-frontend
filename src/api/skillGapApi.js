import api from "./axios";

export const getJobRoles = async () => {
    const response = await api.get("/job-roles");
    return response.data;
};

export const getSkillGap = async (jobRoleId) => {
    const response = await api.get(
        `/skill-gap/${jobRoleId}`
    );

    return response.data;
};