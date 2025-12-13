"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Search, Users, BookOpen, ArrowRight, CalendarDays, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/shared/Loader";
import { useGetAllGroupsQuery } from "@/redux/api/endPoints/groupsApiSlice";

export default function GroupsDirectoryPage() {
  const { userInfo } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const currentUser = userInfo?.user;
  const {
    data: groupsData,
    isLoading,
    isError,
    error
  } = useGetAllGroupsQuery(
    { teacherId: currentUser?._id },
    {
      skip: !currentUser?._id,
      refetchOnMountOrArgChange: true
    }
  );

  const groups = groupsData?.data || [];

  console.log(groups)

  const filteredGroups = groups.filter(group =>
    group.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading || !currentUser?._id) {
    return <div className="h-screen flex items-center justify-center"><Spinner /></div>;
  }

  if (isError) {
    console.error("Groups Fetch Error:", error);
    return (
      <div className="h-screen flex flex-col items-center justify-center text-red-500 gap-2">
        <p className="font-bold">Failed to load groups</p>
        <p className="text-sm text-gray-600">{error?.data?.message || "Something went wrong"}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 space-y-8">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Groups</h1>
          <p className="text-gray-500 mt-1">
            Overview of all your active batches ({groups.length}).
          </p>
        </div>

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

                <div className="p-5 space-y-3 flex-grow">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-gray-400" />
                      <span>{group.students?.length || group.capacity || 0} group capacity</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-gray-400" />
                      <span>{group.students?.length || group.studentsCount || 0} studentsCount</span>
                    </div>
                  </div>


                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} className="text-gray-400" />
                      <span className="truncate max-w-[150px]">
                        {group.schedule?.map(s => s.day?.slice(0, 3)).join(', ') || "No Schedule"}
                      </span>
                    </div>
                  </div>
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
            You don't have any groups yet. Create a course and add groups to see them here.
          </p>
          <Link href="/dashboard/teacher/createCourse" className="mt-6">
            <Button variant="outline">Go to Create Course</Button>
          </Link>
        </div>
      )}
    </div>
  );
}