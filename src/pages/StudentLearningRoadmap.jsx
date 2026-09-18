import { useEffect, useState } from "react";

import {
    getJobRoles,
    getLearningRoadmap
} from "../api/learningRoadmapApi";

import RoadmapHeader from "../components/learningRoadmap/RoadmapHeader";
import RoadmapOverview from "../components/learningRoadmap/RoadmapOverview";
import RoadmapTimeline from "../components/learningRoadmap/RoadmapTimeline";

const StudentLearningRoadmap = () => {

    const [jobRoles, setJobRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState("");
    const [roadmap, setRoadmap] = useState(null);

    const [loadingRoles, setLoadingRoles] = useState(true);
    const [loadingRoadmap, setLoadingRoadmap] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {

        const loadRoles = async () => {

            try {

                setLoadingRoles(true);
                setError("");

                const data = await getJobRoles();

                const roles =
                    Array.isArray(data)
                        ? data
                        : data?.jobRoles ||
                          data?.roles ||
                          data?.content ||
                          [];

                setJobRoles(roles);

            } catch (err) {

                console.error(
                    "Failed to load job roles:",
                    err
                );

                setError(
                    "Unable to load job roles."
                );

            } finally {

                setLoadingRoles(false);
            }
        };

        loadRoles();

    }, []);

    const handleGenerate = async () => {

        if (!selectedRole) {
            return;
        }

        try {

            setLoadingRoadmap(true);
            setError("");
            setRoadmap(null);

            const data =
                await getLearningRoadmap(selectedRole);

            setRoadmap(data);

        } catch (err) {

            console.error(
                "Failed to generate roadmap:",
                err
            );

            setError(
                err?.response?.data?.message ||
                "Unable to generate learning roadmap."
            );

        } finally {

            setLoadingRoadmap(false);
        }
    };

    return (
        <div className="student-roadmap-page">

            <div className="student-roadmap-background" />

            <main className="student-roadmap-content">

                <RoadmapHeader
                    jobRoles={jobRoles}
                    selectedRole={selectedRole}
                    setSelectedRole={setSelectedRole}
                    onGenerate={handleGenerate}
                    loading={
                        loadingRoles ||
                        loadingRoadmap
                    }
                />

                {error && (
                    <div className="roadmap-error">
                        {error}
                    </div>
                )}

                {loadingRoadmap && (
                    <div className="roadmap-loading-card">

                        <div className="roadmap-loader" />

                        <h2>
                            Building your roadmap...
                        </h2>

                        <p>
                            CareerForge is analyzing the learning
                            path for your selected role.
                        </p>

                    </div>
                )}

                {!loadingRoadmap && !roadmap && (
                    <div className="roadmap-start-card">

                        <div className="roadmap-start-icon">
                            ✦
                        </div>

                        <h2>
                            Build Your Career Path
                        </h2>

                        <p>
                            Select a target job role above to generate
                            your personalized learning roadmap.
                        </p>

                    </div>
                )}

                {!loadingRoadmap && roadmap && (
                    <section className="roadmap-results">

                        <RoadmapOverview
                            roadmap={roadmap}
                        />

                        <div className="roadmap-section-heading">
                            <div>
                                <span>
                                    YOUR JOURNEY
                                </span>

                                <h2>
                                    Learning Path
                                </h2>
                            </div>
                        </div>

                        <RoadmapTimeline
                            roadmap={roadmap}
                        />

                    </section>
                )}

            </main>

        </div>
    );
};

export default StudentLearningRoadmap;