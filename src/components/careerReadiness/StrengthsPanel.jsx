const StrengthsPanel = ({ strengths = [] }) => {
    return (
        <section className="readiness-list-card">

            <div className="readiness-list-header">

                <div>
                    <span className="readiness-card-label">
                        WHAT YOU ALREADY HAVE
                    </span>

                    <h2>
                        Your Strengths
                    </h2>
                </div>

                <div className="readiness-list-count strengths">
                    {strengths.length}
                </div>

            </div>

            {strengths.length === 0 ? (

                <div className="readiness-empty">
                    <span>—</span>

                    <p>
                        No strengths were identified
                        for this role yet.
                    </p>
                </div>

            ) : (

                <div className="readiness-items">

                    {strengths.map(
                        (strength, index) => (
                            <div
                                className="readiness-item strength"
                                key={`${strength}-${index}`}
                            >

                                <div className="readiness-item-icon">
                                    ✓
                                </div>

                                <div>
                                    <strong>
                                        {strength}
                                    </strong>

                                    <span>
                                        Matched requirement
                                    </span>
                                </div>

                            </div>
                        )
                    )}

                </div>
            )}

        </section>
    );
};

export default StrengthsPanel;