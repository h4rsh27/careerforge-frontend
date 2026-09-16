const ProfileInfoCard = ({
    title,
    icon,
    items = [],
}) => {
    return (
        <section className="profile-info-card">
            <div className="profile-card-heading">
                <div className="profile-card-icon">
                    {icon}
                </div>

                <h2>{title}</h2>
            </div>

            <div className="profile-info-grid">
                {items.map((item) => (
                    <div
                        className="profile-info-item"
                        key={item.label}
                    >
                        <span>{item.label}</span>

                        <strong>
                            {item.value ||
                                "Not added yet"}
                        </strong>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProfileInfoCard;