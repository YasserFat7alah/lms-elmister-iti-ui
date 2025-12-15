"use client";
import React, { useMemo } from "react";
import DashboardCourseCard from "@/components/DashboardComponents/student/DashboardCourseCard";
import { BookOpen, PlayCircle, Trophy, Calendar, Clock, AlertCircle, FileText, CheckCircle, ChevronRight, Zap, GraduationCap } from "lucide-react";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { useGetAllMyLessonsQuery } from "@/redux/api/endPoints/lessonsApiSlice";
import { useGetStudentAssignmentsQuery } from "@/redux/api/endPoints/assignmentsApiSlice";
import { useGetStudentQuizzesQuery } from "@/redux/api/endPoints/quizzesApiSlice";
import { useGetMyEnrollmentsQuery } from "@/redux/api/endPoints/enrollmentApiSlice";
import Link from "next/link";
import { format } from "date-fns";
import { MdWavingHand } from "react-icons/md";
import { useSelector } from "react-redux";
import { getAssignmentStatus, STATUS } from "@/components/DashboardComponents/student/assignments/utils/assignmentUtils";

// Reusing the StatCard design from Parent Dashboard
const StatCard = ({ title, value, icon: Icon, bgColor, iconColor }) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full ${bgColor} opacity-10 -mr-16 -mt-16 transition-transform group-hover:scale-150`}></div>
    <div className="relative z-10 flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm font-semibold mb-2 uppercase tracking-wider">{title}</p>
        <h3 className="text-4xl font-extrabold text-[#392b80]">{value}</h3>
      </div>
      <div className={`p-4 rounded-2xl ${bgColor} ${iconColor} bg-opacity-20`}>
        <Icon className="w-8 h-8" />
      </div>
    </div>
  </div>
);

export default function StudentDashboardPage() {
  const { userInfo } = useSelector((state) => state.auth);

  // --- 1. Fetch Data ---
  const today = new Date().toISOString().split('T')[0];
  const { data: lessonsData, isLoading: lessonsLoading } = useGetAllMyLessonsQuery({ date: today });
  const { data: assignmentsData, isLoading: assignmentsLoading } = useGetStudentAssignmentsQuery();
  const { data: quizzesData, isLoading: quizzesLoading } = useGetStudentQuizzesQuery();
  const { data: enrollmentsData, isLoading: enrollmentsLoading } = useGetMyEnrollmentsQuery();

  // --- 2. Process Data ---
  const todaysSessions = lessonsData?.data || [];
  const assignments = assignmentsData?.data || [];
  const quizzes = quizzesData?.data || [];
  const enrollments = enrollmentsData?.data || [];

  const pendingAssignments = useMemo(() => {
    return assignments.filter(a => {
      const { status } = getAssignmentStatus(a, a.submission);
      return status === STATUS.TODO || status === STATUS.LATE || status === STATUS.MISSED;
    }).slice(0, 3);
  }, [assignments]);

  const pendingQuizzes = useMemo(() => {
    return quizzes.filter(q => q.submissionStatus === 'not-started').slice(0, 3);
  }, [quizzes]);

  // --- 3. Stats Data ---
  const stats = [
    {
      label: "Enrolled Courses",
      value: enrollments.length,
      icon: BookOpen,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      label: "Sessions Today",
      value: todaysSessions.length,
      icon: PlayCircle,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      label: "Pending Tasks",
      value: pendingAssignments.length + pendingQuizzes.length,
      icon: Zap,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600"
    }
  ];

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard/student" },
    { label: "My Learning" }
  ];

  return (
    <div className="space-y-10 p-4 max-w-7xl mx-auto pb-20">

      {/* Header Section */}
      <div className="space-y-6">
        <Breadcrumbs items={breadcrumbItems} className="w-fit" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-gradient-to-r from-white to-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div>
            <h1 className="text-3xl font-extrabold text-[#392b80] flex items-center gap-3">
              Welcome back, {userInfo?.user?.name?.split(' ')[0]}
              <span className="text-yellow-400 animate-pulse text-4xl"><MdWavingHand /></span>
            </h1>
            <p className="text-slate-500 mt-2 text-lg">Ready to continue your learning journey today?</p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-sm font-bold text-[#392b80] bg-[#392b80]/5 px-5 py-2.5 rounded-full inline-block">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.label}
            value={stat.value}
            icon={stat.icon}
            bgColor={stat.bgColor}
            iconColor={stat.iconColor}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* --- LEFT COLUMN: Incoming Sessions --- */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#392b80] flex items-center gap-2">
              Incoming Sessions
            </h2>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[350px] flex flex-col relative group hover:shadow-md transition-shadow duration-300">
            {lessonsLoading ? (
              <div className="flex-1 flex items-center justify-center text-gray-400 animate-pulse">Loading sessions...</div>
            ) : todaysSessions.length > 0 ? (
              <div className="divide-y divide-gray-50">
                {todaysSessions.map(session => {
                  const isOnline = session.type === 'online' && session.meetingLink;
                  const href = isOnline ? session.meetingLink : `/dashboard/student/my-learning/${session.groupId?._id || session.groupId}`;
                  const LinkComponent = isOnline ? 'a' : Link;
                  const linkProps = isOnline ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };

                  return (
                    <LinkComponent key={session._id} {...linkProps} className="block group/item">
                      <div className="p-6 hover:bg-gray-50 transition-colors duration-200 flex items-start gap-5 cursor-pointer">
                        <div className="bg-[#392b80]/5 text-[#392b80] rounded-2xl p-4 text-center min-w-[80px] group-hover/item:bg-[#392b80] group-hover/item:text-white transition-colors duration-300">
                          <span className="block text-xs font-bold uppercase tracking-wider">{format(new Date(session.date), 'MMM')}</span>
                          <span className="block text-2xl font-extrabold mt-1">{format(new Date(session.date), 'dd')}</span>
                        </div>
                        <div className="flex-1 py-1">
                          <h4 className="font-bold text-lg text-gray-900 group-hover/item:text-[#392b80] transition-colors flex items-center gap-2">
                            {session.title}
                            {isOnline && <span className="bg-indigo-100 text-indigo-700 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold border border-indigo-200">Zoom</span>}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-1">{session.groupId?.title || "Group Session"}</p>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-3">
                            <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                              <Clock size={14} className="text-gray-400" /> {session.startTime} - {session.endTime}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${session.type === 'online' ? 'bg-indigo-50 text-indigo-700' : 'bg-emerald-50 text-emerald-700'}`}>
                              {session.type}
                            </span>
                          </div>
                        </div>
                        <div className="self-center p-2 rounded-full text-gray-300 group-hover/item:text-[#392b80] group-hover/item:bg-[#392b80]/5 transition-all">
                          <ChevronRight size={24} />
                        </div>
                      </div>
                    </LinkComponent>
                  )
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 py-12 text-gray-400">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Calendar size={32} className="text-gray-300" />
                </div>
                <p className="font-medium text-gray-500">No sessions scheduled for today</p>
              </div>
            )}
          </div>
        </div>


        {/* --- RIGHT COLUMN: Pending Tasks --- */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#392b80] flex items-center gap-2">
              Pending Tasks
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {/* Assignments */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-2 min-h-[160px] hover:shadow-md transition-shadow">
              <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-700 flex items-center gap-2">
                  <FileText size={18} className="text-orange-500" /> Assignments
                </h3>
                <Link href="/dashboard/student/assignments" className="text-xs font-semibold text-[#392b80] hover:underline">View All</Link>
              </div>
              {assignmentsLoading ? (
                <div className="p-6 text-center text-gray-400">Loading assignments...</div>
              ) : pendingAssignments.length > 0 ? (
                <div className="divide-y divide-gray-50">
                  {pendingAssignments.map(assign => (
                    <Link href={`/dashboard/student/assignments/${assign._id}`} key={assign._id} className="block group">
                      <div className="p-4 flex items-center justify-between hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 flex-shrink-0">
                            <FileText size={18} />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-[#392b80] transition-colors">{assign.title}</h4>
                            <p className="text-xs text-gray-500 mt-1 font-medium">{assign.course?.title || 'No Course'}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold text-orange-700 bg-orange-50">
                            Due {format(new Date(assign.dueDate), 'MMM dd')}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-gray-400">
                  <p className="text-sm font-medium">All assignments completed!</p>
                </div>
              )}
            </div>

            {/* Quizzes */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-2 min-h-[160px] hover:shadow-md transition-shadow">
              <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-700 flex items-center gap-2">
                  <Trophy size={18} className="text-purple-500" /> Upcoming Quizzes
                </h3>
                <Link href="/dashboard/student/quizzes" className="text-xs font-semibold text-[#392b80] hover:underline">View All</Link>
              </div>
              {quizzesLoading ? (
                <div className="p-6 text-center text-gray-400">Loading quizzes...</div>
              ) : pendingQuizzes.length > 0 ? (
                <div className="divide-y divide-gray-50">
                  {pendingQuizzes.map(quiz => (
                    <Link href={`/dashboard/student/quizzes/${quiz._id}/take`} key={quiz._id} className="block group">
                      <div className="p-4 flex items-center justify-between hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
                            <Trophy size={18} />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-[#392b80] transition-colors">{quiz.title}</h4>
                            <p className="text-xs text-gray-500 mt-1 font-medium">{quiz.course?.title || 'No Course'}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold text-purple-700 bg-purple-50">
                            {format(new Date(quiz.dueDate), 'MMM dd')}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-gray-400">
                  <p className="text-sm font-medium">No quizzes due!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- RECENTLY ENROLLED --- */}
      {/* <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#392b80] flex items-center gap-2">
            Recently Enrolled Courses
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollmentsLoading ? (
            [1, 2, 3].map(i => <div key={i} className="h-72 bg-gray-50 animate-pulse rounded-3xl"></div>)
          ) : enrollments.length > 0 ? (
            enrollments.slice(0, 3).map((enrollment) => (
              <div key={enrollment._id} className="transform hover:-translate-y-1 transition-all duration-300">
                <DashboardCourseCard
                  course={{
                    id: enrollment.group?._id,
                    title: enrollment.course?.title || enrollment.group?.title,
                    instructor: enrollment.teacher?.name || 'Instructor',
                    progress: 0,
                    image: enrollment.course?.thumbnail?.url || "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800&auto=format&fit=crop",
                    totalLessons: 10,
                    completedLessons: 0
                  }}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-400 bg-white rounded-3xl border border-dashed border-gray-200">
              You are not enrolled in any courses yet.
            </div>
          )}

        </div>
      </div> */}

    </div>
  );
}
