const ReadinessScore = ({
    score,
    level,
    message,
}) => {

    const normalizedScore = Math.max(
        0,
        Math.min(100, Number(score) || 0)
    );

    const circumference =
        2 * Math.PI * 88;

    const offset =
        circumference -
        (normalizedScore / 100) *
            circumference;

    const levelClass =
        level?.toLowerCase().replaceAll("_", "-") ||
        "developing";

    return (
        <section className="readiness-score-card">

            <div className="readiness-score-glow"></div>

            <div className="readiness-score-layout">

                <div className="readiness-score-ring">

                    <svg
                        viewBox="0 0 202 202"
                        className="readiness-score-svg"
                    >
                        <circle
                            cx="101"
                            cy="101"
                            r="88"
                            className="readiness-ring-track"
                        />

                        <circle
                            cx="101"
                            cy="101"
                            r="88"
                            className="readiness-ring-progress"
                            style={{
                                strokeDasharray:
                                    circumference,
                                strokeDashoffset:
                                    offset,
                            }}
                        />
                    </svg>

                    <div className="readiness-score-value">

                        <strong>
                            {normalizedScore.toFixed(1)}%
                        </strong>

                        <span>
                            READINESS
                        </span>

                    </div>

                </div>

                <div className="readiness-score-details">

                    <span className="readiness-card-label">
                        CAREER READINESS LEVEL
                    </span>

                    <div
                        className={`readiness-level ${levelClass}`}
                    >
                        {level
                            ?.replaceAll("_", " ")
                            || "DEVELOPING"}
                    </div>

                    <h2>
                        Your career profile is progressing.
                    </h2>

                    <p>
                        {message ||
                            "Continue improving your skill profile to become more prepared for this role."}
                    </p>

                </div>

            </div>

        </section>
    );
};

export default ReadinessScore;