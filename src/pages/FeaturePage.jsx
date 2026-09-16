import { Link, useLocation } from "react-router-dom";

const FeaturePage = () => {

    const location = useLocation();

    const featureName =
        location.pathname
            .split("/")
            .pop()
            .replace("-", " ");

    return (
        <div className="dashboard-page">

            <h1>
                {featureName.charAt(0).toUpperCase()
                    + featureName.slice(1)}
            </h1>

            <p>
                This CareerForge feature is ready for
                frontend implementation.
            </p>

            <Link to="/student/dashboard">
                ← Back to Dashboard
            </Link>

        </div>
    );
};

export default FeaturePage;