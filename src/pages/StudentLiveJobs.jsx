import { useState } from "react";
import { getLiveJobs } from "../api/liveJobsApi";

const StudentLiveJobs = () => {
    const [role, setRole] = useState("java developer");
    const [location, setLocation] = useState("Pune");

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        try {
            setLoading(true);
            setError("");
            setJobs([]);

            const data = await getLiveJobs(role, location);

            setJobs(data || []);
        } catch (err) {
            console.error("Live jobs error:", err);

            setError(
                err.response?.data?.message ||
                err.response?.data ||
                "Unable to fetch live jobs."
            );
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        if (!date) {
            return "Recently posted";
        }

        return new Date(date).toLocaleDateString();
    };

    return (
        <div className="student-page">

            <div className="page-header">
                <div>
                    <span className="page-eyebrow">
                        CAREERFORGE / EXPLORE OPPORTUNITIES
                    </span>

                    <h1>Explore Live Jobs</h1>

                    <p>
                        Search current job opportunities from across
                        the market.
                    </p>
                </div>
            </div>

            <div className="live-jobs-search">

                <div className="live-jobs-field">
                    <label>Job Role</label>

                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="e.g. Java Developer"
                    />
                </div>

                <div className="live-jobs-field">
                    <label>Location</label>

                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Pune"
                    />
                </div>

                <button
                    type="button"
                    onClick={handleSearch}
                    disabled={loading}
                    className="live-jobs-search-button"
                >
                    {loading ? "Searching..." : "Search Live Jobs"}
                </button>

            </div>

            {error && (
                <div className="live-jobs-error">
                    <strong>Unable to load jobs</strong>
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && jobs.length > 0 && (
                <div className="live-jobs-results-header">
                    <div>
                        <span className="page-eyebrow">
                            CURRENT OPPORTUNITIES
                        </span>

                        <h2>
                            {jobs.length} opportunities found
                        </h2>
                    </div>
                </div>
            )}

            {loading && (
                <div className="live-jobs-loading">
                    <div className="live-jobs-spinner"></div>

                    <p>Fetching current jobs...</p>
                </div>
            )}

            {!loading && jobs.length > 0 && (
                <div className="live-jobs-grid">

                    {jobs.map((job, index) => (

                        <article
                            className="live-job-card"
                            key={job.id || index}
                        >

                            <div className="live-job-card-top">

                                <div className="live-job-company-icon">
                                    {(job.company || "J")
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>

                                <span className="live-job-badge">
                                    LIVE
                                </span>

                            </div>

                            <h3>
                                {job.title || "Job opportunity"}
                            </h3>

                            <p className="live-job-company">
                                {job.company ||
                                    "Company not specified"}
                            </p>

                            <div className="live-job-meta">

                                <span>
                                    📍{" "}
                                    {job.location ||
                                        "Location not specified"}
                                </span>

                                {job.contractType && (
                                    <span>
                                        💼 {job.contractType}
                                    </span>
                                )}

                            </div>

                            {(job.salaryMin || job.salaryMax) && (
                                <div className="live-job-salary">

                                    ₹
                                    {job.salaryMin
                                        ? Math.round(
                                            job.salaryMin
                                        ).toLocaleString()
                                        : "—"}

                                    {" - "}

                                    ₹
                                    {job.salaryMax
                                        ? Math.round(
                                            job.salaryMax
                                        ).toLocaleString()
                                        : "—"}

                                </div>
                            )}

                            <p className="live-job-date">
                                Posted: {formatDate(job.created)}
                            </p>

                            <div className="live-job-actions">

                                {job.redirectUrl && (
                                    <a
                                        href={job.redirectUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="live-job-view-button"
                                    >
                                        View Job
                                    </a>
                                )}

                            </div>

                        </article>

                    ))}

                </div>
            )}

            {!loading && !error && jobs.length === 0 && (
                <div className="live-jobs-empty">

                    <div className="live-jobs-empty-icon">
                        ↗
                    </div>

                    <h3>Find your next opportunity</h3>

                    <p>
                        Search by job role and location to discover
                        current opportunities.
                    </p>

                </div>
            )}

        </div>
    );
};

export default StudentLiveJobs;