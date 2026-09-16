import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {

    const { register } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const handleChange = (event) => {

        setFormData({
            ...formData,
            [event.target.name]:
                event.target.value,
        });
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {

            await register({
                name: formData.name.trim(),
                email: formData.email.trim(),
                password: formData.password,
            });

            setSuccess(
                "Account created successfully. Redirecting to login..."
            );

            setTimeout(() => {
                navigate("/login");
            }, 1200);

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

            } else if (backendError) {
                setError(
                    Object.values(
                        backendError
                    ).join(", ")
                );

            } else {
                setError(
                    "Registration failed. Please try again."
                );
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-card auth-register-card">

            <div className="auth-card-header">

                <span className="auth-kicker">
                    CAREERFORGE / GET STARTED
                </span>

                <h1>
                    Build your future.
                </h1>

                <p>
                    Create your career profile and
                    let CareerForge guide your next move.
                </p>

            </div>

            {error && (
                <div className="auth-message auth-error">
                    <span>!</span>
                    <p>{error}</p>
                </div>
            )}

            {success && (
                <div className="auth-message auth-success">
                    <span>✓</span>
                    <p>{success}</p>
                </div>
            )}

            <form
                className="auth-form"
                onSubmit={handleSubmit}
            >

                <div className="auth-field">

                    <label htmlFor="register-name">
                        Full name
                    </label>

                    <div className="auth-input-wrapper">

                        <span className="auth-input-icon">
                            ◉
                        </span>

                        <input
                            id="register-name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                            autoComplete="name"
                            required
                        />

                    </div>

                </div>

                <div className="auth-field">

                    <label htmlFor="register-email">
                        Email address
                    </label>

                    <div className="auth-input-wrapper">

                        <span className="auth-input-icon">
                            @
                        </span>

                        <input
                            id="register-email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                        />

                    </div>

                </div>

                <div className="auth-field">

                    <label htmlFor="register-password">
                        Password
                    </label>

                    <div className="auth-input-wrapper">

                        <span className="auth-input-icon">
                            •
                        </span>

                        <input
                            id="register-password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a secure password"
                            autoComplete="new-password"
                            minLength={6}
                            required
                        />

                    </div>

                    <div className="auth-password-hint">
                        Use at least 6 characters.
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
                            Creating account...
                        </>
                    ) : (
                        <>
                            Create account
                            <span>→</span>
                        </>
                    )}
                </button>

            </form>

            <div className="auth-divider">
                <span></span>
                <small>ALREADY A MEMBER?</small>
                <span></span>
            </div>

            <div className="auth-switch">

                <span>
                    Already have an account?
                </span>

                <Link to="/login">
                    Sign in
                </Link>

            </div>

        </div>
    );
};

export default Register;