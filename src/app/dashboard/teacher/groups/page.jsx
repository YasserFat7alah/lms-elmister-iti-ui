"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Search, Users, BookOpen, ArrowRight, CalendarDays, MoreVertical, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/shared/Loader";
import { useGetAllGroupsQuery } from "@/redux/api/endPoints/groupsApiSlice";
import Breadcrumbs from '@/components/shared/Breadcrumbs';

export default function GroupsDirectoryPage() {
  const { userInfo } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");

  const teacherId = useMemo(() => {
    if (userInfo?.accessToken) {
      try {
        const tokenParts = userInfo.accessToken.split('.');
        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          return payload.id || payload._id;
        }
      } catch (e) {
        return userInfo?.user?._id;
      }
    }
    return userInfo?.user?._id || userInfo?._id;
  }, [userInfo]);

  const {
    data: groupsData,
    isLoading,
    isError,
    error,
    refetch
  } = useGetAllGroupsQuery(
    { teacherId },
    {
      skip: !teacherId,
      refetchOnMountOrArgChange: true
    }
  );

  const groups = groupsData?.data || [];

  console.log(groups)

  const filteredGroups = groups.filter(group =>
    group.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDays = (schedule) => {
    if (!schedule || !Array.isArray(schedule) || schedule.length === 0) {
      return "No Schedule";
    }

    const days = schedule
      .map(s => {
        if (!s.day) return "";
        return s.day.charAt(0).toUpperCase() + s.day.slice(1, 3);
      })
      .filter(Boolean);

    return [...new Set(days)].join(', ');
  };

  if (isLoading || !teacherId) {
    return <div className="h-screen flex items-center justify-center"><Spinner /></div>;
  }

  if (isError) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-red-500 gap-2">
        <p className="font-bold">Failed to load groups</p>
        <p className="text-sm text-gray-600">{error?.data?.message || "Something went wrong"}</p>
        <Button variant="outline" onClick={() => refetch()}>Retry Connection</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard/teacher' },
            { label: 'My Groups' }
          ]}
        />

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search groups..."
            className="pl-10 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredGroups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGroups.map((group) => {
            const groupId = group._id;

            return (
              <div
                key={groupId}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#FF4667] transition group flex flex-col"
              >
                <div className="p-5 border-b border-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] px-2 py-1 rounded uppercase font-bold tracking-wide ${group.type === 'online' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                      }`}>
                      {group.type}
                    </span>
                    <Link href={`/dashboard/teacher/groups/${groupId}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-[#FF4667]">
                        <MoreVertical size={16} />
                      </Button>
                    </Link>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg truncate" title={group.title}>
                    {group.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <BookOpen size={12} /> {group.courseId?.title || "Course Group"}
                  </p>
                </div>

                <div className="p-5 space-y-3 grow">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Layers size={16} className="text-gray-400" />
                      <span>{group.studentsCount || 0} / {group.capacity} Students</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} className="text-gray-400" />
                      <span className="truncate max-w-[180px] font-medium text-gray-700">
                        {formatDays(group.schedule)}
                      </span>
                    </div>
                  </div>

                  {group.startingDate && (
                    <div className="text-xs text-gray-400 pl-6">
                      Start: {new Date(group.startingDate).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <div className="p-4 pt-0 mt-auto">
                  <Link href={`/dashboard/teacher/groups/${groupId}`}>
                    <Button className="w-full bg-gray-50 hover:bg-[#FF4667] text-gray-700 hover:text-white border border-gray-200 hover:border-transparent transition-all group-hover:bg-[#FF4667] group-hover:text-white">
                      View Details <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-gray-100 p-6 rounded-full mb-4">
            <Users size={48} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No Groups Found</h3>
          <p className="text-gray-500 max-w-sm mt-2">
            You don't have any active groups matching your search.
          </p>
          <div className="mt-6 flex gap-3">
            <Button variant="outline" onClick={() => refetch()}>Refresh List</Button>
            <Link href="/dashboard/teacher/createCourse">
              <Button>Create New Course</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}