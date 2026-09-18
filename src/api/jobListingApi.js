import api from "./axios";

export const getJobListings = async () => {
    const response = await api.get("/job-listings");
    return response.data;
};

export const getJobListing = async (id) => {
    const response = await api.get(`/job-listings/${id}`);
    return response.data;
};

export const createJobListing = async (listingData) => {
    const response = await api.post("/job-listings", listingData);
    return response.data;
};

export const updateJobListing = async (id, listingData) => {
    const response = await api.put(
        `/job-listings/${id}`,
        listingData
    );

    return response.data;
};

export const deleteJobListing = async (id) => {
    await api.delete(`/job-listings/${id}`);
};

export const getCompanies = async () => {
    const response = await api.get("/companies");
    return response.data;
};

export const getJobRoles = async () => {
    const response = await api.get("/job-roles");
    return response.data;
};