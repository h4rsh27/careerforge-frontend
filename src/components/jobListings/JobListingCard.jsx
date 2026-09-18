const JobListingCard = ({
    listing,
    onEdit,
    onDelete,
}) => {

    const companyInitials = listing.companyName
        ?.split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <article className="job-listing-card">

            <div className="job-listing-card-top">

                <div className="job-listing-company-icon">
                    {companyInitials || "CO"}
                </div>

                <div className="job-listing-actions">

                    <button
                        type="button"
                        onClick={() => onEdit(listing)}
                        className="job-listing-edit-button"
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete(listing.id)}
                        className="job-listing-delete-button"
                    >
                        Delete
                    </button>

                </div>

            </div>

            <div className="job-listing-card-body">

                <span className="job-listing-company">
                    {listing.companyName}
                </span>

                <h3>
                    {listing.jobTitle}
                </h3>

                <span className="job-listing-role">
                    {listing.jobRole}
                </span>

                <div className="job-listing-meta">

                    {listing.location && (
                        <span>
                            <b>⌖</b>
                            {listing.location}
                        </span>
                    )}

                    {listing.employmentType && (
                        <span>
                            <b>◈</b>
                            {listing.employmentType
                                .replaceAll("_", " ")}
                        </span>
                    )}

                    {listing.experienceRequired && (
                        <span>
                            <b>◷</b>
                            {listing.experienceRequired}
                        </span>
                    )}

                </div>

                {listing.salaryRange && (
                    <div className="job-listing-salary">
                        <span>Salary</span>
                        <strong>
                            {listing.salaryRange}
                        </strong>
                    </div>
                )}

            </div>

            {listing.applicationUrl && (
                <a
                    href={listing.applicationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="job-listing-apply-link"
                >
                    <span>View Application</span>
                    <span>↗</span>
                </a>
            )}

        </article>
    );
};

export default JobListingCard;