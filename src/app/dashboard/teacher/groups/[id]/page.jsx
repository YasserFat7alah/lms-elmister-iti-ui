"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  CalendarDays,
  Users,
  BookOpen,
  Plus,
  Clock,
  MapPin,
  Video,
  ArrowLeft,
  History,
  MoreVertical,
  Trash2,
  Edit,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import GroupCalendar from "@/components/teacherGroupDetails/GroupCalendar";
import { Spinner } from "@/components/shared/Loader";
import { useGetLessonsByGroupQuery } from "@/redux/api/endPoints/lessonsApiSlice";
import { useGetGroupByIdQuery } from "@/redux/api/endPoints/groupsApiSlice";
import CreateSessionModal from "@/components/teacherGroupDetails/CreateSessionModal";
import GroupStudentsList from "@/components/teacherGroupDetails/GroupStudentsList";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-hot-toast";
import { useDeleteLessonMutation } from "@/redux/api/endPoints/lessonsApiSlice";

import Breadcrumbs from "@/components/shared/Breadcrumbs";

export default function GroupDetailsPage() {
  const { id: groupId } = useParams();
  const [activeTab, setActiveTab] = useState("schedule");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLessonToEdit, setSelectedLessonToEdit] = useState(null);

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard/teacher" },
    { label: "Groups", href: "/dashboard/teacher/groups" },
    { label: "Group Details" }
  ];

  const { data: group, isLoading: groupLoading } = useGetGroupByIdQuery(groupId, {
    skip: !groupId,
  });
  const { data: lessonsResponse, isLoading: lessonsLoading } = useGetLessonsByGroupQuery(
    { groupId, page: 1, limit: 50 },
    { skip: !groupId }
  );
  const [deleteLesson] = useDeleteLessonMutation();

  const groupName = group?.data?.title || "Loading...";

  // Handle lessons data structure (might be nested in data property or data.data)
  const lessonsData = lessonsResponse?.data?.data || lessonsResponse?.data || lessonsResponse;
  const lessons = Array.isArray(lessonsData) ? lessonsData : [];

  const now = new Date();
  const pastLessons = lessons.filter(lesson => new Date(lesson.date) < now);
  const upcomingLessons = lessons.filter(lesson => new Date(lesson.date) >= now);

  const handleDeleteLesson = async (e, lessonId) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm("Are you sure you want to delete this lesson?")) return;

    try {
      await deleteLesson(lessonId).unwrap();
      toast.success("Lesson deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete lesson");
    }
  };

  if (groupLoading || lessonsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 space-y-6">
      <CreateSessionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedLessonToEdit(null);
        }}
        groupId={groupId}
        lessonToEdit={selectedLessonToEdit}
      />

      <Breadcrumbs items={breadcrumbItems} className="w-fit" />

      <header className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{groupName}</h1>
          </div>
          <p className="text-gray-500 text-sm mt-1">Manage schedule, attendance, and students.</p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#FF4667] hover:bg-[#ff2e53] text-white gap-2 shadow-md shadow-pink-200"
          >
            <Plus size={18} /> Add Session
          </Button>
        </div>
      </header>

      <div className="flex gap-2 border-b border-gray-200 overflow-x-auto">
        {[
          { id: "schedule", label: "Schedule & Lessons", icon: CalendarDays },
          { id: "students", label: "Students", icon: Users },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
              ? "border-[#FF4667] text-[#FF4667]"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <main>
        {activeTab === "schedule" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-2xl border shadow-sm">
                <GroupCalendar lessons={lessons} groupId={groupId} />
              </div>

              <div className="bg-white p-6 rounded-2xl border shadow-sm">
                <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-700">
                  <History size={18} /> Session History
                </h3>

                {pastLessons.length > 0 ? (
                  <div className="space-y-3">
                    {pastLessons.map((lesson) => (
                      <Link
                        href={`/dashboard/teacher/groups/${groupId}/lessons/${lesson._id}`}
                        key={lesson._id}
                        className="block group"
                      >
                        <div className="p-3 rounded-xl border border-gray-100 hover:border-[#FF4667] hover:shadow-md transition bg-white relative overflow-hidden">
                          <div className={`absolute top-0 right-0 w-1 h-full ${lesson.type === "online" ? "bg-blue-500" : "bg-[#FF4667]"}`} />

                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-gray-800 text-sm">{lesson.title}</h4>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(lesson.date).toLocaleDateString()} • {lesson.startTime}
                              </p>
                            </div>

                            <div className="z-10">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 -mr-1 text-gray-400 hover:text-gray-900"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                    }}
                                  >
                                    <MoreVertical size={14} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setSelectedLessonToEdit(lesson);
                                      setIsModalOpen(true);
                                    }}
                                  >
                                    <Edit size={14} className="mr-2" /> Edit Details
                                  </DropdownMenuItem>

                                  <DropdownMenuItem
                                    className="text-red-600 focus:text-red-600 cursor-pointer"
                                    onClick={(e) => handleDeleteLesson(e, lesson._id)}
                                  >
                                    <Trash2 size={14} className="mr-2" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>

                          <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
                            {lesson.type === "online" ? (
                              <div className="flex items-center gap-1"><Video size={12} /> Zoom</div>
                            ) : (
                              <div className="flex items-center gap-1"><MapPin size={12} /> Center</div>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 h-40 rounded-xl flex items-center justify-center text-gray-400">
                    <p>No past sessions yet.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-2xl border shadow-sm h-fit">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Clock size={18} className="text-[#FF4667]" /> Upcoming Sessions
                </h3>

                <div className="space-y-4 max-h-[calc(100vh-240px)] overflow-y-auto custom-scrollbar">
                  {upcomingLessons.length > 0 ? (
                    upcomingLessons.map((lesson) => (
                      <Link
                        href={`/dashboard/teacher/groups/${groupId}/lessons/${lesson._id}`}
                        key={lesson._id}
                        className="block group relative"
                      >
                        <div className="p-3 rounded-xl border border-gray-100 hover:border-[#FF4667] hover:shadow-md transition bg-white relative overflow-hidden">
                          <div className={`absolute top-0 right-0 w-1 h-full ${lesson.type === "online" ? "bg-blue-500" : "bg-[#FF4667]"}`} />

                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-gray-800 text-sm">{lesson.title}</h4>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(lesson.date).toLocaleDateString()} • {lesson.startTime}
                              </p>
                            </div>

                            <div className="z-10">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 -mr-1 text-gray-400 hover:text-gray-900"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                    }}
                                  >
                                    <MoreVertical size={14} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setSelectedLessonToEdit(lesson);
                                      setIsModalOpen(true);
                                    }}
                                  >
                                    <Edit size={14} className="mr-2" /> Edit Details
                                  </DropdownMenuItem>

                                  <DropdownMenuItem
                                    className="text-red-600 focus:text-red-600 cursor-pointer"
                                    onClick={(e) => handleDeleteLesson(e, lesson._id)}
                                  >
                                    <Trash2 size={14} className="mr-2" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>

                          <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
                            {lesson.type === "online" ? (
                              <div className="flex items-center gap-1"><Video size={12} /> Zoom</div>
                            ) : (
                              <div className="flex items-center gap-1"><MapPin size={12} /> Center</div>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="bg-gray-50 h-40 rounded-xl flex items-center justify-center text-gray-400">
                      <p>No upcoming sessions.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "students" && (
          <GroupStudentsList students={group?.data?.students || []} groupId={groupId} lessons={lessons} />
        )}

        {activeTab === "settings" && (
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <p className="text-gray-500 text-center py-10">Group Settings Component Here</p>
          </div>
        )}
      </main>
    </div>
  );
}
