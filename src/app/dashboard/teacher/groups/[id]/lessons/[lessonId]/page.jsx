"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
import { useGetGroupByIdQuery } from "@/redux/api/endPoints/groupsApiSlice";
import { useGetLessonByIdQuery, useGetLessonsByGroupQuery } from "@/redux/api/endPoints/lessonsApiSlice";
import AttendanceSheet from "@/components/teacherGroupDetails/AttendanceSheet";
import { Spinner } from "@/components/shared/Loader";
import LessonMaterials from "@/components/teacherGroupDetails/LessonMaterials";
import LessonAsignment from "@/components/teacherGroupDetails/LessonAsignment";
import { useGetAssignmentsByLessonQuery } from "@/redux/api/endPoints/assignmentsApiSlice";

export default function LessonDetailsPage() {
  const { id: groupId, lessonId } = useParams();
  
  const { data: groupData, isLoading: groupLoading } = useGetGroupByIdQuery(groupId);
  const { data: lessonsData, isLoading: lessonsLoading } = useGetLessonsByGroupQuery({ groupId });
  const { data: lessonData, isLoading: loading } = useGetLessonByIdQuery(lessonId);
  const {data : assignmentData , isLoading: assignmentsLoading} = useGetAssignmentsByLessonQuery(lessonId);
  
  const lesson = lessonData?.data;
  const assignment = assignmentData?.data || []

  if (groupLoading || lessonsLoading || assignmentsLoading) {
    return <div className="h-screen flex items-center justify-center"><Spinner /></div>;
  }

  const group = groupData?.data;
  const allLessons = lessonsData?.data?.data || [];

  const currentLesson = allLessons.find(l => l._id === lessonId);

  if (!currentLesson) return <div className="p-10 text-center text-red-500">Lesson not found or deleted.</div>;

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 space-y-6">

      <header className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-col gap-4">
          <Link href={`/dashboard/teacher/groups/${groupId}`} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 w-fit transition">
            <ArrowLeft size={18} /> Back to Group
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{currentLesson.title}</h1>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(currentLesson.date).toLocaleDateString()}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {currentLesson.startTime} - {currentLesson.endTime}</span>
                <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold uppercase ${currentLesson.type === 'online' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                  {currentLesson.type}
                </span>
              </div>
            </div>

            
          </div>
        </div>
      </header>
      <main>
        <div className="bg-white p-6 rounded-2xl border shadow-sm grid grid-cols-1 md:grid-cols-2 gap-7">
          <LessonMaterials
            lessonId={lessonId}
            materials={lesson?.materials || []}
          />

          <LessonAsignment lessonId={lessonId} 
          />
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h2 className="text-lg font-bold mb-6 border-b pb-4">Attendance Sheet</h2>

          <AttendanceSheet
            lessonId={lessonId}
            students={group?.students || []}
            existingAttendance={currentLesson.attendance || []}
          />
        </div>
      </main>
    </div>
  );
}