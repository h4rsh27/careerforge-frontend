const MatchedSkills = ({ skills = [] }) => {
    return (
        <section className="skill-gap-list-card">

            <div className="skill-gap-list-header">

                <div>
                    <span className="skill-gap-card-label">
                        YOUR STRENGTHS
                    </span>

                    <h2>
                        Matched Skills
                    </h2>
                </div>

                <div className="skill-gap-count matched">
                    {skills.length}
                </div>

            </div>

            {skills.length === 0 ? (
                <div className="skill-gap-list-empty">
                    <span>—</span>
                    <p>
                        No matched skills were found for
                        this role.
                    </p>
                </div>
            ) : (
                <div className="skill-gap-skills">

                    {skills.map((skill, index) => (
                        <div
                            className="skill-gap-skill-item matched"
                            key={`${skill.skillName}-${index}`}
                        >
                            <div className="skill-gap-skill-main">

                                <div className="skill-gap-status-icon">
                                    ✓
                                </div>

                                <div>
                                    <strong>
                                        {skill.skillName}
                                    </strong>

                                    <span>
                                        Required importance{" "}
                                        {skill.importance}/10
                                    </span>
                                </div>

                            </div>

                            <span className="skill-gap-status-badge matched">
                                MATCHED
                            </span>
                        </div>
                    ))}

                </div>
            )}

        </section>
    );
};

export default MatchedSkills;