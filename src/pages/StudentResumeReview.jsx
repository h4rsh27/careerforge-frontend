import { useState } from "react";
import { analyzeResume } from "../api/resumeAnalysisApi";
import ResumeScoreCard from "../components/resumeReview/ResumeScoreCard";
import ResumeReviewSection from "../components/resumeReview/ResumeReviewSection";

const StudentResumeReview = () => {

    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAnalyze = async () => {

        try {
            setLoading(true);
            setError("");

            const data = await analyzeResume();

            setAnalysis(data);

        } catch (err) {

            console.error(
                "Resume analysis failed:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to analyze your resume right now."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="resume-review-page">

            <div className="resume-review-hero">

                <div className="resume-review-hero-content">

                    <div className="resume-review-eyebrow">
                        AI RESUME REVIEW
                    </div>

                    <h1>
                        Turn your resume into a
                        <span> stronger career asset.</span>
                    </h1>

                    <p>
                        CareerForge AI analyzes your resume for
                        ATS compatibility, skills, projects,
                        experience and improvement opportunities.
                    </p>

                    {analysis?.fileName && (
                        <div className="resume-file-badge">
                            📄 {analysis.fileName}
                        </div>
                    )}

                </div>

                <button
                    type="button"
                    className="resume-analyze-button"
                    onClick={handleAnalyze}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="button-spinner" />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            ✨
                            {analysis
                                ? "Analyze Again"
                                : "Analyze My Resume"}
                        </>
                    )}
                </button>

            </div>

            {error && (
                <div className="resume-analysis-error">
                    <strong>Analysis failed</strong>
                    <span>{error}</span>
                </div>
            )}

            {loading && (
                <div className="resume-analysis-loading">

                    <div className="loading-orb">
                        ✦
                    </div>

                    <h2>
                        CareerForge AI is reviewing your resume
                    </h2>

                    <p>
                        Checking structure, skills, ATS compatibility
                        and improvement opportunities...
                    </p>

                </div>
            )}

            {!loading && analysis && (
                <div className="resume-analysis-content">

                    <div className="resume-score-grid">

                        <ResumeScoreCard
                            label="Overall Resume Score"
                            score={analysis.overallScore}
                            description="Overall quality and effectiveness of your resume."
                        />

                        <ResumeScoreCard
                            label="ATS Compatibility"
                            score={analysis.atsScore}
                            description="How well your resume is structured for ATS systems."
                        />

                    </div>

                    <section className="resume-summary-card">

                        <div className="resume-section-heading">
                            <div className="resume-section-icon">
                                ✦
                            </div>

                            <h2>AI Summary</h2>
                        </div>

                        <p>
                            {analysis.summary ||
                                "No summary was provided."}
                        </p>

                    </section>

                    <div className="resume-review-grid">

                        <ResumeReviewSection
                            title="Strengths"
                            icon="✓"
                            items={analysis.strengths}
                        />

                        <ResumeReviewSection
                            title="Weaknesses"
                            icon="!"
                            items={analysis.weaknesses}
                        />

                        <ResumeReviewSection
                            title="Technical Skills"
                            icon="⌘"
                            items={analysis.skills}
                        />

                        <ResumeReviewSection
                            title="Missing Skills"
                            icon="＋"
                            items={analysis.missingSkills}
                        />

                        <ResumeReviewSection
                            title="Project Feedback"
                            icon="◈"
                            items={analysis.projectFeedback}
                        />

                        <ResumeReviewSection
                            title="Experience Feedback"
                            icon="↗"
                            items={analysis.experienceFeedback}
                        />

                        <ResumeReviewSection
                            title="Education Feedback"
                            icon="◇"
                            items={analysis.educationFeedback}
                        />

                        <ResumeReviewSection
                            title="Keyword Suggestions"
                            icon="#"
                            items={analysis.keywordSuggestions}
                        />

                    </div>

                    <section className="resume-improvement-card">

                        <div className="resume-section-heading">
                            <div className="resume-section-icon">
                                ✨
                            </div>

                            <div>
                                <h2>
                                    Recommended Improvements
                                </h2>

                                <p>
                                    Practical changes you can make
                                    to strengthen your resume.
                                </p>
                            </div>
                        </div>

                        <ol className="improvement-list">

                            {(analysis.improvementSuggestions || [])
                                .map((item, index) => (

                                    <li key={index}>

                                        <span className="improvement-number">
                                            {String(index + 1).padStart(
                                                2,
                                                "0"
                                            )}
                                        </span>

                                        <span>{item}</span>

                                    </li>

                                ))}

                        </ol>

                    </section>

                </div>
            )}

            {!loading && !analysis && !error && (
                <div className="resume-analysis-empty">

                    <div className="empty-icon">
                        ✦
                    </div>

                    <h2>
                        Your resume is ready for review
                    </h2>

                    <p>
                        Click <strong>Analyze My Resume</strong> to
                        get an AI-powered review of your resume.
                    </p>

                </div>
            )}

        </div>
    );
};

export default StudentResumeReview;