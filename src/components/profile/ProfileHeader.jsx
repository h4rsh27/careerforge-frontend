const ProfileHeader = ({
    user,
    completionPercentage,
    onEdit,
}) => {
    const name = user?.name || "CareerForge Student";

    const initials = name
        .split(" ")
        .filter(Boolean)
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <section className="profile-header">
            <div className="profile-header-glow"></div>

            <div className="profile-avatar">
                {initials}
            </div>

            <div className="profile-header-content">
                <span className="profile-label">
                    CAREER PROFILE
                </span>

                <h1>{name}</h1>

                <p>
                    Build your profile and let CareerForge
                    understand your career journey.
                </p>
            </div>

            <div className="profile-completion">
                <div
                    className="completion-ring"
                    style={{
                        "--completion":
                            `${completionPercentage}%`,
                    }}
                >
                    <span>{completionPercentage}%</span>
                </div>

                <div>
                    <strong>Profile Complete</strong>

                    <small>
                        Keep your profile updated
                    </small>
                </div>
            </div>

            <button
                type="button"
                className="profile-edit-button"
                onClick={onEdit}
            >
                <span>✦</span>
                Edit Profile
            </button>
        </section>
    );
};

export default ProfileHeader;