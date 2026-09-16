import { Link } from "react-router-dom";

const DashboardSkillGap = ({
    message,
}) => {
    return (
        <section className="dashboard-panel dashboard-gap-panel">
            <div className="dashboard-panel-heading">
                <div>
                    <span>
                        CAREER INTELLIGENCE
                    </span>

                    <h2>
                        Skill Gap
                    </h2>
                </div>

                <Link to="/student/skill-gap">
                    Analyze →
                </Link>
            </div>

            <div className="dashboard-gap-visual">
                <div className="dashboard-gap-orbit">
                    <span>✦</span>
                </div>

                <div>
                    <strong>
                        Your next skill matters.
                    </strong>

                    <p>
                        {message ||
                            "Select a target role to discover the skills you need to develop."}
                    </p>
                </div>
            </div>

            <Link
                to="/student/skill-gap"
                className="dashboard-action-link"
            >
                Open Skill Gap Analysis →
            </Link>
        </section>
    );
};

export default DashboardSkillGap;