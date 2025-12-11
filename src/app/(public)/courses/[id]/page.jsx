"use client";
import React from 'react';

import { useParams } from 'next/navigation';
import AboutInstractor from '@/components/coursesComponent/courseDetails/AboutInstractor';
import CommentForm from '@/components/coursesComponent/courseDetails/CommentForm';

import CourseGroup from '@/components/coursesComponent/courseDetails/CourseGroup';
import DetailsSidebar from '@/components/coursesComponent/courseDetails/DetailsSidebar';
import OverView from '@/components/coursesComponent/courseDetails/OverView';
import CourseInquiries from '@/components/coursesComponent/courseDetails/CourseInquiries';
import ReviewsSection from '@/components/coursesComponent/courseDetails/ReviewsSection';
import Rating from '@/components/shared/Rating';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { IoMdShare } from "react-icons/io";
import { useGetPublicCourseByIdQuery } from '@/redux/api/endPoints/publicApiSlice';

export default function Page() {
    const { id } = useParams();

    // 1. Fetch Data
    const { data: courseData, isLoading, isError, error } = useGetPublicCourseByIdQuery(id);
    const course = courseData?.data;
    const teacher = course?.teacherId;

    // State for selected group
    const [selectedGroup, setSelectedGroup] = React.useState(null);

    // Handle loading & error
    if (isLoading) return <div className="min-h-screen flex items-center justify-center p-10"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div></div>;

    if (isError || !course) {
        return <div className="min-h-[50vh] flex flex-col items-center justify-center p-10 text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Course Not Found</h2>
            <p className="text-gray-600">{error?.data?.message || "Something went wrong"}</p>
        </div>;
    }

    const instructorAvatar = teacher?.avatar?.url || teacher?.avatar;

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* HERO SECTION */}
            <div className="bg-[#392b80] text-white pt-12 pb-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex gap-2 mb-4">
                            <Badge variant="secondary" className="bg-pink-500 hover:bg-pink-600 text-white border-none">{course.subject}</Badge>
                            <Badge variant="outline" className="text-pink-200 border-pink-200/30">Grade {course.gradeLevel}</Badge>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">{course.title}</h1>
                        <p className="text-lg text-gray-200 leading-relaxed max-w-2xl">{course.subTitle}</p>

                        {/* Meta: Ratings & Instructor */}
                        <div className="flex flex-wrap items-center gap-6 text-sm pt-2">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-yellow-400">{course.averageRating || 0}</span>
                                <Rating defaultRating={course.averageRating || 0} readOnly size="sm" />
                                <span className="text-gray-300 underline">({course.ratingsCount || 0} ratings)</span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-300">
                                <span>👥 {course.totalStudents || 0} students</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-gray-300">Created by</span>
                                <Link href={`/teachers/${teacher?._id}`} className="flex items-center gap-2 hover:text-pink-300 transition-colors font-semibold">
                                    <Avatar className="w-6 h-6 border border-white/20">
                                        <AvatarImage src={instructorAvatar} />
                                        <AvatarFallback className="text-[10px] text-black">
                                            {teacher?.name?.charAt(0) || "T"}
                                        </AvatarFallback>
                                    </Avatar>
                                    {teacher?.name}
                                </Link>
                            </div>

                            <div className="flex items-center gap-1 text-gray-300">
                                <span>📅 Last updated {new Date(course.updatedAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN (Header): Thumbnail & Share */}
                    <div className="lg:col-span-1">
                        <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden border border-white/10 aspect-video relative group">
                            {/* Share Button (Overlaid) */}
                            <div className="absolute top-2 right-2 z-20">
                                <Button variant="secondary" size="icon" className="bg-white/80 hover:bg-white text-gray-800 backdrop-blur-sm shadow-sm h-8 w-8 rounded-full cursor-pointer transition-transform hover:scale-110">
                                    <IoMdShare size={16} />
                                </Button>
                            </div>

                            <img src={course.thumbnail?.url || "/placeholder-course.jpg"} alt={course.title} className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT GRID */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COLUMN (Main Content) */}
                    <div className="lg:col-span-2 space-y-8">



                        {/* Overview */}
                        <section id="overview" className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 md:p-6">
                            <OverView course={course} />
                        </section>

                        {/* Course Introduction (Video) */}
                        {course.video?.url && (
                            <section id="introduction" className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 md:p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Course Introduction</h3>
                                <div className="rounded-xl overflow-hidden shadow-sm aspect-video bg-black relative">
                                    <video controls className="w-full h-full object-cover" poster={course.thumbnail?.url}>
                                        <source src={course.video.url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </section>
                        )}

                        {/* Curriculum / Groups */}
                        <section id="curriculum">
                            <CourseGroup
                                courseId={course._id}
                                groups={course.groups}
                                selectedGroup={selectedGroup}
                                setSelectedGroup={setSelectedGroup}
                            />
                        </section>

                        {/* Course Inquiries (Q&A) - Formerly Comments */}
                        <section id="inquiries" className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 md:p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Course Inquiries</h3>
                            <CourseInquiries comments={course.comments || []} teacherId={teacher?._id} />
                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <h4 className="font-semibold text-gray-900 mb-4">Ask a Question</h4>
                                <CommentForm targetId={course._id} targetModel="Course" />
                            </div>
                        </section>

                        {/* Instructor */}
                        <section id="instructor" className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 md:p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">About the Teacher</h3>
                            <AboutInstractor course={course} teacher={teacher} />
                        </section>

                    </div>

                    {/* Right Column: Sidebar & Actions */}
                    <div className="lg:col-span-1">

                        {/* Action Card (Sticky) */}
                        <div className="sticky top-24 h-[calc(100vh-7rem)] flex flex-col">
                            <div className="shrink-0 relative z-20">
                                <DetailsSidebar
                                    course={course}
                                    selectedGroup={selectedGroup}
                                // ... props
                                />
                            </div>

                            {/* ReviewsSection: Pass COURSE reviews and stats, not teacher stats */}
                            <div className="flex-1 min-h-0 overflow-y-auto relative z-10">
                                <ReviewsSection
                                    reviews={course.reviews || []}
                                    totalReviews={course.ratingsCount || 0}
                                    averageRating={course.averageRating || 0}
                                />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}