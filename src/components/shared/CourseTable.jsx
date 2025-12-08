'use client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Clock, Video, User, Calendar as CalendarIcon, MapPin, Plus, MoreHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";
import AddEventModal from '@/components/shared/AddEventModal';

export default function WeeklySchedule() {
  const { userInfo } = useSelector((state) => state.auth);
  const role = userInfo?.user?.role; 
  const canAddEvent = role === 'admin' || role === 'teacher';
  
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);

  const scheduleData = [
    {
      id: 101,
      day: 'Saturday',
      date: '12 Oct',
      subject: 'Physics',
      group: 'Group A',
      teacher: 'Mr. Ahmed Hassan',
      time: '02:00 PM - 04:00 PM',
      type: 'center', 
      isLive: false,
    },
    {
      id: 102,
      day: 'Saturday',
      date: '12 Oct',
      subject: 'Arabic',
      group: 'Group C',
      teacher: 'Mr. Mohamed Ali',
      time: '08:00 PM - 10:00 PM',
      type: 'online',
      isLive: true, 
    },
    {
      id: 103,
      day: 'Monday',
      date: '14 Oct',
      subject: 'Mathematics',
      group: 'Group B',
      teacher: 'Mr. Yasser Fathallah',
      time: '06:00 PM - 08:00 PM',
      type: 'online',
      isLive: false,
    },
    {
        id: 104,
        day: 'Tuesday',
        date: '15 Oct',
        subject: 'English',
        group: 'Group A',
        teacher: 'Mrs. Sarah',
        time: '04:00 PM - 06:00 PM',
        type: 'center',
        isLive: false,
    },
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-6">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        

        <div className="text-left">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center justify-end gap-2">
            Weekly Schedule <CalendarIcon className="text-[#FF0055]" />
          </h1>
          <p className="text-gray-500 text-sm mt-1">
             Current Week: <span className="font-semibold text-gray-700">12 Oct - 18 Oct</span>
          </p>
        </div>


                <div>
            {canAddEvent && (
                <Button 
                    onClick={() => setIsAddEventOpen(true)}
                    className="bg-[#FF0055] hover:bg-pink-700 text-white gap-2 shadow-md"
                >
                    <Plus size={18} /> Add Event
                </Button>
            )}
        </div>

      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Day & Date</th>
                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject & Group</th>
                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Teacher</th>
                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {scheduleData.map((session) => (
                        <tr key={session.id} className="hover:bg-gray-50/50 transition-colors">
                            
                            <td className="py-4 px-6">
                                <div className="flex flex-col">
                                    <span className="font-bold text-gray-900">{session.day}</span>
                                    <span className="text-xs text-gray-500">{session.date}</span>
                                </div>
                            </td>

                            <td className="py-4 px-6">
                                <div className="flex flex-col gap-1">
                                    <span className="text-base font-bold text-gray-900 leading-none">
                                        {session.subject}
                                    </span>
                                    <span className="inline-flex w-fit items-center px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600 uppercase tracking-wide">
                                        {session.group}
                                    </span>
                                </div>
                            </td>

                            <td className="py-4 px-6">
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <Clock size={16} className="text-[#FF0055]" />
                                    {session.time}
                                </div>
                            </td>

                            <td className="py-4 px-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                        {session.teacher.charAt(4)}
                                    </div>
                                    <span className="text-sm text-gray-600">{session.teacher}</span>
                                </div>
                            </td>

                            <td className="py-4 px-6">
                                <div className="flex flex-col items-start gap-1">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
                                        ${session.type === 'online' 
                                            ? 'bg-blue-50 text-blue-700 border-blue-100' 
                                            : 'bg-pink-50 text-pink-700 border-pink-100'}`}>
                                        {session.type === 'online' ? <Video size={12} /> : <MapPin size={12} />}
                                        <span className="capitalize">{session.type}</span>
                                    </span>
                                    
                                    {session.isLive && (
                                        <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 animate-pulse ml-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                                            LIVE NOW
                                        </span>
                                    )}
                                </div>
                            </td>

                            <td className="py-4 px-6 text-right">
                                {session.isLive && session.type === 'online' ? (
                                    <Button size="sm" className="bg-gray-900 hover:bg-black text-white h-8 text-xs px-4">
                                        Join
                                    </Button>
                                ) : (
                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                                        <MoreHorizontal size={18} />
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {scheduleData.length === 0 && (
                <div className="p-12 text-center">
                    <p className="text-gray-500 text-sm">No classes scheduled for this week.</p>
                </div>
            )}
        </div>
      </div>

      <AddEventModal 
        isOpen={isAddEventOpen} 
        onClose={() => setIsAddEventOpen(false)} 
      />

    </div>
  );
}