// app/schedule/components/CalendarControls.jsx
"use client";

import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

export default function CalendarControls({
  viewMode,
  setViewMode,
  currentDate,
  onPrevious,
  onNext,
  onToday
}) {
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

  return (
    <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-6">
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

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevious}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            onClick={onNext}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronRight size={20} />
          </button>
          
          <span className="ml-2 text-lg font-medium text-gray-800">
            {viewMode === 'week' 
              ? `أسبوع ${currentDate.toLocaleDateString('ar-SA', { month: 'long', year: 'numeric' })}`
              : currentDate.toLocaleDateString('ar-SA', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
            }
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600">
          <CalendarIcon size={18} />
          <span>التوقيت: توقيت مكة المكرمة (GMT+3)</span>
        </div>
      </div>
    </div>
  );
}