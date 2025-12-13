import React from "react";
import { X, Calendar, Mail, Edit, Trash2, Send } from "lucide-react";

const ViewPopup = ({ item, isOpen, onClose, onEdit, onDelete, onSend }) => {
  if (!isOpen || !item) return null;

  const handleEdit = () => {
    onEdit(item);
    onClose();
  };

  const handleDelete = () => {
    onDelete(item);
    onClose();
  };

  const handleSend = () => {
    onSend(item);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#392b80]/5 to-indigo-500/5 p-6 border-b border-gray-200 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#392b80]/10 rounded-lg">
                <Mail className="w-6 h-6 text-[#FF0055]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Newsletter Details
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  View and manage newsletter information
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
          {/* Title */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Newsletter Title
            </h3>
            <p className="text-lg font-semibold text-gray-900">{item.title}</p>
          </div>

          {/* Subject */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Subject
            </h3>
            <p className="text-gray-800 leading-relaxed">{item.subject}</p>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col">
              <span className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1 mb-1">
                <Calendar className="w-4 h-4" />
                Created At
              </span>
              <span className="text-sm text-gray-900">{item.createdat}</span>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col">
              <span className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1 mb-1">
                <Calendar className="w-4 h-4" />
                Last Updated
              </span>
              <span className="text-sm text-gray-900">{item.updatedat}</span>
            </div>
          </div>

          {/* Recipients */}
          {item.recipients && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                Recipients
              </h3>
              <p className="text-sm text-gray-900">
                {item.recipients} subscribers
              </p>
            </div>
          )}

          {/* Status */}
          {item.status && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Status:
              </span>
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                  item.status === "Sent"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {item.status}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className=" flex justify-end gap-3 p-6 pt-4 border-t border-gray-100">
          

          <button
            onClick={handleEdit}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all  hover:shadow-xl"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all hover:shadow-xl"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>

          <button
            onClick={handleSend}
            className="w-1/3 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all  hover:shadow-xl"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPopup;
