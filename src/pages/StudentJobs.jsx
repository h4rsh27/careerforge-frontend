import { useEffect, useState } from "react";

import {
    getJobRecommendations,
    getJobMatchBreakdown,
} from "../api/jobRecommendationApi";

import JobsHeader from "../components/jobs/JobsHeader";
import JobCard from "../components/jobs/JobCard";
import JobMatchBreakdown from "../components/jobs/JobMatchBreakdown";

const StudentJobs = () => {
    const [jobs, setJobs] = useState([]);

    const [loading, setLoading] =
        useState(true);

    const [refreshing, setRefreshing] =
        useState(false);

    const [error, setError] =
        useState("");

    const [selectedJob, setSelectedJob] =
        useState(null);

    const [breakdown, setBreakdown] =
        useState(null);

    const [breakdownLoading, setBreakdownLoading] =
        useState(false);

    useEffect(() => {
        loadRecommendations();
    }, []);

    const loadRecommendations = async (
        isRefresh = false
    ) => {
        try {
            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError("");

            const data =
                await getJobRecommendations();

            const recommendationList =
                data?.recommendations ||
                data?.jobs ||
                data?.jobRecommendations ||
                [];

            setJobs(
                Array.isArray(recommendationList)
                    ? recommendationList
                    : []
            );
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Unable to load job recommendations."
            );
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleViewBreakdown = async (
        job
    ) => {
        try {
            setSelectedJob(job);
            setBreakdown(null);
            setBreakdownLoading(true);
            setError("");

            const data =
                await getJobMatchBreakdown(
                    job.jobListingId
                );

            setBreakdown(data);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Unable to load match details."
            );

            setSelectedJob(null);
        } finally {
            setBreakdownLoading(false);
        }
    };

    const closeBreakdown = () => {
        setSelectedJob(null);
        setBreakdown(null);
    };

    return (
        <main className="jobs-page">
            <div className="jobs-page-background"></div>

            <div className="jobs-page-content">
                <JobsHeader
                    totalJobs={jobs.length}
                    onRefresh={() =>
                        loadRecommendations(true)
                    }
                    refreshing={refreshing}
                />

                {error && (
                    <div className="jobs-alert jobs-alert-error">
                        <span>!</span>
                        <p>{error}</p>
                    </div>
                )}

                {loading ? (
                    <div className="jobs-loading">
                        <div className="loading-spinner"></div>

                        <h2>
                            Finding your opportunities
                        </h2>

                        <p>
                            CareerForge is analyzing
                            your profile and matching
                            relevant jobs...
                        </p>
                    </div>
                ) : jobs.length === 0 ? (
                    <section className="jobs-empty-state">
                        <div className="jobs-empty-icon">
                            ✦
                        </div>

                        <span>
                            OPPORTUNITY ENGINE
                        </span>

                        <h2>
                            Your next opportunity
                            is being prepared.
                        </h2>

                        <p>
                            Complete your profile,
                            add your skills and upload
                            a resume to give CareerForge
                            more information for
                            personalized job matching.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                loadRecommendations(
                                    true
                                )
                            }
                        >
                            Refresh Recommendations →
                        </button>
                    </section>
                ) : (
                    <>
                        <div className="jobs-section-heading">
                            <div>
                                <span>
                                    PERSONALIZED MATCHES
                                </span>

                                <h2>
                                    Opportunities for you
                                </h2>
                            </div>

                            <p>
                                Ranked by compatibility
                                with your CareerForge
                                profile.
                            </p>
                        </div>

                        <section className="jobs-grid">
                            {jobs.map((job) => (
                                <JobCard
                                    key={
                                        job.jobListingId
                                    }
                                    job={job}
                                    onViewBreakdown={
                                        handleViewBreakdown
                                    }
                                />
                            ))}
                        </section>
                    </>
                )}
            </div>

            {selectedJob && (
                <JobMatchBreakdown
                    breakdown={breakdown}
                    loading={breakdownLoading}
                    onClose={closeBreakdown}
                />
            )}
        </main>
    );
};

export default StudentJobs;