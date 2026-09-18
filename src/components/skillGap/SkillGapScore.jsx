const SkillGapScore = ({
    score,
    matchedCount,
    missingCount,
}) => {
    const normalizedScore = Math.max(
        0,
        Math.min(100, Number(score) || 0)
    );

    const circumference = 2 * Math.PI * 82;
    const offset =
        circumference -
        (normalizedScore / 100) * circumference;

    return (
        <section className="skill-gap-score-card">

            <div className="skill-gap-score-glow"></div>

            <div className="skill-gap-score-content">

                <div className="skill-gap-score-ring">

                    <svg
                        viewBox="0 0 190 190"
                        className="skill-gap-score-svg"
                    >
                        <circle
                            cx="95"
                            cy="95"
                            r="82"
                            className="skill-gap-ring-track"
                        />

                        <circle
                            cx="95"
                            cy="95"
                            r="82"
                            className="skill-gap-ring-progress"
                            style={{
                                strokeDasharray:
                                    circumference,
                                strokeDashoffset:
                                    offset,
                            }}
                        />
                    </svg>

                    <div className="skill-gap-score-value">
                        <strong>
                            {normalizedScore.toFixed(1)}%
                        </strong>

                        <span>
                            Readiness
                        </span>
                    </div>

                </div>

                <div className="skill-gap-score-info">

                    <span className="skill-gap-card-label">
                        SKILL ANALYSIS
                    </span>

                    <h2>
                        Your current profile
                    </h2>

                    <p>
                        This score represents how closely
                        your current skills match the
                        requirements of the selected role.
                    </p>

                    <div className="skill-gap-mini-stats">

                        <div>
                            <strong>
                                {matchedCount}
                            </strong>

                            <span>
                                Matched
                            </span>
                        </div>

                        <div>
                            <strong>
                                {missingCount}
                            </strong>

                            <span>
                                Missing
                            </span>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default SkillGapScore;