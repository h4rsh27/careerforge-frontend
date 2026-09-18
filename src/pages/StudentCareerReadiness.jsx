import { useEffect, useState } from "react";

import {
    getCareerReadiness,
    getJobRoles,
} from "../api/careerReadinessApi";

import ReadinessHeader from "../components/careerReadiness/ReadinessHeader";
import ReadinessScore from "../components/careerReadiness/ReadinessScore";
import StrengthsPanel from "../components/careerReadiness/StrengthsPanel";
import CriticalGapsPanel from "../components/careerReadiness/CriticalGapsPanel";

const StudentCareerReadiness = () => {

    const [roles, setRoles] = useState([]);

    const [selectedRole, setSelectedRole] =
        useState("");

    const [readiness, setReadiness] =
        useState(null);

    const [loadingRoles, setLoadingRoles] =
        useState(true);

    const [analyzing, setAnalyzing] =
        useState(false);

    const [error, setError] =
        useState("");

    useEffect(() => {

        const loadRoles = async () => {

            try {

                setLoadingRoles(true);
                setError("");

                const data =
                    await getJobRoles();

                setRoles(data || []);

            } catch (err) {

                setError(
                    err.response?.data?.message ||
                    "Unable to load job roles."
                );

            } finally {
                setLoadingRoles(false);
            }
        };

        loadRoles();

    }, []);

    const handleAnalyze = async () => {

        if (!selectedRole) {
            return;
        }

        try {

            setAnalyzing(true);
            setError("");

            const data =
                await getCareerReadiness(
                    selectedRole
                );

            setReadiness(data);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to calculate career readiness."
            );

            setReadiness(null);

        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className="student-readiness-page">

            <div className="student-readiness-background"></div>

            <div className="student-readiness-content">

                <ReadinessHeader
                    selectedRole={selectedRole}
                    onRoleChange={setSelectedRole}
                    roles={roles}
                    onAnalyze={handleAnalyze}
                    analyzing={
                        analyzing ||
                        loadingRoles
                    }
                />

                {error && (
                    <div className="readiness-error">
                        <span>!</span>
                        {error}
                    </div>
                )}

                {!readiness && !analyzing && (
                    <section className="readiness-start-card">

                        <div className="readiness-start-icon">
                            ◈
                        </div>

                        <span>
                            CAREER PROFILE ANALYSIS
                        </span>

                        <h2>
                            Know how ready you are
                            for your next role.
                        </h2>

                        <p>
                            Select a target job role and
                            CareerForge will evaluate your
                            current skills, strengths and
                            critical development areas.
                        </p>

                    </section>
                )}

                {analyzing && (
                    <section className="readiness-loading-card">

                        <div className="readiness-loader"></div>

                        <h2>
                            Calculating your readiness...
                        </h2>

                        <p>
                            Evaluating your profile against
                            the requirements of the selected
                            role.
                        </p>

                    </section>
                )}

                {readiness && !analyzing && (
                    <div className="readiness-results">

                        <div className="readiness-role-result">

                            <span>
                                ANALYSIS FOR
                            </span>

                            <strong>
                                {readiness.jobRole}
                            </strong>

                        </div>

                        <ReadinessScore
                            score={
                                readiness.readinessScore
                            }
                            level={
                                readiness.readinessLevel
                            }
                            message={
                                readiness.message
                            }
                        />

                        <div className="readiness-columns">

                            <StrengthsPanel
                                strengths={
                                    readiness.strengths
                                }
                            />

                            <CriticalGapsPanel
                                criticalGaps={
                                    readiness.criticalGaps
                                }
                            />

                        </div>

                    </div>
                )}

            </div>

        </div>
    );
};

export default StudentCareerReadiness;