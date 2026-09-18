const ReadinessHeader = ({
    selectedRole,
    onRoleChange,
    roles,
    onAnalyze,
    analyzing,
}) => {
    return (
        <section className="readiness-header">

            <div className="readiness-header-copy">
                <span className="readiness-eyebrow">
                    CAREER INTELLIGENCE
                </span>

                <h1>
                    Measure Your
                    <span> Career Readiness</span>
                </h1>

                <p>
                    Understand how prepared your current
                    profile is for your target career role.
                </p>
            </div>

            <div className="readiness-role-selector">

                <label htmlFor="readinessRole">
                    TARGET JOB ROLE
                </label>

                <div className="readiness-role-controls">

                    <select
                        id="readinessRole"
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
                        className="readiness-analyze-button"
                        onClick={onAnalyze}
                        disabled={
                            !selectedRole || analyzing
                        }
                    >
                        {analyzing
                            ? "Analyzing..."
                            : "Check Readiness"}
                    </button>

                </div>
            </div>

        </section>
    );
};

export default ReadinessHeader;