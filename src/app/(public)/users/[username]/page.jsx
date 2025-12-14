'use client'
import React, { Suspense, useState } from 'react'
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import {
    useGetUserByUsernameQuery,
    useGetPublicCoursesQuery
} from '@/redux/api/endPoints/publicApiSlice';
import { Spinner } from "@/components/shared/Loader";
import SectionHeader from '@/components/shared/SectionHeader';
import CoursesList from '@/components/coursesComponent/CoursesList';
import ReviewsSection from '@/components/coursesComponent/courseDetails/ReviewsSection';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
    Video, Calendar, MapPin, GraduationCap, Clock, Award, BookOpen, 
    Facebook, Twitter, Linkedin, Instagram, Youtube, User, CheckCircle, 
    ChevronLeft, ChevronRight, Filter, Mail, Shield, Phone 
} from "lucide-react";

const ProfileSidebar = ({ user, reviews }) => {
    const router = useRouter();
    const { userInfo } = useSelector((state) => state.auth);

    const {
        name, username, avatar, role,
        averageRating, totalRatings,
        yearsOfExperience, socialMedia, createdAt
    } = user;

    const initials = name ? name.substring(0, 2).toUpperCase() : "U";
    const joinDate = createdAt ? new Date(createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : null;

    // Check if user is logged in
    const isLoggedIn = !!userInfo?.user;
    const currentUserRole = userInfo?.user?.role;
    const currentUserId = userInfo?.user?._id || userInfo?.user?.id;
    const targetUserId = user._id || user.id;

    // Don't show message button if viewing own profile
    const isOwnProfile = currentUserId === targetUserId;

    // Handle message button click
    const handleMessageClick = () => {
        if (!isLoggedIn) {
            // Redirect to login with return URL
            router.push(`/login?returnUrl=/profile/${username}`);
            return;
        }

        // Route to appropriate dashboard messages page based on current user's role
        const dashboardRoutes = {
            'parent': `/dashboard/parent/messages?receiverId=${targetUserId}`,
            'teacher': `/dashboard/teacher/messages?receiverId=${targetUserId}`,
            'admin': `/dashboard/admin/messages?receiverId=${targetUserId}`,
            'student': `/dashboard/student/messages?receiverId=${targetUserId}`
        };

        const route = dashboardRoutes[currentUserRole] || `/dashboard/messages?receiverId=${targetUserId}`;
        router.push(route);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* 1. Identity Card */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute top-0 w-full h-24 bg-linear-to-b from-blue-50 to-transparent opacity-50" />

                <Avatar className="w-32 h-32 border-4 border-white shadow-lg ring-1 ring-gray-100 mb-4 relative z-10">
                    <AvatarImage src={avatar?.url} alt={name} className="object-cover" />
                    <AvatarFallback className="text-4xl font-bold text-gray-400 bg-gray-50">{initials}</AvatarFallback>
                </Avatar>

                <div className="flex items-center gap-2 mb-1 z-10">
                    <h1 className="text-xl font-bold text-gray-900">{name}</h1>
                    {user.emailVerified && (
                        <CheckCircle size={20} className="text-blue-500 fill-blue-50" aria-label="Verified User" />
                    )}
                </div>
                <p className="text-gray-500 font-medium text-sm mb-4 z-10">@{username}</p>

                <div className="flex flex-wrap gap-2 justify-center z-10 mb-6">
                    {/* Role Badge logic */}
                    {(() => {
                        let badgeClass = "bg-gray-100 text-gray-700 hover:bg-gray-200 border-transparent";
                        let RoleIcon = null;

                        switch (role) {
                            case 'admin':
                                badgeClass = "bg-red-50 text-red-700 border-red-200 hover:bg-red-100";
                                RoleIcon = Shield;
                                break;
                            case 'teacher':
                                badgeClass = "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100";
                                break;
                            case 'student':
                                badgeClass = "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100";
                                break;
                            case 'parent':
                                badgeClass = "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100";
                                break;
                            default:
                                break;
                        }

                        return (
                            <Badge variant="outline" className={`capitalize px-3 py-1 flex items-center gap-1.5 ${badgeClass}`}>
                                {RoleIcon && <RoleIcon size={14} />}
                                {role}
                            </Badge>
                        );
                    })()}

                    {role === 'student' && user.grade && (
                        <Badge variant="outline" className="border-emerald-200 text-emerald-700 bg-emerald-50 border">
                            Grade {user.grade}
                        </Badge>
                    )}
                </div>

                <div className="w-full z-10 flex flex-col gap-4">
                    {/* MESSAGE BUTTON - Only show if not own profile */}
                    {!isOwnProfile && (
                        <Button
                            onClick={handleMessageClick}
                            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200 flex items-center justify-center gap-2 cursor-pointer transition-all hover:shadow-lg"
                        >
                            <Mail size={18} />
                            {isLoggedIn ? `Message ${name.split(' ')[0]}` : 'Login to Message'}
                        </Button>
                    )}

                    {/* Show message if viewing own profile */}
                    {isOwnProfile && (
                        <div className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl text-center">
                            <p className="text-sm text-blue-700 font-medium">This is your profile</p>
                        </div>
                    )}

                    <div className="h-px bg-gray-100 w-full" />

                    {/* Contact Details */}
                    <div className="flex flex-col items-center gap-2">
                        {user.email && (
                            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                <Mail size={16} className="text-gray-400" />
                                <span>{user.email}</span>
                            </div>
                        )}

                        {user.phone && (
                            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                <Phone size={16} className="text-gray-400" />
                                <span>{user.phone}</span>
                            </div>
                        )}

                        {/* Socials Link Row */}
                        <div className="flex flex-wrap justify-center gap-2 mt-2">
                            {socialMedia?.facebook && (
                                <a href={socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Facebook size={20} /></a>
                            )}
                            {socialMedia?.twitter && (
                                <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-sky-500 hover:bg-sky-50 rounded-lg transition-colors"><Twitter size={20} /></a>
                            )}
                            {socialMedia?.linkedin && (
                                <a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"><Linkedin size={20} /></a>
                            )}
                            {socialMedia?.instagram && (
                                <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"><Instagram size={20} /></a>
                            )}
                            {socialMedia?.youtube && (
                                <a href={socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Youtube size={20} /></a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Stats */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <Award size={18} className="text-purple-500" />
                        Stats
                    </h3>

                    {yearsOfExperience > 0 && (
                        <div className="flex items-center gap-3 text-sm text-gray-600 p-2">
                            <Clock size={16} />
                            <span>{yearsOfExperience}+ Years Experience</span>
                        </div>
                    )}

                    {role === 'teacher' && (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="text-center p-2 bg-purple-50 rounded-lg border border-purple-100">
                                <span className="block font-bold text-purple-700">{user.totalCourses || 0}</span>
                                <span className="text-[10px] text-purple-600 uppercase font-bold tracking-wider">Courses</span>
                            </div>
                            <div className="text-center p-2 bg-indigo-50 rounded-lg border border-indigo-100">
                                <span className="block font-bold text-indigo-700">{user.totalGroups || 0}</span>
                                <span className="text-[10px] text-indigo-600 uppercase font-bold tracking-wider">Groups</span>
                            </div>
                        </div>
                    )}

                    {/* Joined Date */}
                    {joinDate && (
                        <div className="flex items-center gap-3 text-sm text-gray-600 p-2 pt-0 mt-2 border-t border-dashed border-gray-100">
                            <Calendar size={16} className="text-gray-400" />
                            <span className="text-xs text-gray-400">Joined {joinDate}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* 3. detailed Reviews & Ratings (Sidebar) */}
            {role === 'teacher' && (
                <ReviewsSection
                    reviews={reviews}
                    averageRating={averageRating}
                    totalReviews={totalRatings}
                    className="rounded-3xl border border-gray-100"
                />
            )}
        </div>
    );
};

const ProfileMainContent = ({ user }) => {
    const { bio, subjects, qualifications, certificates, videoIntro } = user;

    return (
        <div className="flex flex-col gap-8">
            {/* Bio Section */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <BookOpen className="text-blue-600" size={24} />
                    About Me
                </h2>

                {/* Subjects */}
                {subjects && subjects.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {subjects.map((subj, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100 px-3 py-1 font-medium">
                                {subj}
                            </Badge>
                        ))}
                    </div>
                )}

                <div className="prose prose-gray max-w-none text-gray-600 leading-loose">
                    <p>{bio || "No biography provided."}</p>
                </div>
            </div>

            {/* Qualifications */}
            {(qualifications?.length > 0 || certificates?.length > 0) && (
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <GraduationCap className="text-emerald-600" size={24} />
                        Qualifications
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {qualifications?.length > 0 && (
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 opacity-80">
                                    <GraduationCap size={18} /> Education
                                </h3>
                                <div className="space-y-4">
                                    {qualifications.map((q, i) => (
                                        <div key={i} className="pl-4 border-l-2 border-emerald-100">
                                            <div className="font-semibold text-gray-800">{q.degree}</div>
                                            <div className="text-sm text-gray-500">{q.university}</div>
                                            {q.year && <div className="text-xs text-gray-400 mt-1">{q.year}</div>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {certificates?.length > 0 && (
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 opacity-80">
                                    <Award size={18} /> Certificates
                                </h3>
                                <div className="space-y-4">
                                    {certificates.map((c, i) => (
                                        <div key={i} className="pl-4 border-l-2 border-purple-100">
                                            <div className="font-semibold text-gray-800">{c.title}</div>
                                            <div className="text-sm text-gray-500">{c.issuer}</div>
                                            {c.date && <div className="text-xs text-gray-400 mt-1">{c.date}</div>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Video Intro */}
            {videoIntro?.url && (
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Video className="text-[#FF0055]" size={24} />
                        Video Introduction
                    </h2>
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gray-900 shadow-lg">
                        <video
                            controls
                            className="w-full h-full object-cover"
                            poster={user.avatar?.url}
                        >
                            <source src={videoIntro.url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            )}
        </div>
    );
};

const UserProfileContent = () => {
    const params = useParams();
    const router = useRouter();
    const { username } = params || {};

    // 1. Fetch User
    const {
        data: userData,
        isLoading: userLoading,
        isError: userError
    } = useGetUserByUsernameQuery(username, { skip: !username });

    const user = userData?.data?.user;

    const [page, setPage] = useState(1);
    const [gradeLevel, setGradeLevel] = useState('');

    // 2. Fetch User's Courses (only if user exists and is teacher)
    const teacherId = user?._id || user?.id;

    // Construct Query Params
    const queryParams = {
        teacherId,
        limit: 3,
        page
    };
    if (gradeLevel) queryParams.gradeLevel = gradeLevel;

    const {
        data: coursesData,
        isLoading: coursesLoading,
        isFetching: coursesFetching
    } = useGetPublicCoursesQuery(
        queryParams,
        { skip: !teacherId || user?.role !== 'teacher' }
    );

    const courses = coursesData?.data || [];

    if (userLoading) return <div className="min-h-screen flex items-center justify-center"><Spinner size={40} /></div>;
    if (userError || !user) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
                <div className="text-6xl mb-4">😕</div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">User not found</h1>
                <p className="text-gray-500 mb-6">The user @{username} does not exist or is unavailable.</p>
                <Button onClick={() => router.push('/teachers')} variant="outline">Browse Teachers</Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
            {/* Main Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Column (Sidebar) */}
                <div className="lg:col-span-4 xl:col-span-3">
                    <ProfileSidebar user={user} reviews={user.reviews} />
                </div>

                {/* Right Column (Main Content) */}
                <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-8">

                    <ProfileMainContent user={user} />

                    {/* Teacher's Courses */}
                    {user.role === 'teacher' && (
                        <div>
                            <SectionHeader title={`Courses by ${user.name.split(' ')[0]}`}>
                                <div className="flex items-center gap-3">
                                    {/* Grade Filter */}
                                    <div className="relative">
                                        <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <select
                                            value={gradeLevel}
                                            onChange={(e) => {
                                                setGradeLevel(e.target.value);
                                                setPage(1);
                                            }}
                                            className="pl-9 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer hover:bg-gray-50 transition-colors"
                                        >
                                            <option value="">All Grades</option>
                                            {coursesData?.filters?.gradeLevels?.map((g) => (
                                                <option key={g} value={g}>Grade {g}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Pagination Controls */}
                                    {coursesData?.pages > 1 && (
                                        <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1">
                                            <button
                                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                                disabled={page === 1 || coursesFetching}
                                                className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                                                aria-label="Previous Page"
                                            >
                                                <ChevronLeft size={18} />
                                            </button>
                                            <span className="px-2 text-sm font-semibold text-gray-600 min-w-12 text-center">
                                                {page} / {coursesData.pages}
                                            </span>
                                            <button
                                                onClick={() => setPage(p => Math.min(coursesData.pages, p + 1))}
                                                disabled={page === coursesData.pages || coursesFetching}
                                                className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                                                aria-label="Next Page"
                                            >
                                                <ChevronRight size={18} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </SectionHeader>

                            {coursesLoading ? (
                                <div className="py-10 flex justify-center"><Spinner /></div>
                            ) : courses.length > 0 ? (
                                <CoursesList
                                    courses={courses}
                                    currentPage={1}
                                    totalPages={1}
                                    onPageChange={() => { }}
                                />
                            ) : (
                                <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-500">
                                    <BookOpen className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                                    No courses available yet.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

const Page = () => {
    return (
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center"><Spinner /></div>}>
            <UserProfileContent />
        </Suspense>
    )
}

export default Page;