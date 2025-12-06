// components/schedule/UpcomingClasses.jsx
"use client";

import { Calendar, Clock, Users, Video, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UpcomingClasses({ classes, role }) {
  const router = useRouter();

  const handleJoinClass = (classId) => {
    // Navigate to class page
    router.push(`/classroom/${classId}`);
  };

  const handleViewDetails = (classId) => {
    router.push(`/courses/${classId}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden" dir="ltr">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Calendar className="text-orange-600" size={20} />
          {role === 'teacher' ? 'Upcoming Classes' : 'Your Upcoming Classes'}
        </h3>
        <p className="text-sm text-gray-600">Scheduled lectures and lessons</p>
      </div>

      <div className="p-4">
        {classes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No upcoming classes</p>
          </div>
        ) : (
          <div className="space-y-4">
            {classes.map((classItem, index) => {
              const isToday = new Date(classItem.date).toDateString() === new Date().toDateString();
              const isTomorrow = new Date(classItem.date).toDateString() ===
                new Date(Date.now() + 86400000).toDateString();

              return (
                <div
                  key={classItem.id}
                  className={`p-4 rounded-lg border ${isToday
                      ? 'border-blue-200 bg-blue-50'
                      : isTomorrow
                        ? 'border-orange-200 bg-orange-50'
                        : 'border-gray-200'
                    }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">{classItem.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{classItem.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {classItem.type === 'online' ? <Video size={14} /> : <MapPin size={14} />}
                          <span>{classItem.type === 'online' ? 'Online' : 'In-Person'}</span>
                        </div>
                        {role === 'teacher' && (
                          <div className="flex items-center gap-1">
                            <Users size={14} />
                            <span>{classItem.studentsCount} Students</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`text-sm font-medium px-2 py-1 rounded ${isToday
                          ? 'bg-blue-100 text-blue-700'
                          : isTomorrow
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                        {isToday ? 'Today' : isTomorrow ? 'Tomorrow' :
                          new Date(classItem.date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(classItem.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                      </div>
                    </div>
                  </div>

                  {role === 'teacher' && (
                    <div className="text-sm text-gray-600 mb-3">
                      <span className="font-medium">Teacher:</span> {classItem.teacher}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleJoinClass(classItem.id)}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      {classItem.type === 'online' ? 'Join Class' : 'View Details'}
                    </button>

                    <button
                      onClick={() => handleViewDetails(classItem.id)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                      Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={() => router.push('/schedule/upcoming')}
            className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            View All Upcoming Classes
          </button>
        </div>
      </div>
    </div>
  );
}