import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {

    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            const data = await login(
                email.trim(),
                password
            );

            if (data.user.role === "ADMIN") {
                navigate("/admin/dashboard");
            } else {
                navigate("/student/dashboard");
            }

        } catch (error) {

            const backendError =
                error.response?.data;

            if (
                typeof backendError ===
                "string"
            ) {
                setError(backendError);
            } else if (
                backendError?.message
            ) {
                setError(
                    backendError.message
                );
            } else {
                setError(
                    "Invalid email or password."
                );
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-card">

            <div className="auth-card-header">

                <span className="auth-kicker">
                    CAREERFORGE / ACCESS
                </span>

                <h1>
                    Welcome back.
                </h1>

                <p>
                    Continue building the career
                    you're aiming for.
                </p>

            </div>

            {error && (
                <div className="auth-message auth-error">
                    <span>!</span>
                    <p>{error}</p>
                </div>
            )}

            <form
                className="auth-form"
                onSubmit={handleSubmit}
            >

                <div className="auth-field">

                    <label htmlFor="login-email">
                        Email address
                    </label>

                    <div className="auth-input-wrapper">

                        <span className="auth-input-icon">
                            @
                        </span>

                        <input
                            id="login-email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                        />

                    </div>

                </div>

                <div className="auth-field">

                    <div className="auth-label-row">

                        <label htmlFor="login-password">
                            Password
                        </label>

                    </div>

                    <div className="auth-input-wrapper">

                        <span className="auth-input-icon">
                            •
                        </span>

                        <input
                            id="login-password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            required
                        />

                    </div>

                </div>

                <button
                    type="submit"
                    className="auth-submit"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="auth-button-spinner"></span>
                            Signing in...
                        </>
                    ) : (
                        <>
                            Sign in
                            <span>→</span>
                        </>
                    )}
                </button>

            </form>

            <div className="auth-divider">
                <span></span>
                <small>NEW TO CAREERFORGE?</small>
                <span></span>
            </div>

            <div className="auth-switch">

                <span>
                    Don't have an account?
                </span>

                <Link to="/register">
                    Create one
                </Link>

            </div>

        </div>
    );
};

export default Login;