import api from "./axios";

export const getJobRoles = async () => {
    const response = await api.get("/job-roles");
    return response.data;
};

export const getJobRole = async (id) => {
    const response = await api.get(`/job-roles/${id}`);
    return response.data;
};

export const createJobRole = async (jobRoleData) => {
    const response = await api.post("/job-roles", jobRoleData);
    return response.data;
};

export const updateJobRole = async (id, jobRoleData) => {
    const response = await api.put(`/job-roles/${id}`, jobRoleData);
    return response.data;
};

export const deleteJobRole = async (id) => {
    await api.delete(`/job-roles/${id}`);
};

export const getRequiredSkills = async (jobRoleId) => {
    const response = await api.get(
        `/job-roles/${jobRoleId}/skills`
    );
    return response.data;
};

export const addRequiredSkill = async (jobRoleId, skillData) => {
    const response = await api.post(
        `/job-roles/${jobRoleId}/skills`,
        skillData
    );
    return response.data;
};

export const updateRequiredSkill = async (
    jobRoleId,
    skillId,
    skillData
) => {
    const response = await api.put(
        `/job-roles/${jobRoleId}/skills/${skillId}`,
        skillData
    );
    return response.data;
};

export const deleteRequiredSkill = async (jobRoleId, skillId) => {
    await api.delete(
        `/job-roles/${jobRoleId}/skills/${skillId}`
    );
};