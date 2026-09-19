const statusConfig = {
    SAVED: {
        label: "Saved",
        className: "application-status-saved",
    },

    APPLIED: {
        label: "Applied",
        className: "application-status-applied",
    },

    INTERVIEW: {
        label: "Interview",
        className: "application-status-interview",
    },

    OFFER: {
        label: "Offer",
        className: "application-status-offer",
    },

    REJECTED: {
        label: "Rejected",
        className: "application-status-rejected",
    },
};

const ApplicationStatusBadge = ({
    status,
}) => {
    const config =
        statusConfig[status] ||
        statusConfig.SAVED;

    return (
        <span
            className={`application-status-badge ${config.className}`}
        >
            <span className="application-status-dot"></span>

            {config.label}
        </span>
    );
};

export default ApplicationStatusBadge;