import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const AdminDashboard = () => {

    const [dashboard, setDashboard] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await api.get(
                        "/admin/dashboard"
                    );

                setDashboard(
                    response.data
                );

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
        return (
            <main className="admin-dashboard-page">

                <div className="admin-dashboard-loading">

                    <div className="admin-loading-spinner"></div>

                    <h2>
                        Loading command center
                    </h2>

                    <p>
                        Gathering CareerForge platform data...
                    </p>

                </div>

            </main>
        );
    }

    if (error) {
        return (
            <main className="admin-dashboard-page">

                <div className="admin-dashboard-error">

                    <div>!</div>

                    <h2>
                        Something went wrong
                    </h2>

                    <p>
                        {error}
                    </p>

                </div>

            </main>
        );
    }

    const stats = [
        {
            label: "Students",
            value:
                dashboard?.totalStudents ?? 0,
            icon: "◎",
        },
        {
            label: "Companies",
            value:
                dashboard?.totalCompanies ?? 0,
            icon: "▣",
        },
        {
            label: "Job Roles",
            value:
                dashboard?.totalJobRoles ?? 0,
            icon: "◇",
        },
        {
            label: "Job Listings",
            value:
                dashboard?.totalJobListings ?? 0,
            icon: "◈",
        },
    ];

    const applicationStats = [
        {
            label: "Saved",
            value:
                dashboard?.savedApplications ?? 0,
        },
        {
            label: "Applied",
            value:
                dashboard?.appliedApplications ?? 0,
        },
        {
            label: "Interviews",
            value:
                dashboard?.interviews ?? 0,
        },
        {
            label: "Offers",
            value:
                dashboard?.offers ?? 0,
        },
        {
            label: "Rejected",
            value:
                dashboard?.rejectedApplications ?? 0,
        },
    ];

    return (
        <main className="admin-dashboard-page">

            <div className="admin-dashboard-background"></div>

            <div className="admin-dashboard-content">

                {/* HERO */}

                <section className="admin-dashboard-hero">

                    <div className="admin-hero-grid"></div>

                    <div className="admin-hero-content">

                        <span className="admin-eyebrow">
                            CAREERFORGE / ADMIN COMMAND CENTER
                        </span>

                        <h1>
                            Platform overview.
                        </h1>

                        <p>
                            Manage the CareerForge ecosystem,
                            monitor opportunities and keep the
                            career intelligence engine supplied
                            with quality data.
                        </p>

                    </div>

                    <div className="admin-status">

                        <span className="admin-status-dot"></span>

                        <span>
                            SYSTEM OPERATIONAL
                        </span>

                    </div>

                </section>

                {/* PLATFORM STATS */}

                <section className="admin-stat-grid">

                    {stats.map((stat) => (
                        <div
                            className="admin-stat-card"
                            key={stat.label}
                        >

                            <div className="admin-stat-header">

                                <div className="admin-stat-icon">
                                    {stat.icon}
                                </div>

                                <span>
                                    {stat.label}
                                </span>

                            </div>

                            <strong>
                                {stat.value}
                            </strong>

                            <p>
                                Active platform records
                            </p>

                        </div>
                    ))}

                </section>

                {/* MAIN GRID */}

                <section className="admin-dashboard-grid">

                    {/* APPLICATION PIPELINE */}

                    <div className="admin-panel">

                        <div className="admin-panel-heading">

                            <div>
                                <span>
                                    APPLICATION PIPELINE
                                </span>

                                <h2>
                                    Candidate activity
                                </h2>
                            </div>

                            <Link to="/admin/dashboard">
                                Overview
                            </Link>

                        </div>

                        <div className="admin-application-list">

                            {applicationStats.map(
                                (item, index) => {

                                    const total =
                                        dashboard?.totalApplications ||
                                        0;

                                    const percentage =
                                        total > 0
                                            ? Math.round(
                                                (item.value /
                                                    total) *
                                                100
                                            )
                                            : 0;

                                    return (
                                        <div
                                            className="admin-application-row"
                                            key={item.label}
                                        >

                                            <div className="admin-application-label">

                                                <span className="admin-pipeline-number">
                                                    {String(
                                                        index + 1
                                                    ).padStart(
                                                        2,
                                                        "0"
                                                    )}
                                                </span>

                                                <strong>
                                                    {item.label}
                                                </strong>

                                            </div>

                                            <div className="admin-application-bar">

                                                <div
                                                    style={{
                                                        width: `${percentage}%`,
                                                    }}
                                                ></div>

                                            </div>

                                            <strong className="admin-application-value">
                                                {item.value}
                                            </strong>

                                        </div>
                                    );
                                }
                            )}

                        </div>

                        <div className="admin-total-applications">

                            <div>

                                <span>
                                    TOTAL APPLICATIONS
                                </span>

                                <strong>
                                    {dashboard?.totalApplications ?? 0}
                                </strong>

                            </div>

                            <span className="admin-total-caption">
                                Across all students
                            </span>

                        </div>

                    </div>

                    {/* QUICK ACTIONS */}

                    <div className="admin-panel">

                        <div className="admin-panel-heading">

                            <div>
                                <span>
                                    PLATFORM MANAGEMENT
                                </span>

                                <h2>
                                    Quick actions
                                </h2>
                            </div>

                        </div>

                        <div className="admin-action-grid">

                            <Link
                                to="/admin/companies"
                                className="admin-action-card"
                            >

                                <span className="admin-action-icon">
                                    ▣
                                </span>

                                <div>
                                    <strong>
                                        Companies
                                    </strong>

                                    <small>
                                        Manage employers
                                    </small>
                                </div>

                                <span className="admin-action-arrow">
                                    →
                                </span>

                            </Link>

                            <Link
                                to="/admin/job-roles"
                                className="admin-action-card"
                            >

                                <span className="admin-action-icon">
                                    ◇
                                </span>

                                <div>
                                    <strong>
                                        Job Roles
                                    </strong>

                                    <small>
                                        Roles & required skills
                                    </small>
                                </div>

                                <span className="admin-action-arrow">
                                    →
                                </span>

                            </Link>

                            <Link
                                to="/admin/jobs"
                                className="admin-action-card"
                            >

                                <span className="admin-action-icon">
                                    ◈
                                </span>

                                <div>
                                    <strong>
                                        Job Listings
                                    </strong>

                                    <small>
                                        Publish opportunities
                                    </small>
                                </div>

                                <span className="admin-action-arrow">
                                    →
                                </span>

                            </Link>

                        </div>

                    </div>

                </section>

                {/* PLATFORM HEALTH */}

                <section className="admin-platform-summary">

                    <div className="admin-summary-item">

                        <span>
                            JOB MARKET
                        </span>

                        <strong>
                            {dashboard?.totalJobListings ?? 0}
                        </strong>

                        <small>
                            active listings
                        </small>

                    </div>

                    <div className="admin-summary-divider"></div>

                    <div className="admin-summary-item">

                        <span>
                            TALENT POOL
                        </span>

                        <strong>
                            {dashboard?.totalStudents ?? 0}
                        </strong>

                        <small>
                            registered students
                        </small>

                    </div>

                    <div className="admin-summary-divider"></div>

                    <div className="admin-summary-item">

                        <span>
                            EMPLOYER NETWORK
                        </span>

                        <strong>
                            {dashboard?.totalCompanies ?? 0}
                        </strong>

                        <small>
                            companies
                        </small>

                    </div>

                    <div className="admin-summary-divider"></div>

                    <div className="admin-summary-item">

                        <span>
                            CAREER ROLES
                        </span>

                        <strong>
                            {dashboard?.totalJobRoles ?? 0}
                        </strong>

                        <small>
                            configured roles
                        </small>

                    </div>

                </section>

            </div>

        </main>
    );
};

export default AdminDashboard;