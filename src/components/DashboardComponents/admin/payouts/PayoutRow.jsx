"use client";
import { Button } from '@/components/ui/button';
import { Check, Eye, Trash2, X } from 'lucide-react';
import React from 'react'
import StatusBadge from './StatusBadge';

const PayoutRow = ({ payout, onView, onApprove, onReject, onDelete, isSelected, onToggleSelect }) => {

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };


  return (
    <tr
      className={`border-b border-gray-100 transition-colors cursor-pointer ${isSelected ? 'bg-[#392b80]/10' : 'hover:bg-gray-50'
        }`}
      onClick={onToggleSelect}
    >
      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelect}
          className="w-4 h-4 text-[#392b80] rounded border-gray-300 focus:ring-[#392b80] cursor-pointer"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div>
          <p className="font-medium text-gray-900">{payout.teacher.name}</p>
          <p className="text-sm text-gray-500">{payout.teacher.email}</p>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="font-semibold text-gray-900">${payout.amount}</span>
        <span className="text-xs text-gray-500 ml-1">{payout.currency}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={payout.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        {payout.requestedBy.name}
      </td>
      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
        {payout.approvedBy?.name || <span className="text-gray-400">-</span>}
      </td>
      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
        {formatDate(payout.createdAt)}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onView(payout);
            }}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group cursor-pointer"
            title="View Details"
          >
            <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
          {payout.status === 'pending' && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onApprove(payout);
                }}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors group cursor-pointer"
                title="Approve"
              >
                <Check className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onReject(payout);
                }}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors group cursor-pointer"
                title="Reject"
              >
                <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
            </>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(payout);
            }}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors group cursor-pointer"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default PayoutRow
