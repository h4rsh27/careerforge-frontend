import { useEffect, useState } from "react";

import {
    getResume,
    uploadResume,
    getResumeSkills,
    downloadResume,
    deleteResume,
} from "../api/resumeApi";

import ResumeHeader from "../components/resume/ResumeHeader";
import ResumeUpload from "../components/resume/ResumeUpload";
import ResumeDetails from "../components/resume/ResumeDetails";
import ExtractedSkills from "../components/resume/ExtractedSkills";

const StudentResume = () => {
    const [resume, setResume] = useState(null);
    const [skills, setSkills] = useState([]);

    const [loading, setLoading] =
        useState(true);

    const [uploading, setUploading] =
        useState(false);

    const [deleting, setDeleting] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    useEffect(() => {
        loadResume();
    }, []);

    const loadResume = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getResume();

            setResume(data);

            try {
                const extractedSkills =
                    await getResumeSkills();

                setSkills(
                    Array.isArray(extractedSkills)
                        ? extractedSkills
                        : []
                );
            } catch {
                setSkills([]);
            }
        } catch (err) {
            if (err.response?.status === 404) {
                setResume(null);
                setSkills([]);
            } else {
                setError(
                    err.response?.data?.message ||
                        "Unable to load your resume."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (file) => {
        try {
            setUploading(true);
            setError("");
            setSuccess("");

            const data =
                await uploadResume(file);

            setResume(data);

            try {
                const extractedSkills =
                    await getResumeSkills();

                setSkills(
                    Array.isArray(extractedSkills)
                        ? extractedSkills
                        : []
                );
            } catch {
                setSkills([]);
            }

            setSuccess(
                "Resume uploaded and analyzed successfully."
            );

            setTimeout(() => {
                setSuccess("");
            }, 3500);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Unable to upload your resume."
            );
        } finally {
            setUploading(false);
        }
    };

    const handleDownload = async () => {
        try {
            setError("");

            const response =
                await downloadResume();

            const blob = new Blob(
                [response.data],
                {
                    type:
                        response.headers[
                            "content-type"
                        ] || "application/pdf",
                }
            );

            const url =
                window.URL.createObjectURL(blob);

            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                resume?.fileName ||
                "careerforge-resume.pdf";

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Unable to download your resume."
            );
        }
    };

    const handleDelete = async () => {
        const confirmed =
            window.confirm(
                "Are you sure you want to delete your resume?"
            );

        if (!confirmed) {
            return;
        }

        try {
            setDeleting(true);
            setError("");
            setSuccess("");

            await deleteResume();

            setResume(null);
            setSkills([]);

            setSuccess(
                "Resume deleted successfully."
            );

            setTimeout(() => {
                setSuccess("");
            }, 3000);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Unable to delete your resume."
            );
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <main className="resume-page">
                <div className="resume-loading">
                    <div className="loading-spinner"></div>

                    <h2>
                        Loading your resume
                    </h2>

                    <p>
                        Preparing your CareerForge
                        resume workspace...
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="resume-page">
            <div className="resume-page-background"></div>

            <div className="resume-page-content">
                <ResumeHeader
                    hasResume={Boolean(resume)}
                />

                {error && (
                    <div className="resume-alert resume-alert-error">
                        <span>!</span>
                        <p>{error}</p>
                    </div>
                )}

                {success && (
                    <div className="resume-alert resume-alert-success">
                        <span>✓</span>
                        <p>{success}</p>
                    </div>
                )}

                {!resume ? (
                    <ResumeUpload
                        onUpload={handleUpload}
                        uploading={uploading}
                    />
                ) : (
                    <div className="resume-workspace">
                        <ResumeDetails
                            resume={resume}
                            onDownload={
                                handleDownload
                            }
                            onDelete={handleDelete}
                            deleting={deleting}
                        />

                        <ExtractedSkills
                            skills={skills}
                        />

                        <ResumeUpload
                            onUpload={handleUpload}
                            uploading={uploading}
                        />
                    </div>
                )}
            </div>
        </main>
    );
};

export default StudentResume;