const ProfileEditForm = ({
    formData,
    user,
    onChange,
    onSubmit,
    onCancel,
    saving,
}) => {
    return (
        <form
            className="profile-edit-form"
            onSubmit={onSubmit}
        >
            <div className="profile-form-heading">
                <span>PROFILE SETTINGS</span>

                <h2>Build your career profile</h2>

                <p>
                    Keep your information accurate so
                    CareerForge can personalize your career
                    recommendations.
                </p>
            </div>

            <div className="profile-form-grid">

                {/* Account Email */}

                <div className="profile-field profile-field-full">
                    <label>
                        Account Email
                    </label>

                    <input
                        type="email"
                        value={user?.email || ""}
                        readOnly
                        disabled
                    />

                    <small className="profile-field-hint">
                        Your account email is managed through
                        your CareerForge account.
                    </small>
                </div>

                {/* Phone */}

                <div className="profile-field">
                    <label>
                        Phone
                    </label>

                    <input
                        type="text"
                        name="phone"
                        value={formData.phone || ""}
                        onChange={onChange}
                        placeholder="Enter phone number"
                    />
                </div>

                {/* College */}

                <div className="profile-field">
                    <label>
                        College
                    </label>

                    <input
                        type="text"
                        name="college"
                        value={formData.college || ""}
                        onChange={onChange}
                        placeholder="Enter college name"
                    />
                </div>

                {/* Degree */}

                <div className="profile-field">
                    <label>
                        Degree
                    </label>

                    <input
                        type="text"
                        name="degree"
                        value={formData.degree || ""}
                        onChange={onChange}
                        placeholder="e.g. B.E."
                    />
                </div>

                {/* Branch */}

                <div className="profile-field">
                    <label>
                        Branch
                    </label>

                    <input
                        type="text"
                        name="branch"
                        value={formData.branch || ""}
                        onChange={onChange}
                        placeholder="e.g. Computer Engineering"
                    />
                </div>

                {/* Graduation Year */}

                <div className="profile-field">
                    <label>
                        Graduation Year
                    </label>

                    <input
                        type="number"
                        name="graduationYear"
                        value={
                            formData.graduationYear || ""
                        }
                        onChange={onChange}
                        placeholder="e.g. 2027"
                    />
                </div>

                {/* Location */}

                <div className="profile-field">
                    <label>
                        Location
                    </label>

                    <input
                        type="text"
                        name="location"
                        value={formData.location || ""}
                        onChange={onChange}
                        placeholder="e.g. Pune, Maharashtra"
                    />
                </div>

                {/* Bio */}

                <div className="profile-field profile-field-full">
                    <label>
                        About You
                    </label>

                    <textarea
                        name="bio"
                        value={formData.bio || ""}
                        onChange={onChange}
                        placeholder="Tell CareerForge about your interests, goals, experience and what you want to achieve..."
                        rows="5"
                    />
                </div>
            </div>

            <div className="profile-form-actions">
                <button
                    type="button"
                    className="profile-cancel-button"
                    onClick={onCancel}
                    disabled={saving}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="profile-save-button"
                    disabled={saving}
                >
                    {saving
                        ? "Saving..."
                        : "Save Changes →"}
                </button>
            </div>
        </form>
    );
};

export default ProfileEditForm;