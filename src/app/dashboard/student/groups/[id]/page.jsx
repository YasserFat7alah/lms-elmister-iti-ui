"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useGetGroupByIdQuery } from "@/redux/api/endPoints/groupsApiSlice";
import { useGetLessonsByGroupQuery } from "@/redux/api/endPoints/lessonsApiSlice";
import { useGetQuizzesByGroupQuery } from "@/redux/api/endPoints/quizzesApiSlice";
import { useGetAssignmentsByGroupQuery } from "@/redux/api/endPoints/assignmentsApiSlice";
import { Spinner } from "@/components/shared/Loader";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import TeacherProfileModal from "@/components/shared/TeacherProfileModal";
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
    MapPin,
    Users,
    School
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from 'next/image';

const StudentGroupDetailsPage = () => {
    const { id: groupId } = useParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("lessons");
    const [selectedTeacher, setSelectedTeacher] = useState(null);

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

    const teacher = group?.teacher; // backend should populate this fully now

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 pb-20">
            {/* Modal */}
            <TeacherProfileModal
                isOpen={!!selectedTeacher}
                onClose={() => setSelectedTeacher(null)}
                teacher={selectedTeacher}
            />

            {/* Header Section */}
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems} className="w-fit" />

                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 bg-gradient-to-r from-white to-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
                        <BookOpen size={200} />
                    </div>

                    <div className="flex-1 relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="px-3 py-1 bg-indigo-50 rounded-full text-xs font-bold text-[#392b80] flex items-center gap-1 w-fit">
                                <BookOpen className="w-3 h-3" />
                                {group?.course?.title || "Course"}
                            </div>
                            <div className="px-3 py-1 bg-green-50 rounded-full text-xs font-bold text-green-700 flex items-center gap-1 w-fit">
                                <Users className="w-3 h-3" />
                                {group?.studentsCount || 0} Students
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-extrabold text-[#392b80] mb-3 leading-tight">
                            {group?.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-gray-500 font-medium">
                            <span className="flex items-center gap-2"><CalendarDays className="w-4 h-4 text-gray-400" /> {group?.startingDate ? new Date(group.startingDate).toLocaleDateString() : 'TBA'}</span>
                            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-gray-400" /> {group?.startingTime || 'TBA'}</span>
                            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400" /> {group?.location || 'Online'}</span>
                        </div>
                    </div>

                    {/* Teacher Card */}
                    {teacher && (
                        <div
                            onClick={() => setSelectedTeacher(teacher)}
                            className="relative z-10 bg-white p-4 pr-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#392b80] transition-all cursor-pointer group/teacher flex items-center gap-4 min-w-[280px]"
                        >
                            <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm bg-gray-100 overflow-hidden flex-shrink-0">
                                {teacher.avatar?.url ? (
                                    <Image src={teacher.avatar.url} alt={teacher.name} width={48} height={48} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[#392b80] font-bold text-lg">{teacher.name.charAt(0)}</div>
                                )}
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">Instructor</p>
                                <h3 className="font-bold text-gray-900 group-hover/teacher:text-[#392b80] transition-colors">{teacher.name}</h3>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-300 absolute right-4 top-1/2 -translate-y-1/2 group-hover/teacher:translate-x-1 transition-transform" />
                        </div>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 border-b border-gray-200 scrollbar-none">
                {[
                    { id: "lessons", label: "Sessions & Materials", icon: Video, count: lessons.length },
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
            <div className="min-h-[400px] animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* --- LESSONS TAB --- */}
                {activeTab === "lessons" && (
                    <div className="space-y-6">
                        {lessons.length === 0 ? (
                            <div className="text-center p-12 bg-white rounded-3xl border border-dashed border-gray-300 text-gray-500">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Video className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">No sessions yet</h3>
                                <p className="text-sm">Check back later for upcoming sessions.</p>
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
                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                <Download className="w-4 h-4" /> Learning Materials
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {/* Documents */}
                                                {lesson.document?.map((doc, idx) => (
                                                    <a key={`doc-${idx}`} href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 hover:border-[#392b80] hover:shadow-sm transition group/item">
                                                        <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500 group-hover/item:scale-110 transition-transform">
                                                            <File className="w-5 h-5" />
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-700 truncate">{doc.name || `Document ${idx + 1}`}</span>
                                                    </a>
                                                ))}

                                                {/* Video (Singular) */}
                                                {lesson.video?.url && (
                                                    <a href={lesson.video.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 hover:border-[#392b80] hover:shadow-sm transition group/item">
                                                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 group-hover/item:scale-110 transition-transform">
                                                            <PlayCircle className="w-5 h-5" />
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-700 truncate">Watch Recording</span>
                                                    </a>
                                                )}

                                                {/* Additional Materials */}
                                                {lesson.materials?.map((mat, idx) => (
                                                    <a key={`mat-${idx}`} href={mat.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 hover:border-[#392b80] hover:shadow-sm transition group/item">
                                                        <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500 group-hover/item:scale-110 transition-transform">
                                                            {mat.type === 'video' ? <PlayCircle className="w-5 h-5" /> : <File className="w-5 h-5" />}
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
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FileText className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">No quizzes available</h3>
                                <p className="text-sm">Quizzes assigned to this group will appear here.</p>
                            </div>
                        ) : (
                            quizzes.map((quiz) => {
                                const isOverdue = new Date() > new Date(quiz.dueDate);
                                const isSubmitted = quiz.isSubmitted;
                                const status = isSubmitted
                                    ? (quiz.submissionStatus === 'graded' ? 'Graded' : 'Submitted')
                                    : (isOverdue ? 'Overdue' : 'Pending');

                                let statusColor = "bg-gray-100 text-gray-600";
                                if (status === 'Pending') statusColor = "bg-yellow-50 text-yellow-700 border-yellow-200";
                                if (status === 'Submitted') statusColor = "bg-blue-50 text-blue-700 border-blue-200";
                                if (status === 'Graded') statusColor = "bg-green-50 text-green-700 border-green-200";
                                if (status === 'Overdue') statusColor = "bg-red-50 text-red-700 border-red-200";

                                return (
                                    <Link key={quiz._id} href={isSubmitted || isOverdue ? `/dashboard/student/quizzes/${quiz._id}/result` : `/dashboard/student/quizzes/${quiz._id}/take`}>
                                        <div className={`bg-white p-6 rounded-3xl border shadow-sm hover:shadow-md transition group h-full flex flex-col ${isOverdue && !isSubmitted ? 'border-red-100 bg-red-50/10' : 'border-gray-200 hover:border-[#392b80]'}`}>
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="p-3 bg-purple-50 rounded-2xl text-[#392b80]">
                                                    <FileText className="w-6 h-6" />
                                                </div>
                                                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusColor}`}>
                                                    {status}
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
                                                    <span className={`font-medium ${isOverdue && !isSubmitted ? 'text-red-600' : 'text-gray-900'}`}>{new Date(quiz.dueDate).toLocaleDateString()}</span>
                                                </div>
                                                {isSubmitted && (
                                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-2">
                                                        <span className="font-bold text-gray-500">Score</span>
                                                        <span className="font-bold text-[#392b80]">{quiz.myScore}/{quiz.totalGrade}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        )}
                    </div>
                )}

                {/* --- ASSIGNMENTS TAB --- */}
                {activeTab === "assignments" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {assignments.length === 0 ? (
                            <div className="col-span-full text-center p-12 bg-white rounded-3xl border border-dashed border-gray-300 text-gray-500">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <BookOpen className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">No assignments yet</h3>
                                <p className="text-sm">Tasks assigned to this group will appear here.</p>
                            </div>
                        ) : (
                            assignments.map((assign) => {
                                const submission = assign.submission;
                                const isSubmitted = !!submission;
                                const isOverdue = new Date() > new Date(assign.dueDate) && !isSubmitted;

                                let status = "Pending";
                                if (isSubmitted) status = "Submitted";
                                if (isSubmitted && submission.grade) status = "Graded";
                                if (!isSubmitted && isOverdue) status = "Overdue";

                                let statusColor = "bg-yellow-50 text-yellow-700 border-yellow-200";
                                if (status === 'Submitted') statusColor = "bg-blue-50 text-blue-700 border-blue-200";
                                if (status === 'Graded') statusColor = "bg-green-50 text-green-700 border-green-200";
                                if (status === 'Overdue') statusColor = "bg-red-50 text-red-700 border-red-200";

                                return (
                                    <Link key={assign._id} href={`/dashboard/student/assignments/${assign._id}`}>
                                        <div className={`bg-white p-6 rounded-3xl border shadow-sm hover:shadow-md transition group h-full flex flex-col ${isOverdue ? 'border-red-100 bg-red-50/10' : 'border-gray-200 hover:border-[#392b80]'}`}>
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="p-3 bg-pink-50 rounded-2xl text-pink-600">
                                                    <BookOpen className="w-6 h-6" />
                                                </div>
                                                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusColor}`}>
                                                    {status}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#392b80] transition-colors mb-2">{assign.title}</h3>
                                            <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{assign.description}</p>
                                            <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center text-sm">
                                                <span className={`flex items-center gap-1 ${isOverdue ? 'text-red-500 font-bold' : 'text-gray-500'}`}>
                                                    <CalendarDays className="w-4 h-4" /> Due: {new Date(assign.dueDate).toLocaleDateString()}
                                                </span>
                                                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#392b80]" />
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentGroupDetailsPage;
