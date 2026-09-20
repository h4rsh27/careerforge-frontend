const InterviewResult = ({
    results,
    session,
    onComplete,
    completing,
}) => {
    const totalScore = results.reduce(
        (sum, result) => sum + (result.score || 0),
        0
    );

    const averageScore =
        results.length > 0
            ? totalScore / results.length
            : 0;

    return (
        <div className="interview-result">

            <div className="result-hero">

                <span className="interview-eyebrow">
                    INTERVIEW COMPLETED
                </span>

                <h1>
                    Your Interview Results
                </h1>

                <p>{session.jobRole}</p>

                <div className="result-score">
                    <strong>
                        {averageScore.toFixed(1)}
                    </strong>

                    <span>/ 10</span>
                </div>

                <span className="result-label">
                    Average Score
                </span>

            </div>

            <div className="result-list">

                {results.map((result, index) => (
                    <div
                        className="result-card"
                        key={result.questionId}
                    >

                        <div className="result-card-top">

                            <span>
                                Question {index + 1}
                            </span>

                            <strong>
                                {result.score ?? 0}/10
                            </strong>

                        </div>

                        <h3>
                            {result.question}
                        </h3>

                        <div className="result-answer">
                            <span>Your Answer</span>

                            <p>
                                {result.answer}
                            </p>
                        </div>

                        {result.feedback && (
                            <div className="result-feedback">

                                <span>
                                    AI Feedback
                                </span>

                                <p>
                                    {result.feedback}
                                </p>

                            </div>
                        )}

                    </div>
                ))}

            </div>

            <button
                className="complete-interview-button"
                onClick={onComplete}
                disabled={completing}
            >
                {completing
                    ? "Completing..."
                    : "Finish Interview"}
            </button>

        </div>
    );
};

export default InterviewResult;