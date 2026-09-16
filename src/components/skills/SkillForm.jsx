const SkillForm = ({
    formData,
    editing,
    saving,
    onChange,
    onSubmit,
    onCancel,
}) => {
    return (
        <section className="skill-form-card">
            <div className="skill-form-heading">
                <span>
                    {editing
                        ? "UPDATE SKILL"
                        : "ADD NEW SKILL"}
                </span>

                <h2>
                    {editing
                        ? "Refine your skill"
                        : "Expand your skill profile"}
                </h2>

                <p>
                    Tell CareerForge what you know and
                    how confident you are with it.
                </p>
            </div>

            <form onSubmit={onSubmit}>
                <div className="skill-form-grid">
                    <div className="skill-field">
                        <label htmlFor="skillName">
                            Skill Name
                        </label>

                        <input
                            id="skillName"
                            type="text"
                            name="skillName"
                            value={formData.skillName}
                            onChange={onChange}
                            placeholder="e.g. Java"
                            required
                        />
                    </div>

                    <div className="skill-field">
                        <label htmlFor="proficiencyLevel">
                            Proficiency Level
                        </label>

                        <select
                            id="proficiencyLevel"
                            name="proficiencyLevel"
                            value={
                                formData.proficiencyLevel
                            }
                            onChange={onChange}
                            required
                        >
                            <option value="">
                                Select level
                            </option>

                            <option value="BEGINNER">
                                Beginner
                            </option>

                            <option value="INTERMEDIATE">
                                Intermediate
                            </option>

                            <option value="ADVANCED">
                                Advanced
                            </option>

                            <option value="EXPERT">
                                Expert
                            </option>
                        </select>
                    </div>
                </div>

                <div className="skill-form-actions">
                    <button
                        type="button"
                        className="skill-cancel-button"
                        onClick={onCancel}
                        disabled={saving}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="skill-save-button"
                        disabled={saving}
                    >
                        {saving
                            ? "Saving..."
                            : editing
                                ? "Update Skill →"
                                : "Add Skill →"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default SkillForm;