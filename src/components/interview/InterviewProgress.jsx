const InterviewProgress = ({ current, total }) => {
    const percentage =
        total > 0 ? (current / total) * 100 : 0;

    return (
        <div className="interview-progress">

            <div className="interview-progress-top">
                <span>
                    Question {current} of {total}
                </span>

                <span>
                    {Math.round(percentage)}%
                </span>
            </div>

            <div className="interview-progress-track">
                <div
                    className="interview-progress-fill"
                    style={{
                        width: `${percentage}%`,
                    }}
                />
            </div>

        </div>
    );
};

export default InterviewProgress;