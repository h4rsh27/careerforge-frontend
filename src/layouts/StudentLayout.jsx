import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const StudentLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const navItems = [
        { label: "Dashboard", path: "/student/dashboard" },
        { label: "Profile", path: "/student/profile" },
        { label: "Skills", path: "/student/skills" },
        { label: "Jobs", path: "/student/jobs" },
        { label: "Applications", path: "/student/applications" },
    ];
    const initials = (user?.name || "CF")
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="student-shell">
            <header className="student-navbar">
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

                <nav className="student-nav">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                isActive
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

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