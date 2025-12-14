import React from 'react';
import { AlertTriangle, X, CheckCircle, Info } from 'lucide-react';

/**
 * Generic Confirmation Modal
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls visibility
 * @param {function} props.onClose - Function to close the modal
 * @param {function} props.onConfirm - Function to run on confirmation
 * @param {string} props.title - Modal title
 * @param {string|React.ReactNode} props.message - Main message/question
 * @param {string|React.ReactNode} props.description - Secondary description (optional)
 * @param {string} props.confirmText - Text for confirm button (default: "Confirm")
 * @param {string} props.cancelText - Text for cancel button (default: "Cancel")
 * @param {'danger'|'warning'|'success'|'info'} props.theme - Visual theme (default: 'danger')
 * @param {boolean} props.isLoading - Show loading state on confirm button
 */
const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    theme = "danger",
    isLoading = false
}) => {
    if (!isOpen) return null;

    // Theme Configuration
    const themes = {
        danger: {
            icon: AlertTriangle,
            color: "text-red-600",
            bgColor: "bg-red-100",
            headerBg: "bg-gradient-to-r from-red-50 to-rose-50 border-red-100",
            confirmBtn: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800",
            confirmRing: "focus:ring-red-200"
        },
        warning: {
            icon: AlertTriangle,
            color: "text-orange-600",
            bgColor: "bg-orange-100",
            headerBg: "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-100",
            confirmBtn: "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
            confirmRing: "focus:ring-orange-200"
        },
        success: {
            icon: CheckCircle,
            color: "text-green-600",
            bgColor: "bg-green-100",
            headerBg: "bg-gradient-to-r from-green-50 to-emerald-50 border-green-100",
            confirmBtn: "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
            confirmRing: "focus:ring-green-200"
        },
        info: {
            icon: Info,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
            headerBg: "bg-gradient-to-r from-blue-50 to-sky-50 border-blue-100",
            confirmBtn: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
            confirmRing: "focus:ring-blue-200"
        }
    };

    const currentTheme = themes[theme] || themes.danger;
    const Icon = currentTheme.icon;

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className={`p-6 border-b rounded-t-2xl ${currentTheme.headerBg}`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-full ${currentTheme.bgColor}`}>
                                <Icon className={`w-6 h-6 ${currentTheme.color}`} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 leading-tight">
                                    {title}
                                </h2>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 -mr-2 bg-white/50 hover:bg-white rounded-lg transition-colors text-gray-500 hover:text-gray-700"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <p className="text-lg text-gray-800 font-medium">
                        {message}
                    </p>

                    {description && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-600">
                            {description}
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 p-6 pt-0">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-gray-200"
                        disabled={isLoading}
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        className={`flex-1 px-6 py-3 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed ${currentTheme.confirmBtn} ${currentTheme.confirmRing}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Processing...
                            </span>
                        ) : (
                            confirmText
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
