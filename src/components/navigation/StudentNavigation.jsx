import { NavLink } from "react-router-dom";

const StudentNavigation = () => {
    const linkClass = ({ isActive }) =>
        isActive
            ? "nav-link active"
            : "nav-link";

    return (
        <nav className="student-nav">

            {/* Dashboard */}
            <NavLink
                to="/student/dashboard"
                className={linkClass}
            >
                Dashboard
            </NavLink>

            {/* Career */}
            <div className="nav-group">
                <button className="nav-group-trigger">
                    Career
                    <span>⌄</span>
                </button>

                <div className="nav-group-menu">

                    <NavLink
                        to="/student/profile"
                        className={linkClass}
                    >
                        Profile
                    </NavLink>

                    <NavLink
                        to="/student/resume"
                        className={linkClass}
                    >
                        Resume
                    </NavLink>

                    <NavLink
                        to="/student/skills"
                        className={linkClass}
                    >
                        Skills
                    </NavLink>

                </div>
            </div>

            {/* Insights */}
            <div className="nav-group">
                <button className="nav-group-trigger">
                    Insights
                    <span>⌄</span>
                </button>

                <div className="nav-group-menu">

                    <NavLink
                        to="/student/skill-gap"
                        className={linkClass}
                    >
                        Skill Gap
                    </NavLink>

                    <NavLink
                        to="/student/career-readiness"
                        className={linkClass}
                    >
                        Career Readiness
                    </NavLink>
                    <NavLink
                        to="/student/resume-review"
                        className={linkClass}
                    >
                        Resume Review
                    </NavLink>
                    <NavLink
                        to="/student/roadmap"
                        className={linkClass}
                    >
                        Learning Roadmap
                    </NavLink>

                </div>
            </div>

            {/* Opportunities */}
            <div className="nav-group">
                <button className="nav-group-trigger">
                    Opportunities
                    <span>⌄</span>
                </button>

                <div className="nav-group-menu">

                    <NavLink
                        to="/student/jobs"
                        className={linkClass}
                    >
                        Recommended for you
                    </NavLink>
                    <NavLink to="/student/live-jobs" className={linkClass}>
                       Explore Live Jobs
                    </NavLink>

                    <NavLink
                        to="/student/applications"
                        className={linkClass}
                    >
                        My Applications
                    </NavLink>

                </div>
            </div>

            {/* Preparation */}
            <div className="nav-group">
                <button className="nav-group-trigger">
                    Preparation
                    <span>⌄</span>
                </button>

                <div className="nav-group-menu">

                    <NavLink
                        to="/student/interview"
                        className={linkClass}
                    >
                        Mock Interview
                    </NavLink>
                    <NavLink
                        to="/student/ai-assistant"
                        className={linkClass}
                    >
                        AI Career Assistant
                    </NavLink>
                    {/* AI Assistant will be added here later */}

                </div>
            </div>

        </nav>
    );
};

export default StudentNavigation;