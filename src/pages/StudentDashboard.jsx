import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const StudentDashboard = () => {

    const { user } = useAuth();

    return (
        <div className="dashboard">

            <section className="dashboard-header">

                <h1>
                    Welcome, {user?.name} 👋
                </h1>

                <p>
                    Your personalized career journey starts here.
                </p>

            </section>

            <section className="dashboard-grid">

                <Link
                    to="/student/profile"
                    className="dashboard-card"
                >
                    <h3>👤 Profile</h3>
                    <p>
                        Manage your career profile.
                    </p>
                </Link>

                <Link
                    to="/student/resume"
                    className="dashboard-card"
                >
                    <h3>📄 Resume</h3>
                    <p>
                        Upload and analyze your resume.
                    </p>
                </Link>

                <Link
                    to="/student/jobs"
                    className="dashboard-card"
                >
                    <h3>💼 Job Recommendations</h3>
                    <p>
                        Discover jobs matching your skills.
                    </p>
                </Link>

                <Link
                    to="/student/skill-gap"
                    className="dashboard-card"
                >
                    <h3>🎯 Skill Gap</h3>
                    <p>
                        Find the skills you need to improve.
                    </p>
                </Link>

                <Link
                    to="/student/roadmap"
                    className="dashboard-card"
                >
                    <h3>📚 Learning Roadmap</h3>
                    <p>
                        Follow your personalized roadmap.
                    </p>
                </Link>

                <Link
                    to="/student/applications"
                    className="dashboard-card"
                >
                    <h3>📊 Applications</h3>
                    <p>
                        Track your job applications.
                    </p>
                </Link>

                <Link
                    to="/student/interview"
                    className="dashboard-card"
                >
                    <h3>🤖 Mock Interview</h3>
                    <p>
                        Practice interviews with CareerForge AI.
                    </p>
                </Link>

            </section>

        </div>
    );
};

export default StudentDashboard;