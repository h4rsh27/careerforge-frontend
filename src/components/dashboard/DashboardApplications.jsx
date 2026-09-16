import { Link } from "react-router-dom";

const DashboardApplications = ({
    analytics,
}) => {
    const data = analytics || {};

    const items = [
        {
            label: "Saved",
            value:
                data.savedApplications || 0,
        },
        {
            label: "Applied",
            value:
                data.appliedApplications || 0,
        },
        {
            label: "Interview",
            value:
                data.interviews || 0,
        },
        {
            label: "Offers",
            value:
                data.offers || 0,
        },
    ];

    return (
        <section className="dashboard-panel dashboard-applications-panel">
            <div className="dashboard-panel-heading">
                <div>
                    <span>
                        APPLICATION TRACKER
                    </span>

                    <h2>
                        Your applications
                    </h2>
                </div>

                <Link to="/student/applications">
                    Track →
                </Link>
            </div>

            <div className="dashboard-application-stats">
                {items.map((item) => (
                    <div
                        key={item.label}
                        className="dashboard-application-stat"
                    >
                        <strong>
                            {item.value}
                        </strong>

                        <span>
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default DashboardApplications;