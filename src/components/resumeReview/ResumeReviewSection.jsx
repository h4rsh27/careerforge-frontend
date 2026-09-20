const ResumeReviewSection = ({
    title,
    icon,
    items = [],
    emptyMessage = "No information available."
}) => {

    return (
        <section className="resume-review-section">

            <div className="resume-section-heading">
                <div className="resume-section-icon">
                    {icon}
                </div>

                <h2>{title}</h2>
            </div>

            {items.length > 0 ? (
                <ul className="resume-review-list">
                    {items.map((item, index) => (
                        <li key={`${title}-${index}`}>
                            <span className="list-marker">
                                ✓
                            </span>

                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="resume-review-empty">
                    {emptyMessage}
                </div>
            )}

        </section>
    );
};

export default ResumeReviewSection;