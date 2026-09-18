import { useEffect, useState } from "react";

const emptyForm = {
    name: "",
    description: "",
    website: "",
    location: "",
};

const CompanyForm = ({
    company,
    onSubmit,
    onCancel,
    loading,
}) => {
    const [formData, setFormData] =
        useState(emptyForm);

    useEffect(() => {
        if (company) {
            setFormData({
                name: company.name || "",
                description:
                    company.description || "",
                website:
                    company.website || "",
                location:
                    company.location || "",
            });
        } else {
            setFormData(emptyForm);
        }
    }, [company]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]:
                event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        onSubmit({
            name: formData.name.trim(),
            description:
                formData.description.trim(),
            website:
                formData.website.trim(),
            location:
                formData.location.trim(),
        });
    };

    const isEditing = Boolean(company);

    return (
        <form
            className="company-form"
            onSubmit={handleSubmit}
        >
            <div className="company-form-header">
                <div>
                    <span>
                        {isEditing
                            ? "EDIT COMPANY"
                            : "NEW COMPANY"}
                    </span>

                    <h2>
                        {isEditing
                            ? "Update company"
                            : "Add a company"}
                    </h2>
                </div>

                {onCancel && (
                    <button
                        type="button"
                        className="company-form-close"
                        onClick={onCancel}
                    >
                        ×
                    </button>
                )}
            </div>

            <div className="company-form-fields">

                <div className="company-form-field company-form-field-full">
                    <label htmlFor="company-name">
                        Company name
                        <span>*</span>
                    </label>

                    <input
                        id="company-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Google"
                        required
                    />
                </div>

                <div className="company-form-field">
                    <label htmlFor="company-location">
                        Location
                    </label>

                    <input
                        id="company-location"
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Pune, India"
                    />
                </div>

                <div className="company-form-field">
                    <label htmlFor="company-website">
                        Website
                    </label>

                    <input
                        id="company-website"
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://company.com"
                    />
                </div>

                <div className="company-form-field company-form-field-full">
                    <label htmlFor="company-description">
                        Description
                    </label>

                    <textarea
                        id="company-description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe the company..."
                        rows="4"
                    />
                </div>

            </div>

            <div className="company-form-actions">

                {onCancel && (
                    <button
                        type="button"
                        className="company-secondary-button"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                )}

                <button
                    type="submit"
                    className="company-primary-button"
                    disabled={loading}
                >
                    {loading
                        ? isEditing
                            ? "Updating..."
                            : "Creating..."
                        : isEditing
                            ? "Save changes"
                            : "Create company"}
                </button>

            </div>
        </form>
    );
};

export default CompanyForm;