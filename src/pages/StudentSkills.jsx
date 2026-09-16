import { useEffect, useState } from "react";

import {
    getSkills,
    createSkill,
    updateSkill,
    deleteSkill,
} from "../api/skillsApi";

import SkillsHeader from "../components/skills/SkillsHeader";
import SkillCard from "../components/skills/SkillCard";
import SkillForm from "../components/skills/SkillForm";

const emptyForm = {
    skillName: "",
    proficiencyLevel: "",
};

const StudentSkills = () => {
    const [skills, setSkills] = useState([]);

    const [formData, setFormData] =
        useState(emptyForm);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const [editingSkill, setEditingSkill] =
        useState(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        loadSkills();
    }, []);

    const loadSkills = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getSkills();

            setSkills(data);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Unable to load your skills."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleAdd = () => {
        setEditingSkill(null);
        setFormData(emptyForm);
        setError("");
        setSuccess("");
        setShowForm(true);
    };

    const handleEdit = (skill) => {
        setEditingSkill(skill);

        setFormData({
            skillName: skill.skillName,
            proficiencyLevel:
                skill.proficiencyLevel,
        });

        setError("");
        setSuccess("");
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingSkill(null);
        setFormData(emptyForm);
        setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            if (editingSkill) {
                await updateSkill(
                    editingSkill.id,
                    formData
                );

                setSuccess(
                    "Skill updated successfully."
                );
            } else {
                await createSkill(formData);

                setSuccess(
                    "Skill added successfully."
                );
            }

            await loadSkills();

            setShowForm(false);
            setEditingSkill(null);
            setFormData(emptyForm);

            setTimeout(() => {
                setSuccess("");
            }, 3000);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Unable to save your skill."
            );
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to remove this skill?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setSuccess("");

            await deleteSkill(id);

            setSkills((previous) =>
                previous.filter(
                    (skill) => skill.id !== id
                )
            );

            setSuccess(
                "Skill removed successfully."
            );

            setTimeout(() => {
                setSuccess("");
            }, 3000);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Unable to delete the skill."
            );
        }
    };

    return (
        <main className="skills-page">
            <div className="skills-page-background"></div>

            <div className="skills-page-content">
                <SkillsHeader
                    skillCount={skills.length}
                    onAdd={handleAdd}
                />

                {error && (
                    <div className="skills-alert skills-alert-error">
                        <span>!</span>
                        <p>{error}</p>
                    </div>
                )}

                {success && (
                    <div className="skills-alert skills-alert-success">
                        <span>✓</span>
                        <p>{success}</p>
                    </div>
                )}

                {showForm && (
                    <SkillForm
                        formData={formData}
                        editing={Boolean(editingSkill)}
                        saving={saving}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                    />
                )}

                {loading ? (
                    <div className="skills-loading">
                        <div className="loading-spinner"></div>

                        <h2>
                            Loading your skills
                        </h2>

                        <p>
                            Building your skill profile...
                        </p>
                    </div>
                ) : skills.length === 0 ? (
                    <section className="skills-empty-state">
                        <div className="skills-empty-icon">
                            ✦
                        </div>

                        <span>SKILL PROFILE</span>

                        <h2>
                            Your skill story
                            starts here.
                        </h2>

                        <p>
                            Add your technical and
                            professional skills so
                            CareerForge can use them
                            for skill-gap analysis,
                            career readiness and job
                            recommendations.
                        </p>

                        <button
                            type="button"
                            onClick={handleAdd}
                        >
                            Add Your First Skill →
                        </button>
                    </section>
                ) : (
                    <section className="skills-grid">
                        {skills.map((skill) => (
                            <SkillCard
                                key={skill.id}
                                skill={skill}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </section>
                )}
            </div>
        </main>
    );
};

export default StudentSkills;