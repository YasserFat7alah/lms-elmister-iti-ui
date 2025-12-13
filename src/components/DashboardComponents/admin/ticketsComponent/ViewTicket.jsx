"use client";
import { Mail, Phone, Trash2, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const ViewTicket = ({ item, isOpen, onClose, onDelete, onStatusChange }) => {
  const [localStatus, setLocalStatus] = useState(item?.status || 'open');

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

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#392b80]/5 to-indigo-500/5 p-6 border-b border-gray-200 rounded-t-2xl sticky top-0 bg-white z-10">
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

        {/* Content */}
        <div className="p-6 space-y-4">
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
                className={`w-full px-3 py-2 rounded-lg text-sm font-semibold cursor-pointer border-2 transition-all ${
                  localStatus === "open"
                    ? "bg-green-50 text-green-700 border-green-300 hover:bg-green-100"
                    : localStatus === "pending"
                    ? "bg-yellow-50 text-yellow-700 border-yellow-300 hover:bg-yellow-100"
                    : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                <option value="open">Open</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
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
              <p className="text-gray-800">{item.phone}</p>
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

          {/* Date */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Submitted Date
            </h3>
            <p className="text-gray-800">{item.date}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-3 p-6 pt-4 border-t border-gray-100">
          <button
            onClick={handleEmail}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all  hover:shadow-md"
          >
            <Mail className="w-4 h-4" />
            Send Email
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
