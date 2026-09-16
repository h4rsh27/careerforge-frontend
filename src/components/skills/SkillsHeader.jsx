const SkillsHeader = ({ skillCount, onAdd }) => {
    return (
        <section className="skills-header">
            <div className="skills-header-glow"></div>

            <div className="skills-header-content">
                <span className="skills-label">
                    CAREERFORGE / SKILLS
                </span>

                <h1>
                    Your skills.
                    <br />
                    Your <em>edge.</em>
                </h1>

                <p>
                    Build your skill profile and let CareerForge
                    understand what you already know.
                </p>
            </div>

            <div className="skills-header-stats">
                <div className="skills-count">
                    <strong>{skillCount}</strong>
                    <span>
                        {skillCount === 1 ? "Skill" : "Skills"}
                        {" "}Added
                    </span>
                </div>

                <button
                    type="button"
                    className="skills-add-button"
                    onClick={onAdd}
                >
                    <span>+</span>
                    Add Skill
                </button>
            </div>
        </section>
    );
};

export default SkillsHeader;