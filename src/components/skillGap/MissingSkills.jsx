const MissingSkills = ({ skills = [] }) => {

    const getPriority = (importance) => {
        if (importance >= 8) {
            return "HIGH";
        }

        if (importance >= 5) {
            return "MEDIUM";
        }

        return "LOW";
    };

    return (
        <section className="skill-gap-list-card">

            <div className="skill-gap-list-header">

                <div>
                    <span className="skill-gap-card-label">
                        AREAS TO DEVELOP
                    </span>

                    <h2>
                        Missing Skills
                    </h2>
                </div>

                <div className="skill-gap-count missing">
                    {skills.length}
                </div>

            </div>

            {skills.length === 0 ? (
                <div className="skill-gap-list-empty complete">
                    <span>✓</span>

                    <p>
                        No missing skills were identified
                        for this role.
                    </p>
                </div>
            ) : (
                <div className="skill-gap-skills">

                    {skills.map((skill, index) => {

                        const priority =
                            getPriority(
                                skill.importance
                            );

                        return (
                            <div
                                className="skill-gap-skill-item missing"
                                key={`${skill.skillName}-${index}`}
                            >

                                <div className="skill-gap-skill-main">

                                    <div className="skill-gap-status-icon">
                                        !
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

                                <span
                                    className={`skill-gap-priority ${priority.toLowerCase()}`}
                                >
                                    {priority}
                                </span>

                            </div>
                        );
                    })}

                </div>
            )}

        </section>
    );
};

export default MissingSkills;