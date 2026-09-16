import { useEffect, useState } from "react";

import {
    createProfile,
    getProfile,
    updateProfile,
} from "../api/profileApi";

import { useAuth } from "../context/AuthContext";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileInfoCard from "../components/profile/ProfileInfoCard";
import ProfileEditForm from "../components/profile/ProfileEditForm";

const emptyProfile = {
    phone: "",
    college: "",
    degree: "",
    branch: "",
    graduationYear: "",
    location: "",
    bio: "",
};

const StudentProfile = () => {
    const { user } = useAuth();

    const [profile, setProfile] = useState(null);

    const [formData, setFormData] = useState(
        emptyProfile
    );

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getProfile();

            setProfile(data);

            setFormData({
                ...emptyProfile,
                ...data,
            });
        } catch (err) {
            if (err.response?.status === 404) {
                setProfile(null);
                setFormData(emptyProfile);
            } else {
                setError(
                    err.response?.data?.message ||
                        "Unable to load your profile."
                );
            }
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

    const calculateCompletion = () => {
        const fields = [
            "phone",
            "college",
            "degree",
            "branch",
            "graduationYear",
            "location",
            "bio",
        ];

        const completedFields = fields.filter(
            (field) => {
                const value = formData[field];

                return (
                    value !== null &&
                    value !== undefined &&
                    String(value).trim() !== ""
                );
            }
        ).length;

        return Math.round(
            (completedFields / fields.length) * 100
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            let data;

            if (profile) {
                data = await updateProfile(formData);
            } else {
                data = await createProfile(formData);
            }

            setProfile(data);

            setFormData({
                ...emptyProfile,
                ...data,
            });

            setEditing(false);

            setSuccess(
                profile
                    ? "Profile updated successfully."
                    : "Profile created successfully."
            );

            setTimeout(() => {
                setSuccess("");
            }, 3000);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Unable to save your profile."
            );
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        if (profile) {
            setFormData({
                ...emptyProfile,
                ...profile,
            });
        } else {
            setFormData(emptyProfile);
        }

        setError("");
        setEditing(false);
    };

    if (loading) {
        return (
            <main className="profile-page">
                <div className="profile-loading">
                    <div className="loading-spinner"></div>

                    <h2>
                        Loading your profile
                    </h2>

                    <p>
                        Preparing your CareerForge
                        profile...
                    </p>
                </div>
            </main>
        );
    }

    const completionPercentage =
        calculateCompletion();

    return (
        <main className="profile-page">
            <div className="profile-page-background"></div>

            <div className="profile-page-content">

                {/* Page Introduction */}

                <div className="profile-page-intro">
                    <span>
                        CAREERFORGE / PROFILE
                    </span>

                    <h1>
                        Your career starts
                        <br />
                        with your <em>profile.</em>
                    </h1>

                    <p>
                        Tell CareerForge about yourself
                        so we can personalize your career
                        journey.
                    </p>
                </div>

                {/* Error */}

                {error && (
                    <div className="profile-alert profile-alert-error">
                        <span>!</span>

                        <p>{error}</p>
                    </div>
                )}

                {/* Success */}

                {success && (
                    <div className="profile-alert profile-alert-success">
                        <span>✓</span>

                        <p>{success}</p>
                    </div>
                )}

                {/* VIEW MODE */}

                {!editing ? (
                    <>
                        <ProfileHeader
                            user={user}
                            completionPercentage={
                                completionPercentage
                            }
                            onEdit={() =>
                                setEditing(true)
                            }
                        />

                        {profile ? (
                            <div className="profile-information">

                                {/* Personal */}

                                <ProfileInfoCard
                                    title="Personal Information"
                                    icon="◉"
                                    items={[
                                        {
                                            label: "Name",
                                            value:
                                                user?.name,
                                        },
                                        {
                                            label: "Email",
                                            value:
                                                user?.email,
                                        },
                                        {
                                            label: "Phone",
                                            value:
                                                profile.phone,
                                        },
                                        {
                                            label: "Location",
                                            value:
                                                profile.location,
                                        },
                                    ]}
                                />

                                {/* Education */}

                                <ProfileInfoCard
                                    title="Education"
                                    icon="◆"
                                    items={[
                                        {
                                            label: "College",
                                            value:
                                                profile.college,
                                        },
                                        {
                                            label: "Degree",
                                            value:
                                                profile.degree,
                                        },
                                        {
                                            label: "Branch",
                                            value:
                                                profile.branch,
                                        },
                                        {
                                            label:
                                                "Graduation Year",
                                            value:
                                                profile.graduationYear,
                                        },
                                    ]}
                                />

                                {/* Bio */}

                                <section className="profile-bio-card">
                                    <div className="profile-card-heading">
                                        <div className="profile-card-icon">
                                            ✦
                                        </div>

                                        <h2>
                                            About You
                                        </h2>
                                    </div>

                                    <p>
                                        {profile.bio ||
                                            "Tell CareerForge about yourself, your interests, goals and what you want to achieve."}
                                    </p>
                                </section>
                            </div>
                        ) : (
                            <section className="profile-empty-state">

                                <div className="empty-state-icon">
                                    ✦
                                </div>

                                <h2>
                                    Your career profile
                                    is waiting.
                                </h2>

                                <p>
                                    Add your education,
                                    contact information
                                    and career details
                                    to unlock a
                                    personalized
                                    CareerForge
                                    experience.
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setEditing(true)
                                    }
                                >
                                    Create My Profile →
                                </button>

                            </section>
                        )}
                    </>
                ) : (

                    /* EDIT MODE */

                    <ProfileEditForm
                        formData={formData}
                        user={user}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                        saving={saving}
                    />
                )}
            </div>
        </main>
    );
};

export default StudentProfile;