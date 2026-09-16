const DashboardStats = ({
    skillsCount,
    hasResume,
    jobsCount,
    applicationsCount,
}) => {
    const stats = [
        {
            label: "Skills",
            value: skillsCount,
            icon: "✦",
            description:
                "Skills in your profile",
        },
        {
            label: "Resume",
            value: hasResume
                ? "READY"
                : "MISSING",
            icon: "▣",
            description:
                hasResume
                    ? "Resume connected"
                    : "Upload your resume",
        },
        {
            label: "Opportunities",
            value: jobsCount,
            icon: "◈",
            description:
                "Personalized matches",
        },
        {
            label: "Applications",
            value: applicationsCount,
            icon: "↗",
            description:
                "Tracked applications",
        },
    ];

    return (
        <section className="dashboard-stats">
            {stats.map((stat) => (
                <div
                    className="dashboard-stat-card"
                    key={stat.label}
                >
                    <div className="dashboard-stat-top">
                        <div className="dashboard-stat-icon">
                            {stat.icon}
                        </div>

                        <span>
                            {stat.label}
                        </span>
                    </div>

                    <strong className="dashboard-stat-value">
                        {stat.value}
                    </strong>

                    <p>
                        {stat.description}
                    </p>
                </div>
            ))}
        </section>
    );
};

export default DashboardStats;