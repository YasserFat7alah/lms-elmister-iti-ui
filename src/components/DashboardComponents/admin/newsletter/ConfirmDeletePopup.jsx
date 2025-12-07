import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmDeletePopUp = ({ item, isOpen, onConfirm, onCancel, isBulk, selectedCount }) => {
  if (!isOpen || !item) return null;

   return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-50 to-rose-50 p-6 border-b border-red-100 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Confirm Delete
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  This action cannot be undone
                </p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isBulk ? (
            <>
              <p className="text-gray-700 mb-2">
                Are you sure you want to delete <span className="font-bold text-red-600">{selectedCount}</span> newsletter{selectedCount > 1 ? 's' : ''}?
              </p>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-4">
                <p className="text-sm text-gray-600">
                  {selectedCount} item{selectedCount > 1 ? 's' : ''} will be permanently deleted
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-700 mb-2">
                Are you sure you want to delete this newsletter?
              </p>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-4">
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  {item?.title}
                </p>
                <p className="text-xs text-gray-600">{item?.subject}</p>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 pt-0">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletePopUp;

