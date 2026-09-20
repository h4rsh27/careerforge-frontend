const prompts = [
    "What should I learn next for a Java backend career?",
    "How can I prepare for a Java interview?",
    "What projects should I build for my resume?",
    "How can I improve my technical skills?",
];

const SuggestedPrompts = ({ onSelect }) => {
    return (
        <div className="career-suggested-prompts">

            {prompts.map((prompt) => (
                <button
                    key={prompt}
                    type="button"
                    onClick={() => onSelect(prompt)}
                >
                    {prompt}
                </button>
            ))}

        </div>
    );
};

export default SuggestedPrompts;