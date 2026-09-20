import { useState } from "react";

import {
    sendCareerAssistantMessage,
} from "../api/careerAssistantApi";

import ChatMessage from
    "../components/careerAssistant/ChatMessage";

import ChatInput from
    "../components/careerAssistant/ChatInput";

import SuggestedPrompts from
    "../components/careerAssistant/SuggestedPrompts";

const StudentCareerAssistant = () => {

    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content:
                "Hi! I'm CareerForge AI. I can help you with career planning, Java development, interview preparation, resumes, projects, and learning roadmaps. What would you like to work on?",
        },
    ]);

    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const sendMessage = async (text = input) => {

        const message = text.trim();

        if (!message || loading) {
            return;
        }

        const userMessage = {
            role: "user",
            content: message,
        };

        const history = messages.map((item) => ({
            role: item.role,
            content: item.content,
        }));

        setMessages((previous) => [
            ...previous,
            userMessage,
        ]);

        setInput("");
        setError("");
        setLoading(true);

        try {

            const data =
                await sendCareerAssistantMessage(
                    message,
                    history
                );

            setMessages((previous) => [
                ...previous,
                {
                    role: "assistant",
                    content:
                        data.reply ||
                        "I couldn't generate a response.",
                },
            ]);

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.message ||
                "Unable to connect to CareerForge AI."
            );

        } finally {
            setLoading(false);
        }
    };

    const handlePromptSelect = (prompt) => {
        sendMessage(prompt);
    };

    return (
        <div className="career-assistant-page">

            <div className="career-assistant-shell">

                <header className="career-assistant-header">

                    <div className="career-assistant-brand">

                        <div className="career-ai-large-avatar">
                            C
                        </div>

                        <div>
                            <span>
                                CAREERFORGE AI
                            </span>

                            <h1>
                                Career Assistant
                            </h1>

                            <p>
                                Your personal AI partner
                                for career growth.
                            </p>
                        </div>

                    </div>

                    <div className="career-ai-status">
                        <span />
                        AI Online
                    </div>

                </header>

                <main className="career-chat-area">

                    {messages.length === 1 && (
                        <SuggestedPrompts
                            onSelect={
                                handlePromptSelect
                            }
                        />
                    )}

                    <div className="career-chat-messages">

                        {messages.map(
                            (message, index) => (
                                <ChatMessage
                                    key={index}
                                    message={message}
                                />
                            )
                        )}

                        {loading && (
                            <div className="career-chat-message assistant">

                                <div className="career-ai-avatar">
                                    C
                                </div>

                                <div className="career-chat-bubble">

                                    <div className="career-chat-role">
                                        CareerForge AI
                                    </div>

                                    <div className="career-typing">
                                        <span />
                                        <span />
                                        <span />
                                    </div>

                                </div>

                            </div>
                        )}

                    </div>

                </main>

                {error && (
                    <div className="career-chat-error">
                        {error}
                    </div>
                )}

                <footer className="career-chat-footer">

                    <ChatInput
                        value={input}
                        onChange={setInput}
                        onSubmit={() =>
                            sendMessage()
                        }
                        loading={loading}
                    />

                    <p>
                        CareerForge AI can make mistakes.
                        Verify important information.
                    </p>

                </footer>

            </div>

        </div>
    );
};

export default StudentCareerAssistant;