"use client";

import { useGetMyEnrollmentsQuery } from "@/redux/api/endPoints/enrollmentApiSlice";
import { Users, School, ChevronRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { Spinner } from "@/components/shared/Loader";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

const StudentGroupsPage = () => {
    const { data: enrollmentsData, isLoading, isError } = useGetMyEnrollmentsQuery();
    const enrollments = enrollmentsData?.data || [];

    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard/student" },
        { label: "My Groups" }
    ];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spinner />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-6 text-center text-red-500">
                Failed to load groups. Please try again later.
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 pb-20">
            {/* Header Section */}
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems} className="w-fit" />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-gradient-to-r from-white to-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <div>
                        <h1 className="text-3xl font-extrabold text-[#392b80] flex items-center gap-3">
                            My Groups
                        </h1>
                        <p className="text-slate-500 mt-2 text-lg">
                            Access your group lessons, quizzes, and materials.
                        </p>
                    </div>
                </div>
            </div>

            {enrollments.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-sm p-12 text-center border border-gray-100">
                    <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-[#392b80]" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                        No Groups Found
                    </h3>
                    <p className="text-gray-500">
                        You are not enrolled in any groups content yet.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrollments.map((enrollment) => {
                        const group = enrollment.group;
                        const course = enrollment.course;
                        if (!group) return null;

                        return (
                            <Link
                                key={enrollment._id}
                                href={`/dashboard/student/groups/${group._id}`}
                                className="block group"
                            >
                                <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition duration-300 hover:border-[#392b80] relative h-full flex flex-col overflow-hidden">
                                    {/* Top Accent */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#392b80] to-indigo-400"></div>

                                    <div className="flex justify-between items-start mb-4 mt-2">
                                        <div className="p-3 bg-indigo-50 rounded-2xl">
                                            <Users className="w-6 h-6 text-[#392b80]" />
                                        </div>
                                        <div className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600 flex items-center gap-1">
                                            <BookOpen className="w-3 h-3" />
                                            {course?.title || "Course"}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#392b80] transition-colors line-clamp-1">
                                        {group.title}
                                    </h3>

                                    <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
                                        <School className="w-4 h-4" />
                                        <span>Teacher: {group.teacher?.name || enrollment.teacher?.name || "Instructor"}</span>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                                        <span className="text-sm font-semibold text-gray-400">View Content</span>
                                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#392b80] transition-colors">
                                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default StudentGroupsPage;
