import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import StudentNavigation from "../components/navigation/StudentNavigation";

const StudentLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const initials = (user?.name || "CF")
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="student-shell">

            <header className="student-navbar">

                {/* Brand */}
                <Link
                    to="/student/dashboard"
                    className="brand"
                >
                    <span className="brand-mark">
                        C
                    </span>

                    <span className="brand-name">
                        Career<span>Forge</span>
                    </span>
                </Link>

                {/* Navigation */}
                <StudentNavigation />

                {/* User */}
                <div className="student-user">

                    <div className="user-avatar">
                        {initials}
                    </div>

                    <div className="user-details">
                        <span>Welcome</span>

                        <strong>
                            {user?.name || "Student"}
                        </strong>
                    </div>

                    <button
                        type="button"
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </header>

            <div className="student-content">
                <Outlet />
            </div>

        </div>
    );
};

export default StudentLayout;