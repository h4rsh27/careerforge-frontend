import ApplicationStatusBadge from "./ApplicationStatusBadge";

const ApplicationCard = ({
    application,
    onStatusChange,
    onDelete,
    updating,
    deleting,
}) => {
    const formatDate = (date) => {
        if (!date) {
            return "—";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    return (
        <article className="application-card">

            <div className="application-card-top">

                <div className="application-company-mark">
                    {application.companyName
                        ?.charAt(0)
                        ?.toUpperCase() || "C"}
                </div>

                <div className="application-heading">

                    <span className="application-company">
                        {application.companyName}
                    </span>

                    <h3>
                        {application.jobTitle}
                    </h3>

                </div>

                <ApplicationStatusBadge
                    status={application.status}
                />

            </div>

            <div className="application-meta">

                <span>
                    <strong>Location</strong>
                    {application.location || "Not specified"}
                </span>

                <span>
                    <strong>Applied</strong>
                    {formatDate(
                        application.appliedAt
                    )}
                </span>

                <span>
                    <strong>Updated</strong>
                    {formatDate(
                        application.updatedAt
                    )}
                </span>

            </div>

            <div className="application-actions">

                <label className="application-status-control">

                    <span>
                        Update status
                    </span>

                    <select
                        value={
                            application.status
                        }
                        disabled={updating}
                        onChange={(event) =>
                            onStatusChange(
                                application.id,
                                event.target.value
                            )
                        }
                    >
                        <option value="SAVED">
                            Saved
                        </option>

                        <option value="APPLIED">
                            Applied
                        </option>

                        <option value="INTERVIEW">
                            Interview
                        </option>

                        <option value="OFFER">
                            Offer
                        </option>

                        <option value="REJECTED">
                            Rejected
                        </option>
                    </select>

                </label>

                <div className="application-action-buttons">

                    {application.applicationUrl && (
                        <a
                            href={
                                application.applicationUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="application-open-button"
                        >
                            Open Job ↗
                        </a>
                    )}

                    <button
                        type="button"
                        className="application-delete-button"
                        disabled={deleting}
                        onClick={() =>
                            onDelete(
                                application.id
                            )
                        }
                    >
                        {deleting
                            ? "Deleting..."
                            : "Remove"}
                    </button>

                </div>

            </div>

        </article>
    );
};

export default ApplicationCard;