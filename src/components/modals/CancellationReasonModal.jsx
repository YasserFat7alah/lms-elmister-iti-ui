import React, { useState } from 'react';
import { X, Send, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";

const CancellationReasonModal = ({
    isOpen,
    onClose,
    onSubmit,
    isLoading,
    courseTitle
}) => {
    const [reason, setReason] = useState('Schedule Conflict');
    const [details, setDetails] = useState('');

    console.log("ReasonModal Rendered. isOpen:", isOpen);

    if (!isOpen) return null;

    const reasons = [
        'Schedule Conflict',
        'Financial Reasons',
        'Curriculum/Content Issue',
        'Teaching Style',
        'Technical Issues',
        'Other'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ reason, reasonDetails: details });
    };

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Cancel Subscription</h2>
                        <p className="text-sm text-gray-500 mt-1">Please tell us why you are leaving</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-6">

                        {/* Warning */}
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 text-sm text-amber-800">
                            <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600" />
                            <p>
                                <strong>Warning:</strong> Cancelling now will revoke access to <strong>{courseTitle}</strong> immediately. This action cannot be undone.
                            </p>
                        </div>

                        {/* Reasons Radio */}
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-gray-700">Reason for cancellation</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {reasons.map((r) => (
                                    <label
                                        key={r}
                                        className={`
                      flex items-center p-3 border rounded-lg cursor-pointer transition-all
                      ${reason === r ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
                    `}
                                    >
                                        <input
                                            type="radio"
                                            name="reason"
                                            value={r}
                                            checked={reason === r}
                                            onChange={(e) => setReason(e.target.value)}
                                            className="sr-only"
                                        />
                                        <span className={`text-sm font-medium ${reason === r ? 'text-blue-700' : 'text-gray-700'}`}>
                                            {r}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Details Textarea */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Additional Details (Optional)</label>
                            <textarea
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none text-sm min-h-[100px]"
                                placeholder="Please share any specific feedback or details..."
                            />
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3 justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Keep Subscription
                        </Button>
                        <Button
                            type="submit"
                            variant="destructive"
                            disabled={isLoading}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isLoading ? 'Cancelling...' : 'Cancel Immediately'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CancellationReasonModal;
