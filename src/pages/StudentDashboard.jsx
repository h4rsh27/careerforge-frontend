import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

import {
    getDashboardProfile,
    getDashboardSkills,
    getDashboardResume,
    getDashboardJobs,
    getDashboardApplications,
} from "../api/dashboardApi";

import DashboardHero from "../components/dashboard/DashboardHero";
import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardJobs from "../components/dashboard/DashboardJobs";
import DashboardSkillGap from "../components/dashboard/DashboardSkillGap";
import DashboardRoadmap from "../components/dashboard/DashboardRoadmap";
import DashboardApplications from "../components/dashboard/DashboardApplications";

const StudentDashboard = () => {
    const { user } = useAuth();

    const [profile, setProfile] =
        useState(null);

    const [skills, setSkills] =
        useState([]);

    const [resume, setResume] =
        useState(null);

    const [jobs, setJobs] =
        useState([]);

    const [applications, setApplications] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            setLoading(true);
            setError("");

            const results =
                await Promise.allSettled([
                    getDashboardProfile(),
                    getDashboardSkills(),
                    getDashboardResume(),
                    getDashboardJobs(),
                    getDashboardApplications(),
                ]);

            const [
                profileResult,
                skillsResult,
                resumeResult,
                jobsResult,
                applicationsResult,
            ] = results;

            if (
                profileResult.status ===
                "fulfilled"
            ) {
                setProfile(
                    profileResult.value
                );
            }

            if (
                skillsResult.status ===
                "fulfilled"
            ) {
                setSkills(
                    Array.isArray(
                        skillsResult.value
                    )
                        ? skillsResult.value
                        : []
                );
            }

            if (
                resumeResult.status ===
                "fulfilled"
            ) {
                setResume(
                    resumeResult.value
                );
            }

            if (
                jobsResult.status ===
                "fulfilled"
            ) {
                const data =
                    jobsResult.value;

                const recommendationList =
                    data?.recommendations ||
                    data?.jobs ||
                    data?.jobRecommendations ||
                    [];

                setJobs(
                    Array.isArray(
                        recommendationList
                    )
                        ? recommendationList
                        : []
                );
            }

            if (
                applicationsResult.status ===
                "fulfilled"
            ) {
                setApplications(
                    applicationsResult.value
                );
            }
        } catch {
            setError(
                "Unable to load your dashboard."
            );
        } finally {
            setLoading(false);
        }
    };

    const calculateProfileCompletion =
        () => {
            if (!profile) {
                return 0;
            }

            const fields = [
                "phone",
                "college",
                "degree",
                "branch",
                "graduationYear",
                "location",
                "bio",
            ];

            const completed =
                fields.filter(
                    (field) => {
                        const value =
                            profile[field];

                        return (
                            value !== null &&
                            value !== undefined &&
                            String(
                                value
                            ).trim() !== ""
                        );
                    }
                ).length;

            return Math.round(
                (completed /
                    fields.length) *
                    100
            );
        };

    if (loading) {
        return (
            <main className="dashboard-page">
                <div className="dashboard-loading">
                    <div className="loading-spinner"></div>

                    <h2>
                        Building your career
                        dashboard
                    </h2>

                    <p>
                        Gathering your CareerForge
                        intelligence...
                    </p>
                </div>
            </main>
        );
    }

    const profileCompletion =
        calculateProfileCompletion();

    const applicationsCount =
        applications?.totalApplications ||
        0;

    return (
        <main className="dashboard-page">
            <div className="dashboard-page-background"></div>

            <div className="dashboard-page-content">
                {error && (
                    <div className="dashboard-alert">
                        <span>!</span>
                        {error}
                    </div>
                )}

                <DashboardHero
                    user={user}
                    profileCompletion={
                        profileCompletion
                    }
                />

                <DashboardStats
                    skillsCount={
                        skills.length
                    }
                    hasResume={Boolean(
                        resume
                    )}
                    jobsCount={
                        jobs.length
                    }
                    applicationsCount={
                        applicationsCount
                    }
                />

                <div className="dashboard-main-grid">
                    <DashboardJobs
                        jobs={jobs}
                    />

                    <DashboardSkillGap />
                </div>

                <div className="dashboard-main-grid">
                    <DashboardRoadmap />

                    <DashboardApplications
                        analytics={
                            applications
                        }
                    />
                </div>
            </div>
        </main>
    );
};

export default StudentDashboard;