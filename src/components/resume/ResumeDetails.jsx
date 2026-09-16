const ResumeDetails = ({
    resume,
    onDownload,
    onDelete,
    deleting,
}) => {
    const formatFileSize = (bytes) => {
        if (!bytes) {
            return "0 KB";
        }

        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }

        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    const formatDate = (date) => {
        if (!date) {
            return "Unknown";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    return (
        <section className="resume-details-card">
            <div className="resume-section-heading">
                <div>
                    <span>RESUME FILE</span>
                    <h2>Your uploaded resume</h2>
                </div>

                <div className="resume-file-badge">
                    PDF
                </div>
            </div>

            <div className="resume-file-preview">
                <div className="resume-file-icon">
                    PDF
                </div>

                <div className="resume-file-info">
                    <strong>{resume.fileName}</strong>

                    <span>
                        {resume.fileType} ·{" "}
                        {formatFileSize(
                            resume.fileSize
                        )}
                    </span>
                </div>
            </div>

            <div className="resume-meta-grid">
                <div>
                    <span>Uploaded</span>
                    <strong>
                        {formatDate(
                            resume.uploadedAt
                        )}
                    </strong>
                </div>

                <div>
                    <span>File Size</span>
                    <strong>
                        {formatFileSize(
                            resume.fileSize
                        )}
                    </strong>
                </div>

                <div>
                    <span>Format</span>
                    <strong>PDF Document</strong>
                </div>
            </div>

            <div className="resume-details-actions">
                <button
                    type="button"
                    className="resume-download-button"
                    onClick={onDownload}
                >
                    ↓ Download Resume
                </button>

                <button
                    type="button"
                    className="resume-delete-button"
                    onClick={onDelete}
                    disabled={deleting}
                >
                    {deleting
                        ? "Deleting..."
                        : "Delete Resume"}
                </button>
            </div>
        </section>
    );
};

export default ResumeDetails;