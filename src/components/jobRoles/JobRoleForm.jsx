const JobRoleForm = ({
    formData,
    setFormData,
    onSubmit,
    onCancel,
    isEditing,
    loading,
}) => {
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    return (
        <form className="job-role-form" onSubmit={onSubmit}>
            <div className="job-role-form-header">
                <div>
                    <span className="companies-eyebrow">
                        {isEditing ? "EDIT ROLE" : "NEW ROLE"}
                    </span>

                    <h2>
                        {isEditing
                            ? "Update Job Role"
                            : "Create Job Role"}
                    </h2>

                    <p>
                        Define a career role and its description.
                    </p>
                </div>

                <button
                    type="button"
                    className="job-role-form-close"
                    onClick={onCancel}
                >
                    ×
                </button>
            </div>

            <div className="job-role-form-fields">
                <div className="job-role-field job-role-field-full">
                    <label htmlFor="roleName">
                        Role Name
                    </label>

                    <input
                        id="roleName"
                        name="roleName"
                        type="text"
                        placeholder="e.g. Java Backend Developer"
                        value={formData.roleName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="job-role-field job-role-field-full">
                    <label htmlFor="description">
                        Description
                    </label>

                    <textarea
                        id="description"
                        name="description"
                        rows="5"
                        placeholder="Describe the responsibilities and expectations..."
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="job-role-form-actions">
                <button
                    type="button"
                    className="company-secondary-button"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="company-primary-button"
                    disabled={loading}
                >
                    {loading
                        ? "Saving..."
                        : isEditing
                            ? "Update Role"
                            : "Create Role"}
                </button>
            </div>
        </form>
    );
};

export default JobRoleForm;