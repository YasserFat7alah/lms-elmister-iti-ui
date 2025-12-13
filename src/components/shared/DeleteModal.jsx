import React from 'react';
import { AlertTriangle, X, Archive, Trash2 } from 'lucide-react';
import { Spinner } from "@/components/shared/Loader";

const DeleteModal = ({
    isOpen,
    onClose,
    course,
    onConfirmDelete,
    onConfirmArchive,
    onConfirm, // Generic confirm
    title, // Generic title
    description, // Generic description
    isLoading = false
}) => {
    if (!isOpen) return null;

    let modalConfig = {};

    // Mode 1: Course Specific (Legacy)
    if (course) {
        const hasStudents = (course.totalStudents && course.totalStudents > 0) || (course.students && course.students.length > 0);

        modalConfig = hasStudents ? {
            title: "Archive Course",
            description: `This course has ${course.totalStudents || 0} active students. To preserve their data, we will archive it instead of deleting.`,
            icon: Archive,
            themeColor: "orange",
            bgHeader: "bg-orange-50 border-orange-100",
            iconBg: "bg-orange-100",
            iconColor: "text-orange-600",
            btnColor: "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
            actionText: "Archive Course",
            action: () => onConfirmArchive(course._id)
        } : {
            title: "Delete Permanently",
            description: "This course has 0 students. This action will permanently delete the course and all its groups. This cannot be undone.",
            icon: Trash2,
            themeColor: "red",
            bgHeader: "bg-gradient-to-r from-red-50 to-rose-50 border-red-100",
            iconBg: "bg-red-100",
            iconColor: "text-red-600",
            btnColor: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
            actionText: "Delete Permanently",
            action: () => onConfirmDelete(course._id)
        };
    }
    // Mode 2: Generic
    else {
        modalConfig = {
            title: title || "Confirm Delete",
            description: description || "Are you sure you want to delete this item? This action cannot be undone.",
            icon: Trash2, // Default to trash
            themeColor: "red",
            bgHeader: "bg-gradient-to-r from-red-50 to-rose-50 border-red-100",
            iconBg: "bg-red-100",
            iconColor: "text-red-600",
            btnColor: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
            actionText: "Delete",
            action: onConfirm
        };
    }

    const Icon = modalConfig.icon;

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Header Dinamic */}
                <div className={`${modalConfig.bgHeader} p-6 border-b rounded-t-2xl`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-full ${modalConfig.iconBg}`}>
                                <Icon className={`w-6 h-6 ${modalConfig.iconColor}`} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    {modalConfig.title}
                                </h2>
                                <p className="text-sm text-gray-600 mt-1">
                                    {course ? (modalConfig.title === "Archive Course" ? "Safe Action" : "Destructive Action") : "Confirm Action"}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="p-2 hover:bg-white/50 rounded-lg transition-colors disabled:opacity-50"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {course && (
                        <div className="font-semibold text-gray-900 mb-2 border-l-4 pl-3 py-1" style={{ borderColor: modalConfig.themeColor }}>
                            {course.title}
                        </div>
                    )}
                    <p className="text-gray-600 leading-relaxed text-sm">
                        {modalConfig.description}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 p-6 pt-0">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={modalConfig.action}
                        disabled={isLoading}
                        className={`flex-1 px-6 py-3 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed ${modalConfig.btnColor}`}
                    >
                        {isLoading ? (
                            <>
                                <Spinner size={16} className="text-white" />
                                Processing...
                            </>
                        ) : modalConfig.actionText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;