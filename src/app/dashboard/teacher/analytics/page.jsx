
'use client';
import React, { useMemo } from 'react';
import Link from "next/link";
import moment from 'moment';
import { 
  Calendar, Clock, Video, MapPin, ChevronRight, 
  Coffee, ArrowRight, Home, MoreHorizontal 
} from "lucide-react";

import { Spinner } from '@/components/shared/Loader';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import TeacherAnalytics from '@/components/DashboardComponents/teacher/analytics/TeacherAnalytics';

// Hooks
import { useGetTeacherDashboardQuery } from '@/redux/api/endPoints/teachersApiSlice';
import { useGetAllMyLessonsQuery } from "@/redux/api/endPoints/lessonsApiSlice";

export default function Page() {
  const { data: dashboardData, isLoading: dashLoading, error: dashError } = useGetTeacherDashboardQuery({});
  const { data: lessonsData, isLoading: lessonsLoading } = useGetAllMyLessonsQuery(undefined, { 
    refetchOnMountOrArgChange: true 
  });

  // فلترة حصص اليوم
  const todaysLessons = useMemo(() => {
    if (!lessonsData?.data) return [];
    const todayStr = moment().format('YYYY-MM-DD');
    return lessonsData.data
      .filter(lesson => {
        const lessonDate = lesson.date?.$date || lesson.date; 
        return moment(lessonDate).format('YYYY-MM-DD') === todayStr;
      })
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [lessonsData]);

  if (dashLoading || lessonsLoading) return <div className="h-[calc(100vh-100px)] flex items-center justify-center"><Spinner /></div>;
  if (dashError) return <div className="text-center text-red-500 py-10">Failed to load analytics</div>;

  return (
    <div className="min-h-screen bg-[#F8F9FC] p-6 space-y-8">
      
      <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        
        <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <div className="p-1.5 bg-[#FF4667]/10 text-[#FF4667] rounded-md"><Calendar size={18} /></div>
                Today's Sessions
                <span className="ml-2 bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {todaysLessons.length}
                </span>
            </h3>
            <Link href="/dashboard/teacher/schedule" className="text-xs font-semibold text-[#FF4667] hover:underline flex items-center gap-1">
                Full Schedule <ArrowRight size={12}/>
            </Link>
        </div>

        <div className="p-5">
            {todaysLessons.length > 0 ? (
                <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                    {todaysLessons.map((lesson) => (
                        <Link 
                            key={lesson._id} 
                            href={`/dashboard/teacher/groups/${lesson.groupId?._id || lesson.groupId}/lessons/${lesson._id}`}
                            className="group min-w-[300px] md:min-w-[350px] block"
                        >
                            <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#FF4667] hover:shadow-md transition-all duration-300 relative overflow-hidden h-full">
                                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${lesson.type === 'online' ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
                                
                                <div className="flex items-start gap-4 pl-2">
                                    <div className={`flex flex-col items-center justify-center w-16 h-16 rounded-lg text-xs font-bold shrink-0 
                                        ${lesson.type === 'offline' 
                                            ? 'bg-orange-50 text-orange-600 border border-orange-100' 
                                            : 'bg-blue-50 text-blue-600 border border-blue-100'
                                        }`}
                                    >
                                        {lesson.type === 'offline' ? (
                                            <span className="uppercase tracking-widest text-[9px] font-black -rotate-90">Offline</span>
                                        ) : (
                                            <>
                                                <span className="text-sm">{lesson.startTime}</span>
                                            </>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-gray-900 truncate group-hover:text-[#FF4667] transition-colors text-base">
                                            {lesson.title}
                                        </h4>
                                        <div className="flex flex-col gap-1 mt-1.5">
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-medium truncate max-w-[150px]">
                                                    {lesson.groupId?.title || "Group"}
                                                </span>
                                                {lesson.type === 'offline' && (
                                                    <span className="flex items-center gap-1 text-[10px] font-medium text-gray-400">
                                                        <Clock size={10}/> {lesson.startTime}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs text-gray-400 truncate">
                                                {lesson.type === 'online' ? <Video size={12}/> : <MapPin size={12}/>}
                                                <span className="truncate">
                                                    {lesson.type === 'online' ? 'Online Meeting' : (lesson.location || 'Center Location')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="self-center">
                                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-[#FF4667] group-hover:text-white transition-colors">
                                            <ChevronRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 text-gray-300">
                        <Coffee size={24} />
                    </div>
                    <p className="text-sm font-bold text-gray-900">No sessions scheduled for today</p>
                    <p className="text-xs text-gray-500">Enjoy your day off or prepare for upcoming classes.</p>
                </div>
            )}
        </div>
      </div>

      <div>
         <TeacherAnalytics data={dashboardData?.data} view="all" />
      </div>

    </div>
  );
}