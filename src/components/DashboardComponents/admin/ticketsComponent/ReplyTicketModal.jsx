"use client";
import React, { useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { useReplyToTicketMutation } from "@/redux/api/endPoints/ticketsApiSlice";
import { toast } from "react-hot-toast";

const ReplyTicketModal = ({ item, isOpen, onClose, onSuccess }) => {
    const [message, setMessage] = useState("");
    const [replyToTicket, { isLoading }] = useReplyToTicketMutation();

    if (!isOpen || !item) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        try {
            await replyToTicket({ id: item.id, message }).unwrap();
            toast.success("Reply sent successfully");
            setMessage("");
            onSuccess(item); // Trigger "Open View Modal" flow
            onClose();
        } catch (error) {
            console.error("Failed to reply:", error);
            toast.error("Failed to send reply");
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-gradient-to-r from-[#392b80]/5 to-indigo-500/5 p-6 border-b border-gray-200 rounded-t-2xl flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#392b80]/10 rounded-lg">
                            <MessageSquare className="w-5 h-5 text-[#392b80]" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Reply to Ticket</h3>
                            <p className="text-xs text-gray-500">To: {item.fullName}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Ticket Details Context */}
                <div className="px-6 pt-6 pb-2">
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                        <h4 className="text-sm font-bold text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-600 line-clamp-3">{item.message}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Message
                            </label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your reply here..."
                                required
                                className="w-full h-32 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#392b80]/20 focus:border-[#392b80] outline-none text-sm resize-none"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || !message.trim()}
                            className="px-4 py-2 bg-[#392b80] text-white text-sm font-semibold rounded-lg hover:bg-[#2d2260] transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {isLoading ? "Sending..." : "Send Reply"}
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReplyTicketModal;
