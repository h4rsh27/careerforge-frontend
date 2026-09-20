const ChatMessage = ({ message }) => {
    const isUser = message.role === "user";

    return (
        <div
            className={
                isUser
                    ? "career-chat-message user"
                    : "career-chat-message assistant"
            }
        >
            {!isUser && (
                <div className="career-ai-avatar">
                    C
                </div>
            )}

            <div className="career-chat-bubble">
                <div className="career-chat-role">
                    {isUser ? "You" : "CareerForge AI"}
                </div>

                <div className="career-chat-content">
                    {message.content}
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;