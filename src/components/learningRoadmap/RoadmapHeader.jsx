const RoadmapHeader = ({
    jobRoles,
    selectedRole,
    setSelectedRole,
    onGenerate,
    loading
}) => {
    return (
        <div className="roadmap-header">

            <div className="roadmap-header-copy">

                <span className="roadmap-eyebrow">
                    Career Intelligence
                </span>

                <h1>
                    Your Learning Roadmap
                </h1>

                <p>
                    Follow a structured learning path to close your
                    skill gaps and become job-ready for your target role.
                </p>

            </div>


            <div className="roadmap-role-selector">

                <label>
                    Target Job Role
                </label>


                <div className="roadmap-role-controls">

                    <select
                        value={selectedRole}
                        onChange={(e) =>
                            setSelectedRole(e.target.value)
                        }
                    >

                        <option value="">
                            Select a job role
                        </option>


                        {jobRoles.map((role) => (

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
                        className="roadmap-generate-button"
                        onClick={onGenerate}
                        disabled={
                            !selectedRole ||
                            loading
                        }
                    >
                        {loading
                            ? "Generating..."
                            : "Generate Roadmap"}
                    </button>

                </div>

            </div>

        </div>
    );
};

export default RoadmapHeader;