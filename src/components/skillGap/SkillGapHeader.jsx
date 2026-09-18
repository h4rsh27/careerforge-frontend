const SkillGapHeader = ({
    selectedRole,
    onRoleChange,
    roles,
    onAnalyze,
    analyzing,
}) => {
    return (
        <section className="skill-gap-header">
            <div className="skill-gap-header-copy">
                <span className="skill-gap-eyebrow">
                    CAREER INTELLIGENCE
                </span>

                <h1>
                    Discover Your
                    <span> Skill Gap</span>
                </h1>

                <p>
                    Compare your current skills against the
                    requirements of your target career role.
                </p>
            </div>

            <div className="skill-gap-role-selector">
                <label htmlFor="skillGapRole">
                    TARGET JOB ROLE
                </label>

                <div className="skill-gap-role-controls">
                    <select
                        id="skillGapRole"
                        value={selectedRole}
                        onChange={(event) =>
                            onRoleChange(event.target.value)
                        }
                    >
                        <option value="">
                            Select a job role
                        </option>

                        {roles.map((role) => (
                            <option
                                key={role.id}
                                value={role.id}
                            >
                                {role.roleName}
                            </option>
                        ))}
                    </select>

                    <button
                        type="button"
                        className="skill-gap-analyze-button"
                        onClick={onAnalyze}
                        disabled={
                            !selectedRole || analyzing
                        }
                    >
                        {analyzing
                            ? "Analyzing..."
                            : "Analyze Gap"}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default SkillGapHeader;