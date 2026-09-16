import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const navItems = [
        {
            label: "Dashboard",
            path: "/admin/dashboard",
        },
        {
            label: "Companies",
            path: "/admin/companies",
        },
        {
            label: "Job Roles",
            path: "/admin/job-roles",
        },
        {
            label: "Job Listings",
            path: "/admin/jobs",
        },
    ];

    const initials = (user?.name || "Admin")
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="admin-layout">

            <header className="admin-navbar">

                <Link
                    to="/admin/dashboard"
                    className="admin-brand"
                >
                    <span className="admin-brand-mark">
                        C
                    </span>

                    <span className="admin-brand-text">
                        Career<span>Forge</span>
                    </span>

                    <span className="admin-brand-badge">
                        ADMIN
                    </span>
                </Link>

                <nav className="admin-nav">

                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                isActive
                                    ? "admin-nav-link active"
                                    : "admin-nav-link"
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}

                </nav>

                <div className="admin-user">

                    <div className="admin-user-avatar">
                        {initials}
                    </div>

                    <div className="admin-user-info">
                        <span>Administrator</span>

                        <strong>
                            {user?.name || "Admin"}
                        </strong>
                    </div>

                    <button
                        type="button"
                        className="admin-logout"
                        onClick={handleLogout}
                    >
                        <span>↪</span>
                        Logout
                    </button>

                </div>

            </header>

            <main className="admin-content">
                <Outlet />
            </main>

        </div>
    );
};

export default AdminLayout;