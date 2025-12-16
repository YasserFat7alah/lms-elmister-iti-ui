"use client"
import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Minimize2, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useSelector } from "react-redux"

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState("")
    const [history, setHistory] = useState([
        { role: "assistant", text: "Hello! I'm El Mister AI. How can I help you today?" }
    ])
    const [isLoading, setIsLoading] = useState(false)
    const scrollRef = useRef(null)

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [history, isOpen])

    const router = require("next/navigation").useRouter() // Using require to avoid import issues if any

    const handleSend = async () => {
        if (!message.trim() || isLoading) return

        const userMsg = message.trim()
        setMessage("")
        setHistory(prev => [...prev, { role: "user", text: userMsg }])
        setIsLoading(true)

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4040/api/v1'}/ai/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMsg,
                    context: "support"
                })
            })

            const data = await res.json()

            if (data.success && data.data) {
                // Handle Structured Response { text, action }
                const { text, action } = data.data
                setHistory(prev => [...prev, { role: "assistant", text: text || data.data }])

                if (action && action.type === "redirect") {
                    if (action.data) {
                        localStorage.setItem("courseDraft", JSON.stringify(action.data))
                    }
                    setTimeout(() => router.push(action.url), 1500)
                }
            } else {
                setHistory(prev => [...prev, { role: "assistant", text: "Sorry, I encountered an error." }])
            }
        } catch (error) {
            setHistory(prev => [...prev, { role: "assistant", text: "Network error. Please try again." }])
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="fixed bottom-5 right-5 z-[9999] font-sans" dir="auto">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-[350px] sm:w-[380px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-blue-100 flex flex-col"
                        style={{ maxHeight: "calc(100vh - 100px)", height: "500px" }}
                    >
                        {/* Header */}
                        <div className="bg-[#FF0055] p-4 flex items-center justify-between text-white shadow-md">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                                    <MessageCircle size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">El Mister AI</h3>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <Minimize2 size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50"
                        >
                            {history.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === "user"
                                            ? "bg-[#FF0055] text-white rounded-br-none"
                                            : "bg-white border border-gray-100 text-gray-800 rounded-bl-none"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                                        <Loader2 size={14} className="animate-spin text-blue-500" />
                                        <span className="text-xs text-gray-500">Thinking...</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-3 bg-white border-t border-gray-100">
                            <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-full border border-gray-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-100 transition-all">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask me anything..."
                                    className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none text-gray-700 min-w-0"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!message.trim() || isLoading}
                                    className={`p-2 rounded-full transition-all duration-200 ${message.trim() && !isLoading
                                        ? "bg-[#FF0055] text-white hover:bg-pink-700 shadow-md transform hover:scale-105"
                                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    <Send size={16} className={message.trim() && !isLoading ? "ml-0.5" : ""} />
                                </button>
                            </div>
                            <div className="text-center mt-2">
                                <p className="text-[10px] text-gray-400">AI can make mistakes. Check important info.</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FAB */}
            {!isOpen && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className="bg-[#FF0055] hover:bg-pink-700 text-white p-4 rounded-full shadow-lg shadow-pink-500/30 flex items-center justify-center transition-all group"
                >
                    <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
                </motion.button>
            )}
        </div>
    )
}
