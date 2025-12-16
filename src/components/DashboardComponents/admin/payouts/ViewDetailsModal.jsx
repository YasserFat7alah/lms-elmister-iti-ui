import React from 'react'
import StatusBadge from './StatusBadge';
import { Button } from '@/components/ui/button';
import { DollarSign, X } from 'lucide-react';

const ViewDetailsModal = ({ payout, onClose }) => {
  if (!payout) return null;

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
        <div className="bg-linear-to-r from-[#392b80]/5 to-indigo-500/5 p-6 border-b border-gray-200 rounded-t-2xl sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#392b80]/10 rounded-lg">
                <DollarSign className="w-6 h-6 text-[#392b80]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Payout Details
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  View complete payout information
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
          {/* Teacher Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                Teacher Name
              </h3>
              <p className="text-lg font-semibold text-gray-900">{payout.teacher.name}</p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-1">
                Email Address
              </h3>
              <p className="text-gray-800 break-all">{payout.teacher.email}</p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-1">
                Amount
              </h3>
              <p className="text-2xl font-bold text-gray-900">${payout.amount} {payout.currency}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Status
              </h3>
              <StatusBadge status={payout.status} />
            </div>
          </div>

          {/* Dates */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Timeline
            </h3>
            <div className="space-y-2">
              <div className="flex gap-1">
                <span className="text-gray-600">Created At : </span>
                <span className="font-medium text-gray-900">{formatDate(payout.createdAt)}</span>
              </div>
              {payout.paidAt && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Paid At:</span>
                  <span className="font-medium text-green-600">{formatDate(payout.paidAt)}</span>
                </div>
              )}
              {payout.rejectedAt && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Rejected At:</span>
                  <span className="font-medium text-red-600">{formatDate(payout.rejectedAt)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Request Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                Requested By
              </h3>
              <p className="text-lg font-semibold text-gray-900">{payout.requestedBy.name}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                Approved By
              </h3>
              <p className="text-lg font-semibold text-gray-900">
                {payout.approvedBy?.name || '-'}
              </p>
            </div>
          </div>

          {/* Teacher Note */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-2">
              Teacher Note
            </h3>
            <p className="text-gray-800 leading-relaxed">{payout.teacherNote || 'No note provided'}</p>
          </div>

          {/* Admin Note */}
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="text-sm font-semibold text-purple-700 uppercase tracking-wide mb-2">
              Admin Note
            </h3>
            <p className="text-gray-800 leading-relaxed">{payout.adminNote || 'No note provided'}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 p-6 pt-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-gray-500 to-gray-600 text-white rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transition-all hover:shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


export default ViewDetailsModal 
