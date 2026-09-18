import { useEffect, useState } from "react";

import {
    getJobRoles,
    getSkillGap,
} from "../api/skillGapApi";

import SkillGapHeader from "../components/skillGap/SkillGapHeader";
import SkillGapScore from "../components/skillGap/SkillGapScore";
import MatchedSkills from "../components/skillGap/MatchedSkills";
import MissingSkills from "../components/skillGap/MissingSkills";

const StudentSkillGap = () => {

    const [roles, setRoles] = useState([]);

    const [selectedRole, setSelectedRole] =
        useState("");

    const [skillGap, setSkillGap] =
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

                const data = await getJobRoles();

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
                await getSkillGap(selectedRole);

            setSkillGap(data);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to analyze your skill gap."
            );

            setSkillGap(null);

        } finally {
            setAnalyzing(false);
        }
    };

    const matchedSkills =
        skillGap?.matchedSkills || [];

    const missingSkills =
        skillGap?.missingSkills || [];

    return (
        <div className="student-skill-gap-page">

            <div className="student-skill-gap-background"></div>

            <div className="student-skill-gap-content">

                <SkillGapHeader
                    selectedRole={selectedRole}
                    onRoleChange={setSelectedRole}
                    roles={roles}
                    onAnalyze={handleAnalyze}
                    analyzing={
                        analyzing || loadingRoles
                    }
                />

                {error && (
                    <div className="skill-gap-error">
                        <span>!</span>
                        {error}
                    </div>
                )}

                {!skillGap && !analyzing && (
                    <section className="skill-gap-start-card">

                        <div className="skill-gap-start-icon">
                            ✦
                        </div>

                        <span>
                            READY TO ANALYZE
                        </span>

                        <h2>
                            Find out what stands between
                            you and your target role.
                        </h2>

                        <p>
                            Select a job role above and
                            CareerForge will compare its
                            required skills with your current
                            profile.
                        </p>

                    </section>
                )}

                {analyzing && (
                    <section className="skill-gap-loading-card">

                        <div className="skill-gap-loader"></div>

                        <h2>
                            Analyzing your profile...
                        </h2>

                        <p>
                            Comparing your skills against
                            the selected career role.
                        </p>

                    </section>
                )}

                {skillGap && !analyzing && (
                    <div className="skill-gap-results">

                        <div className="skill-gap-role-result">

                            <span>
                                ANALYSIS FOR
                            </span>

                            <strong>
                                {skillGap.jobRole}
                            </strong>

                        </div>

                        <SkillGapScore
                            score={
                                skillGap.readinessPercentage
                            }
                            matchedCount={
                                matchedSkills.length
                            }
                            missingCount={
                                missingSkills.length
                            }
                        />

                        <div className="skill-gap-columns">

                            <MatchedSkills
                                skills={matchedSkills}
                            />

                            <MissingSkills
                                skills={missingSkills}
                            />

                        </div>

                    </div>
                )}

            </div>

        </div>
    );
};

export default StudentSkillGap;