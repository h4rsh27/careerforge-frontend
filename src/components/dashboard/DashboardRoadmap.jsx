import { Link } from "react-router-dom";

const DashboardRoadmap = ({
    roadmap = [],
}) => {
    const visibleItems =
        roadmap.slice(0, 4);

    return (
        <section className="dashboard-panel dashboard-roadmap-panel">
            <div className="dashboard-panel-heading">
                <div>
                    <span>
                        PERSONALIZED LEARNING
                    </span>

                    <h2>
                        Your roadmap
                    </h2>
                </div>

                <Link to="/student/roadmap">
                    Open →
                </Link>
            </div>

            {visibleItems.length === 0 ? (
                <div className="dashboard-panel-empty">
                    <div>◇</div>

                    <p>
                        Your personalized roadmap
                        will appear after you select
                        a target job role.
                    </p>
                </div>
            ) : (
                <div className="dashboard-roadmap-list">
                    {visibleItems.map(
                        (item, index) => (
                            <div
                                className="dashboard-roadmap-item"
                                key={`${item.skillName}-${index}`}
                            >
                                <div className="roadmap-number">
                                    {String(
                                        index + 1
                                    ).padStart(
                                        2,
                                        "0"
                                    )}
                                </div>

                                <div className="roadmap-line"></div>

                                <div className="roadmap-content">
                                    <strong>
                                        {
                                            item.skillName
                                        }
                                    </strong>

                                    <span>
                                        {
                                            item.priority
                                        }{" "}
                                        PRIORITY
                                    </span>
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}
        </section>
    );
};

export default DashboardRoadmap;