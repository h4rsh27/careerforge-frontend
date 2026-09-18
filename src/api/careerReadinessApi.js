import api from "./axios";

export const getJobRoles = async () => {
    const response = await api.get("/job-roles");
    return response.data;
};

export const getCareerReadiness = async (jobRoleId) => {
    const response = await api.get(
        `/career-readiness/${jobRoleId}`
    );

    return response.data;
};