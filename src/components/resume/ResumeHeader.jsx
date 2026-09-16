const ResumeHeader = ({ hasResume }) => {
    return (
        <section className="resume-header">
            <div className="resume-header-glow"></div>

            <div className="resume-header-content">
                <span className="resume-label">
                    CAREERFORGE / RESUME
                </span>

                <h1>
                    Your resume.
                    <br />
                    Your <em>career signal.</em>
                </h1>

                <p>
                    Upload your resume and let CareerForge
                    turn your experience into meaningful
                    career insights.
                </p>
            </div>

            <div className="resume-status">
                <span
                    className={
                        hasResume
                            ? "resume-status-dot active"
                            : "resume-status-dot"
                    }
                ></span>

                <div>
                    <strong>
                        {hasResume
                            ? "Resume Connected"
                            : "No Resume Yet"}
                    </strong>

                    <small>
                        {hasResume
                            ? "Your resume is ready for analysis."
                            : "Upload a PDF to get started."}
                    </small>
                </div>
            </div>
        </section>
    );
};

export default ResumeHeader;