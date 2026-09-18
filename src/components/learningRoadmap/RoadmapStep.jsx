const RoadmapStep = ({ step, index }) => {

    const title =
        step.title ||
        step.skill ||
        step.topic ||
        step.name ||
        `Learning Step ${index + 1}`;

    const description =
        step.description ||
        step.details ||
        step.reason ||
        "Learn and practice this skill as part of your career roadmap.";

    const difficulty =
        step.difficulty ||
        step.level ||
        "Core";

    const duration =
        step.duration ||
        step.estimatedTime ||
        "";

    const completed =
        step.completed === true ||
        step.status === "COMPLETED";

    return (
        <div
            className={`roadmap-step ${
                completed ? "roadmap-step-completed" : ""
            }`}
        >

            <div className="roadmap-step-number">
                {completed ? "✓" : index + 1}
            </div>

            <div className="roadmap-step-content">

                <div className="roadmap-step-top">

                    <div>
                        <span className="roadmap-step-label">
                            STEP {index + 1}
                        </span>

                        <h3>{title}</h3>
                    </div>

                    <span className="roadmap-difficulty">
                        {difficulty}
                    </span>

                </div>

                <p>
                    {description}
                </p>

                {duration && (
                    <div className="roadmap-duration">
                        ⏱ {duration}
                    </div>
                )}

            </div>

        </div>
    );
};

export default RoadmapStep;