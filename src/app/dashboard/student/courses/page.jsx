'use client';
import React from 'react';
import { Clock, Video, User, Calendar as CalendarIcon, MapPin } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StudentWeeklySchedule() {
  
  // 1. أيام الأسبوع (ثابتة)
  const daysOfWeek = [
    { id: 'sat', name: 'Saturday', date: '12 Oct' },
    { id: 'sun', name: 'Sunday', date: '13 Oct' },
    { id: 'mon', name: 'Monday', date: '14 Oct' },
    { id: 'tue', name: 'Tuesday', date: '15 Oct' },
    { id: 'wed', name: 'Wednesday', date: '16 Oct' },
    { id: 'thu', name: 'Thursday', date: '17 Oct' },
    { id: 'fri', name: 'Friday', date: '18 Oct' },
  ];

  const scheduleData = [
    {
      id: 101,
      day: 'sat',
      subject: 'Physics',
      group: 'Group A',
      teacher: 'Mr. Ahmed Hassan',
      time: '02:00 PM - 04:00 PM',
      type: 'center', 
      isLive: false,
      color: 'bg-purple-100 text-purple-700 border-purple-200'
    },
    {
      id: 102,
      day: 'sat',
      subject: 'Arabic',
      group: 'Group C',
      teacher: 'Mr. Mohamed Ali',
      time: '08:00 PM - 10:00 PM',
      type: 'online',
      isLive: true, 
      color: 'bg-green-100 text-green-700 border-green-200'
    },
    {
      id: 103,
      day: 'mon',
      subject: 'Mathematics',
      group: 'Group B',
      teacher: 'Mr. Yasser Fathallah',
      time: '06:00 PM - 08:00 PM',
      type: 'online',
      isLive: false,
      color: 'bg-blue-100 text-blue-700 border-blue-200'
    },
    {
      id: 104,
      day: 'tue',
      subject: 'English',
      group: 'Group A',
      teacher: 'Mrs. Sarah',
      time: '04:00 PM - 06:00 PM',
      type: 'center',
      isLive: false,
      color: 'bg-orange-100 text-orange-700 border-orange-200'
    },
    {
      id: 105,
      day: 'wed',
      subject: 'Chemistry',
      group: 'Group D',
      teacher: 'Dr. Sameh',
      time: '09:00 PM - 11:00 PM',
      type: 'online',
      isLive: false,
      color: 'bg-teal-100 text-teal-700 border-teal-200'
    },
  ];

  const getSessionsForDay = (dayId) => {
    return scheduleData.filter(session => session.day === dayId);
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CalendarIcon className="text-[#FF0055]" /> My Weekly Schedule
          </h1>
          <p className="text-gray-500">View all your upcoming classes for this week</p>
        </div>
        <div className="hidden md:block">
           <span className="px-3 py-1 bg-gray-100 rounded text-sm font-medium text-gray-600">
             Current Week: 12 Oct - 18 Oct
           </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        
        {daysOfWeek.map((day) => {
          const sessions = getSessionsForDay(day.id);
          const isToday = day.id === 'sat';

          return (
            <div key={day.id} className="flex flex-col gap-3 min-w-[140px]">
              
              <div className={`text-center p-3 rounded-xl border ${isToday ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-gray-500 border-gray-200'}`}>
                <p className="font-bold text-lg">{day.name.slice(0, 3)}</p> {/* Sat, Sun... */}
                <p className={`text-xs ${isToday ? 'text-slate-300' : 'text-gray-400'}`}>{day.date}</p>
              </div>

              <div className="space-y-3 h-full">
                {sessions.length > 0 ? (
                  sessions.map((session) => (
                    <Card 
                      key={session.id} 
                      className={`border shadow-sm transition-all hover:shadow-md relative overflow-hidden ${session.isLive ? 'ring-2 ring-red-500 ring-offset-1' : ''}`}
                    >
                      {session.isLive && (
                         <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-2 py-0.5 font-bold rounded-bl-lg animate-pulse">
                           LIVE
                         </div>
                      )}

                      <CardContent className="p-3">
                        <div className={`inline-block px-2 py-1 rounded text-[10px] font-bold uppercase mb-2 ${session.color}`}>
                          {session.subject}
                        </div>

                        <div className="mb-2">
                           <h4 className="font-bold text-gray-800 text-sm leading-tight">{session.group}</h4>
                           <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                             <User size={10} /> {session.teacher.split(' ')[1]}
                           </p>
                        </div>

                        <div className="pt-2 border-t border-gray-100 mt-2 space-y-1">
                          <p className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                            <Clock size={12} className="text-[#FF0055]" />
                            {session.time.split(' - ')[0]}
                          </p>
                          
                          <p className="text-[10px] text-gray-400 flex items-center gap-1 capitalize">
                            {session.type === 'online' ? <Video size={10} /> : <MapPin size={10} />}
                            {session.type}
                          </p>
                        </div>

                        {session.isLive && session.type === 'online' && (
                          <Button className="w-full mt-3 h-7 text-xs bg-red-600 hover:bg-red-700 text-white">
                            Join Now
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="h-24 border-2 border-dashed border-gray-100 rounded-xl flex items-center justify-center">
                    <p className="text-xs text-gray-300">No classes</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}