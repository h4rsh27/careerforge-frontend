const RoadmapOverview = ({ roadmap }) => {

    const steps =
        roadmap?.steps ||
        roadmap?.roadmapSteps ||
        roadmap?.learningSteps ||
        roadmap?.roadmap ||
        [];

    const completedSteps = steps.filter(
        (step) =>
            step.completed === true ||
            step.status === "COMPLETED"
    ).length;

    const progress =
        steps.length > 0
            ? Math.round((completedSteps / steps.length) * 100)
            : 0;

    return (
        <div className="roadmap-overview">

            <div className="roadmap-overview-main">
                <span className="roadmap-card-label">
                    ROADMAP
                </span>

                <h2>
                    {roadmap?.jobRole ||
                        roadmap?.jobRoleName ||
                        "Your Career Path"}
                </h2>

                <p>
                    Build the skills required for your target role
                    through a structured learning journey.
                </p>
            </div>

            <div className="roadmap-progress">

                <div className="roadmap-progress-top">
                    <span>Progress</span>
                    <strong>{progress}%</strong>
                </div>

                <div className="roadmap-progress-bar">
                    <div
                        className="roadmap-progress-fill"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <small>
                    {completedSteps} of {steps.length} steps completed
                </small>

            </div>

        </div>
    );
};

export default RoadmapOverview;