import api from "./axios";

export const getMyApplications = async () => {
    const response = await api.get("/applications");

    return response.data;
};

export const createApplication = async (
    jobListingId,
    status = "SAVED"
) => {
    const response = await api.post(
        "/applications",
        {
            jobListingId,
            status,
        }
    );

    return response.data;
};

export const updateApplicationStatus = async (
    applicationId,
    status
) => {
    const response = await api.put(
        `/applications/${applicationId}/status`,
        null,
        {
            params: {
                status,
            },
        }
    );

    return response.data;
};

export const deleteApplication = async (
    applicationId
) => {
    await api.delete(
        `/applications/${applicationId}`
    );
};