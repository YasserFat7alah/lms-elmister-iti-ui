"use client";
import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Video, BookOpen, User, GraduationCap, Facebook, Twitter, Linkedin, MessageCircle, Layers, Users, CheckCircle } from "lucide-react";
import Rating from "../shared/Rating";

const TeacherCard = ({ teacher }) => {
    const {
        username,
        name,
        avatar,
        subjects,
        bio,
        averageRating,
        totalRatings,
        yearsOfExperience,
        hourlyRate,
        videoIntro,
        qualifications,
        socialMedia,
        totalCourses,
        totalGroups,
        emailVerified
    } = teacher;

    return (
        <div className="block h-full group relative">
            <Card className="h-full overflow-hidden border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white flex flex-col relative">

                {/* Clickable Area */}
                <Link
                    href={username ? `/users/${username}` : '#'}
                    className={`absolute inset-0 z-10 ${!username && 'cursor-default pointer-events-none'}`}
                    aria-label={`View profile of ${name}`}
                />

                {/* Header / Avatar Section */}
                <div className="relative h-28 bg-linear-to-r from-pink-50 to-red-50">

                    {/* Social Media Icons - Top Right Overlay */}
                    <div className="absolute top-3 right-3 flex gap-1.5 z-20 pointer-events-auto">
                        {socialMedia && (
                            <>
                                {socialMedia.facebook && (
                                    <a href={socialMedia.facebook} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                        <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full bg-white/60 hover:bg-white text-blue-600 hover:text-blue-700 shadow-sm backdrop-blur-sm">
                                            <Facebook size={14} />
                                        </Button>
                                    </a>
                                )}
                                {socialMedia.twitter && (
                                    <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                        <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full bg-white/60 hover:bg-white text-sky-500 hover:text-sky-600 shadow-sm backdrop-blur-sm">
                                            <Twitter size={14} />
                                        </Button>
                                    </a>
                                )}
                                {socialMedia.linkedin && (
                                    <a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                        <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full bg-white/60 hover:bg-white text-blue-700 hover:text-blue-800 shadow-sm backdrop-blur-sm">
                                            <Linkedin size={14} />
                                        </Button>
                                    </a>
                                )}
                            </>
                        )}
                    </div>

                    {/* Larger Avatar positioned at bottom left */}
                    <div className="absolute -bottom-14 left-5">
                        <Avatar className="w-32 h-32 border-4 border-white shadow-md bg-white">
                            <AvatarImage src={avatar?.url} alt={name} className="object-cover" />
                            <AvatarFallback className="text-4xl bg-gray-100 text-gray-400 font-bold">
                                {name?.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-1 p-5 pt-20 pointer-events-none">

                    {/* Top Row: Name (Left) vs Subjects (Right) */}
                    <div className="flex justify-between items-start mb-4">
                        {/* Name & Username */}
                        <div className="flex-1 pr-2">
                            <div className="flex items-center gap-1.5">
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#392b80] transition-colors leading-tight truncate">
                                    {name}
                                </h3>
                                {emailVerified && (
                                    <CheckCircle size={16} className="text-blue-500 fill-blue-50" aria-label="Verified Teacher" />
                                )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <p className="text-sm text-gray-500 font-medium truncate">@{username}</p>
                                {videoIntro?.url && (
                                    <Badge variant="secondary" className="bg-red-50 text-[#FF0055] gap-1 px-1.5 py-0 text-[10px] h-5 shadow-none border border-red-100 shrink-0">
                                        <Video size={10} /> Intro
                                    </Badge>
                                )}
                            </div>
                        </div>

                        {/* Subjects - Moved to Top Right of Content Area for Visibility */}
                        <div className="flex flex-col items-end gap-1.5 shrink-0 z-20 pointer-events-auto max-w-[40%]">
                            {subjects && subjects.length > 0 ? (
                                subjects.slice(0, 2).map((subj, idx) => (
                                    <Badge key={idx} variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-100 font-bold shadow-sm text-[10px] px-2 py-0.5 justify-center">
                                        {subj}
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-[10px] text-gray-400 italic">No subjects</span>
                            )}
                            {subjects && subjects.length > 2 && (
                                <span className="text-[10px] text-gray-400 font-medium px-1">+{subjects.length - 2} more</span>
                            )}
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="h-16 mb-4 p-2 rounded-lg border border-gray-100 bg-gray-50/30 flex items-start overflow-hidden">
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed w-full text-left">
                            {bio || "No biography available for this teacher."}
                        </p>
                    </div>

                    {/* Qualifications Section */}
                    <div className="mb-4">
                        {qualifications && qualifications.length > 0 ? (
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                                <GraduationCap size={16} className="text-blue-500 shrink-0" />
                                <span className="line-clamp-1">
                                    <span className="font-bold text-gray-900">{qualifications[0]?.degree}</span> from <span className="font-bold text-gray-900">{qualifications[0]?.university}</span>
                                </span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <GraduationCap size={16} className="text-gray-300 shrink-0" />
                                <span className="italic">No qualifications listed</span>
                            </div>
                        )}
                    </div>

                    {/* Spacer */}
                    <div className="mt-auto"></div>

                    {/* Footer: Rating & Action - Separated by Line */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        {/* Reusing CourseCard Rating Style */}
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-900">
                            <Rating defaultRating={averageRating || 0} readOnly size="sm" />
                            <span>{averageRating || 0} <span className="text-gray-400 font-normal">({totalRatings || 0})</span></span>
                        </div>

                        {/* Stats: Courses */}
                        <div className="flex items-center gap-3 text-xs text-gray-500 font-medium z-20 pointer-events-auto">
                            <div className="flex items-center gap-1">
                                <BookOpen size={14} className="text-[#392b80]" />
                                <span>{totalCourses || 0} {totalCourses === 1 ? "Course" : "Courses"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default TeacherCard;
