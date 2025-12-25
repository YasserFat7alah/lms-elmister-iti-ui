"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, User, Star } from "lucide-react";
import Rating from "../shared/Rating";

const CourseCard = ({ course }) => {
    const currencyMap = {
        "usd": "$",
        "egp": "EGP",
    }
    const {
        _id,
        title,
        subTitle,
        gradeLevel,
        subject,
        teacherId,
        minCost,
        currency,
        thumbnail,
        lessonsCount, // Assuming we might have this, or fallback
        totalStudents,
        averageRating,
        ratingsCount,
        activeGroups,
        tags,
        teacher,
    } = course;

    const instructor = teacher || teacherId;
    const instructorAvatar = instructor?.avatar?.url || instructor?.avatar;

    const isFree = minCost === 0 || course.isFree;
    const priceDisplay = isFree ? "Free" : `${minCost} ${currencyMap[currency] || "$"}`;

    return (
        <div className="block h-full group relative">
            <Card className="h-full overflow-hidden border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white flex flex-col relative">

                {/* Introduction of the Main Clickable Area via Absolute Link */}
                <Link href={`/courses/${_id}`} className="absolute inset-0 z-10" aria-label={`View course ${title}`} />

                {/* Image Container with Overlay */}
                <div className="relative w-full aspect-video overflow-hidden">
                    {/* Gradient Overlay - darker and smoother transition */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 ease-in-out z-0" />

                    <img
                        src={thumbnail?.url || "/placeholder-course.jpg"}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 z-0 flex gap-2">
                        <Badge variant="secondary" className="bg-white/90 backdrop-blur-md text-[#392b80] font-bold shadow-sm hover:bg-white">
                            {subject}
                        </Badge>
                    </div>

                    {/* Price - Moved to Top Right */}
                    <div className="absolute top-3 right-3 z-0">
                        <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm flex items-baseline gap-0.5 text-[#392b80]">
                            {isFree ? (
                                <span className="text-sm font-extrabold">Free</span>
                            ) : (
                                <>
                                    <span className="text-lg font-extrabold leading-none">{minCost}</span>
                                    <span className="text-[10px] font-bold leading-none">{currencyMap[currency] || "$"}</span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Hover Action Button - Ensure pointer events pass through to the main link */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 pointer-events-none">
                        <Button className="bg-white text-black font-bold rounded-full px-6 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 cursor-pointer hover:bg-gray-100 hover:scale-105 active:scale-95">
                            View Course
                        </Button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-1 p-5 pointer-events-none">
                    {/* pointer-events-none on container so clicks go to overlay link, unless overridden by children */}

                    {/* Tags & Grade */}
                    <div className="flex flex-wrap items-center gap-1 mb-2">
                        {/* Grade Pill */}
                        <span className="text-[10px] font-bold text-[#FF0055] bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                            Grade {gradeLevel}
                        </span>

                        {tags && tags.length > 0 && tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1 mb-1 group-hover:text-[#392b80] transition-colors" title={title}>
                        {title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3 min-h-10">
                        {subTitle || "No subtitle available"}
                    </p>

                    {/* Teacher Info - pointer-events-auto and z-20 to sit ABOVE the main link */}
                    <div className="flex items-center gap-3 mb-4 mt-auto pt-2 pointer-events-auto relative z-20 w-fit">
                        <Link
                            href={instructor?.username ? `/users/${instructor.username}` : '#'}
                            className={`flex items-center gap-2 -ml-2 p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100/80 group/teacher ${instructor?.username ? 'cursor-pointer' : 'pointer-events-none'}`}
                        >
                            <Avatar className="w-8 h-8 border border-gray-100">
                                <AvatarImage src={instructorAvatar} />
                                <AvatarFallback className="text-xs bg-gray-100 text-gray-500">
                                    {instructor?.name?.charAt(0) || "T"}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-400 font-medium whitespace-nowrap">Teacher</span>
                                <span className="text-sm font-semibold text-gray-700 leading-none group-hover/teacher:text-[#392b80] transition-colors">
                                    {instructor?.name || "Unknown Teacher"}
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Divider */}
                    <div className="h-px w-full bg-gray-100 mb-4" />

                    {/* Footer Stats Only */}
                    <div className="flex items-center justify-between mt-2">
                        {/* Ratings (Left) */}
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-900">
                            <Rating defaultRating={averageRating || 0} readOnly size="sm" />
                            <span>{averageRating || 0} ({ratingsCount || 0})</span>
                        </div>

                        {/* Students (Right) */}
                        <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                            <User size={14} className="text-[#392b80]" />
                            <span>{totalStudents || 0}</span>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default CourseCard;