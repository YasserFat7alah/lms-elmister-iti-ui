// components/schedule/WeeklySchedule.jsx
"use client";

import { useState, useEffect } from 'react';
import { BookOpen, Users, Video, Building, Clock, MoreVertical } from 'lucide-react';

export default function WeeklySchedule({ currentDate, selectedDate, setSelectedDate, filter, role }) {
  const [weekDays, setWeekDays] = useState([]);
  
  useEffect(() => {
    if (!currentDate) return;
    
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    
    setWeekDays(days);
  }, [currentDate]);

  // بيانات الحصص والدروس (من قاعدة البيانات)
  const scheduleData = {
    // الاثنين
    15: [
      { 
        id: 'lesson_001',
        type: 'course',
        title: 'الرياضيات المتقدمة',
        time: '10:00 - 12:00',
        courseType: 'online',
        teacher: 'د. أحمد علي',
        students: 24,
        room: 'Virtual'
      },
      { 
        id: 'meeting_001',
        type: 'meeting',
        title: 'اجتماع فريق المعلمين',
        time: '14:00 - 15:00',
        location: 'قاعة الاجتماعات',
        participants: 8
      }
    ],
    // الثلاثاء
    16: [
      { 
        id: 'lesson_002',
        type: 'lesson',
        title: 'حل تمارين الفصل الثاني',
        time: '09:00 - 11:00',
        course: 'الفيزياء العملية',
        status: 'upcoming'
      },
      { 
        id: 'assignment_001',
        type: 'assignment',
        title: 'تسليم مشروع التخرج',
        time: '23:59',
        course: 'مشروع التخرج',
        status: 'due_today'
      }
    ],
    // الأربعاء
    17: [
      { 
        id: 'course_002',
        type: 'course',
        title: 'الفيزياء العملية',
        time: '14:00 - 16:00',
        courseType: 'offline',
        teacher: 'د. سارة محمد',
        students: 18,
        room: 'المعمل 3'
      }
    ],
    // الخميس
    18: [
      { 
        id: 'workshop_001',
        type: 'workshop',
        title: 'ورشة برمجة Python',
        time: '11:00 - 13:00',
        instructor: 'م. خالد حسن',
        capacity: 30
      }
    ],
    // الجمعة
    19: [
      { 
        id: 'office_hours',
        type: 'office_hours',
        title: 'ساعات مكتبية',
        time: '10:00 - 12:00',
        description: 'استفسارات ومراجعات'
      }
    ]
  };

  const getEventColor = (type) => {
    const colors = {
      course: 'bg-blue-50 border-blue-200 text-blue-800',
      lesson: 'bg-green-50 border-green-200 text-green-800',
      assignment: 'bg-orange-50 border-orange-200 text-orange-800',
      meeting: 'bg-purple-50 border-purple-200 text-purple-800',
      workshop: 'bg-pink-50 border-pink-200 text-pink-800',
      office_hours: 'bg-indigo-50 border-indigo-200 text-indigo-800'
    };
    return colors[type] || 'bg-gray-50 border-gray-200 text-gray-800';
  };

  const getEventIcon = (type) => {
    const icons = {
      course: <BookOpen size={14} />,
      lesson: <BookOpen size={14} />,
      assignment: <Clock size={14} />,
      meeting: <Users size={14} />,
      workshop: <Video size={14} />,
      office_hours: <Building size={14} />
    };
    return icons[type] || <BookOpen size={14} />;
  };

  const filterEvents = (events) => {
    if (!events) return [];
    if (filter === 'all') return events;
    return events.filter(event => event.type === filter || 
      (filter === 'courses' && ['course', 'lesson'].includes(event.type)));
  };

  const arabicDays = ['الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-right p-3 text-gray-500 font-medium">اليوم</th>
            {arabicDays.map((day, index) => (
              <th key={index} className="text-center p-3">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium text-gray-700">{day}</span>
                  {weekDays[index] && (
                    <button
                      onClick={() => setSelectedDate(weekDays[index])}
                      className={`w-10 h-10 rounded-full flex items-center justify-center mt-1 ${
                        weekDays[index].getDate() === new Date().getDate() && 
                        weekDays[index].getMonth() === new Date().getMonth()
                          ? 'bg-blue-600 text-white' 
                          : weekDays[index].getDate() === selectedDate.getDate() && 
                            weekDays[index].getMonth() === selectedDate.getMonth()
                            ? 'bg-blue-100 text-blue-600 border border-blue-300' 
                            : 'hover:bg-gray-100 border border-transparent'
                      }`}
                    >
                      {weekDays[index].getDate()}
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 8 }).map((_, timeSlot) => (
            <tr key={timeSlot} className="border-b border-gray-100">
              <td className="p-3 text-gray-500 font-medium text-right align-top">
                <div className="text-sm">
                  {8 + timeSlot}:00
                </div>
              </td>
              {weekDays.map((day, dayIndex) => {
                const dayNumber = day.getDate();
                const events = scheduleData[dayNumber] || [];
                const filteredEvents = filterEvents(events);
                const timeSlotEvents = filteredEvents.filter(event => {
                  const eventHour = parseInt(event.time.split(':')[0]);
                  return eventHour >= (8 + timeSlot) && eventHour < (9 + timeSlot);
                });

                return (
                  <td key={dayIndex} className="align-top p-2 border-l border-gray-100">
                    <div className="min-h-20">
                      <div className="space-y-1">
                        {timeSlotEvents.map((event, eventIndex) => (
                          <div 
                            key={eventIndex}
                            className={`text-xs p-2 rounded border ${getEventColor(event.type)}`}
                          >
                            <div className="flex items-start justify-between mb-1">
                              <div className="flex items-center gap-1">
                                {getEventIcon(event.type)}
                                <span className="font-medium truncate">{event.time}</span>
                              </div>
                              <button className="text-gray-500 hover:text-gray-700">
                                <MoreVertical size={12} />
                              </button>
                            </div>
                            <div className="font-semibold mb-1 truncate">{event.title}</div>
                            {event.courseType && (
                              <div className="flex items-center gap-1 text-[10px]">
                                {event.courseType === 'online' ? '🖥️ أونلاين' : '🏫 حضور'}
                                {event.students && (
                                  <span className="flex items-center gap-1">
                                    <Users size={10} />
                                    {event.students}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}