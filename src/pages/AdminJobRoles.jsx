import { useEffect, useMemo, useState } from "react";

import {
    createJobRole,
    deleteJobRole,
    getJobRoles,
    updateJobRole,
} from "../api/jobRoleApi";

import JobRoleForm from "../components/jobRoles/JobRoleForm";
import JobRoleCard from "../components/jobRoles/JobRoleCard";
import RequiredSkillManager from "../components/jobRoles/RequiredSkillManager";

const emptyForm = {
    roleName: "",
    description: "",
};

const AdminJobRoles = () => {
    const [roles, setRoles] = useState([]);

    const [formData, setFormData] = useState(emptyForm);
    const [editingRole, setEditingRole] = useState(null);

    const [selectedRole, setSelectedRole] = useState(null);

    const [showForm, setShowForm] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const loadRoles = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getJobRoles();

            setRoles(data || []);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to load job roles."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRoles();
    }, []);

    const filteredRoles = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        if (!query) {
            return roles;
        }

        return roles.filter((role) =>
            role.roleName
                ?.toLowerCase()
                .includes(query)
        );
    }, [roles, searchTerm]);

    const openCreateForm = () => {
        setEditingRole(null);
        setFormData(emptyForm);
        setShowForm(true);
        setError("");
        setSuccess("");
    };

    const openEditForm = (role) => {
        setEditingRole(role);

        setFormData({
            roleName: role.roleName || "",
            description: role.description || "",
        });

        setShowForm(true);
        setError("");
        setSuccess("");
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingRole(null);
        setFormData(emptyForm);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const payload = {
                roleName: formData.roleName.trim(),
                description: formData.description.trim(),
            };

            if (editingRole) {
                await updateJobRole(
                    editingRole.id,
                    payload
                );

                setSuccess(
                    "Job role updated successfully."
                );
            } else {
                await createJobRole(payload);

                setSuccess(
                    "Job role created successfully."
                );
            }

            closeForm();
            await loadRoles();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to save job role."
            );
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Delete this job role? Its required skills will also be removed."
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setSuccess("");

            await deleteJobRole(id);

            setSuccess(
                "Job role deleted successfully."
            );

            if (selectedRole?.id === id) {
                setSelectedRole(null);
            }

            await loadRoles();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to delete job role."
            );
        }
    };

    return (
        <div className="admin-job-roles-page">
            <div className="admin-job-roles-background"></div>

            <div className="admin-job-roles-content">
                <section className="job-roles-header">
                    <div>
                        <span className="companies-eyebrow">
                            CAREERFORGE ADMIN
                        </span>

                        <h1>Job Roles</h1>

                        <p>
                            Define career paths and the skills
                            students need to succeed.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="companies-add-button"
                        onClick={openCreateForm}
                    >
                        <span>+</span>
                        Add Job Role
                    </button>
                </section>

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

                {showForm && (
                    <section className="job-role-form-panel">
                        <JobRoleForm
                            formData={formData}
                            setFormData={setFormData}
                            onSubmit={handleSubmit}
                            onCancel={closeForm}
                            isEditing={Boolean(editingRole)}
                            loading={saving}
                        />
                    </section>
                )}

                <section className="job-roles-toolbar">
                    <div className="job-roles-count">
                        <strong>{roles.length}</strong>
                        <span>
                            {roles.length === 1
                                ? "job role"
                                : "job roles"}
                        </span>
                    </div>

                    <div className="job-role-search">
                        <span>⌕</span>

                        <input
                            type="text"
                            placeholder="Search job roles..."
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(
                                    event.target.value
                                )
                            }
                        />
                    </div>
                </section>

                {loading ? (
                    <div className="companies-loading">
                        <div className="companies-spinner"></div>
                        <p>Loading job roles...</p>
                    </div>
                ) : filteredRoles.length === 0 ? (
                    <section className="job-roles-empty">
                        <div className="job-roles-empty-icon">
                            {searchTerm ? "⌕" : "+"}
                        </div>

                        <h2>
                            {searchTerm
                                ? "No roles found"
                                : "No job roles yet"}
                        </h2>

                        <p>
                            {searchTerm
                                ? "Try a different search term."
                                : "Create your first career role to start configuring required skills."}
                        </p>

                        {!searchTerm && (
                            <button
                                type="button"
                                className="company-primary-button"
                                onClick={openCreateForm}
                            >
                                Create First Role
                            </button>
                        )}
                    </section>
                ) : (
                    <section className="job-roles-grid">
                        {filteredRoles.map((role) => (
                            <JobRoleCard
                                key={role.id}
                                role={role}
                                onEdit={openEditForm}
                                onDelete={handleDelete}
                                onManageSkills={
                                    setSelectedRole
                                }
                            />
                        ))}
                    </section>
                )}
            </div>

            {selectedRole && (
                <RequiredSkillManager
                    role={selectedRole}
                    onClose={() => setSelectedRole(null)}
                />
            )}
        </div>
    );
};

export default AdminJobRoles;