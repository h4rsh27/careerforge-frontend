const DashboardHero = ({
    user,
    profileCompletion,
}) => {
    const firstName =
        user?.name?.split(" ")[0] ||
        "there";

    return (
        <section className="dashboard-hero">
            <div className="dashboard-hero-glow"></div>

            <div className="dashboard-hero-content">
                <span className="dashboard-eyebrow">
                    CAREERFORGE / COMMAND CENTER
                </span>

                <h1>
                    Welcome back,{" "}
                    <em>{firstName}.</em>
                </h1>

                <p>
                    Your career journey is taking shape.
                    Track your progress, discover
                    opportunities and close the gaps
                    between where you are and where you
                    want to be.
                </p>
            </div>

            <div className="dashboard-profile-progress">
                <div
                    className="dashboard-progress-ring"
                    style={{
                        "--progress":
                            `${profileCompletion}%`,
                    }}
                >
                    <strong>
                        {profileCompletion}%
                    </strong>

                    <span>PROFILE</span>
                </div>

                <div>
                    <strong>
                        Profile strength
                    </strong>

                    <p>
                        {profileCompletion >= 80
                            ? "Your profile is looking strong."
                            : "Complete your profile to improve personalization."}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default DashboardHero;