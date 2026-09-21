import axios from "./axios";

export const getLiveJobs = async (
    role,
    location,
    page = 1,
    limit = 10
) => {
    const response = await axios.get("/jobs/live", {
        params: {
            role,
            location,
            page,
            limit
        }
    });

    return response.data;
};