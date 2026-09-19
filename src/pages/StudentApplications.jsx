import { useEffect, useMemo, useState } from "react";

import {
    getMyApplications,
    updateApplicationStatus,
    deleteApplication,
} from "../api/applicationApi";

import ApplicationCard from "../components/applications/ApplicationCard";

const StudentApplications = () => {

    const [applications, setApplications] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [refreshing, setRefreshing] =
        useState(false);

    const [error, setError] =
        useState("");

    const [updatingId, setUpdatingId] =
        useState(null);

    const [deletingId, setDeletingId] =
        useState(null);


    const loadApplications = async (
        isRefresh = false
    ) => {

        try {

            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError("");

            const data =
                await getMyApplications();

            setApplications(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (err) {

            setError(
                err.response?.data?.message ||
                    "Unable to load your applications."
            );

        } finally {

            setLoading(false);
            setRefreshing(false);

        }
    };


    useEffect(() => {
        loadApplications();
    }, []);


    const statistics = useMemo(() => {

        return {
            total: applications.length,

            saved: applications.filter(
                (application) =>
                    application.status === "SAVED"
            ).length,

            applied: applications.filter(
                (application) =>
                    application.status === "APPLIED"
            ).length,

            interview: applications.filter(
                (application) =>
                    application.status === "INTERVIEW"
            ).length,

            offer: applications.filter(
                (application) =>
                    application.status === "OFFER"
            ).length,

            rejected: applications.filter(
                (application) =>
                    application.status === "REJECTED"
            ).length,
        };

    }, [applications]);


    const handleStatusChange = async (
        applicationId,
        status
    ) => {

        try {

            setUpdatingId(applicationId);
            setError("");

            const updated =
                await updateApplicationStatus(
                    applicationId,
                    status
                );

            setApplications((current) =>
                current.map((application) =>
                    application.id ===
                    applicationId
                        ? updated
                        : application
                )
            );

        } catch (err) {

            setError(
                err.response?.data?.message ||
                    "Unable to update application status."
            );

        } finally {

            setUpdatingId(null);

        }
    };


    const handleDelete = async (
        applicationId
    ) => {

        const confirmed =
            window.confirm(
                "Remove this application from your tracker?"
            );

        if (!confirmed) {
            return;
        }

        try {

            setDeletingId(applicationId);
            setError("");

            await deleteApplication(
                applicationId
            );

            setApplications((current) =>
                current.filter(
                    (application) =>
                        application.id !==
                        applicationId
                )
            );

        } catch (err) {

            setError(
                err.response?.data?.message ||
                    "Unable to remove application."
            );

        } finally {

            setDeletingId(null);

        }
    };


    return (
        <main className="applications-page">

            <div className="applications-background"></div>

            <div className="applications-content">

                <header className="applications-header">

                    <div>

                        <span className="applications-eyebrow">
                            CAREERFORGE / APPLICATIONS
                        </span>

                        <h1>
                            Your application
                            <span>
                                journey.
                            </span>
                        </h1>

                        <p>
                            Track every opportunity
                            from saved job to final
                            outcome in one place.
                        </p>

                    </div>

                    <button
                        type="button"
                        className="applications-refresh-button"
                        onClick={() =>
                            loadApplications(true)
                        }
                        disabled={refreshing}
                    >
                        {refreshing
                            ? "Refreshing..."
                            : "↻ Refresh"}
                    </button>

                </header>


                {error && (
                    <div className="applications-alert">
                        <span>!</span>
                        <p>{error}</p>
                    </div>
                )}


                <section className="applications-stat-grid">

                    <div className="application-stat-card">
                        <span>Total</span>
                        <strong>
                            {statistics.total}
                        </strong>
                    </div>

                    <div className="application-stat-card">
                        <span>Saved</span>
                        <strong>
                            {statistics.saved}
                        </strong>
                    </div>

                    <div className="application-stat-card">
                        <span>Applied</span>
                        <strong>
                            {statistics.applied}
                        </strong>
                    </div>

                    <div className="application-stat-card">
                        <span>Interviews</span>
                        <strong>
                            {statistics.interview}
                        </strong>
                    </div>

                    <div className="application-stat-card">
                        <span>Offers</span>
                        <strong>
                            {statistics.offer}
                        </strong>
                    </div>

                </section>


                <section className="applications-list-section">

                    <div className="applications-section-heading">

                        <div>

                            <span>
                                OPPORTUNITY TRACKER
                            </span>

                            <h2>
                                Your applications
                            </h2>

                        </div>

                        <p>
                            Keep your job search
                            organized and up to date.
                        </p>

                    </div>


                    {loading ? (

                        <div className="applications-loading">

                            <div className="loading-spinner"></div>

                            <h2>
                                Loading applications
                            </h2>

                            <p>
                                Preparing your
                                opportunity tracker...
                            </p>

                        </div>

                    ) : applications.length === 0 ? (

                        <div className="applications-empty">

                            <div className="applications-empty-icon">
                                ↗
                            </div>

                            <span>
                                NO APPLICATIONS YET
                            </span>

                            <h2>
                                Your next opportunity
                                starts here.
                            </h2>

                            <p>
                                Explore your personalized
                                job recommendations and
                                save the opportunities
                                you want to track.
                            </p>

                        </div>

                    ) : (

                        <div className="applications-list">

                            {applications.map(
                                (application) => (
                                    <ApplicationCard
                                        key={
                                            application.id
                                        }
                                        application={
                                            application
                                        }
                                        onStatusChange={
                                            handleStatusChange
                                        }
                                        onDelete={
                                            handleDelete
                                        }
                                        updating={
                                            updatingId ===
                                            application.id
                                        }
                                        deleting={
                                            deletingId ===
                                            application.id
                                        }
                                    />
                                )
                            )}

                        </div>

                    )}

                </section>

            </div>

        </main>
    );
};

export default StudentApplications;