// app/schedule/components/DailyCalendar.jsx
"use client";

import { MapPin, Users, Clock } from 'lucide-react';

export default function DailyCalendar({ selectedDate }) {
  const appointments = [
    { time: "09:00 - 10:00", title: "اجتماع فريق يومي", type: "meeting", location: "قاعة الاجتماعات أ", participants: 8 },
    { time: "10:30 - 11:30", title: "عرض للعميل", type: "presentation", location: "مكتب العميل", participants: 5 },
    { time: "12:00 - 13:00", title: "غداء مع فريق المبيعات", type: "lunch", location: "الكافتيريا الرئيسية", participants: 4 },
    { time: "14:00 - 15:30", title: "جلسة مراجعة المشروع", type: "review", location: "غرفة الاجتماعات 3", participants: 6 },
    { time: "16:00 - 17:00", title: "تدريب: برنامج جديد", type: "training", location: "مركز التدريب", participants: 12 },
    { time: "17:30 - 18:30", title: "تخطيط أسبوعي", type: "planning", location: "عن بعد", participants: 10 },
  ];

  const getTypeColor = (type) => {
    const colors = {
      meeting: 'bg-blue-100 text-blue-800',
      presentation: 'bg-purple-100 text-purple-800',
      lunch: 'bg-orange-100 text-orange-800',
      review: 'bg-green-100 text-green-800',
      training: 'bg-yellow-100 text-yellow-800',
      planning: 'bg-indigo-100 text-indigo-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const arabicDate = selectedDate.toLocaleDateString('ar-SA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div>
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{arabicDate}</h3>
            <p className="text-gray-600">عدد المواعيد: {appointments.length}</p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <Clock size={18} className="text-blue-600" />
            <span className="font-medium">عرض يومي</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {appointments.map((appointment, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-white"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  </div>
                  <div className="flex-1 text-right">
                    <div className="flex items-center gap-3 mb-2 justify-end">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(appointment.type)}`}>
                        {appointment.type === 'meeting' ? 'اجتماع' :
                         appointment.type === 'presentation' ? 'عرض' :
                         appointment.type === 'lunch' ? 'غداء' :
                         appointment.type === 'review' ? 'مراجعة' :
                         appointment.type === 'training' ? 'تدريب' :
                         appointment.type === 'planning' ? 'تخطيط' : 'موعد'}
                      </span>
                      <span className="font-bold text-gray-800">{appointment.time}</span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{appointment.title}</h4>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 justify-end">
                      <div className="flex items-center gap-1">
                        <span>{appointment.location}</span>
                        <MapPin size={16} />
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{appointment.participants} مشارك</span>
                        <Users size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  انضم
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                  تفاصيل
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ملخص اليوم */}
      <div className="mt-8 p-6 bg-gray-50 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 text-right">ملخص اليوم</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-blue-600">{appointments.length}</div>
            <div className="text-sm text-gray-600">إجمالي المواعيد</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-green-600">4س 30د</div>
            <div className="text-sm text-gray-600">المدة المجدولة</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-purple-600">3</div>
            <div className="text-sm text-gray-600">اجتماعات</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-orange-600">45</div>
            <div className="text-sm text-gray-600">إجمالي المشاركين</div>
          </div>
        </div>
      </div>
    </div>
  );
}