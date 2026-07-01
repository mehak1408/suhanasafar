import { useEffect, useRef, useState } from "react";
import API from "../../services/api";

const quickQuestions = [
    "What does this app do?",
    "How do I book a seat?",
    "Show emergency numbers",
];

function ChatBot() {
    const [messages, setMessages] = useState([
        {
            role: "bot",
            text: "Hi, I’m Suhana AI. I can help with buses, bookings, schedules, and emergency support.",
        },
    ]);
    const [input, setInput] = useState("");
    const [open, setOpen] = useState(false);
    const [typing, setTyping] = useState(false);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (open) scrollToBottom();
    }, [messages, typing, open]);

    const handleSend = async (customText) => {
        const textToSend = (customText || input).trim();
        if (!textToSend) return;

        const userMessage = { role: "user", text: textToSend };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setTyping(true);

        try {
            const res = await API.post("/ai/chat", { message: textToSend });

            const botMessage = {
                role: "bot",
                text: res.data.reply || "Sorry, I could not understand that.",
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "bot",
                    text:
                        error.response?.data?.message ||
                        error.message ||
                        "Something went wrong while getting a response.",
                },
            ]);
        } finally {
            setTyping(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="fixed bottom-6 right-6 z-50 bg-indigo-500 dark:bg-purple-600 text-white w-14 h-14 rounded-full shadow-lg hover:bg-indigo-600 dark:hover:bg-purple-700 transition flex items-center justify-center text-xl"
            >
                🤖
            </button>

            {open && (
                <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[75vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                    <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 flex items-start justify-between gap-3">
                        <div>
                            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                                Suhana AI Assistant
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Ask about routes, bookings, schedules, and emergency help.
                            </p>
                        </div>

                        <button
                            onClick={() => setOpen(false)}
                            className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white text-lg leading-none transition"
                        >
                            ×
                        </button>
                    </div>

                    <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3 bg-white dark:bg-slate-900">
                        {messages.length === 1 && (
                            <div className="flex flex-wrap gap-2">
                                {quickQuestions.map((question) => (
                                    <button
                                        key={question}
                                        onClick={() => handleSend(question)}
                                        className="text-xs px-3 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        )}

                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                {msg.role === "user" ? (
                                    <div className="max-w-[80%] px-4 py-2 rounded-2xl rounded-br-md text-sm bg-indigo-500 dark:bg-purple-600 text-white">
                                        {msg.text}
                                    </div>
                                ) : (
                                    <div className="flex items-start gap-2 max-w-[85%]">
                                        <div className="w-8 h-8 rounded-full bg-indigo-500 dark:bg-purple-600 text-white flex items-center justify-center text-sm shrink-0">
                                            🤖
                                        </div>
                                        <div className="px-4 py-2 rounded-2xl rounded-bl-md text-sm bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100">
                                            {msg.text}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {typing && (
                            <div className="flex justify-start">
                                <div className="flex items-start gap-2 max-w-[85%]">
                                    <div className="w-8 h-8 rounded-full bg-indigo-500 dark:bg-purple-600 text-white flex items-center justify-center text-sm shrink-0">
                                        🤖
                                    </div>
                                    <div className="px-4 py-2 rounded-2xl rounded-bl-md text-sm bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                        Suhana AI is typing...
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">

                        <div className="flex gap-2">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSend();
                                }}
                                placeholder="Ask Suhana AI..."
                                className="flex-1 bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 dark:focus:border-purple-500"
                            />

                            <button
                                onClick={() => handleSend()}
                                className="bg-indigo-500 dark:bg-purple-600 hover:bg-indigo-600 dark:hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ChatBot;