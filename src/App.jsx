import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import StudentLayout from "./layouts/StudentLayout";
import AdminLayout from "./layouts/AdminLayout";
import StudentSkills from "./pages/StudentSkills";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import FeaturePage from "./pages/FeaturePage";

import { useAuth } from "./context/AuthContext";
import StudentProfile from "./pages/StudentProfile";

const ProtectedRoute = ({ children, role }) => {

    const { user, loading } = useAuth();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (role && user.role !== role) {
        return <Navigate to="/login" replace />;
    }

    return children;
};


function App() {

    return (
        <Routes>

            {/* =========================
                AUTH ROUTES
            ========================= */}

            <Route element={<AuthLayout />}>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

            </Route>


            {/* =========================
                STUDENT ROUTES
            ========================= */}

            <Route
                element={
                    <ProtectedRoute role="STUDENT">
                        <StudentLayout />
                    </ProtectedRoute>
                }
            >

                {/* Dashboard */}

                <Route
                    path="/student/dashboard"
                    element={<StudentDashboard />}
                />


                {/* Profile */}

                <Route
                    path="/student/profile"
                    element={<StudentProfile />}
                />


                {/* Resume */}

                <Route
                    path="/student/resume"
                    element={<FeaturePage />}
                />


                {/* Job Recommendations */}

                <Route
                    path="/student/jobs"
                    element={<FeaturePage />}
                />


                {/* Skill Gap */}

                <Route
                    path="/student/skill-gap"
                    element={<FeaturePage />}
                />

                <Route
                    path="/student/skills"
                    element={<StudentSkills />}
                />
                {/* Learning Roadmap */}

                <Route
                    path="/student/roadmap"
                    element={<FeaturePage />}
                />


                {/* Applications */}

                <Route
                    path="/student/applications"
                    element={<FeaturePage />}
                />


                {/* Mock Interview */}

                <Route
                    path="/student/interview"
                    element={<FeaturePage />}
                />

            </Route>


            {/* =========================
                ADMIN ROUTES
            ========================= */}

            <Route
                element={
                    <ProtectedRoute role="ADMIN">
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >

                <Route
                    path="/admin/dashboard"
                    element={<AdminDashboard />}
                />

                <Route
                    path="/admin/companies"
                    element={<FeaturePage />}
                />

                <Route
                    path="/admin/job-roles"
                    element={<FeaturePage />}
                />

                <Route
                    path="/admin/jobs"
                    element={<FeaturePage />}
                />

            </Route>


            {/* =========================
                DEFAULT ROUTES
            ========================= */}

            <Route
                path="/"
                element={
                    <Navigate
                        to="/login"
                        replace
                    />
                }
            />

            <Route
                path="*"
                element={
                    <Navigate
                        to="/login"
                        replace
                    />
                }
            />

        </Routes>
    );
}

export default App;