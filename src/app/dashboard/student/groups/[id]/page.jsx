"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useGetGroupByIdQuery } from "@/redux/api/endPoints/groupsApiSlice";
import { useGetLessonsByGroupQuery } from "@/redux/api/endPoints/lessonsApiSlice";
import { useGetQuizzesByGroupQuery } from "@/redux/api/endPoints/quizzesApiSlice";
import { useGetAssignmentsByGroupQuery } from "@/redux/api/endPoints/assignmentsApiSlice";
import { Spinner } from "@/components/shared/Loader";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import {
    CalendarDays,
    FileText,
    BookOpen,
    Video,
    File,
    Download,
    PlayCircle,
    Clock,
    CheckCircle,
    AlertCircle,
    ChevronRight,
    MapPin
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const StudentGroupDetailsPage = () => {
    const { id: groupId } = useParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("lessons");

    // Queries
    const { data: groupData, isLoading: isGroupLoading } = useGetGroupByIdQuery(groupId);
    const { data: lessonsData, isLoading: isLessonsLoading } = useGetLessonsByGroupQuery({ groupId });
    const { data: quizzesData, isLoading: isQuizzesLoading } = useGetQuizzesByGroupQuery(groupId);
    const { data: assignmentsData, isLoading: isAssignmentsLoading } = useGetAssignmentsByGroupQuery(groupId);

    const group = groupData?.data;
    const lessons = Array.isArray(lessonsData?.data?.data) ? lessonsData.data.data : [];
    const quizzes = quizzesData?.data || [];
    const assignments = assignmentsData?.data || [];

    const isLoading = isGroupLoading || isLessonsLoading || isQuizzesLoading || isAssignmentsLoading;

    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard/student" },
        { label: "My Groups", href: "/dashboard/student/groups" },
        { label: group?.title || "Group Details" }
    ];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spinner />
            </div>
        );
    }

    // Helper to determine status color (reused from quizzes page)
    const getStatusColor = (status, date) => {
        const isOverdue = new Date() > new Date(date);
        if (status === 'submitted' || status === 'graded') return 'text-green-600 bg-green-50 border-green-200';
        if (isOverdue) return 'text-red-600 bg-red-50 border-red-200';
        return 'text-blue-600 bg-blue-50 border-blue-200';
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems} className="w-fit" />

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden relative">
                    <div className="h-32 bg-gradient-to-r from-[#392b80] to-indigo-600 relative">
                        <div className="absolute inset-0 bg-black/10"></div>
                    </div>
                    <div className="px-8 pb-8 pt-0 relative flex flex-col md:flex-row justify-between items-end gap-4">
                        <div className="flex items-end gap-6 -mt-12">
                            <div className="w-24 h-24 bg-white rounded-2xl p-2 shadow-lg flex items-center justify-center">
                                <BookOpen className="w-12 h-12 text-[#392b80]" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold text-gray-900 mb-1">{group?.title}</h1>
                                <div className="flex items-center gap-4 text-gray-500 text-sm font-medium">
                                    <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4" /> Included: {lessons.length} Sessions</span>
                                    <span className="bg-indigo-50 text-[#392b80] px-3 py-0.5 rounded-full">{group?.course?.title || "Course"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 border-b border-gray-200">
                {[
                    { id: "lessons", label: "Sessions & Lessons", icon: Video, count: lessons.length },
                    { id: "quizzes", label: "Quizzes", icon: FileText, count: quizzes.length },
                    { id: "assignments", label: "Assignments", icon: BookOpen, count: assignments.length },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition whitespace-nowrap border-2 ${activeTab === tab.id
                            ? "bg-[#392b80] text-white border-[#392b80] shadow-md shadow-indigo-200"
                            : "bg-white text-gray-600 border-transparent hover:bg-gray-50"
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                        <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="min-h-[400px]">
                {/* --- LESSONS TAB --- */}
                {activeTab === "lessons" && (
                    <div className="space-y-6">
                        {lessons.length === 0 ? (
                            <div className="text-center p-12 bg-white rounded-3xl border border-dashed border-gray-300 text-gray-500">
                                No sessions scheduled yet.
                            </div>
                        ) : (
                            lessons.map((lesson) => (
                                <div key={lesson._id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition duration-300 hover:border-[#392b80] group">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${lesson.type === 'online' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                                                {lesson.type === 'online' ? <Video className="w-6 h-6" /> : <MapPin className="w-6 h-6" />}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#392b80] transition-colors">{lesson.title}</h3>
                                                <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                                    <CalendarDays className="w-3.5 h-3.5" /> {new Date(lesson.date).toLocaleDateString()}
                                                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                    <Clock className="w-3.5 h-3.5" /> {lesson.startTime}
                                                </p>
                                            </div>
                                        </div>

                                        {lesson.type === 'online' && (
                                            <a href={lesson.url} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-[#392b80] text-white rounded-xl font-medium hover:bg-[#2a2060] transition shadow-md shadow-indigo-200">
                                                Join Class
                                            </a>
                                        )}
                                    </div>

                                    {/* Materials Section */}
                                    {(lesson.document?.length > 0 || lesson.video?.url || lesson.materials?.length > 0) && (
                                        <div className="bg-gray-50/50 rounded-2xl p-5 border border-gray-100">
                                            <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                                <Download className="w-4 h-4 text-gray-500" /> Lesson Materials
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {/* Documents */}
                                                {lesson.document?.map((doc, idx) => (
                                                    <a key={`doc-${idx}`} href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-sm transition">
                                                        <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                                                            <File className="w-4 h-4" />
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-700 truncate">{doc.name || `Document ${idx + 1}`}</span>
                                                    </a>
                                                ))}

                                                {/* Video (Singular) */}
                                                {lesson.video?.url && (
                                                    <a href={lesson.video.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-sm transition">
                                                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                                                            <PlayCircle className="w-4 h-4" />
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-700 truncate">Watch Recording</span>
                                                    </a>
                                                )}

                                                {/* Additional Materials */}
                                                {lesson.materials?.map((mat, idx) => (
                                                    <a key={`mat-${idx}`} href={mat.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-sm transition">
                                                        <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500">
                                                            {mat.type === 'video' ? <PlayCircle className="w-4 h-4" /> : <File className="w-4 h-4" />}
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-700 truncate">{mat.title || `Material ${idx + 1}`}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* --- QUIZZES TAB --- */}
                {activeTab === "quizzes" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {quizzes.length === 0 ? (
                            <div className="col-span-full text-center p-12 bg-white rounded-3xl border border-dashed border-gray-300 text-gray-500">
                                No quizzes found for this group.
                            </div>
                        ) : (
                            quizzes.map((quiz) => (
                                <Link key={quiz._id} href={`/dashboard/student/quizzes/${quiz._id}/take`}>
                                    <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#392b80] transition group h-full flex flex-col">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-3 bg-purple-50 rounded-2xl text-[#392b80]">
                                                <FileText className="w-6 h-6" />
                                            </div>
                                            <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                                                {quiz.totalGrade} pts
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#392b80] transition-colors mb-2">{quiz.title}</h3>
                                        <div className="mt-auto space-y-2 text-sm text-gray-500">
                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Duration</span>
                                                <span className="font-medium text-gray-900">{quiz.duration} mins</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4" /> Due</span>
                                                <span className="font-medium text-gray-900">{new Date(quiz.dueDate).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                )}

                {/* --- ASSIGNMENTS TAB --- */}
                {activeTab === "assignments" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {assignments.length === 0 ? (
                            <div className="col-span-full text-center p-12 bg-white rounded-3xl border border-dashed border-gray-300 text-gray-500">
                                No assignments found for this group.
                            </div>
                        ) : (
                            assignments.map((assign) => (
                                <Link key={assign._id} href={`/dashboard/student/assignments/${assign._id}`}>
                                    <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#392b80] transition group h-full flex flex-col">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-3 bg-pink-50 rounded-2xl text-pink-600">
                                                <BookOpen className="w-6 h-6" />
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#392b80] transition-colors mb-2">{assign.title}</h3>
                                        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{assign.description}</p>
                                        <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center text-sm">
                                            <span className="text-gray-500 flex items-center gap-1"><CalendarDays className="w-4 h-4" /> Due: {new Date(assign.dueDate).toLocaleDateString()}</span>
                                            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#392b80]" />
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentGroupDetailsPage;
