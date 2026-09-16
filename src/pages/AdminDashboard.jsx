import { useEffect, useState } from "react";
import api from "../api/axios";

const AdminDashboard = () => {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                const response =
                    await api.get("/admin/dashboard");

                setDashboard(response.data);

            } catch (error) {

                setError(
                    "Unable to load admin dashboard."
                );

            } finally {
                setLoading(false);
            }
        };

        loadDashboard();

    }, []);

    if (loading) {
        return <p>Loading dashboard...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="dashboard">

            <h1>Admin Dashboard</h1>

            <p>
                CareerForge platform overview
            </p>

            <section className="dashboard-grid">

                <div className="dashboard-card">
                    <h3>Students</h3>
                    <strong>
                        {dashboard?.totalStudents}
                    </strong>
                </div>

                <div className="dashboard-card">
                    <h3>Companies</h3>
                    <strong>
                        {dashboard?.totalCompanies}
                    </strong>
                </div>

                <div className="dashboard-card">
                    <h3>Job Roles</h3>
                    <strong>
                        {dashboard?.totalJobRoles}
                    </strong>
                </div>

                <div className="dashboard-card">
                    <h3>Job Listings</h3>
                    <strong>
                        {dashboard?.totalJobListings}
                    </strong>
                </div>

                <div className="dashboard-card">
                    <h3>Total Applications</h3>
                    <strong>
                        {dashboard?.totalApplications}
                    </strong>
                </div>

                <div className="dashboard-card">
                    <h3>Interviews</h3>
                    <strong>
                        {dashboard?.interviews}
                    </strong>
                </div>

                <div className="dashboard-card">
                    <h3>Offers</h3>
                    <strong>
                        {dashboard?.offers}
                    </strong>
                </div>

                <div className="dashboard-card">
                    <h3>Rejected</h3>
                    <strong>
                        {dashboard?.rejectedApplications}
                    </strong>
                </div>

            </section>

        </div>
    );
};

export default AdminDashboard;