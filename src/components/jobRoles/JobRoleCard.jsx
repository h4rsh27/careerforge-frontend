const JobRoleCard = ({
    role,
    onEdit,
    onDelete,
    onManageSkills,
}) => {
    const initials = role.roleName
        ?.split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <article className="job-role-card">
            <div className="job-role-card-top">
                <div className="job-role-icon">
                    {initials || "JR"}
                </div>

                <div className="job-role-card-actions">
                    <button
                        type="button"
                        className="job-role-edit-button"
                        onClick={() => onEdit(role)}
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        className="job-role-delete-button"
                        onClick={() => onDelete(role.id)}
                    >
                        Delete
                    </button>
                </div>
            </div>

            <div className="job-role-card-body">
                <span className="job-role-label">
                    CAREER ROLE
                </span>

                <h3>{role.roleName}</h3>

                <p>
                    {role.description ||
                        "No description added for this role yet."}
                </p>
            </div>

            <button
                type="button"
                className="manage-skills-button"
                onClick={() => onManageSkills(role)}
            >
                <span>Manage Required Skills</span>
                <span>→</span>
            </button>
        </article>
    );
};

export default JobRoleCard;