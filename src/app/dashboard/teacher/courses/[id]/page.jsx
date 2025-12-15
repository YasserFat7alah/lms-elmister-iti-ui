"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  ArrowLeft, BookOpen, Users, Calendar, DollarSign,
  PlayCircle, GraduationCap, Globe, Layers, MapPin,
  Link as LinkIcon, AlertCircle, Edit3, ChevronRight,
  Clock, CheckCircle2, MoreVertical, Star, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/shared/Loader";
import { useGetCourseByIdQuery } from "@/redux/api/endPoints/coursesApiSlice";

export default function CourseFullDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const { userInfo } = useSelector((state) => state.auth);

  const { data: courseData, isLoading, isError } = useGetCourseByIdQuery(id);
  const course = courseData?.data || courseData?.course;

  if (isLoading) return <div className="h-screen flex items-center justify-center"><Spinner /></div>;
  if (isError || !course) return <div className="p-10 text-center text-red-500 font-medium bg-red-50 rounded-lg mx-6 mt-6">Course not found.</div>;


  const StatusPill = ({ status }) => {
    const styles = {
      published: "bg-emerald-100 text-emerald-700 border-emerald-200",
      draft: "bg-amber-100 text-amber-700 border-amber-200",
      "in-review": "bg-blue-100 text-blue-700 border-blue-200",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 w-fit shrink-0 ${styles[status] || styles.draft}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
        {status?.replace('-', ' ').toUpperCase()}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] pb-10">

      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <button onClick={() => router.back()} className="hover:text-gray-900 transition flex items-center gap-1">
              <ArrowLeft size={16} /> Back
            </button>
            <ChevronRight size={14} className="text-gray-300" />
            <span className="text-gray-900 font-medium truncate max-w-[200px]">{course.title}</span>
          </div>

          <div className="flex items-center gap-3">
            <Link href={`/dashboard/teacher/courses/${id}/edit`}>
              <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-[#FF4667] gap-2 h-9 text-xs font-semibold uppercase tracking-wide">
                <Edit3 size={14} /> Edit Course
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4 max-w-3xl">

            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">

                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                  {course.title}
                </h1>
                <StatusPill status={course.status} />
              </div>

            </div>

            <p className="text-lg text-gray-500 font-medium">
              {course.subTitle || "Master this subject with comprehensive lessons and interactive groups."}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500 pt-2 flex-wrap">
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border shadow-sm">
                <GraduationCap size={16} className="text-[#FF4667]" /> {course.gradeLevel}
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border shadow-sm">
                <Globe size={16} className="text-blue-500" /> {course.courseLanguage}
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border shadow-sm">
                <Calendar size={16} className="text-purple-500" /> {new Date(course.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-8">

            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl shadow-gray-200 ring-1 ring-black/5 relative group aspect-video">
              {course.video?.url ? (
                <video
                  controls
                  className="w-full h-full object-contain bg-black"
                  poster={course.thumbnail?.url}
                  src={course.video.url}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="relative w-full h-full">
                  {course.thumbnail?.url ? (
                    <img src={course.thumbnail.url} alt={course.title} className="w-full h-full object-cover opacity-70" />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500 bg-slate-900/50 backdrop-blur-sm">
                      <BookOpen size={48} className="mb-4 opacity-50" />
                      <p className="text-sm font-medium">No Thumbnail</p>
                    </div>
                  )}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-[2px]">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 mb-4 shadow-xl">
                      <PlayCircle size={32} className="text-white ml-1" />
                    </div>
                    <p className="text-sm text-white/80 font-medium tracking-wide uppercase">No Preview Video</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="text-[#FF4667]" size={20} /> About this Course
              </h3>
              <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                {course.description || <span className="text-gray-400 italic">No description provided yet.</span>}
              </div>

              {course.tags && course.tags.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-50 flex flex-wrap gap-2">
                  {course.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium border border-gray-100 hover:bg-gray-100 transition">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Users className="text-[#FF4667]" size={24} />
                  Active Batches
                  <span className="bg-gray-100 text-gray-600 text-sm py-1 px-3 rounded-full font-bold">{course.groups?.length || 0}</span>
                </h3>
              </div>

              <div className="grid gap-4">
                {course.groups && course.groups.length > 0 ? (
                  course.groups.map((group) => (
                    <Link key={group._id} href={`/dashboard/teacher/groups/${group._id}`} className="block group">
                      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#FF4667]/30 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

                        <div className="flex items-start gap-5 w-full sm:w-auto">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${group.type === 'online' ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-100' : 'bg-orange-50 text-orange-600 ring-1 ring-orange-100'}`}>
                            {group.type === 'online' ? <LinkIcon size={24} /> : <MapPin size={24} />}
                          </div>
                          <div className="space-y-1 w-full">
                            <h4 className="font-bold text-gray-900 text-lg group-hover:text-[#FF4667] transition-colors">{group.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                              <span className="flex items-center gap-1.5 capitalize bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                                {group.type}
                              </span>
                              <span className="flex items-center gap-1.5 text-gray-600">
                                <Users size={14} className="text-gray-400" />
                                {group.studentsCount || (group.students ? group.students.length : 0)} / {group.capacity} Students
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-8 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-4 sm:pt-0">
                          <div className="flex flex-col items-start sm:items-end gap-1.5 min-w-[120px]">
                            {group.schedule?.slice(0, 2).map((s, i) => (
                              <div key={i} className="text-sm font-semibold text-gray-700 flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-md w-full justify-end">
                                <span className="capitalize">{s.day}</span>
                                <span className="text-[#FF4667] bg-[#FF4667]/10 px-1.5 rounded text-xs py-0.5">{s.time}</span>
                              </div>
                            ))}
                            {group.schedule?.length > 2 && <span className="text-xs text-gray-400 font-medium">+More</span>}
                          </div>
                          <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#FF4667] group-hover:text-white transition-all duration-300 shadow-sm">
                            <ChevronRight size={20} />
                          </div>
                        </div>

                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="bg-white p-12 rounded-2xl border border-dashed border-gray-200 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                      <Layers size={32} />
                    </div>
                    <h3 className="text-gray-900 font-medium">No groups created yet</h3>
                    <p className="text-gray-500 text-sm mt-1">Start by creating a batch for this course.</p>
                  </div>
                )}
              </div>
            </div>

          </div>

          <div className="space-y-6">



            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <h3 className="font-bold text-gray-900 mb-5 text-sm uppercase tracking-wide">Details</h3>
              <div className="space-y-5">
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-3 text-gray-500 group-hover:text-[#FF4667] transition-colors">
                    <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-pink-50 transition-colors"><Layers size={18} /></div>
                    <span className="text-sm font-medium">Subject</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{course.subject}</span>
                </div>
                <div className="w-full h-px bg-gray-100"></div>
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-3 text-gray-500 group-hover:text-blue-500 transition-colors">
                    <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors"><Globe size={18} /></div>
                    <span className="text-sm font-medium">Language</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{course.courseLanguage}</span>
                </div>
                <div className="w-full h-px bg-gray-100"></div>
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-3 text-gray-500 group-hover:text-purple-500 transition-colors">
                    <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-purple-50 transition-colors"><GraduationCap size={18} /></div>
                    <span className="text-sm font-medium">Grade</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{course.gradeLevel}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}