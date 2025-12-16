"use client"

import { useGetTeacherQuizzesQuery } from "@/redux/api/endPoints/quizzesApiSlice";
import { Plus, Calendar, Users, Clock, FileText, ChevronRight } from 'lucide-react';
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Link from "next/link";

const TeacherQuizzesPage = () => {
    const { data, isLoading, isError } = useGetTeacherQuizzesQuery();
    const quizzes = data?.data || [];

    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard/teacher" },
        { label: "My Quizzes" }
    ];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#392b80]"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-6 text-center text-red-500">
                Failed to load quizzes. Please try again later.
            </div>
        );
    }

    return (
        <div className="p-4 max-w-7xl mx-auto space-y-10 pb-20">
            {/* Header Section */}
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems} className="w-fit" />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-linear-to-r from-white to-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <div>
                        <h1 className="text-3xl font-extrabold text-[#392b80] flex items-center gap-3">
                            My Quizzes
                        </h1>
                        <p className="text-slate-500 mt-2 text-lg">Manage your quizzes and grades.</p>
                    </div>
                    <Link
                        href="/dashboard/teacher/quizzes/create"
                        className="flex items-center gap-2 px-6 py-3 bg-[#392b80] text-white rounded-xl hover:bg-[#2c2165] transition shadow-lg shadow-indigo-200/50"
                    >
                        <Plus className="w-5 h-5" />
                        Create New Quiz
                    </Link>
                </div>
            </div>

            {quizzes.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-sm p-12 text-center border border-gray-100">
                    <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-[#392b80]" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No Quizzes Created Yet</h3>
                    <p className="text-gray-500 mb-6">Create your first quiz to start assessing your students.</p>
                    <Link
                        href="/dashboard/teacher/quizzes/create"
                        className="inline-flex items-center gap-2 px-6 py-2 border border-[#392b80] text-[#392b80] rounded-xl hover:bg-indigo-50 transition"
                    >
                        <Plus className="w-4 h-4" /> Create Quiz
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quizzes.map((quiz) => (
                        <Link
                            key={quiz._id}
                            href={`/dashboard/teacher/quizzes/${quiz._id}`}
                            className="block group"
                        >
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition duration-300 hover:border-[#392b80] relative overflow-hidden h-full flex flex-col">
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition transform translate-x-2 group-hover:translate-x-0">
                                    <ChevronRight className="w-5 h-5 text-[#392b80]" />
                                </div>

                                <div className="mb-4">
                                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-1 group-hover:text-[#392b80] transition-colors">{quiz.title}</h3>
                                    <p className="text-sm text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full w-fit">{quiz.group?.title || 'Unknown Group'}</p>
                                </div>

                                <div className="space-y-3 flex-1">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                        <span>Due: {new Date(quiz.dueDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Clock className="w-4 h-4 mr-2 text-gray-400" />
                                        <span>{quiz.duration} mins</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <FileText className="w-4 h-4 mr-2 text-gray-400" />
                                        <span>{quiz.questions?.length || 0} Questions</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                                    <span className={`px-2 py-1 text-xs font-bold rounded-full uppercase tracking-wide ${quiz.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {quiz.status}
                                    </span>
                                    <span className="text-sm font-bold text-[#392b80]">
                                        {quiz.totalGrade} pts
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TeacherQuizzesPage;
