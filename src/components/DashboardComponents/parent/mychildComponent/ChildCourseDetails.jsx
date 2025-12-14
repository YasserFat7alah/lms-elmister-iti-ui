"use client";
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useGetChildCourseStatsQuery } from "@/redux/api/endPoints/childrenApiSlice";
import { Skeleton } from "@/components/ui/skeleton";

const CourseCard = ({ courseData, childId }) => {
  const { data: stats, isLoading, isError } = useGetChildCourseStatsQuery({
    childId: childId,
    courseId: courseData.courseId
  }, {
    skip: !childId || !courseData.courseId
  });

  const getScoreColor = (score, fullMark) => {
    const half = fullMark / 2;
    const almostFull = fullMark - 15;

    if (score < half) return "text-red-600";
    if (score < almostFull) return "text-yellow-500";
    return "text-green-600";
  };

  const getProgressTextColor = (value) => {
    const fullMark = 100;
    const half = fullMark / 2;
    const almostFull = fullMark - 15;

    if (value < half) return "text-red-600";
    if (value < almostFull) return "text-yellow-500";
    return "text-green-600";
  };

  const displayStats = stats?.data || {};

  // Default values if stats are missing or loading
  const attendancePercentage = displayStats.attendancePercentage || 0;
  const lastAttendance = displayStats.lastAttendance || "N/A";
  const attendedClasses = displayStats.attendedClasses || 0;
  const totalClasses = displayStats.totalClasses || 0;
  const assignments = displayStats.assignments || { submitted: 0, pending: 0 };

  if (isLoading) {
    return (
      <Card className='bg-white border border-gray-200 shadow-sm overflow-hidden'>
        <CardHeader className='pb-4 pt-6 px-6 bg-gray-50 border-b border-gray-100'>
          <div className="flex justify-between">
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-8 w-24" />
          </div>
        </CardHeader>
        <CardContent className='p-6'>
          <div className='grid md:grid-cols-3 gap-4'>
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Helper to format time to 12-hour format with AM/PM
  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  return (
    <Card className='relative bg-gradient-to-br from-white via-slate-50/40 to-blue-50/30 border border-slate-200/60 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group'>
      {/* Decorative gradient overlay */}
      <div className='absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-slate-100/30 to-blue-100/20 rounded-full blur-3xl -z-0 group-hover:scale-110 transition-transform duration-500'></div>

      {/* Course Header */}
      <CardHeader className='relative pb-5 pt-7 px-7 bg-gradient-to-r from-slate-50/70 via-blue-50/40 to-indigo-50/30 border-b border-slate-200/70 backdrop-blur-sm'>
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
          <div className='space-y-1'>
            <h3 className='font-bold bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-clip-text text-transparent text-2xl mb-1.5 tracking-tight'>
              {courseData.title}
            </h3>
            <p className='text-slate-600 text-sm font-medium flex items-center gap-2'>
              <span className='inline-block w-1.5 h-1.5 rounded-full bg-slate-400'></span>
              {courseData.instructor}
            </p>
          </div>
          <div className='flex flex-wrap gap-2.5 text-sm'>
            <span className='px-4 py-2 bg-gradient-to-br from-sky-400/80 to-blue-400/80 text-white rounded-xl font-semibold shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200'>
              {courseData.groupTitle || courseData.groupId || 'Group'}
            </span>
            <span className='px-4 py-2 bg-gradient-to-br from-teal-400/80 to-cyan-400/80 text-white rounded-xl font-semibold shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200'>
              {courseData.groupType}
            </span>
            {courseData.groupSchedule && courseData.groupSchedule.length > 0 && (
              <span className='px-4 py-2 bg-gradient-to-br from-slate-400/90 to-slate-500/90 text-white rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-200'>
                {Array.isArray(courseData.groupSchedule)
                  ? courseData.groupSchedule.map(s => typeof s === 'object' ? `${s.day} ${formatTime(s.time)}` : s).join(" / ")
                  : courseData.groupSchedule}
              </span>
            )}
            <span className={`px-4 py-2 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-200 ${courseData.status === 'active'
              ? 'bg-gradient-to-br from-emerald-400/80 to-green-500/80 text-white'
              : courseData.status === 'trialing'
                ? 'bg-gradient-to-br from-blue-400/80 to-indigo-400/80 text-white'
                : 'bg-gradient-to-br from-gray-300/90 to-gray-400/90 text-white'
              }`}>
              {courseData.status || 'N/A'}
            </span>
            {courseData.username && (
              <Link href={`/users/${courseData.username}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 px-4 text-xs font-semibold border-2 border-slate-400 text-slate-700 hover:bg-gradient-to-r hover:from-slate-500 hover:to-slate-600 hover:text-white hover:border-transparent shadow-sm hover:shadow-md transition-all duration-200 rounded-xl"
                >
                  👤 View Profile
                </Button>
              </Link>
            )}
          </div>
        </div>
      </CardHeader>

      {/* Course Details Grid */}
      <CardContent className='relative p-7'>
        <div className='grid md:grid-cols-3 gap-5'>

          {/* Attendance Percentage */}
          <div className='group/card relative p-6 rounded-2xl bg-gradient-to-br from-emerald-200/70 via-teal-200/60 to-cyan-200/60 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 '>
            <div className='absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300'></div>
            <div className='relative z-10'>
              <div className='flex items-center gap-2 mb-3'>
                <span className='text-2xl'>📊</span>
                <p className='text-sm font-bold text-teal-800/90 tracking-wide uppercase'>Attendance Rate</p>
              </div>
              <p className={`text-4xl font-black text-teal-700 drop-shadow-sm`}>
                {attendancePercentage}%
              </p>
              <div className='mt-3 h-2 bg-teal-300/40 rounded-full overflow-hidden backdrop-blur-sm'>
                <div
                  className='h-full bg-teal-500/80 rounded-full transition-all duration-500'
                  style={{ width: `${attendancePercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Attendance Details */}
          <div className='group/card relative p-6 rounded-2xl bg-gradient-to-br from-amber-200/60 via-orange-200/50 to-peach-200/50 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 '>
            <div className='absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300'></div>
            <div className='relative z-10'>
              <div className='flex items-center gap-2 mb-3'>
                <span className='text-2xl'>✅</span>
                <p className='text-sm font-bold text-orange-800/90 tracking-wide uppercase'>Class Attendance</p>
              </div>
              <p className='text-xs text-orange-700/80 font-medium mb-2 backdrop-blur-sm bg-white/20 inline-block px-2 py-1 rounded-lg'>
                Last: {lastAttendance}
              </p>
              <p className='text-3xl font-black text-orange-700 drop-shadow-sm'>
                <span className={attendedClasses / totalClasses >= 0.85 ? 'text-orange-700' : attendedClasses / totalClasses >= 0.5 ? 'text-amber-600' : 'text-red-400'}>
                  {attendedClasses}
                </span>
                <span className='text-orange-600/70 text-2xl mx-1'> / </span>
                <span className='text-orange-700'>{totalClasses}</span>
              </p>
            </div>
          </div>

          {/* Assignments */}
          <div className='group/card relative p-6 rounded-2xl bg-gradient-to-br from-indigo-200/60 via-purple-200/60 to-pink-200/50 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 '>
            <div className='absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300'></div>
            <div className='relative z-10'>
              <div className='flex items-center gap-2 mb-4'>
                <span className='text-2xl'>📝</span>
                <p className='text-sm font-bold text-indigo-800/90 tracking-wide uppercase'>Assignments</p>
              </div>
              <div className='space-y-3'>
                <div className='flex justify-between items-center p-3 bg-white/30 backdrop-blur-sm rounded-xl border border-white/40 hover:bg-white/40 transition-all duration-200'>
                  <span className='text-sm font-semibold text-indigo-800 flex items-center gap-2'>
                    <span className='w-2 h-2 rounded-full bg-emerald-400'></span>
                    Submitted
                  </span>
                  <span className='text-lg font-black text-indigo-800 bg-white/30 px-3 py-1 rounded-lg'>
                    {assignments.submitted}
                  </span>
                </div>
                <div className='flex justify-between items-center p-3 bg-white/30 backdrop-blur-sm rounded-xl border border-white/40 hover:bg-white/40 transition-all duration-200'>
                  <span className='text-sm font-semibold text-indigo-800 flex items-center gap-2'>
                    <span className='w-2 h-2 rounded-full bg-amber-400'></span>
                    Pending
                  </span>
                  <span className='text-lg font-black text-indigo-800 bg-white/30 px-3 py-1 rounded-lg'>
                    {assignments.pending}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ChildCourseDetails = ({ child, enrollments = [] }) => {
  // Use enrollments from API if provided, otherwise fallback to child.enrolledCourses
  const enrolledCourses = enrollments.length > 0
    ? enrollments.map((enrollment) => {
      const course = enrollment.course || enrollment.group?.courseId || enrollment.group?.course;
      const group = enrollment.group;
      const teacher = enrollment.teacher || course?.teacherId || group?.teacherId;

      // Get teacher name safely
      const getTeacherName = () => {
        if (teacher && typeof teacher === 'object' && !Array.isArray(teacher)) {
          return teacher.name || teacher.username || 'Teacher';
        }
        return 'Teacher';
      };

      return {
        _id: enrollment._id,
        courseId: course?._id || course,
        groupId: group?._id || group,
        title: course?.title || group?.title || 'Course',
        instructor: getTeacherName(),
        teacherId: teacher?._id || teacher?.id || (typeof teacher === 'string' ? teacher : null), // Extract teacher ID
        username: teacher?.username || null, // Extract teacher username for profile link
        groupTitle: group?.title || 'Group',
        groupType: group?.type || 'N/A',
        groupSchedule: group?.schedule || [],
        status: enrollment.status,
      };
    })
    : child?.enrolledCourses || [];

  if (enrolledCourses.length === 0) {
    return (
      <div className='relative bg-gradient-to-br from-purple-50 via-white to-indigo-50 rounded-2xl shadow-xl border border-purple-100 p-12 text-center overflow-hidden'>
        <div className='absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-200/30 to-indigo-200/30 rounded-full blur-3xl -z-0'></div>
        <div className='relative z-10'>
          <span className='text-6xl mb-4 inline-block'>📚</span>
          <p className="text-gray-700 text-xl font-bold mb-2">No enrolled courses yet</p>
          <p className="text-gray-500 text-sm">This child hasn't enrolled in any courses.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {enrolledCourses.map((c, idx) => (
        <CourseCard key={idx} courseData={c} childId={child?._id} />
      ))}
    </div>
  )
}

export default ChildCourseDetails