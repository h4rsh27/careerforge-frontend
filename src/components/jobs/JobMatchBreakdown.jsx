const JobMatchBreakdown = ({
    breakdown,
    loading,
    onClose,
}) => {
    if (!breakdown && !loading) {
        return null;
    }

    return (
        <div className="job-breakdown-overlay">
            <section className="job-breakdown-modal">
                <button
                    type="button"
                    className="job-breakdown-close"
                    onClick={onClose}
                >
                    ×
                </button>

                {loading ? (
                    <div className="job-breakdown-loading">
                        <div className="loading-spinner"></div>

                        <h2>
                            Analyzing your match
                        </h2>

                        <p>
                            CareerForge is calculating
                            your compatibility...
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="job-breakdown-heading">
                            <span>
                                CAREERFORGE / MATCH ANALYSIS
                            </span>

                            <h2>
                                Why this job matches
                                you
                            </h2>

                            <p>
                                See how your profile,
                                skills and career
                                alignment contribute
                                to this match.
                            </p>
                        </div>

                        <div className="job-breakdown-score">
                            <div
                                className="breakdown-score-ring"
                                style={{
                                    "--score":
                                        `${breakdown.matchPercentage}%`,
                                }}
                            >
                                <strong>
                                    {Math.round(
                                        breakdown.matchPercentage
                                    )}
                                    <small>%</small>
                                </strong>

                                <span>
                                    Match
                                </span>
                            </div>

                            <div>
                                <span>
                                    Recommendation
                                </span>

                                <strong>
                                    {breakdown.recommendationLevel ||
                                        "Match"}
                                </strong>
                            </div>
                        </div>

                        <div className="job-breakdown-stats">
                            <div>
                                <span>
                                    Skills Matched
                                </span>

                                <strong>
                                    {breakdown.matchedSkills
                                        ?.length || 0}
                                </strong>
                            </div>

                            <div>
                                <span>
                                    Skills Missing
                                </span>

                                <strong>
                                    {breakdown.missingSkills
                                        ?.length || 0}
                                </strong>
                            </div>
                        </div>

                        {breakdown.matchedSkills
                            ?.length > 0 && (
                            <div className="breakdown-skill-section">
                                <span className="breakdown-section-label">
                                    MATCHED SKILLS
                                </span>

                                <div className="breakdown-skills">
                                    {breakdown.matchedSkills.map(
                                        (
                                            skill,
                                            index
                                        ) => (
                                            <span
                                                key={`${skill}-${index}`}
                                                className="breakdown-skill matched"
                                            >
                                                <i>
                                                    ✓
                                                </i>
                                                {skill}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                        {breakdown.missingSkills
                            ?.length > 0 && (
                            <div className="breakdown-skill-section">
                                <span className="breakdown-section-label">
                                    SKILLS TO DEVELOP
                                </span>

                                <div className="breakdown-skills">
                                    {breakdown.missingSkills.map(
                                        (
                                            skill,
                                            index
                                        ) => (
                                            <span
                                                key={`${skill}-${index}`}
                                                className="breakdown-skill missing"
                                            >
                                                <i>
                                                    +
                                                </i>
                                                {skill}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
};

export default JobMatchBreakdown;