import api from "./axios";

export const getJobRecommendations = async () => {
    const response = await api.get(
        "/job-recommendations"
    );

    return response.data;
};

export const getJobMatchBreakdown = async (
    jobListingId
) => {
    const response = await api.get(
        `/job-recommendations/${jobListingId}/breakdown`
    );

    return response.data;
};