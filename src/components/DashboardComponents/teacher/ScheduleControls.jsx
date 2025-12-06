// components/schedule/ScheduleControls.jsx
"use client";

import { ChevronLeft, ChevronRight, Filter, Calendar as CalendarIcon } from 'lucide-react';

export default function ScheduleControls({
  viewMode,
  setViewMode,
  currentDate,
  setCurrentDate,
  selectedDate,
  onToday,
  filter,
  onFilterChange,
  role
}) {
  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const formatDisplayDate = () => {
    if (viewMode === 'week') {
      const startOfWeek = new Date(currentDate);
      const day = startOfWeek.getDay();
      const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
      startOfWeek.setDate(diff);
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      return `${startOfWeek.toLocaleDateString('ar-SA', { day: 'numeric', month: 'short' })} - ${endOfWeek.toLocaleDateString('ar-SA', { day: 'numeric', month: 'short' })}`;
    } else {
      return currentDate.toLocaleDateString('ar-SA', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  const filters = [
    { id: 'all', label: 'الكل', icon: '📅' },
    { id: 'courses', label: 'الكورسات', icon: '📚' },
    { id: 'lessons', label: 'الدروس', icon: '🎯' },
    { id: 'assignments', label: 'المهام', icon: '📝' },
    ...(role === 'teacher' ? [{ id: 'meetings', label: 'الاجتماعات', icon: '👥' }] : [])
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-6">
      {/* الصف العلوي */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {viewMode === 'week' ? 'الجدول الأسبوعي' : 'الجدول اليومي'}
          </h2>
          <p className="text-gray-600">{formatDisplayDate()}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={onToday}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            اليوم
          </button>
          
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 font-medium ${viewMode === 'week' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              أسبوع
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-4 py-2 font-medium ${viewMode === 'day' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              يوم
            </button>
          </div>
        </div>
      </div>

      {/* الصف السفلي */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevious}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            onClick={handleNext}
            className="p-2 rounded-full hover:bg-gray-100 rotate-180"
          >
            <ChevronLeft size={20} />
          </button>
          
          <span className="ml-2 text-lg font-medium text-gray-800">
            {viewMode === 'week' 
              ? `أسبوع ${currentDate.toLocaleDateString('ar-SA', { month: 'long', year: 'numeric' })}`
              : currentDate.toLocaleDateString('ar-SA', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
            }
          </span>
        </div>
        
        {/* الفلاتر */}
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-600" />
          <span className="text-gray-600 font-medium">تصفية:</span>
          <div className="flex gap-1 overflow-x-auto pb-2">
            {filters.map((filterItem) => (
              <button
                key={filterItem.id}
                onClick={() => onFilterChange(filterItem.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === filterItem.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="ml-1">{filterItem.icon}</span>
                {filterItem.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}