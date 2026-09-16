import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="admin-layout">

            <header className="navbar">

                <div className="logo">
                    CareerForge Admin
                </div>

                <nav>

                    <Link to="/admin/dashboard">
                        Dashboard
                    </Link>

                    <Link to="/admin/companies">
                        Companies
                    </Link>

                    <Link to="/admin/job-roles">
                        Job Roles
                    </Link>

                    <Link to="/admin/jobs">
                        Job Listings
                    </Link>

                </nav>

                <div className="user-section">

                    <span>
                        {user?.name}
                    </span>

                    <button onClick={handleLogout}>
                        Logout
                    </button>

                </div>

            </header>

            <main>
                <Outlet />
            </main>

        </div>
    );
};

export default AdminLayout;