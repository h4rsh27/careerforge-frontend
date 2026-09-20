const InterviewQuestion = ({
    question,
    answer,
    setAnswer,
    disabled,
    onSubmit,
    submitting,
}) => {
    return (
        <div className="interview-question-card">

            <div className="question-meta">

                <span className="question-number">
                    Question {question.questionOrder}
                </span>

                <span className="question-category">
                    {question.category}
                </span>

            </div>

            <h2>
                {question.question}
            </h2>

            <div className="answer-section">

                <label htmlFor="interview-answer">
                    Your Answer
                </label>

                <textarea
                    id="interview-answer"
                    value={answer}
                    onChange={(event) =>
                        setAnswer(event.target.value)
                    }
                    placeholder="Explain your answer clearly..."
                    rows={8}
                    disabled={disabled || submitting}
                />

                <div className="answer-footer">

                    <span>
                        {answer.trim().length} characters
                    </span>

                    <button
                        type="button"
                        onClick={onSubmit}
                        disabled={
                            disabled ||
                            submitting ||
                            !answer.trim()
                        }
                    >
                        {submitting
                            ? "Evaluating..."
                            : "Submit Answer →"}
                    </button>

                </div>

            </div>

        </div>
    );
};

export default InterviewQuestion;