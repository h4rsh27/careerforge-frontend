const JobListingForm = ({
    formData,
    setFormData,
    companies,
    roles,
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
        <form
            className="job-listing-form"
            onSubmit={onSubmit}
        >
            <div className="job-listing-form-header">
                <div>
                    <span className="companies-eyebrow">
                        {isEditing
                            ? "EDIT LISTING"
                            : "NEW LISTING"}
                    </span>

                    <h2>
                        {isEditing
                            ? "Update Job Listing"
                            : "Create Job Listing"}
                    </h2>

                    <p>
                        Publish an opportunity and connect it
                        to a CareerForge job role.
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

            <div className="job-listing-form-fields">

                <div className="job-listing-field job-listing-field-full">
                    <label htmlFor="jobTitle">
                        Job Title
                    </label>

                    <input
                        id="jobTitle"
                        name="jobTitle"
                        type="text"
                        placeholder="e.g. Java Backend Developer"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="job-listing-field">
                    <label htmlFor="companyId">
                        Company
                    </label>

                    <select
                        id="companyId"
                        name="companyId"
                        value={formData.companyId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">
                            Select company
                        </option>

                        {companies.map((company) => (
                            <option
                                key={company.id}
                                value={company.id}
                            >
                                {company.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="job-listing-field">
                    <label htmlFor="jobRoleId">
                        Job Role
                    </label>

                    <select
                        id="jobRoleId"
                        name="jobRoleId"
                        value={formData.jobRoleId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">
                            Select job role
                        </option>

                        {roles.map((role) => (
                            <option
                                key={role.id}
                                value={role.id}
                            >
                                {role.roleName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="job-listing-field">
                    <label htmlFor="location">
                        Location
                    </label>

                    <input
                        id="location"
                        name="location"
                        type="text"
                        placeholder="e.g. Pune, Maharashtra"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="job-listing-field">
                    <label htmlFor="salaryRange">
                        Salary Range
                    </label>

                    <input
                        id="salaryRange"
                        name="salaryRange"
                        type="text"
                        placeholder="e.g. ₹6 - ₹10 LPA"
                        value={formData.salaryRange}
                        onChange={handleChange}
                    />
                </div>

                <div className="job-listing-field">
                    <label htmlFor="experienceRequired">
                        Experience Required
                    </label>

                    <input
                        id="experienceRequired"
                        name="experienceRequired"
                        type="text"
                        placeholder="e.g. 0-2 years"
                        value={formData.experienceRequired}
                        onChange={handleChange}
                    />
                </div>

                <div className="job-listing-field">
                    <label htmlFor="employmentType">
                        Employment Type
                    </label>

                    <select
                        id="employmentType"
                        name="employmentType"
                        value={formData.employmentType}
                        onChange={handleChange}
                    >
                        <option value="">
                            Select type
                        </option>

                        <option value="FULL_TIME">
                            Full Time
                        </option>

                        <option value="PART_TIME">
                            Part Time
                        </option>

                        <option value="INTERNSHIP">
                            Internship
                        </option>

                        <option value="CONTRACT">
                            Contract
                        </option>
                    </select>
                </div>

                <div className="job-listing-field job-listing-field-full">
                    <label htmlFor="applicationUrl">
                        Application URL
                    </label>

                    <input
                        id="applicationUrl"
                        name="applicationUrl"
                        type="url"
                        placeholder="https://company.com/careers/job"
                        value={formData.applicationUrl}
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
                            ? "Update Listing"
                            : "Create Listing"}
                </button>
            </div>
        </form>
    );
};

export default JobListingForm;