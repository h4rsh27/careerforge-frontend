const ResumeScoreCard = ({
    label,
    score,
    description
}) => {

    const getScoreClass = () => {
        if (score >= 80) return "score-good";
        if (score >= 60) return "score-average";
        return "score-low";
    };

    return (
        <div className="resume-score-card">

            <div className="score-card-header">
                <span>{label}</span>
            </div>

            <div className={`resume-score ${getScoreClass()}`}>
                {score}
                <span>/100</span>
            </div>

            <p>{description}</p>

            <div className="score-progress">
                <div
                    className={`score-progress-fill ${getScoreClass()}`}
                    style={{
                        width: `${Math.min(
                            Math.max(score, 0),
                            100
                        )}%`
                    }}
                />
            </div>

        </div>
    );
};

export default ResumeScoreCard;