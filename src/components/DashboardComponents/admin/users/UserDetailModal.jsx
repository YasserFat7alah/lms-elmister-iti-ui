"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { useGetUserDetailsQuery } from "@/redux/api/endPoints/usersApiSlice";
import { Loader2, Mail, Phone, Calendar, User, Users, Star, GraduationCap, X, ExternalLink, Shield, MapPin, Activity, CheckCircle, Ban, AlertTriangle, BookOpen, MessageCircle } from "lucide-react";
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const UserDetailModal = ({ isOpen, onClose, userId }) => {
    const router = useRouter();
    const { userInfo } = useSelector((state) => state.auth);
    const currentUserRole = userInfo?.user?.role;
    const currentUserId = userInfo?.user?._id || userInfo?.user?.id;

    const { data: userDetails, isLoading, isError } = useGetUserDetailsQuery(userId, {
        skip: !isOpen || !userId,
    });

    const user = userDetails?.data?.user;

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleMessageClick = () => {
        if (!user) return;
        const targetUserId = user._id || user.id;

        const dashboardRoutes = {
            'parent': `/dashboard/parent/messages`,
            'teacher': `/dashboard/teacher/messages`,
            'admin': `/dashboard/admin/messages`,
            'student': `/dashboard/student/messages`
        };

        const basePath = dashboardRoutes[currentUserRole] || '/dashboard/messages';
        router.push(`${basePath}?receiverId=${targetUserId}`);
        onClose();
    };

    if (!isOpen) return null;

    // Helper for Status Badge
    const renderStatusBadge = (status) => {
        const s = status || 'active';
        switch (s) {
            case 'suspended':
                return <Badge variant="warning" className="bg-orange-100 text-orange-700 border-orange-200">Suspended</Badge>;
            case 'blocked':
                return <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200">Blocked</Badge>;
            default:
                return <Badge variant="success" className="bg-green-100 text-green-700 border-green-200">Active</Badge>;
        }
    };

    // Helper for Role Icon
    const getRoleIcon = (role) => {
        switch (role) {
            case 'admin': return <Star className="w-4 h-4 fill-white text-white" />;
            case 'teacher': return <GraduationCap className="w-4 h-4 text-white" />;
            case 'student': return <User className="w-4 h-4 text-white" />;
            default: return <Users className="w-4 h-4 text-white" />;
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent showCloseButton={false} className="sm:max-w-4xl bg-[#F8F9FC] border-0 shadow-2xl p-0 gap-0 overflow-hidden outline-none">
                <DialogTitle className="sr-only">User Details: {user?.name || 'Loading...'}</DialogTitle>
                {isLoading ? (
                    <div className="flex items-center justify-center h-96">
                        <Loader2 className="w-10 h-10 animate-spin text-[#FF0055]" />
                    </div>
                ) : isError || !user ? (
                    <div className="flex flex-col items-center justify-center h-96 p-8 text-center bg-red-50 text-red-600">
                        <AlertTriangle className="w-12 h-12 mb-4 opacity-50" />
                        <p className="font-semibold text-lg">Failed to load user details</p>
                        <p className="text-sm opacity-75">Please try again later.</p>
                    </div>
                ) : (
                    <>
                        {/* Unified Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 p-2 rounded-full transition-all duration-200
                                md:bg-white md:hover:bg-gray-100 md:text-gray-500 md:hover:text-gray-700 md:shadow-md
                                bg-black/10 hover:bg-black/20 text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Content Renderers */}
                        {(() => {
                            const renderSidebarHeader = () => (
                                <div className="bg-white flex flex-col items-center text-center pb-6 border-b border-gray-100 relative z-20">
                                    {/* Cover / Gradient Header */}
                                    <div className="h-32 w-full bg-gradient-to-br from-[#FF0055] to-[#FF5588] absolute top-0 left-0 z-0" />

                                    {/* Avatar & Basic Info */}
                                    <div className="px-6 pt-16 relative z-10 w-full flex flex-col items-center">
                                        <div className="relative mb-4 group">
                                            <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white flex items-center justify-center text-4xl font-bold text-[#FF0055]">
                                                {user.avatar?.url ? (
                                                    <img src={user.avatar.url} alt={user.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    user.name.charAt(0)
                                                )}
                                            </div>
                                            <div className={`absolute bottom-2 right-2 w-8 h-8 rounded-full border-2 border-white shadow-md flex items-center justify-center
                                                ${user.role === 'admin' ? 'bg-red-500' :
                                                    user.role === 'teacher' ? 'bg-green-500' :
                                                        user.role === 'student' ? 'bg-orange-500' :
                                                            'bg-purple-500'}`}
                                            >
                                                {getRoleIcon(user.role)}
                                            </div>

                                            {/* View Profile Icon Overlay */}
                                            <Link
                                                href={`/users/${user.username}`}
                                                target="_blank"
                                                className="absolute top-1 right-1 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-all backdrop-blur-sm opacity-90 hover:opacity-100 hover:scale-110"
                                                title="View Full Profile"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </Link>
                                        </div>

                                        <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h2>
                                        <p className="text-sm text-gray-500 font-medium mb-3">@{user.username}</p>

                                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                                            {renderStatusBadge(user.status)}
                                            <Badge variant="outline" className="capitalize border-gray-200 text-gray-600">
                                                {user.role}
                                            </Badge>
                                        </div>

                                        {currentUserId !== user._id && (
                                            <button
                                                onClick={handleMessageClick}
                                                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl shadow-lg transition-all text-xs font-bold uppercase tracking-wide cursor-pointer"
                                            >
                                                <span>Message</span>
                                                <MessageCircle className="w-3.5 h-3.5" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );

                            const renderContactInfo = () => (
                                <div className="p-6 space-y-5 bg-white">
                                    <div>
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Contact Information</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3 group">
                                                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-[#FF0055]/5 transition-colors">
                                                    <Mail className="w-4 h-4 text-gray-400 group-hover:text-[#FF0055]" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs text-gray-400 font-medium mb-0.5">Email Address</p>
                                                    <p className="text-sm font-semibold text-gray-700 truncate" title={user.email}>{user.email}</p>
                                                </div>
                                            </div>

                                            {user.phone && (
                                                <div className="flex items-start gap-3 group">
                                                    <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-[#FF0055]/5 transition-colors">
                                                        <Phone className="w-4 h-4 text-gray-400 group-hover:text-[#FF0055]" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs text-gray-400 font-medium mb-0.5">Phone Number</p>
                                                        <p className="text-sm font-semibold text-gray-700">{user.phone}</p>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex items-start gap-3 group">
                                                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-[#FF0055]/5 transition-colors">
                                                    <Calendar className="w-4 h-4 text-gray-400 group-hover:text-[#FF0055]" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs text-gray-400 font-medium mb-0.5">Joined Date</p>
                                                    <p className="text-sm font-semibold text-gray-700">{formatDate(user.createdAt)}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3 group">
                                                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-[#FF0055]/5 transition-colors">
                                                    {user.gender === 'male' ? <User className="w-4 h-4 text-gray-400 group-hover:text-[#FF0055]" /> : <User className="w-4 h-4 text-gray-400 group-hover:text-[#FF0055]" />}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs text-gray-400 font-medium mb-0.5">Gender</p>
                                                    <p className="text-sm font-semibold text-gray-700 capitalize">{user.gender || 'Not specified'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );

                            const renderMainContent = (paddingClass = "p-6 md:p-8") => (
                                <div className={`space-y-8 max-w-3xl mx-auto ${paddingClass}`}>
                                    {/* TEACHER STATS */}
                                    {user.role === 'teacher' && user.teacherStats && (
                                        <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                                    <Activity className="w-5 h-5 text-blue-500" />
                                                    Teacher Performance
                                                </h3>
                                            </div>

                                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                                                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                                                        <BookOpen className="w-5 h-5" />
                                                    </div>
                                                    <div className="text-2xl font-black text-gray-900">{user.teacherStats.courses?.total || 0}</div>
                                                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Courses</div>
                                                </div>

                                                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                                                    <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-3">
                                                        <Users className="w-5 h-5" />
                                                    </div>
                                                    <div className="text-2xl font-black text-gray-900">{user.teacherStats.totalGroups || 0}</div>
                                                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Active Groups</div>
                                                </div>

                                                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                                                    <div className="w-10 h-10 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center mb-3">
                                                        <Star className="w-5 h-5 fill-current" />
                                                    </div>
                                                    <div className="text-2xl font-black text-gray-900">{user.teacherStats.totalRating.toFixed(1)}</div>
                                                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{user.teacherStats.totalReviews} Reviews</div>
                                                </div>

                                                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                                                    <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                                                        <CheckCircle className="w-5 h-5" />
                                                    </div>
                                                    <div className="text-2xl font-black text-gray-900">{user.teacherStats.courses?.published || 0}</div>
                                                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Published</div>
                                                </div>
                                            </div>

                                            {user.teacherStats.bio && (
                                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-4">
                                                    <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">About</h4>
                                                    <p className="text-gray-600 leading-relaxed italic">"{user.teacherStats.bio}"</p>
                                                </div>
                                            )}
                                        </section>
                                    )}

                                    {/* PARENT - CHILDREN */}
                                    {user.role === 'parent' && user.children && user.children.length > 0 && (
                                        <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                                <Users className="w-5 h-5 text-purple-500" />
                                                Children Accounts
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {user.children.map(child => (
                                                    <div key={child._id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:border-purple-200 transition-colors flex items-center justify-between group">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg">
                                                                {child.name.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-gray-900">{child.name}</p>
                                                                <p className="text-sm text-gray-500">@{child.username}</p>
                                                            </div>
                                                        </div>
                                                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-100">
                                                            {child.grade}
                                                        </Badge>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    )}

                                    {/* STUDENT - GUARDIAN */}
                                    {user.role === 'student' && user.parent && (
                                        <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                                <User className="w-5 h-5 text-orange-500" />
                                                Parent Info
                                            </h3>
                                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-14 h-14 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-2xl">
                                                        {user.parent.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900 text-lg">{user.parent.name}</p>
                                                        <p className="text-sm text-gray-500">@{user.parent.username}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-2 border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-6 text-sm">
                                                    <div className="flex items-center gap-3 text-gray-600">
                                                        <Mail className="w-4 h-4 text-orange-400" />
                                                        <span>{user.parent.email}</span>
                                                    </div>
                                                    {user.parent.phone && (
                                                        <div className="flex items-center gap-3 text-gray-600">
                                                            <Phone className="w-4 h-4 text-orange-400" />
                                                            <span>{user.parent.phone}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </section>
                                    )}

                                    {/* Empty State / General Info if no specific role data */}
                                    {!user.teacherStats && (!user.children || user.children.length === 0) && !user.parent && (
                                        <div className="flex flex-col items-center justify-center h-full text-center p-12 opacity-50">
                                            <Shield className="w-16 h-16 text-gray-200 mb-4" />
                                            <p className="font-medium text-gray-400">No additional role-specific data available.</p>
                                        </div>
                                    )}
                                </div>
                            );

                            return (
                                <>
                                    {/* MOBILE VIEW (< md) - Fixed Header + Scrollable Content */}
                                    <div className="md:hidden h-[85vh] flex flex-col">
                                        {/* Fixed Header */}
                                        <div className="shrink-0 z-30 relative shadow-sm">
                                            {renderSidebarHeader()}
                                        </div>

                                        {/* Scrollable Content: Contact + Main Details */}
                                        <ScrollArea className="flex-1 bg-[#F8F9FC]">
                                            <div className="flex flex-col pb-6"> {/* Added padding bottom for safe area */}
                                                {renderContactInfo()}
                                                <Separator />
                                                {/* Mobile gets minimal padding for full-width effect */}
                                                {renderMainContent("p-3")}
                                            </div>
                                        </ScrollArea>
                                    </div>

                                    {/* DESKTOP VIEW (>= md) - Split Panels */}
                                    <div className="hidden md:flex flex-row h-[600px]">
                                        {/* Left Panel - Sidebar */}
                                        <div className="w-80 bg-white border-r border-gray-100 flex flex-col relative z-20 shadow-sm">
                                            {renderSidebarHeader()}
                                            <ScrollArea className="flex-1">
                                                {renderContactInfo()}
                                            </ScrollArea>
                                        </div>

                                        {/* Right Panel - Main Content */}
                                        <div className="flex-1 flex flex-col bg-[#F8F9FC] relative overflow-hidden">
                                            <ScrollArea className="flex-1">
                                                {renderMainContent()}
                                            </ScrollArea>
                                        </div>
                                    </div>
                                </>
                            );
                        })()}
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default UserDetailModal;
