import RoadmapStep from "./RoadmapStep";

const RoadmapTimeline = ({ roadmap }) => {

    const steps =
        roadmap?.steps ||
        roadmap?.roadmapSteps ||
        roadmap?.learningSteps ||
        roadmap?.roadmap ||
        [];

    if (!steps.length) {
        return (
            <div className="roadmap-empty">
                <div className="roadmap-empty-icon">
                    ✦
                </div>

                <h3>
                    No roadmap steps available
                </h3>

                <p>
                    There are currently no learning steps available
                    for this role.
                </p>
            </div>
        );
    }

    return (
        <div className="roadmap-timeline">

            <div className="roadmap-timeline-line" />

            {steps.map((step, index) => (
                <RoadmapStep
                    key={step.id || index}
                    step={step}
                    index={index}
                />
            ))}

        </div>
    );
};

export default RoadmapTimeline;