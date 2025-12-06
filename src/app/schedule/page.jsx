// app/dashboard/schedule/page.js
"use client";

import { useState, useEffect } from 'react';
import { Calendar, Clock, Users, BookOpen, Bell, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import WeeklySchedule from '@/components/DashboardComponents/teacher/WeeklyCalendar';
import DailySchedule from '@/components/DashboardComponents/teacher/DailySchedule';
import ScheduleControls from '@/components/DashboardComponents/teacher/ScheduleControls';
import UpcomingClasses from '@/components/DashboardComponents/teacher/UpcomingClasses';
import TeacherStats from '@/components/DashboardComponents/teacher/TeacherStats';
import StudentMoodTracker from '@/components/DashboardComponents/teacher/StudentMoodTracker';
// import { useAuth } from '@/contexts/AuthContext';

export default function SchedulePage() {
  const { user } =  "student"//useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState('all'); // all, courses, lessons, assignments
  const [role, setRole] = useState('teacher'); // teacher or student

  useEffect(() => {
    if (user) {
      setRole(user.role);
    }
  }, [user]);

  // بيانات افتراضية للمعلم
  const teacherStats = {
    totalCourses: 8,
    activeStudents: 42,
    totalEnrollments: 56,
    revenue: { total: 12500, thisMonth: 3200 },
    occupancyRate: 85
  };

  // بيانات افتراضية للطالب
  const studentStats = {
    enrolledCourses: 4,
    completedLessons: 18,
    upcomingAssignments: 3,
    averageProgress: 75
  };

  const upcomingClasses = [
    {
      id: 'course_001',
      title: 'الرياضيات المتقدمة',
      type: 'online',
      time: '10:00 - 12:00',
      date: new Date(Date.now() + 86400000), // غداً
      studentsCount: 24,
      teacher: 'د. أحمد علي'
    },
    {
      id: 'course_002',
      title: 'الفيزياء العملية',
      type: 'offline',
      time: '14:00 - 16:00',
      date: new Date(Date.now() + 2 * 86400000),
      studentsCount: 18,
      teacher: 'د. سارة محمد'
    }
  ];

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* العنوان الرئيسي */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-2">
                <Calendar className="text-blue-600" size={32} />
                {role === 'teacher' ? 'جدول الحصص' : 'جدول الدروس'}
              </h1>
              <p className="text-gray-600 mt-2">
                {role === 'teacher' 
                  ? 'إدارة وجدولة الحصص والدروس' 
                  : 'متابعة جدول دروسك وأنشطتك'
                }
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                <Users size={18} className="text-blue-600" />
                <span className="font-medium">
                  {role === 'teacher' ? 'معلم' : 'طالب'}
                </span>
              </div>
              
              <button className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50">
                <Bell size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* الإحصائيات السريعة */}
        {role === 'teacher' ? (
          <TeacherStats stats={teacherStats} />
        ) : (
          <div className="mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={20} className="text-blue-600" />
                  <span className="text-sm text-gray-600">الكورسات المسجلة</span>
                </div>
                <div className="text-2xl font-bold text-gray-800">{studentStats.enrolledCourses}</div>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={20} className="text-green-600" />
                  <span className="text-sm text-gray-600">الدروس المكتملة</span>
                </div>
                <div className="text-2xl font-bold text-gray-800">{studentStats.completedLessons}</div>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-sm text-gray-600 mb-2">متوسط التقدم</div>
                <div className="text-2xl font-bold text-gray-800">{studentStats.averageProgress}%</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${studentStats.averageProgress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <div className="text-sm text-gray-600 mb-2">المهام القادمة</div>
                <div className="text-2xl font-bold text-orange-600">{studentStats.upcomingAssignments}</div>
              </div>
            </div>
          </div>
        )}

        {/* أدوات التحكم والتصفية */}
        <ScheduleControls
          viewMode={viewMode}
          setViewMode={setViewMode}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          selectedDate={selectedDate}
          onToday={handleToday}
          filter={filter}
          onFilterChange={handleFilterChange}
          role={role}
        />

        {/* المحتوى الرئيسي */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* الجدول الأسبوعي */}
          <div className={`${viewMode === 'week' ? 'lg:col-span-2' : 'lg:col-span-1'}`}>
            <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Calendar size={20} className="text-blue-600" />
                  {viewMode === 'week' ? 'الجدول الأسبوعي' : 'نظرة سريعة'}
                </h3>
                <p className="text-sm text-gray-600">
                  {role === 'teacher' 
                    ? 'جميع حصصك وأنشطتك' 
                    : 'دروسك وأنشطتك الأسبوعية'
                  }
                </p>
              </div>
              <div className="p-2 md:p-4">
                <WeeklySchedule 
                  currentDate={currentDate}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  filter={filter}
                  role={role}
                />
              </div>
            </div>
          </div>

          {/* الجانب الأيمن */}
          <div className="space-y-6">
            {/* الجدول اليومي */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Clock size={20} className="text-green-600" />
                  اليوم
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedDate.toLocaleDateString('ar-SA', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div className="p-2 md:p-4">
                <DailySchedule 
                  selectedDate={selectedDate}
                  role={role}
                />
              </div>
            </div>

            {/* الحصص القادمة */}
            <UpcomingClasses classes={upcomingClasses} role={role} />

            {/* تتبع الحالة المزاجية للطلاب (للمعلم فقط) */}
            {role === 'teacher' && (
              <StudentMoodTracker />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}