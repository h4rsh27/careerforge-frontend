const CompanyCard = ({
    company,
    onEdit,
    onDelete,
}) => {
    const initials = (company.name || "C")
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <article className="company-card">

            <div className="company-card-top">

                <div className="company-logo">
                    {initials}
                </div>

                <div className="company-card-actions">

                    <button
                        type="button"
                        onClick={() =>
                            onEdit(company)
                        }
                        title="Edit company"
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        className="company-delete-button"
                        onClick={() =>
                            onDelete(company)
                        }
                        title="Delete company"
                    >
                        Delete
                    </button>

                </div>

            </div>

            <div className="company-card-body">

                <h3>
                    {company.name}
                </h3>

                <div className="company-location">
                    <span>⌖</span>

                    {company.location ||
                        "Location not specified"}
                </div>

                <p>
                    {company.description ||
                        "No company description has been added yet."}
                </p>

            </div>

            {company.website && (
                <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="company-website"
                >
                    Visit website
                    <span>↗</span>
                </a>
            )}

        </article>
    );
};

export default CompanyCard;