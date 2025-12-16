"use client";
import { Check, X } from 'lucide-react';
import React, { useState } from 'react'

const ActionModal  = ({ isOpen, onClose, action, onConfirm }) => {

    const [note, setNote] = useState('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        onConfirm(note);
        setNote('');
        onClose();
    };

    const isReject = action === 'reject';

  return (
     <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-6 border-b border-gray-200 rounded-t-2xl ${isReject ? 'bg-gradient-to-r from-red-500/5 to-red-600/5' : 'bg-gradient-to-r from-green-500/5 to-green-600/5'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isReject ? 'bg-red-500/10' : 'bg-green-500/10'}`}>
              {isReject ? (
                <X className={`w-6 h-6 text-red-600`} />
              ) : (
                <Check className={`w-6 h-6 text-green-600`} />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {isReject ? 'Reject Payout' : 'Approve Payout'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {isReject ? 'Please provide a reason for rejection' : 'Add an optional note'}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Admin Note {isReject && <span className="text-red-500">*</span>}
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={isReject ? "Enter reason for rejection..." : "Enter optional note..."}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="4"
            required={isReject}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 p-6 pt-0">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isReject && !note.trim()}
            className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${
              isReject
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
                : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
            }`}
          >
            {isReject ? 'Reject' : 'Approve'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ActionModal 
