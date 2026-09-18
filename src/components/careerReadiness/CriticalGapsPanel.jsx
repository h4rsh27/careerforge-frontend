const CriticalGapsPanel = ({
    criticalGaps = [],
}) => {

    return (
        <section className="readiness-list-card">

            <div className="readiness-list-header">

                <div>
                    <span className="readiness-card-label">
                        PRIORITY DEVELOPMENT
                    </span>

                    <h2>
                        Critical Gaps
                    </h2>
                </div>

                <div className="readiness-list-count gaps">
                    {criticalGaps.length}
                </div>

            </div>

            {criticalGaps.length === 0 ? (

                <div className="readiness-empty complete">

                    <span>✓</span>

                    <p>
                        No critical skill gaps were
                        identified for this role.
                    </p>

                </div>

            ) : (

                <div className="readiness-items">

                    {criticalGaps.map(
                        (gap, index) => {

                            const skillName =
                                typeof gap === "string"
                                    ? gap
                                    : gap.skillName;

                            const importance =
                                typeof gap === "object"
                                    ? gap.importance
                                    : null;

                            return (
                                <div
                                    className="readiness-item gap"
                                    key={`${skillName}-${index}`}
                                >

                                    <div className="readiness-item-icon">
                                        !
                                    </div>

                                    <div>
                                        <strong>
                                            {skillName}
                                        </strong>

                                        <span>
                                            {importance
                                                ? `Importance ${importance}/10`
                                                : "Priority skill gap"}
                                        </span>
                                    </div>

                                    <div className="critical-gap-badge">
                                        PRIORITY
                                    </div>

                                </div>
                            );
                        }
                    )}

                </div>
            )}

        </section>
    );
};

export default CriticalGapsPanel;