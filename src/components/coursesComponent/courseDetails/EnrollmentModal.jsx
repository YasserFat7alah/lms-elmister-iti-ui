"use client";
import React, { useState } from 'react';
import { useCheckoutMutation } from "@/redux/api/endPoints/enrollmentApiSlice";
import { Loader2, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGetMyChildrenQuery } from '@/redux/api/endPoints/usersApiSlice';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const EnrollmentModal = ({ isOpen, onClose, course, selectedGroup }) => {
    const { data: childrenData, isLoading: isLoadingChildren } = useGetMyChildrenQuery(course?._id, {
        skip: !isOpen || !course?._id
    });

    const [checkout, { isLoading: isCheckingOut }] = useCheckoutMutation();

    const children = childrenData?.data?.children || [];
    const [selectedChild, setSelectedChild] = useState(null);

    const handleCheckout = async () => {
        if (!selectedChild || !selectedGroup) return;

        try {
            const res = await checkout({
                groupId: selectedGroup._id,
                studentId: selectedChild._id,
            }).unwrap();

            if (res?.data?.url) {
                window.location.href = res.data.url;
            }
        } catch (err) {
            console.error("Checkout error:", err);
            // You might want to show a toast notification here
            alert(err?.data?.message || "Something went wrong initiating checkout.");
        }
    };

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent showCloseButton={false} className="sm:max-w-[500px] flex flex-col p-0 gap-0 overflow-hidden">
                <DialogHeader className="p-6 pb-2 relative">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:bg-red-100 p-1 group cursor-pointer"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-400 group-hover:text-red-500"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                    <DialogTitle className="text-xl font-bold text-gray-900">
                        Enrollment Details
                    </DialogTitle>
                    <DialogDescription className="text-gray-500">
                        Review details and select a student to enroll.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {/* Course & Group Info */}
                    <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm mb-6">
                        <div className="flex justify-between items-start mb-1">
                            <p className="font-bold text-gray-900 text-lg">{course?.title}</p>
                            <p className="text-lg font-bold text-[#FF4667] shrink-0">
                                {selectedGroup?.price} {selectedGroup?.currency || "USD"} <span className="text-sm font-normal text-gray-400">/mo</span>
                            </p>
                        </div>
                        <p className="text-gray-500 text-sm">
                            Group: <span className="font-medium text-gray-700">{selectedGroup?.title || selectedGroup?.name || selectedGroup?.slug}</span> • Grade {course?.gradeLevel}
                        </p>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-3">Select Student</h3>

                    {isLoadingChildren ? (
                        <div className="flex justify-center py-6">
                            <Loader2 className="h-8 w-8 animate-spin text-[#FF4667]" />
                        </div>
                    ) : children.length === 0 ? (
                        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <p className="text-gray-500 mb-2">No children found linked to your account.</p>
                            <Button variant="outline" size="sm">Add Child Profile</Button>
                        </div>
                    ) : (
                        <div className="grid gap-3">
                            {children.map((child) => {
                                const isSelected = selectedChild?._id === child._id;
                                const isLocked = child.isEnrolled;
                                const isGradeMismatch = course?.gradeLevel && child.grade !== course.gradeLevel;

                                return (
                                    <div
                                        key={child._id}
                                        onClick={() => !isLocked && setSelectedChild(child)}
                                        className={`
                                            relative flex items-center p-3 rounded-2xl border-2 transition-all bg-white
                                            ${isLocked
                                                ? "opacity-60 bg-gray-50 border-gray-100 cursor-not-allowed"
                                                : isSelected
                                                    ? "border-[#FF4667] ring-1 ring-[#FF4667] shadow-sm cursor-pointer"
                                                    : "border-gray-100 hover:border-[#FF4667]/30 hover:shadow-sm cursor-pointer"
                                            }
                                        `}
                                    >
                                        <div className={`h-11 w-11 rounded-full flex items-center justify-center border font-bold shrink-0
                                            ${isSelected ? "bg-[#FF4667]/10 text-[#FF4667] border-[#FF4667]/20" : "bg-gray-100 text-gray-500 border-gray-200"}
                                        `}>
                                            {child.avatar?.url ? (
                                                <img src={child.avatar.url} alt={child.name} className="h-full w-full rounded-full object-cover" />
                                            ) : (
                                                child.name?.charAt(0)
                                            )}
                                        </div>

                                        <div className="ml-3 flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="text-base font-bold text-gray-900 truncate">
                                                    {child.name}
                                                </p>
                                                {isLocked && (
                                                    <span className="flex items-center text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span> Enrolled
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                                <span>Grade {child.grade}</span>
                                                {isGradeMismatch && !isLocked && (
                                                    <span className="flex items-center text-amber-600 bg-amber-50 px-1.5 rounded border border-amber-100">
                                                        <AlertTriangle className="w-3 h-3 mr-1" /> Different Grade
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {isLocked && (
                                            <div className="text-gray-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Warning for Grade Mismatch (Bottom Card) */}
                    {selectedChild && course?.gradeLevel && selectedChild.grade !== course.gradeLevel && (
                        <div className="mt-4 p-3 bg-amber-50 border border-amber-100 text-amber-900 text-sm rounded-xl flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                            <p>
                                Warning: <strong>{selectedChild.name}</strong> is in Grade {selectedChild.grade}, but this course is for Grade {course.gradeLevel}.
                            </p>
                        </div>
                    )}

                </div>

                <div className="p-6 pt-2 border-t border-gray-100 bg-white flex justify-end gap-3 z-10">
                    <Button variant="outline" onClick={onClose} disabled={isCheckingOut} className="px-6 border-gray-200 cursor-pointer disabled:cursor-not-allowed disabled:pointer-events-auto">
                        Cancel
                    </Button>
                    <Button
                        className="bg-[#FF4667] hover:bg-[#FF4667]/90 text-white min-w-[180px] cursor-pointer disabled:cursor-not-allowed disabled:pointer-events-auto"
                        disabled={!selectedChild || isCheckingOut}
                        onClick={handleCheckout}
                    >
                        {isCheckingOut ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            "Continue to Payment"
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EnrollmentModal;
