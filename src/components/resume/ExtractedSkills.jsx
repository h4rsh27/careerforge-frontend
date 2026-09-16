const ExtractedSkills = ({ skills = [] }) => {
    return (
        <section className="resume-skills-card">
            <div className="resume-section-heading">
                <div>
                    <span>AI EXTRACTION</span>
                    <h2>Skills detected</h2>
                </div>

                <div className="resume-ai-badge">
                    ✦ AI
                </div>
            </div>

            {skills.length === 0 ? (
                <div className="resume-skills-empty">
                    <div>⌁</div>

                    <p>
                        No recognizable skills were
                        detected in your resume yet.
                    </p>
                </div>
            ) : (
                <>
                    <p className="resume-skills-description">
                        CareerForge identified these
                        skills from your uploaded resume.
                    </p>

                    <div className="resume-skills-list">
                        {skills.map(
                            (skill, index) => (
                                <span
                                    key={`${skill}-${index}`}
                                    className="resume-skill-chip"
                                >
                                    <i>✓</i>
                                    {skill}
                                </span>
                            )
                        )}
                    </div>

                    <div className="resume-skills-footer">
                        <span>
                            {skills.length}{" "}
                            {skills.length === 1
                                ? "skill"
                                : "skills"}{" "}
                            detected
                        </span>

                        <span>
                            Ready for skill-gap analysis
                        </span>
                    </div>
                </>
            )}
        </section>
    );
};

export default ExtractedSkills;