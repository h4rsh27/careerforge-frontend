const InterviewHeader = ({
    jobRole,
    current,
    total,
}) => {
    return (
        <div className="interview-header">

            <div>
                <span className="interview-eyebrow">
                    AI MOCK INTERVIEW
                </span>

                <h1>{jobRole}</h1>

                <p>
                    Demonstrate your knowledge, reasoning,
                    and problem-solving skills.
                </p>
            </div>

            <div className="interview-counter">
                <strong>{current}</strong>
                <span> / {total}</span>
            </div>

        </div>
    );
};

export default InterviewHeader;