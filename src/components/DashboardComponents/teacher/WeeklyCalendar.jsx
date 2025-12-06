// app/schedule/components/WeeklyCalendar.jsx - نسخة محسنة
"use client";

import { useState, useEffect } from 'react';

export default function WeeklyCalendar({ currentDate, selectedDate, setSelectedDate }) {
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

  const isToday = (date) => {
    if (!date || !(date instanceof Date)) return false;
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date.getDate() === selectedDate.getDate() && 
           date.getMonth() === selectedDate.getMonth() && 
           date.getFullYear() === selectedDate.getFullYear();
  };

  // بيانات المهام الواقعية مع معلومات أكثر
  const tasks = {
    7: [
      { time: "09:00", title: "اجتماع فريق الصباح", type: "meeting", duration: "1h", priority: "high" },
      { time: "14:00", title: "مكالمة مع المورد", type: "call", duration: "30m", priority: "medium" }
    ],
    8: [
      { time: "10:30", title: "عرض تقديمي للعملاء", type: "presentation", duration: "1.5h", priority: "high" },
      { time: "16:00", title: "مراجعة التصميم", type: "review", duration: "1h", priority: "medium" }
    ],
    9: [
      { time: "11:15", title: "تدريب فريق المبيعات", type: "training", duration: "2h", priority: "high" }
    ],
    11: [
      { time: "09:00", title: "زيارة موقع المشروع", type: "visit", duration: "3h", priority: "high" },
      { time: "15:00", title: "اجتماع تنسيقي", type: "meeting", duration: "1h", priority: "medium" }
    ],
    13: [
      { time: "13:00", title: "غداء عمل", type: "lunch", duration: "1.5h", priority: "low" },
      { time: "16:45", title: "مكالمة دولية", type: "call", duration: "45m", priority: "high" }
    ],
    14: [
      { time: "10:00", title: "مراجعة الربع السنوي", type: "review", duration: "2h", priority: "high" }
    ],
    16: [
      { time: "15:30", title: "عرض منتج جديد", type: "demo", duration: "1h", priority: "medium" }
    ],
    18: [
      { time: "12:00", title: "اجتماع إدارة", type: "meeting", duration: "2h", priority: "high" }
    ],
  };

  const getTypeColor = (type) => {
    const colors = {
      meeting: 'bg-blue-100 text-blue-800 border-blue-200 print:bg-blue-50 print:border-blue-100',
      call: 'bg-green-100 text-green-800 border-green-200 print:bg-green-50 print:border-green-100',
      review: 'bg-purple-100 text-purple-800 border-purple-200 print:bg-purple-50 print:border-purple-100',
      training: 'bg-yellow-100 text-yellow-800 border-yellow-200 print:bg-yellow-50 print:border-yellow-100',
      visit: 'bg-red-100 text-red-800 border-red-200 print:bg-red-50 print:border-red-100',
      lunch: 'bg-orange-100 text-orange-800 border-orange-200 print:bg-orange-50 print:border-orange-100',
      demo: 'bg-indigo-100 text-indigo-800 border-indigo-200 print:bg-indigo-50 print:border-indigo-100',
      presentation: 'bg-pink-100 text-pink-800 border-pink-200 print:bg-pink-50 print:border-pink-100'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200 print:bg-gray-50 print:border-gray-100';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'border-l-4 border-l-red-500',
      medium: 'border-l-4 border-l-yellow-500',
      low: 'border-l-4 border-l-green-500'
    };
    return colors[priority] || '';
  };

  const arabicDays = ['الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'];

  return (
    <div className="overflow-x-auto print:overflow-visible">
      <table className="w-full border-collapse print:border">
        <thead>
          <tr className="border-b border-gray-200 print:border-b-2">
            <th className="text-right p-3 text-gray-500 font-medium print:font-bold print:text-black">
              <div className="print:hidden">شهرياً</div>
              <div className="hidden print:block">الأسبوع</div>
            </th>
            {arabicDays.map((day, index) => (
              <th key={index} className="text-center p-3 print:p-2">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium text-gray-700 print:text-black print:font-bold">
                    {day}
                  </span>
                  {weekDays[index] && (
                    <button
                      onClick={() => setSelectedDate(weekDays[index])}
                      className={`w-10 h-10 rounded-full flex items-center justify-center mt-1 print:w-8 print:h-8 ${
                        isToday(weekDays[index]) 
                          ? 'bg-blue-600 text-white print:bg-blue-500' 
                          : isSelected(weekDays[index]) 
                            ? 'bg-blue-100 text-blue-600 print:bg-blue-100 print:border print:border-blue-300' 
                            : 'hover:bg-gray-100 print:border print:border-gray-300'
                      } print:pointer-events-none`}
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
          {[
            [29, 30, 1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10, 11, 12],
            [13, 14, 15, 16, 17, 18, 19],
            [20, 21, 22, 23, 24, 25, 26],
            [27, 28, 29, 30, 31, 1, 2]
          ].map((week, weekIndex) => (
            <tr key={weekIndex} className="border-b border-gray-100 print:border-b">
              <td className="p-3 text-gray-500 font-medium print:text-black print:p-2 text-right">
                <span className="print:hidden">أسبوع {weekIndex + 1}</span>
                <span className="hidden print:block">الأسبوع {weekIndex + 1}</span>
              </td>
              {week.map((day, dayIndex) => {
                const dayTasks = tasks[day] || [];
                const totalTasks = dayTasks.length;
                
                return (
                  <td key={dayIndex} className="align-top p-2 border-l border-gray-100 print:border-l print:p-1">
                    <div className="min-h-32 print:min-h-24">
                      <div className="text-center mb-1 text-gray-700 print:text-black print:font-medium">
                        {day}
                        {totalTasks > 0 && (
                          <span className="ml-1 text-xs text-gray-500 print:text-gray-700">
                            ({totalTasks})
                          </span>
                        )}
                      </div>
                      <div className="space-y-1">
                        {dayTasks.map((task, idx) => (
                          <div 
                            key={idx} 
                            className={`text-xs p-1.5 rounded border ${getTypeColor(task.type)} ${getPriorityColor(task.priority)} truncate text-right print:text-[10px] print:p-1`}
                            title={`${task.time} - ${task.title} (${task.duration})`}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-bold text-[10px] print:text-[9px]">
                                {task.priority === 'high' ? '🔥' : 
                                 task.priority === 'medium' ? '⭐' : '📌'}
                              </span>
                              <span className="font-medium">{task.time}</span>
                            </div>
                            <div className="font-medium mb-0.5">{task.title}</div>
                            <div className="text-[10px] opacity-75 print:text-[9px]">
                              {task.duration}
                            </div>
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
      
      {/* مفتاح الألوان للطباعة */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg print:mt-4 print:p-3 print:border print:border-gray-300">
        <h4 className="text-sm font-medium text-gray-700 mb-2 print:text-black print:font-bold">
          دليل أنواع المهام
        </h4>
        <div className="flex flex-wrap gap-3 print:gap-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-blue-500 print:border print:border-black"></div>
            <span className="text-xs text-gray-600 print:text-black">اجتماعات</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-green-500 print:border print:border-black"></div>
            <span className="text-xs text-gray-600 print:text-black">مكالمات</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-purple-500 print:border print:border-black"></div>
            <span className="text-xs text-gray-600 print:text-black">مراجعات</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-yellow-500 print:border print:border-black"></div>
            <span className="text-xs text-gray-600 print:text-black">تدريبات</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-red-500 print:border print:border-black"></div>
            <span className="text-xs text-gray-600 print:text-black">زيارات</span>
          </div>
        </div>
      </div>
    </div>
  );
}