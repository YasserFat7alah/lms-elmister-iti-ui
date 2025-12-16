"use client";
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Mail, Users, Star, GraduationCap, X, CheckCircle, BookOpen, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from 'next/image';

const TeacherProfileModal = ({ isOpen, onClose, teacher }) => {
    if (!isOpen || !teacher) return null;

    // Use teacher.teacherStats if available, else derive/mock safely or leave empty
    // The backend's user object usually has `teacherStats` populated if it's a teacher.
    // If passed directly as a simple teacher object (name, avatar), we might display less.
    const stats = teacher.teacherStats || {};

    // Safely handle avatar
    const avatarUrl = teacher.avatar?.url || null;
    const initial = teacher.name ? teacher.name.charAt(0).toUpperCase() : 'T';

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent showCloseButton={false} className="sm:max-w-xl bg-white border-0 shadow-2xl p-0 gap-0 overflow-hidden outline-none rounded-3xl">
                <DialogTitle className="sr-only">Teacher Profile: {teacher.name}</DialogTitle>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/10 hover:bg-black/20 text-white transition-all backdrop-blur-sm"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header Section */}
                <div className="relative">
                    {/* Gradient Background */}
                    <div className="h-32 w-full bg-gradient-to-r from-[#392b80] to-indigo-600 relative overflow-hidden">
                        <div className="absolute inset-0 bg-pattern opacity-10"></div>
                    </div>

                    {/* Profile Image & Info */}
                    <div className="px-8 pb-6 -mt-16 flex flex-col items-center relative z-10">
                        <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-white flex items-center justify-center overflow-hidden mb-4">
                            {avatarUrl ? (
                                <Image
                                    src={avatarUrl}
                                    alt={teacher.name}
                                    width={128}
                                    height={128}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-4xl font-bold text-[#392b80]">{initial}</span>
                            )}
                        </div>

                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                                {teacher.name}
                                <Badge variant="secondary" className="bg-indigo-50 text-[#392b80] hover:bg-indigo-100 border-0">
                                    Teacher
                                </Badge>
                            </h2>
                            <p className="text-gray-500 font-medium mt-1">@{teacher.username}</p>
                        </div>
                    </div>
                </div>

                <ScrollArea className="max-h-[60vh]">
                    <div className="px-8 pb-8 pt-2 space-y-8">

                        {/* Bio Section */}
                        {stats.bio ? (
                            <div className="text-center relative">
                                <Quote className="w-8 h-8 text-indigo-100 absolute -top-4 -left-2 rotate-180" />
                                <p className="text-gray-600 leading-relaxed italic relative z-10 px-6">
                                    "{stats.bio}"
                                </p>
                            </div>
                        ) : (
                            <p className="text-center text-gray-400 italic">No bio available.</p>
                        )}

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100 hover:border-indigo-200 transition-colors">
                                <div className="w-8 h-8 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">
                                    <BookOpen className="w-4 h-4" />
                                </div>
                                <div className="text-xl font-bold text-gray-900">{stats.courses?.total || 0}</div>
                                <div className="text-xs font-semibold text-gray-400 uppercase">Courses</div>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100 hover:border-indigo-200 transition-colors">
                                <div className="w-8 h-8 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                                    <Users className="w-4 h-4" />
                                </div>
                                <div className="text-xl font-bold text-gray-900">{stats.totalGroups || 0}</div>
                                <div className="text-xs font-semibold text-gray-400 uppercase">Groups</div>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100 hover:border-indigo-200 transition-colors">
                                <div className="w-8 h-8 mx-auto bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-2">
                                    <Star className="w-4 h-4 fill-current" />
                                </div>
                                <div className="text-xl font-bold text-gray-900">{stats.totalRating?.toFixed(1) || "New"}</div>
                                <div className="text-xs font-semibold text-gray-400 uppercase">Rating</div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gray-400" />
                                Contact
                            </h3>
                            <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-3 shadow-sm">
                                <div className="p-2 bg-indigo-50 rounded-lg text-[#392b80]">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase">Email Address</p>
                                    <p className="text-sm font-semibold text-gray-900">{teacher.email}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </ScrollArea>

            </DialogContent>
        </Dialog>
    );
};

export default TeacherProfileModal;
