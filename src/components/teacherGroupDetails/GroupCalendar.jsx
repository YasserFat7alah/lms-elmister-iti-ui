"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import { format, isSameDay, parseISO } from "date-fns";
import { MapPin, Video, Clock } from "lucide-react";
import Link from "next/link";
import 'react-calendar/dist/Calendar.css';
import './custom-calendar.css';

export default function GroupCalendar({ lessons = [], groupId }) {
  const [date, setDate] = useState(new Date());

  const selectedDayLessons = lessons.filter(lesson =>
    lesson.date && isSameDay(parseISO(lesson.date), date)
  );

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const hasLesson = lessons.some(lesson => lesson.date && isSameDay(parseISO(lesson.date), date));
      if (hasLesson) {
        return <div className="h-1.5 w-1.5 bg-[#FF4667] rounded-full mx-auto mt-1"></div>;
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm">
      <h3 className="font-semibold mb-4 text-gray-700">Calendar View</h3>

      <div className="calendar-container flex justify-center mb-6">
        <Calendar
          onChange={setDate}
          value={date}
          tileContent={tileContent}
          className="border-none shadow-none text-sm w-full font-sans"
        />
      </div>

      <div className="border-t pt-4">
        <h4 className="text-sm font-bold text-gray-500 mb-3">
          Sessions on {format(date, "MMMM do, yyyy")}
        </h4>

        <div className="space-y-3">
          {selectedDayLessons.length > 0 ? (
            selectedDayLessons.map(lesson => (
              <Link
                href={`/dashboard/teacher/groups/${groupId}/lessons/${lesson._id}`}
                key={lesson._id}
                className="block"
              >
                <div className="flex items-center justify-between p-3 rounded-xl bg-pink-50 border border-pink-100 hover:bg-pink-100 transition cursor-pointer">
                  <div>
                    <h5 className="font-bold text-gray-800 text-sm">{lesson.title}</h5>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <Clock size={12} /> {lesson.startTime} - {lesson.endTime}
                    </div>
                  </div>
                  <div className={`p-2 rounded-full ${lesson.type === 'online' ? 'bg-blue-100 text-blue-600' : 'bg-white text-[#FF4667]'}`}>
                    {lesson.type === 'online' ? <Video size={14} /> : <MapPin size={14} />}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-6 text-gray-400 text-sm">
              No sessions scheduled for this day.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}