'use client'
import { FaGooglePlay, FaStar, FaUserFriends } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation';

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

const AboutInstractor = ({ course, teacher }) => {
    const router = useRouter();

    if (!teacher) return null;

    const teacherProfile = teacher.teacherData || {};
    const qualifications = teacherProfile.qualifications || [];

    // Stats (populated by backend)
    const coursesCount = teacher.coursesCount || 0;
    const totalStudents = teacher.totalStudents || 0;
    const rating = teacherProfile.averageRating || 0;
    const reviewsCount = teacherProfile.totalRatings || 0;

    const handleProfileClick = () => {
        if (teacher.username) {
            router.push(`/users/${teacher.username}`);
        }
    };

    return (
        <div className=''>

            {/* MAIN INFO */}
            <div
                onClick={handleProfileClick}
                className="flex flex-col md:flex-row gap-5 items-start cursor-pointer hover:bg-gray-50 p-4 rounded-xl transition-colors border border-transparent hover:border-gray-100 -mx-4 md:mx-0"
            >
                {/* Avatar */}
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm shrink-0">
                    <img
                        src={teacher.avatar?.url || teacher.avatar || DEFAULT_AVATAR}
                        alt={teacher.name || "Teacher"}
                        className='w-full h-full object-cover'
                    />
                </div>

                <div className="flex-1 w-full">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div>
                            <h4 className='text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors'>{teacher.name}</h4>
                            <div className="flex flex-wrap gap-2 items-center text-xs mt-1">
                                <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-medium capitalize border border-purple-200">
                                    {teacher.role}
                                </span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-500">@{teacher.username}</span>
                            </div>
                        </div>

                        {/* STATS (Top Right on Desktop) */}
                        <div className='flex gap-3 items-center bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 self-start shrink-0'>
                            <div className='flex items-center gap-1.5 text-xs' title="Total Courses">
                                <span className='text-pink-600'><FaGooglePlay /></span>
                                <span className='font-semibold text-gray-700'>{coursesCount}</span>
                            </div>
                            <div className="w-px h-4 bg-gray-200"></div>
                            <div className='flex items-center gap-1.5 text-xs' title="Total Students">
                                <span className='text-blue-500 text-sm'><FaUserFriends /></span>
                                <span className='font-semibold text-gray-700'>{totalStudents}</span>
                            </div>
                            <div className="w-px h-4 bg-gray-200"></div>
                            <div className='flex items-center gap-1.5 text-xs' title="Average Rating">
                                <span className='text-yellow-500 text-sm'><FaStar /></span>
                                <span className='font-semibold text-gray-700'>{rating.toFixed(1)} <span className="text-gray-400 font-normal">({reviewsCount})</span></span>
                            </div>
                        </div>
                    </div>

                    <p className='text-gray-600 leading-relaxed text-sm mt-3'>
                        {teacherProfile.bio || teacher.specialization || "Passionate educator committed to students' success."}
                    </p>
                </div>
            </div>

            {/* QUALIFICATIONS & EXTRA DETAILS */}
            {(qualifications.length > 0 || teacherProfile.subjects?.length > 0) && (
                <div className='mt-6 pt-6 border-t border-gray-100'>
                    <h5 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">Qualifications & Expertise</h5>

                    <div className="space-y-3">
                        {/* Qualifications List */}
                        {qualifications.length > 0 && (
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                                {qualifications.map((qual, idx) => (
                                    <li key={idx} className="flex gap-2 text-sm text-gray-600 items-start">
                                        <span className="text-green-500 mt-0.5">✓</span>
                                        <span>
                                            <span className="font-semibold text-gray-800">{qual.degree}</span>
                                            {qual.university && <span> from {qual.university}</span>}
                                            {qual.year && <span className="text-gray-400"> ({qual.year})</span>}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Subjects */}
                        {teacherProfile.subjects && teacherProfile.subjects.length > 0 && (
                            <div className='flex flex-wrap gap-2 mt-2'>
                                {teacherProfile.subjects.map((sub, idx) => (
                                    <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
                                        {sub}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default AboutInstractor