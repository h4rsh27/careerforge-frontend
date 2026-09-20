const ChatInput = ({
    value,
    onChange,
    onSubmit,
    loading,
}) => {

    const handleKeyDown = (event) => {
        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {
            event.preventDefault();

            if (!loading && value.trim()) {
                onSubmit();
            }
        }
    };

    return (
        <div className="career-chat-input-wrapper">

            <textarea
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Ask CareerForge AI anything..."
                rows={1}
                disabled={loading}
            />

            <button
                type="button"
                onClick={onSubmit}
                disabled={
                    loading ||
                    !value.trim()
                }
            >
                {loading ? "..." : "↑"}
            </button>

        </div>
    );
};

export default ChatInput;