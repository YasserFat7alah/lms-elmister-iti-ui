// components/schedule/DailySchedule.jsx
"use client";

import { Clock, Users, MapPin, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function DailySchedule({ selectedDate, role }) {
  const [expandedEvent, setExpandedEvent] = useState(null);

  // بيانات اليوم
  const dailyEvents = [
    {
      id: 'event_1',
      type: 'course',
      title: 'الرياضيات المتقدمة',
      time: '10:00 - 12:00',
      description: 'مراجعة الفصل الثالث - التفاضل والتكامل',
      instructor: 'د. أحمد علي',
      location: 'Virtual - رابط Zoom',
      students: 24,
      status: 'live',
      resources: 3
    },
    {
      id: 'event_2',
      type: 'assignment',
      title: 'تسليم مشروع التخرج',
      time: '23:59',
      description: 'آخر موعد لتسليم المشروع النهائي',
      course: 'مشروع التخرج',
      status: 'due_today',
      submitted: role === 'student' ? true : false
    },
    {
      id: 'event_3',
      type: 'meeting',
      title: 'اجتماع فريق المعلمين',
      time: '14:00 - 15:00',
      description: 'مناقشة خطط الفصل الدراسي الجديد',
      location: 'قاعة الاجتماعات الرئيسية',
      participants: 8,
      agenda: 'خطة الفصل الدراسي'
    },
    {
      id: 'event_4',
      type: 'office_hours',
      title: 'ساعات مكتبية',
      time: '16:00 - 18:00',
      description: 'استفسارات ومراجعات فردية',
      instructor: 'د. سارة محمد',
      location: 'مكتب 205'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'live': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'due_today': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'live': return <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>;
      case 'due_today': return <AlertCircle size={14} />;
      case 'completed': return <CheckCircle size={14} />;
      default: return <Clock size={14} />;
    }
  };

  const toggleExpand = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  return (
    <div className="space-y-4">
      {dailyEvents.map((event) => (
        <div 
          key={event.id}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${getStatusColor(event.status)}`}>
                  {getStatusIcon(event.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(event.status)}`}>
                      {event.status === 'live' ? '🔴 مباشر' : 
                       event.status === 'due_today' ? '📝 مستحق اليوم' : 
                       event.status === 'completed' ? '✅ مكتمل' : '⏳ قادم'}
                    </span>
                    <span className="font-bold text-gray-800 flex items-center gap-1">
                      <Clock size={14} />
                      {event.time}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{event.title}</h4>
                  
                  <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    {event.instructor && (
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>{event.instructor}</span>
                      </div>
                    )}
                    
                    {event.location && (
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{event.location}</span>
                      </div>
                    )}
                    
                    {event.students && (
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>{event.students} طالب</span>
                      </div>
                    )}
                    
                    {event.resources && (
                      <div className="flex items-center gap-1">
                        <BookOpen size={14} />
                        <span>{event.resources} مصدر</span>
                      </div>
                    )}
                  </div>
                  
                  {expandedEvent === event.id && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <h5 className="font-medium text-gray-800 mb-2">تفاصيل إضافية:</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {event.agenda && <li>📋 جدول الأعمال: {event.agenda}</li>}
                        {event.course && <li>📚 الكورس: {event.course}</li>}
                        {role === 'student' && event.submitted !== undefined && (
                          <li>{event.submitted ? '✅ تم التسليم' : '⏳ لم يتم التسليم بعد'}</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <button
                onClick={() => toggleExpand(event.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                {expandedEvent === event.id ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}
              </button>
              
              {event.status === 'live' && (
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                  انضم الآن
                </button>
              )}
              
              {event.status === 'due_today' && role === 'student' && !event.submitted && (
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                  تسليم المهمة
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
      
      {dailyEvents.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Clock size={48} className="mx-auto mb-4 text-gray-300" />
          <p>لا توجد فعاليات مخططة لهذا اليوم</p>
        </div>
      )}
    </div>
  );
}