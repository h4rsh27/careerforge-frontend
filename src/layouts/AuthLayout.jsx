import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="auth-layout">

            <div className="auth-background-grid"></div>

            <div className="auth-glow auth-glow-one"></div>
            <div className="auth-glow auth-glow-two"></div>

            <div className="auth-brand">
                <div className="auth-brand-mark">
                    C
                </div>

                <span>
                    Career<span>Forge</span>
                </span>
            </div>

            <div className="auth-container">
                <Outlet />
            </div>

            <div className="auth-footer">
                <span>
                    CareerForge
                </span>

                <span>
                    Intelligent career development platform
                </span>
            </div>

        </div>
    );
};

export default AuthLayout;