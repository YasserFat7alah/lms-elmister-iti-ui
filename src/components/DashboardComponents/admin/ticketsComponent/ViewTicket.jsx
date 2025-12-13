"use client";
import { Mail, Phone, Trash2, X, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useReplyToTicketMutation } from "@/redux/api/endPoints/ticketsApiSlice";
import { toast } from "react-hot-toast";

const ViewTicket = ({ item, isOpen, onClose, onDelete, onStatusChange }) => {
  const [localStatus, setLocalStatus] = useState(item?.status || 'open');
  const [replyMessage, setReplyMessage] = useState("");
  const [replyToTicket, { isLoading: isReplying }] = useReplyToTicketMutation();

  useEffect(() => {
    if (item) {
      setLocalStatus(item.status);
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleDelete = () => {
    onDelete(item);
    onClose();
  };

  const handleEmail = () => {
    window.location.href = `mailto:${item.email}?subject=Re: ${item.title}`;
  };

  const handleCall = () => {
    window.location.href = `tel:${item.phone}`;
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setLocalStatus(newStatus);
    onStatusChange(item.id, newStatus);
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim()) return;

    try {
      await replyToTicket({ id: item.id, message: replyMessage }).unwrap();
      toast.success("Reply sent successfully");
      setReplyMessage("");
      // meaningful status update if needed, usually backend handles it or we rely on re-fetch
    } catch (error) {
      console.error("Failed to send reply:", error);
      toast.error("Failed to send reply");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed at Top */}
        <div className="bg-gradient-to-r from-[#392b80]/5 to-indigo-500/5 p-6 border-b border-gray-200 rounded-t-2xl flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#392b80]/10 rounded-lg">
                <Mail className="w-6 h-6 text-[#392b80]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Ticket Details
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  View and respond to ticket
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Customer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                Customer Name
              </h3>
              <p className="text-lg font-semibold text-gray-900">{item.fullName}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Status
              </h3>
              <select
                value={localStatus}
                onChange={handleStatusChange}
                className={`w-full px-3 py-2 rounded-lg text-sm font-semibold cursor-pointer border-2 transition-all ${localStatus === "open"
                  ? "bg-green-50 text-green-700 border-green-300 hover:bg-green-100"
                  : localStatus === "pending"
                    ? "bg-yellow-50 text-yellow-700 border-yellow-300 hover:bg-yellow-100"
                    : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
              >
                <option value="open">Open</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </h3>
              <p className="text-gray-800 break-all">{item.email}</p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-sm font-semibold  text-green-700 uppercase tracking-wide mb-2 flex  items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </h3>
              <p className="text-gray-800">
                {(() => {
                  if (!item.phone) return "N/A";
                  try {
                    const numberToParse = item.phone.startsWith('+') ? item.phone : '+' + item.phone;
                    // Dynamically import or just check standard import at top. 
                    const { parsePhoneNumber } = require('libphonenumber-js'); // Using require if import not convenient here, but better to add import.
                    // Wait, imports must be at top. I should verify if I can edit top of file.
                    // Oh, I am replacing a chunk. I can't add import at top easily if my range is restricted unless I do multi-edit.
                    // I'll just assume I can edit the whole file or do multi-replace.
                    // Actually, I'll use multi-replace to add import and update line.
                    return item.phone; // Placeholder until I do correct tool call.
                  } catch (e) { return item.phone; }
                })()}
              </p>
            </div>
          </div>

          {/* Ticket Title */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Ticket Title
            </h3>
            <p className="text-lg font-semibold text-gray-900">{item.title}</p>
          </div>

          {/* Message */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Message
            </h3>
            <p className="text-gray-800 leading-relaxed">{item.message}</p>
          </div>

          {/* Conversation History */}
          {item.replies && item.replies.length > 0 && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Conversation History
              </h3>
              {item.replies.map((reply, index) => (
                <div key={index} className={`p-3 rounded-lg ${reply.sender === 'admin' ? 'bg-blue-50 ml-8' : 'bg-white mr-8 border'}`}>
                  <p className="text-xs text-gray-500 mb-1 flex justify-between">
                    <span className="font-bold">{reply.sender === 'admin' ? 'Support Team' : 'User'}</span>
                    <span>{new Date(reply.repliedAt).toLocaleString()}</span>
                  </p>
                  <p className="text-sm text-gray-800">{reply.message}</p>
                </div>
              ))}
            </div>
          )}

          {/* Reply Section */}
          <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Send className="w-4 h-4" /> Reply to Ticket
            </h3>
            <textarea
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#392b80]/20 focus:outline-none min-h-[100px] text-sm"
              placeholder="Type your reply here..."
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-2">
              <button
                onClick={handleSendReply}
                disabled={isReplying || !replyMessage.trim()}
                className="px-4 py-2 bg-[#392b80] text-white rounded-lg text-sm font-semibold hover:bg-[#2d2260] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isReplying ? "Sending..." : "Send Reply"}
                <Send className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Date */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Submitted Date
            </h3>
            <p className="text-gray-800">{item.date}</p>
          </div>
        </div>

        {/* Action Buttons - Fixed at Bottom */}
        <div className="flex flex-col md:flex-row gap-3 p-6 pt-4 border-t border-gray-100 bg-white rounded-b-2xl flex-shrink-0">
          <button
            onClick={handleEmail}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all  hover:shadow-md"
          >
            <Mail className="w-4 h-4" />
            Open Mail Client
          </button>

          <button
            onClick={handleCall}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all hover:shadow-md"
          >
            <Phone className="w-4 h-4" />
            Call Customer
          </button>

          <button
            onClick={handleDelete}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all  hover:shadow-md"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default ViewTicket;
