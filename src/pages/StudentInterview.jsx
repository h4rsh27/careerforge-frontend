import { useEffect, useState } from "react";

import {
    startInterview,
    getInterviewQuestions,
    submitInterviewAnswer,
    completeInterview,
} from "../api/interviewApi";

import { getJobRoles } from "../api/learningRoadmapApi";

import InterviewHeader from "../components/interview/InterviewHeader";
import InterviewProgress from "../components/interview/InterviewProgress";
import InterviewQuestion from "../components/interview/InterviewQuestion";
import InterviewResult from "../components/interview/InterviewResult";

const StudentInterview = () => {
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState("");

    const [session, setSession] = useState(null);
    const [questions, setQuestions] = useState([]);

    const [currentIndex, setCurrentIndex] = useState(0);

    const [answer, setAnswer] = useState("");
    const [results, setResults] = useState([]);

    const [loadingRoles, setLoadingRoles] = useState(true);
    const [starting, setStarting] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [completing, setCompleting] = useState(false);

    const [completed, setCompleted] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadRoles();
    }, []);

    const loadRoles = async () => {
        try {
            setLoadingRoles(true);
            setError("");

            const data = await getJobRoles();

            setRoles(data || []);
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                    "Unable to load job roles."
            );
        } finally {
            setLoadingRoles(false);
        }
    };

    const handleStartInterview = async () => {
        if (!selectedRole) {
            setError("Please select a job role.");
            return;
        }

        try {
            setStarting(true);
            setError("");

            const newSession =
                await startInterview(selectedRole);

            setSession(newSession);

            const questionData =
                await getInterviewQuestions(
                    newSession.sessionId
                );

            const sortedQuestions =
                [...(questionData || [])].sort(
                    (a, b) =>
                        a.questionOrder -
                        b.questionOrder
                );

            setQuestions(sortedQuestions);
            setCurrentIndex(0);
            setAnswer("");
            setResults([]);
            setCompleted(false);
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                    "Unable to start the interview."
            );
        } finally {
            setStarting(false);
        }
    };

    const handleSubmitAnswer = async () => {
        if (!answer.trim()) {
            setError("Please enter your answer.");
            return;
        }

        const currentQuestion =
            questions[currentIndex];

        if (!currentQuestion) {
            return;
        }

        try {
            setSubmitting(true);
            setError("");

            const result =
                await submitInterviewAnswer(
                    currentQuestion.questionId,
                    answer.trim()
                );

            setResults((previous) => [
                ...previous,
                result,
            ]);

            setAnswer("");

            if (
                currentIndex <
                questions.length - 1
            ) {
                setCurrentIndex(
                    (previous) => previous + 1
                );
            }
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                    "Unable to submit your answer."
            );
        } finally {
            setSubmitting(false);
        }
    };

    const handleCompleteInterview = async () => {
        if (!session) {
            return;
        }

        try {
            setCompleting(true);
            setError("");

            const completedSession =
                await completeInterview(
                    session.sessionId
                );

            setSession(completedSession);
            setCompleted(true);
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                    "Unable to complete the interview."
            );
        } finally {
            setCompleting(false);
        }
    };

    const handleRestart = () => {
        setSession(null);
        setQuestions([]);
        setCurrentIndex(0);
        setAnswer("");
        setResults([]);
        setCompleted(false);
        setError("");
    };

    if (loadingRoles) {
        return (
            <div className="interview-page">
                <div className="interview-loading">
                    Loading interview setup...
                </div>
            </div>
        );
    }

    if (completed) {
        return (
            <div className="interview-page">

                <InterviewResult
                    results={results}
                    session={session}
                    onComplete={handleRestart}
                    completing={false}
                />

            </div>
        );
    }

    if (!session) {
        return (
            <div className="interview-page">

                <div className="interview-setup">

                    <div className="interview-setup-content">

                        <span className="interview-eyebrow">
                            CAREERFORGE AI
                        </span>

                        <h1>
                            AI Mock Interview
                        </h1>

                        <p>
                            Practice for your target role
                            with CareerForge. Answer
                            realistic technical questions
                            and receive feedback on your
                            responses.
                        </p>

                        <div className="interview-features">

                            <div>
                                <strong>01</strong>
                                <span>
                                    Choose your target role
                                </span>
                            </div>

                            <div>
                                <strong>02</strong>
                                <span>
                                    Answer interview
                                    questions
                                </span>
                            </div>

                            <div>
                                <strong>03</strong>
                                <span>
                                    Get evaluated feedback
                                </span>
                            </div>

                        </div>

                    </div>

                    <div className="interview-setup-card">

                        <h2>
                            Start an Interview
                        </h2>

                        <p>
                            Select the role you want to
                            practice for.
                        </p>

                        <label>
                            Target Job Role
                        </label>

                        <select
                            value={selectedRole}
                            onChange={(event) => {
                                setSelectedRole(
                                    event.target.value
                                );
                                setError("");
                            }}
                        >
                            <option value="">
                                Select a job role
                            </option>

                            {roles.map((role) => (
                                <option
                                    key={role.id}
                                    value={role.id}
                                >
                                    {role.roleName}
                                </option>
                            ))}
                        </select>

                        {error && (
                            <div className="interview-error">
                                {error}
                            </div>
                        )}

                        <button
                            className="start-interview-button"
                            onClick={handleStartInterview}
                            disabled={starting}
                        >
                            {starting
                                ? "Starting Interview..."
                                : "Start Interview →"}
                        </button>

                    </div>

                </div>

            </div>
        );
    }

    const currentQuestion =
        questions[currentIndex];

    const allQuestionsAnswered =
        results.length === questions.length;

    return (
        <div className="interview-page">

            <div className="interview-container">

                <InterviewHeader
                    jobRole={session.jobRole}
                    current={currentIndex + 1}
                    total={questions.length}
                />

                <InterviewProgress
                    current={Math.min(
                        currentIndex + 1,
                        questions.length
                    )}
                    total={questions.length}
                />

                {error && (
                    <div className="interview-error">
                        {error}
                    </div>
                )}

                {currentQuestion &&
                    !allQuestionsAnswered && (
                        <InterviewQuestion
                            question={currentQuestion}
                            answer={answer}
                            setAnswer={setAnswer}
                            disabled={false}
                            submitting={submitting}
                            onSubmit={
                                handleSubmitAnswer
                            }
                        />
                    )}

                {allQuestionsAnswered && (
                    <div className="interview-complete-card">

                        <div className="complete-icon">
                            ✓
                        </div>

                        <h2>
                            All questions answered
                        </h2>

                        <p>
                            You have answered all{" "}
                            {questions.length} questions.
                            Review your results and finish
                            the interview.
                        </p>

                        <button
                            className="complete-interview-button"
                            onClick={
                                handleCompleteInterview
                            }
                            disabled={completing}
                        >
                            {completing
                                ? "Completing..."
                                : "Finish Interview →"}
                        </button>

                    </div>
                )}

            </div>

        </div>
    );
};

export default StudentInterview;