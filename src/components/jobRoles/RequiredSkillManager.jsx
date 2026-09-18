import { useEffect, useState } from "react";

import {
    addRequiredSkill,
    deleteRequiredSkill,
    getRequiredSkills,
    updateRequiredSkill,
} from "../../api/jobRoleApi";

const RequiredSkillManager = ({ role, onClose }) => {
    const [skills, setSkills] = useState([]);

    const [skillName, setSkillName] = useState("");
    const [importance, setImportance] = useState(5);

    const [editingSkillId, setEditingSkillId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const loadSkills = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getRequiredSkills(role.id);

            setSkills(data || []);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to load required skills."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (role) {
            loadSkills();
        }
    }, [role]);

    const resetForm = () => {
        setSkillName("");
        setImportance(5);
        setEditingSkillId(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!skillName.trim()) {
            setError("Skill name is required.");
            return;
        }

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const skillData = {
                skillName: skillName.trim(),
                importance: Number(importance),
            };

            if (editingSkillId) {
                await updateRequiredSkill(
                    role.id,
                    editingSkillId,
                    skillData
                );

                setSuccess("Required skill updated successfully.");
            } else {
                await addRequiredSkill(
                    role.id,
                    skillData
                );

                setSuccess("Required skill added successfully.");
            }

            resetForm();
            await loadSkills();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to save required skill."
            );
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (skill) => {
        setEditingSkillId(skill.id);
        setSkillName(skill.skillName);
        setImportance(skill.importance);
        setError("");
        setSuccess("");
    };

    const handleDelete = async (skillId) => {
        const confirmed = window.confirm(
            "Delete this required skill?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setSuccess("");

            await deleteRequiredSkill(
                role.id,
                skillId
            );

            setSuccess("Required skill deleted successfully.");

            if (editingSkillId === skillId) {
                resetForm();
            }

            await loadSkills();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to delete required skill."
            );
        }
    };

    return (
        <div className="required-skills-overlay">
            <div className="required-skills-panel">
                <div className="required-skills-header">
                    <div>
                        <span className="companies-eyebrow">
                            ROLE CONFIGURATION
                        </span>

                        <h2>{role.roleName}</h2>

                        <p>
                            Define the skills required for this
                            career role.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="required-skills-close"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                {error && (
                    <div className="companies-alert companies-alert-error">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="companies-alert companies-alert-success">
                        {success}
                    </div>
                )}

                <form
                    className="required-skill-form"
                    onSubmit={handleSubmit}
                >
                    <div className="required-skill-input">
                        <label htmlFor="requiredSkill">
                            Skill
                        </label>

                        <input
                            id="requiredSkill"
                            type="text"
                            placeholder="e.g. Spring Boot"
                            value={skillName}
                            onChange={(event) =>
                                setSkillName(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="required-skill-importance">
                        <label htmlFor="importance">
                            Importance
                        </label>

                        <select
                            id="importance"
                            value={importance}
                            onChange={(event) =>
                                setImportance(event.target.value)
                            }
                        >
                            {Array.from(
                                { length: 10 },
                                (_, index) => index + 1
                            ).map((value) => (
                                <option
                                    key={value}
                                    value={value}
                                >
                                    {value} / 10
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="required-skill-submit">
                        <button
                            type="submit"
                            className="company-primary-button"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : editingSkillId
                                    ? "Update Skill"
                                    : "Add Skill"}
                        </button>

                        {editingSkillId && (
                            <button
                                type="button"
                                className="company-secondary-button"
                                onClick={resetForm}
                            >
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </form>

                <div className="required-skills-list">
                    <div className="required-skills-list-header">
                        <div>
                            <span className="job-role-label">
                                REQUIRED SKILLS
                            </span>

                            <h3>
                                {skills.length}{" "}
                                {skills.length === 1
                                    ? "skill"
                                    : "skills"}
                            </h3>
                        </div>
                    </div>

                    {loading ? (
                        <div className="companies-loading">
                            <div className="companies-spinner"></div>
                            <p>Loading skills...</p>
                        </div>
                    ) : skills.length === 0 ? (
                        <div className="required-skills-empty">
                            <div className="required-skills-empty-icon">
                                +
                            </div>

                            <h3>No required skills yet</h3>

                            <p>
                                Add the technical skills needed
                                for this role.
                            </p>
                        </div>
                    ) : (
                        <div className="required-skills-items">
                            {skills.map((skill) => (
                                <div
                                    className="required-skill-item"
                                    key={skill.id}
                                >
                                    <div className="required-skill-info">
                                        <div className="required-skill-icon">
                                            {skill.skillName
                                                ?.charAt(0)
                                                .toUpperCase()}
                                        </div>

                                        <div>
                                            <strong>
                                                {skill.skillName}
                                            </strong>

                                            <span>
                                                Importance{" "}
                                                {skill.importance}
                                                /10
                                            </span>
                                        </div>
                                    </div>

                                    <div className="required-skill-actions">
                                        <div className="importance-bar">
                                            <span
                                                style={{
                                                    width: `${skill.importance * 10}%`,
                                                }}
                                            />
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleEdit(skill)
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDelete(skill.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RequiredSkillManager;