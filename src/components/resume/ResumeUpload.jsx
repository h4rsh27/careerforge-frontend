import { useRef, useState } from "react";

const ResumeUpload = ({
    onUpload,
    uploading,
}) => {
    const fileInputRef = useRef(null);

    const [dragging, setDragging] =
        useState(false);

    const [validationError, setValidationError] =
        useState("");

    const validateFile = (file) => {
        if (!file) {
            return false;
        }

        if (file.type !== "application/pdf") {
            setValidationError(
                "Only PDF resumes are supported."
            );

            return false;
        }

        if (file.size > 5 * 1024 * 1024) {
            setValidationError(
                "Resume size must be 5 MB or less."
            );

            return false;
        }

        setValidationError("");

        return true;
    };

    const handleFile = (file) => {
        if (validateFile(file)) {
            onUpload(file);
        }
    };

    const handleInputChange = (event) => {
        const file = event.target.files?.[0];

        handleFile(file);

        event.target.value = "";
    };

    const handleDrop = (event) => {
        event.preventDefault();

        setDragging(false);

        const file = event.dataTransfer.files?.[0];

        handleFile(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();

        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    return (
        <section className="resume-upload-card">
            <div
                className={
                    dragging
                        ? "resume-drop-zone dragging"
                        : "resume-drop-zone"
                }
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <div className="resume-upload-icon">
                    ↑
                </div>

                <span className="resume-upload-label">
                    {uploading
                        ? "UPLOADING RESUME"
                        : "UPLOAD RESUME"}
                </span>

                <h2>
                    {uploading
                        ? "Analyzing your resume..."
                        : "Drop your resume here"}
                </h2>

                <p>
                    {uploading
                        ? "CareerForge is processing your PDF."
                        : "Drag & drop your PDF or choose a file from your computer."}
                </p>

                {!uploading && (
                    <button
                        type="button"
                        className="resume-choose-button"
                        onClick={() =>
                            fileInputRef.current?.click()
                        }
                    >
                        Choose PDF →
                    </button>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={handleInputChange}
                    hidden
                />

                <small>
                    PDF only · Maximum 5 MB
                </small>
            </div>

            {validationError && (
                <div className="resume-upload-error">
                    <span>!</span>
                    {validationError}
                </div>
            )}
        </section>
    );
};

export default ResumeUpload;