'use client';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Clock, Video, Calendar as CalendarIcon, MapPin, Plus, MoreHorizontal, ChevronDown, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import AddEventModal from '@/components/shared/AddEventModal';
import { useGetLessonsByGroupQuery } from "@/redux/api/endPoints/lessonsApiSlice";
import { useGetMyGroupsQuery } from "@/redux/api/endPoints/groupsApiSlice";
import { format, parse, isWithinInterval } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function WeeklySchedule() {
  const { userInfo } = useSelector((state) => state.auth);
  const role = userInfo?.user?.role;
  const canAddEvent = role === 'admin' || role === 'teacher';
  const userId = userInfo?.user?._id;
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const { data: groupsData, isLoading: groupsLoading } = useGetMyGroupsQuery();
  const allGroups = groupsData?.data || [];

  const myGroups = allGroups.filter(group => {
    if (role === 'admin') return true;
    if (role === 'teacher') {
      const teacherId = group.teacherId?._id || group.teacherId;
      return teacherId === userId;
    }
    if (role === 'student') {
      return group.students?.some(student => {
        const studentId = student._id || student;
        return studentId === userId;
      });
    }
    return false;
  });

  useEffect(() => {
    if (myGroups.length > 0 && !selectedGroupId) {
      setSelectedGroupId(myGroups[0]._id);
    }
  }, [myGroups, selectedGroupId]);

  const { 
    data: lessonsData, 
    isLoading: lessonsLoading, 
    error: lessonsError 
  } = useGetLessonsByGroupQuery(
    { groupId: selectedGroupId }, 
    { skip: !selectedGroupId, refetchOnMountOrArgChange: true } 
  );

  const rawLessons = lessonsData?.data?.data || [];
  
  const scheduleData = rawLessons.map(lesson => {
    const lessonDate = new Date(lesson.date);
    let isLive = false;
    if (lesson.startTime && lesson.endTime) {
      const now = new Date();
      const dateStr = format(lessonDate, 'yyyy-MM-dd');
      const startDateTime = parse(`${dateStr} ${lesson.startTime}`, 'yyyy-MM-dd HH:mm', new Date());
      const endDateTime = parse(`${dateStr} ${lesson.endTime}`, 'yyyy-MM-dd HH:mm', new Date());
      isLive = isWithinInterval(now, { start: startDateTime, end: endDateTime });
    }

    return {
      id: lesson._id,
      day: format(lessonDate, 'EEEE'),
      date: format(lessonDate, 'd MMM'),
      subject: lesson.title,
      group: lesson.groupId?.title || "Unknown Group",
      time: `${lesson.startTime} - ${lesson.endTime}`,
      type: lesson.type,
      isLive: isLive,
      teacher: lesson.groupId?.teacherId?.name || "Unknown Teacher",
      teacherInitial: lesson.groupId?.teacherId?.name?.charAt(0)?.toUpperCase() || "T",
      groupColor: '#FF0055',
    };
  });

  const selectedGroupName = myGroups.find(g => g._id === selectedGroupId)?.title || "Select Group";

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      
      {/* Header بسيط */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="p-2 bg-pink-50 rounded-lg">
                <CalendarIcon className="h-6 w-6 text-[#FF0055]" />
              </div>
              Weekly Schedule
            </h1>
            <p className="text-gray-600 mt-2">View and manage your class sessions</p>
          </div>
          
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gray-300 bg-white">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#FF0055]" />
                    <span>{groupsLoading ? "Loading..." : selectedGroupName}</span>
                    <ChevronDown size={16} />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {myGroups.map(group => (
                  <DropdownMenuItem 
                    key={group._id} 
                    onClick={() => setSelectedGroupId(group._id)}
                    className="flex items-center gap-2"
                  >
                    <div className={`w-2 h-2 rounded-full ${selectedGroupId === group._id ? 'bg-[#FF0055]' : 'bg-gray-300'}`} />
                    {group.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {canAddEvent && (
              <Button 
                onClick={() => setIsAddEventOpen(true)}
                className="bg-gradient-to-r from-[#FF0055] to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white shadow-md"
              >
                <Plus size={18} className="mr-2" />
                Add Event
              </Button>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="text-2xl font-bold text-gray-900">{scheduleData.length}</div>
            <div className="text-sm text-gray-600">Total Sessions</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">
              {scheduleData.filter(l => l.type === 'online').length}
            </div>
            <div className="text-sm text-gray-600">Online</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="text-2xl font-bold text-pink-600">
              {scheduleData.filter(l => l.type === 'offline').length}
            </div>
            <div className="text-sm text-gray-600">Offline</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="text-2xl font-bold text-red-600">
              {scheduleData.filter(l => l.isLive).length}
            </div>
            <div className="text-sm text-gray-600">Live Now</div>
          </div>
        </div>
      </div>

      {/* الجدول الرئيسي */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {lessonsLoading ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <Loader2 className="animate-spin mb-4" size={32} />
            <p>Loading schedule...</p>
          </div>
        ) : scheduleData.length === 0 ? (
          <div className="text-center py-16">
            <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No sessions scheduled</h3>
            <p className="text-gray-500 mb-6">No sessions found for this group yet.</p>
            {canAddEvent && (
              <Button 
                onClick={() => setIsAddEventOpen(true)}
                className="bg-[#FF0055] hover:bg-pink-700"
              >
                <Plus size={18} className="mr-2" />
                Create First Session
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="py-4 px-6 text-left">
                    <div className="text-xs font-semibold text-gray-600 uppercase">Day & Date</div>
                  </th>
                  <th className="py-4 px-6 text-left">
                    <div className="text-xs font-semibold text-gray-600 uppercase">Subject</div>
                  </th>
                  <th className="py-4 px-6 text-left">
                    <div className="text-xs font-semibold text-gray-600 uppercase">Time</div>
                  </th>
                  <th className="py-4 px-6 text-left">
                    <div className="text-xs font-semibold text-gray-600 uppercase">Teacher</div>
                  </th>
                  <th className="py-4 px-6 text-left">
                    <div className="text-xs font-semibold text-gray-600 uppercase">Type</div>
                  </th>
                  <th className="py-4 px-6 text-left">
                    <div className="text-xs font-semibold text-gray-600 uppercase">Action</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {scheduleData.map((session) => (
                  <tr 
                    key={session.id} 
                    className={`hover:bg-gray-50 transition-colors ${session.isLive ? 'bg-red-50' : ''}`}
                  >
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-1 h-10 rounded-full ${session.isLive ? 'bg-red-500' : 'bg-[#FF0055]'}`} />
                        <div>
                          <div className="font-bold text-gray-900">{session.day}</div>
                          <div className="text-sm text-gray-500">{session.date}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-5 px-6">
                      <div>
                        <div className="font-bold text-gray-900 text-lg mb-1">{session.subject}</div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          {session.group}
                        </span>
                      </div>
                    </td>

                    <td className="py-5 px-6">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-pink-50 rounded-lg">
                          <Clock size={18} className="text-[#FF0055]" />
                        </div>
                        <span className="font-medium text-gray-900">{session.time}</span>
                      </div>
                    </td>

                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center text-sm font-bold text-gray-700">
                          {session.teacherInitial}
                        </div>
                        <span className="text-gray-700">{session.teacher}</span>
                      </div>
                    </td>

                    <td className="py-5 px-6">
                      <div className="space-y-2">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
                          ${session.type === 'online' 
                            ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                            : 'bg-pink-50 text-pink-700 border border-pink-200'}`}>
                          {session.type === 'online' ? <Video size={14} /> : <MapPin size={14} />}
                          <span className="capitalize">{session.type}</span>
                        </span>
                        
                        {session.isLive && (
                          <div className="flex items-center gap-1.5 animate-pulse">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <span className="text-xs font-bold text-red-600">LIVE NOW</span>
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="py-5 px-6">
                      {session.isLive && session.type === 'online' ? (
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow"
                        >
                          Join Now
                        </Button>
                      ) : (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                        >
                          <MoreHorizontal size={20} />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AddEventModal 
        isOpen={isAddEventOpen} 
        onClose={() => setIsAddEventOpen(false)}
        defaultGroupId={selectedGroupId} 
      />
    </div>
  );
}