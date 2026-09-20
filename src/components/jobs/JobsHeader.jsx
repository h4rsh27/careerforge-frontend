const JobsHeader = ({
    totalJobs,
    onRefresh,
    refreshing,
}) => {
    return (
        <section className="jobs-header">
            <div className="jobs-header-glow"></div>

            <div className="jobs-header-content">
                <span className="jobs-label">
                    CAREERFORGE / OPPORTUNITIES
                </span>

                <h1>
                    Jobs that match
                    <br />
                    your <em>potential.</em>
                </h1>

                <p>
                    CareerForge analyzes your skills and
                    career profile to find opportunities
                    that align with your current capabilities.
                </p>
            </div>

            <div className="jobs-header-actions">
                <div className="jobs-count">
                    <strong>{totalJobs}</strong>
                    <span>
                        {totalJobs === 1
                            ? "Opportunity"
                            : "Opportunities"}
                    </span>
                </div>

                <button
                    type="button"
                    className="jobs-refresh-button"
                    onClick={onRefresh}
                    disabled={refreshing}
                >
                    <span
                        className={
                            refreshing
                                ? "refresh-icon spinning"
                                : "refresh-icon"
                        }
                    >
                        ↻
                    </span>

                    {refreshing
                        ? "Refreshing..."
                        : "Refresh Matches"}
                </button>
            </div>
        </section>
    );
};

export default JobsHeader;