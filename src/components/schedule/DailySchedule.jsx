'use client';

import { useState } from 'react';

export default function DailySchedule({ classes, date }) {
    const [selectedClass, setSelectedClass] = useState(null);

    // Time slots from 8 AM to 4 PM
    const timeSlots = [];
    for (let hour = 8; hour <= 16; hour++) {
        timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getClassAtTime = (time) => {
        return classes.find(cls => {
            const classStart = parseInt(cls.startTime.split(':')[0]);
            const slotHour = parseInt(time.split(':')[0]);
            return classStart === slotHour;
        });
    };

    const getStatusColor = (status) => {
        const colors = {
            completed: 'border-green-500 bg-green-50',
            upcoming: 'border-blue-500 bg-blue-50',
            scheduled: 'border-yellow-500 bg-yellow-50',
            cancelled: 'border-red-500 bg-red-50'
        };
        return colors[status] || 'border-gray-300 bg-gray-50';
    };

    return (
        <div>
            {/* Day Header */}
            <div className="bg-primary text-white p-4 rounded-t-lg">
                <h2 className="text-xl font-bold">Schedule for {formatDate(date)}</h2>
                <p className="text-sm opacity-90">
                    {classes.length} classes scheduled for this day
                </p>
            </div>

            {/* Schedule Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="p-3 text-left border-b">Time</th>
                            <th className="p-3 text-left border-b">Class</th>
                            <th className="p-3 text-left border-b">Teacher</th>
                            <th className="p-3 text-left border-b">Grade</th>
                            <th className="p-3 text-left border-b">Status</th>
                            <th className="p-3 text-left border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timeSlots.map(time => {
                            const classItem = getClassAtTime(time);

                            return (
                                <tr
                                    key={time}
                                    className={`border-b hover:bg-gray-50 ${classItem ? getStatusColor(classItem.status) : ''}`}
                                >
                                    <td className="p-3">
                                        <div className="font-semibold">{time}</div>
                                    </td>

                                    {classItem ? (
                                        <>
                                            <td className="p-3">
                                                <div className="font-semibold">{classItem.subject}</div>
                                                <div className="text-sm text-gray-600">
                                                    {classItem.startTime} - {classItem.endTime}
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                                                        👨‍🏫
                                                    </div>
                                                    <span>{classItem.teacher}</span>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                                                    {classItem.grade}
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 rounded-full text-xs ${classItem.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    classItem.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                                                        classItem.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
                                                    }`}>
                                                    {classItem.status === 'completed' ? 'Completed' :
                                                        classItem.status === 'upcoming' ? 'Upcoming' :
                                                            classItem.status === 'scheduled' ? 'Scheduled' : 'Cancelled'}
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                <div className="flex space-x-2">
                                                    {classItem.status === 'upcoming' && (
                                                        <button className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary-dark">
                                                            Start
                                                        </button>
                                                    )}
                                                    <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300">
                                                        Details
                                                    </button>
                                                </div>
                                            </td>
                                        </>
                                    ) : (
                                        <td colSpan="5" className="p-3 text-center text-gray-400">
                                            No class at this time
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Day Summary */}
            <div className="bg-gray-50 p-4 border-t">
                <h3 className="font-semibold text-gray-700 mb-2">Day Summary:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{classes.length}</div>
                        <div className="text-sm text-gray-600">Total Classes</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                            {classes.filter(c => c.status === 'completed').length}
                        </div>
                        <div className="text-sm text-gray-600">Completed</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">
                            {classes.filter(c => c.status === 'upcoming' || c.status === 'scheduled').length}
                        </div>
                        <div className="text-sm text-gray-600">Remaining</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                            {classes.filter(c => c.status === 'cancelled').length}
                        </div>
                        <div className="text-sm text-gray-600">Cancelled</div>
                    </div>
                </div>
            </div>
        </div>
    );
}