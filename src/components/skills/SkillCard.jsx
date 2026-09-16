const proficiencyConfig = {
    BEGINNER: {
        label: "Beginner",
        percentage: 25,
    },
    INTERMEDIATE: {
        label: "Intermediate",
        percentage: 50,
    },
    ADVANCED: {
        label: "Advanced",
        percentage: 75,
    },
    EXPERT: {
        label: "Expert",
        percentage: 100,
    },
};

const SkillCard = ({
    skill,
    onEdit,
    onDelete,
}) => {
    const config =
        proficiencyConfig[skill.proficiencyLevel] ||
        proficiencyConfig.BEGINNER;

    return (
        <article className="skill-card">
            <div className="skill-card-top">
                <div className="skill-icon">
                    ✦
                </div>

                <div className="skill-card-actions">
                    <button
                        type="button"
                        onClick={() => onEdit(skill)}
                        aria-label={`Edit ${skill.skillName}`}
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        className="skill-delete"
                        onClick={() => onDelete(skill.id)}
                        aria-label={`Delete ${skill.skillName}`}
                    >
                        Delete
                    </button>
                </div>
            </div>

            <h2>{skill.skillName}</h2>

            <div className="skill-level-row">
                <span>Proficiency</span>

                <strong>{config.label}</strong>
            </div>

            <div className="skill-progress">
                <div
                    className="skill-progress-fill"
                    style={{
                        width: `${config.percentage}%`,
                    }}
                ></div>
            </div>

            <div className="skill-progress-label">
                <span>Current level</span>
                <span>{config.percentage}%</span>
            </div>
        </article>
    );
};

export default SkillCard;