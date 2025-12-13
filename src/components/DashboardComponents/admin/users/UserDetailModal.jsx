"use client";
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { useGetUserDetailsQuery } from "@/redux/api/endPoints/usersApiSlice";
import { Loader2, Mail, Phone, Calendar, User, BookOpen, Users, Star, GraduationCap, X, ExternalLink } from "lucide-react";
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserDetailModal = ({ isOpen, onClose, userId }) => {
    const { data: userDetails, isLoading, isError } = useGetUserDetailsQuery(userId, {
        skip: !isOpen || !userId,
    });

    const user = userDetails?.data?.user;

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-xl bg-white border-0 shadow-2xl p-0 gap-0 overflow-hidden">
                {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <Loader2 className="w-8 h-8 animate-spin text-[#FF0055]" />
                    </div>
                ) : isError || !user ? (
                    <div className="p-8 text-center bg-red-50 text-red-600 m-4 rounded-xl">
                        <p className="font-medium">Failed to load user details</p>
                    </div>
                ) : (
                    <>
                        {/* Header Section - Modern Gradient & Info */}
                        <div className="bg-gray-50 p-6 border-b border-gray-100">
                            <div className="flex items-end justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white flex items-center justify-center text-2xl font-bold text-[#FF0055]">
                                            {user.avatar?.url ? (
                                                <img src={user.avatar.url} alt={user.name} className="w-full h-full object-cover" />
                                            ) : (
                                                user.name.charAt(0)
                                            )}
                                        </div>
                                        <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white
                                        ${user.role === 'admin' ? 'bg-red-500' :
                                                user.role === 'teacher' ? 'bg-green-500' :
                                                    user.role === 'student' ? 'bg-orange-500' :
                                                        'bg-purple-500'}`}
                                        >
                                            {user.role === 'admin' && <Star className="w-3 h-3 fill-current" />}
                                            {user.role === 'teacher' && <GraduationCap className="w-3 h-3" />}
                                            {user.role === 'student' && <User className="w-3 h-3" />}
                                            {user.role === 'parent' && <Users className="w-3 h-3" />}
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 leading-tight">{user.name}</h2>
                                        <p className="text-sm text-gray-500 font-medium mb-2">@{user.username}</p>
                                        <Badge variant="secondary" className="capitalize font-normal text-xs bg-white border border-gray-200 text-gray-600">
                                            {user.role} Account
                                        </Badge>
                                    </div>
                                </div>

                                <Link
                                    href={`/users/${user.username}`}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF0055] hover:bg-[#FF0055]/90 active:scale-95 text-white rounded-full shadow-lg shadow-[#FF0055]/20 transition-all text-xs font-bold uppercase tracking-wide"
                                    target="_blank"
                                >
                                    <span>View Full Profile</span>
                                    <ExternalLink className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>

                        <ScrollArea className="max-h-[60vh]">
                            <div className="p-6 space-y-6">
                                {/* Key Details Cards */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex flex-col justify-center">
                                        <span className="text-xs text-gray-400 font-medium uppercase mb-1">Email Address</span>
                                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 truncate" title={user.email}>
                                            <Mail className="w-4 h-4 text-[#FF0055] shrink-0" />
                                            <span className="truncate">{user.email}</span>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex flex-col justify-center">
                                        <span className="text-xs text-gray-400 font-medium uppercase mb-1">Joined Date</span>
                                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                            <Calendar className="w-4 h-4 text-[#FF0055] shrink-0" />
                                            <span>{formatDate(user.createdAt)}</span>
                                        </div>
                                    </div>

                                    {user.phone && (
                                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex flex-col justify-center">
                                            <span className="text-xs text-gray-400 font-medium uppercase mb-1">Phone Number</span>
                                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                                <Phone className="w-4 h-4 text-[#FF0055] shrink-0" />
                                                <span>{user.phone}</span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex flex-col justify-center">
                                        <span className="text-xs text-gray-400 font-medium uppercase mb-1">Gender</span>
                                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 capitalize">
                                            <User className="w-4 h-4 text-[#FF0055] shrink-0" />
                                            <span>{user.gender}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Specific Role Info - Clean & Distinct */}

                                {/* PARENT VIEW */}
                                {user.role === 'parent' && user.children && (
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 uppercase tracking-wide">
                                            <Users className="w-4 h-4 text-purple-500" />
                                            Linked Children
                                        </h3>
                                        {user.children.length > 0 ? (
                                            <div className="grid gap-2">
                                                {user.children.map(child => (
                                                    <div key={child._id} className="group flex flex-col p-3 bg-white border border-gray-100 hover:border-purple-100 hover:bg-purple-50/50 rounded-xl transition-all gap-2">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs shrink-0 self-start mt-1">
                                                                    {child.name.charAt(0)}
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-semibold text-gray-800">{child.name}</p>
                                                                    <p className="text-xs text-gray-400">@{child.username}</p>
                                                                </div>
                                                            </div>
                                                            <Badge variant="outline" className="text-xs border-purple-200 text-purple-700 bg-purple-50 h-fit">
                                                                {child.grade}
                                                            </Badge>
                                                        </div>
                                                        <div className="pl-11 text-xs text-gray-400 font-mono">
                                                            ID: {child._id}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center p-6 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                                <p className="text-sm text-gray-400">No children linked yet.</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* STUDENT VIEW */}
                                {user.role === 'student' && user.parent && (
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 uppercase tracking-wide">
                                            <User className="w-4 h-4 text-orange-500" />
                                            Guardian Info
                                        </h3>
                                        <div className="p-4 bg-orange-50/50 border border-orange-100 rounded-xl space-y-3">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold shrink-0">
                                                    {user.parent.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{user.parent.name}</p>
                                                    <p className="text-xs text-gray-500">@{user.parent.username}</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-orange-200/50">
                                                <div className="flex items-center gap-2 text-xs text-gray-600 overflow-hidden">
                                                    <Mail className="w-3 h-3 text-orange-400 shrink-0" />
                                                    <span className="truncate" title={user.parent.email}>{user.parent.email}</span>
                                                </div>
                                                {user.parent.phone && (
                                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                                        <Phone className="w-3 h-3 text-orange-400 shrink-0" />
                                                        <span>{user.parent.phone}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-xs text-gray-400 font-mono pt-1">
                                                ID: {user.parent._id}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* TEACHER VIEW */}
                                {user.role === 'teacher' && user.teacherStats && (
                                    <div className="space-y-5">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 text-center">
                                                <div className="text-2xl font-bold text-blue-700 mb-1">{user.teacherStats.courses?.total || 0}</div>
                                                <div className="text-xs text-blue-600 font-medium uppercase">Courses</div>
                                            </div>
                                            <div className="bg-green-50/50 p-3 rounded-xl border border-green-100 text-center">
                                                <div className="text-2xl font-bold text-green-700 mb-1">{user.teacherStats.totalGroups || 0}</div>
                                                <div className="text-xs text-green-600 font-medium uppercase">Groups</div>
                                            </div>
                                            <div className="bg-yellow-50/50 p-3 rounded-xl border border-yellow-100 text-center flex flex-col items-center">
                                                <div className="flex items-center gap-1 text-2xl font-bold text-yellow-700 mb-1">
                                                    {user.teacherStats.totalRating.toFixed(1)} <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                                </div>
                                                <div className="text-xs text-yellow-600 font-medium uppercase">{user.teacherStats.totalReviews} Reviews</div>
                                            </div>
                                            <div className="bg-purple-50/50 p-3 rounded-xl border border-purple-100 text-center">
                                                <div className="text-2xl font-bold text-purple-700 mb-1">{user.teacherStats.courses?.published || 0}</div>
                                                <div className="text-xs text-purple-600 font-medium uppercase">Published</div>
                                            </div>
                                        </div>

                                        {/* Subjects */}
                                        {user.teacherStats.subjects && user.teacherStats.subjects.length > 0 && (
                                            <div>
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-2">Teaches</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {user.teacherStats.subjects.map((subject, idx) => (
                                                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full border border-gray-200">
                                                            {subject}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Bio */}
                                        {user.teacherStats.bio && (
                                            <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                                                <p className="text-sm text-gray-600 leading-relaxed italic">"{user.teacherStats.bio}"</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default UserDetailModal;
