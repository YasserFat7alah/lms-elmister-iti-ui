import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Spinner } from "@/components/shared/Loader";
import { Button } from '@/components/ui/button';

const DeleteModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Delete",
    description = "Are you sure you want to delete this item? This action cannot be undone.",
    isLoading = false
}) => {
    if (!isOpen) return null;

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
                <div className="bg-linear-to-r from-red-50 to-rose-50 p-6 border-b border-red-100 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-red-100 rounded-full">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    {title}
                                </h2>
                                <p className="text-sm text-gray-600 mt-1">
                                    This action cannot be undone
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <p className="text-gray-700 leading-relaxed">
                        {description}
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
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="flex-1 px-6 py-3 bg-linear-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <Spinner size={16} />
                                Deleting...
                            </>
                        ) : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
