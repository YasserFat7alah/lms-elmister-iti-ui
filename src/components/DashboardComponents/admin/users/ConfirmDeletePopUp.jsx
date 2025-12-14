import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmDeletePopUp = ({ isOpen, onConfirm, onCancel, isBulk, selectedCount, userName, actionType = 'delete' }) => {
  if (!isOpen) return null;

  const actionConfig = {
    delete: {
      title: "Confirm Delete",
      message: "This action cannot be undone",
      btnText: "Delete",
      confirmText: "Are you sure you want to delete this user?",
      theme: "red",
      iconColor: "text-red-600",
      bgColor: "bg-red-100",
      btnClass: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
      headerClass: "bg-gradient-to-r from-red-50 to-rose-50 border-red-100"
    },
    suspend: {
      title: "Confirm Suspension",
      message: "User access will be limited",
      btnText: "Suspend",
      confirmText: "Are you sure you want to suspend this user?",
      theme: "orange",
      iconColor: "text-orange-600",
      bgColor: "bg-orange-100",
      btnClass: "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
      headerClass: "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-100"
    },
    block: {
      title: "Confirm Block",
      message: "User will be completely restricted",
      btnText: "Block",
      confirmText: "Are you sure you want to block this user from accessing the website?",
      theme: "red",
      iconColor: "text-red-600",
      bgColor: "bg-red-100",
      btnClass: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800",
      headerClass: "bg-gradient-to-r from-red-50 to-rose-50 border-red-100"
    },
    active: {
      title: "Activate User",
      message: "Restore full access to this user",
      btnText: "Activate",
      confirmText: "Are you sure you want to activate this user?",
      theme: "green",
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
      btnClass: "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
      headerClass: "bg-gradient-to-r from-green-50 to-emerald-50 border-green-100"
    }
  };

  const config = actionConfig[actionType] || actionConfig['delete'];

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
        <div className={`p-6 border-b rounded-t-2xl ${config.headerClass}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-full ${config.bgColor}`}>
                <AlertTriangle className={`w-6 h-6 ${config.iconColor}`} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {config.title}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {config.message}
                </p>
              </div>
            </div>

            <button
              onClick={onCancel}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
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
                Are you sure you want to {config.btnText.toLowerCase()}
                <span className={`font-bold ml-1 ${config.iconColor}`}> {selectedCount} users</span>?
              </p>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-4">
                <p className="text-sm text-gray-600">
                  {selectedCount} user{selectedCount > 1 ? "s" : ""} will be {config.btnText.toLowerCase()}ed.
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-700 mb-2">
                {config.confirmText || `Are you sure you want to ${config.btnText.toLowerCase()} this user?`}
              </p>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-4">
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  {userName}
                </p>
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
            className={`flex-1 px-6 py-3 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl ${config.btnClass}`}
          >
            {config.btnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletePopUp;
