import { Link } from "react-router-dom";

const DashboardJobs = ({
    jobs = [],
}) => {
    const visibleJobs = jobs.slice(0, 3);

    return (
        <section className="dashboard-panel dashboard-jobs-panel">
            <div className="dashboard-panel-heading">
                <div>
                    <span>
                        OPPORTUNITY ENGINE
                    </span>

                    <h2>
                        Recommended for you
                    </h2>
                </div>

                <Link to="/student/jobs">
                    View all →
                </Link>
            </div>

            {visibleJobs.length === 0 ? (
                <div className="dashboard-panel-empty">
                    <div>◈</div>

                    <p>
                        Complete your profile and
                        add your skills to unlock
                        personalized opportunities.
                    </p>
                </div>
            ) : (
                <div className="dashboard-job-list">
                    {visibleJobs.map((job) => (
                        <div
                            className="dashboard-job-item"
                            key={
                                job.jobListingId
                            }
                        >
                            <div className="dashboard-company-avatar">
                                {(
                                    job.companyName ||
                                    "C"
                                )
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>

                            <div className="dashboard-job-info">
                                <strong>
                                    {job.jobTitle}
                                </strong>

                                <span>
                                    {job.companyName}
                                </span>

                                <small>
                                    {job.location ||
                                        "Location not specified"}
                                </small>
                            </div>

                            <div className="dashboard-job-match">
                                <strong>
                                    {Math.round(
                                        job.matchPercentage ||
                                            0
                                    )}
                                    %
                                </strong>

                                <span>
                                    match
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default DashboardJobs;