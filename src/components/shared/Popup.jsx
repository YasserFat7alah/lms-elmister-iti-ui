"use client";
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { X } from "lucide-react";

/**
 * A generic Popup component that follows the style of the EnrollmentModal.
 * 
 * @param {boolean} isOpen - Controls the visibility of the popup
 * @param {function} onClose - Callback function to close the popup
 * @param {string} title - The title of the popup
 * @param {string} description - Optional description text
 * @param {React.ReactNode} children - The main content of the popup
 * @param {React.ReactNode} footer - Optional footer content (buttons, etc.)
 * @param {string} className - Optional additional classes for the content area
 */
const Popup = ({
    isOpen,
    onClose,
    title,
    description,
    children,
    footer,
    className = ""
}) => {
    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent showCloseButton={false} className={`sm:max-w-[600px] flex flex-col p-0 gap-0 overflow-hidden bg-white rounded-2xl ${className}`}>
                <DialogHeader className="p-6 pb-4 relative border-b border-gray-100 bg-white">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:bg-red-100 p-1 group cursor-pointer"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-400 group-hover:text-red-500"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                    <DialogTitle className="text-xl font-bold text-gray-900">
                        {title}
                    </DialogTitle>
                    {description && (
                        <DialogDescription className="text-gray-500 mt-1">
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50/30">
                    {children}
                </div>

                {footer && (
                    <div className="p-6 pt-4 border-t border-gray-100 bg-white flex justify-end gap-3 z-10 w-full">
                        {footer}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default Popup;
