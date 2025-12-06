'use client';

import { useState } from 'react';

export default function WeeklyView({ classes }) {
    const [currentWeek, setCurrentWeek] = useState(new Date());

    const daysOfWeek = [];
    const startOfWeek = new Date(currentWeek);
    startOfWeek.setDate(currentWeek.getDate() - currentWeek.getDay());

    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        daysOfWeek.push(day);
    }

    const getClassesForDay = (date) => {
        const dateStr = date.toISOString().split('T')[0];
        return classes.filter(cls => cls.date === dateStr);
    };

    const formatDay = (date) => {
        const today = new Date();
        const isToday = date.toDateString() === today.toDateString();

        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = dayNames[date.getDay()];

        return {
            name: dayName,
            number: date.getDate(),
            isToday: isToday
        };
    };

    const handlePrevWeek = () => {
        const newWeek = new Date(currentWeek);
        newWeek.setDate(currentWeek.getDate() - 7);
        setCurrentWeek(newWeek);
    };

    const handleNextWeek = () => {
        const newWeek = new Date(currentWeek);
        newWeek.setDate(currentWeek.getDate() + 7);
        setCurrentWeek(newWeek);
    };

    const handleThisWeek = () => {
        setCurrentWeek(new Date());
    };

    return (
        <div>
            {/* Week Controls */}
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={handlePrevWeek}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                    ← Previous Week
                </button>

                <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-semibold">Current Week</h3>
                    <button
                        onClick={handleThisWeek}
                        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
                    >
                        This Week
                    </button>
                </div>

                <button
                    onClick={handleNextWeek}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                    Next Week →
                </button>
            </div>

            {/* Week View */}
            <div className="grid grid-cols-7 gap-2">
                {daysOfWeek.map(day => {
                    const dayInfo = formatDay(day);
                    const dayClasses = getClassesForDay(day);

                    return (
                        <div
                            key={day.toISOString()}
                            className={`border rounded-lg p-3 ${dayInfo.isToday ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                        >
                            {/* Day Header */}
                            <div className={`text-center mb-3 ${dayInfo.isToday ? 'text-primary font-bold' : 'text-gray-700'}`}>
                                <div className="text-sm">{dayInfo.name}</div>
                                <div className="text-lg">{dayInfo.number}</div>
                            </div>

                            {/* Day's Classes */}
                            <div className="space-y-2">
                                {dayClasses.length === 0 ? (
                                    <p className="text-sm text-gray-400 text-center">No classes</p>
                                ) : (
                                    dayClasses.map(cls => (
                                        <div
                                            key={cls.id}
                                            className={`p-2 rounded text-xs ${cls.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                cls.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}
                                        >
                                            <div className="font-medium">{cls.subject}</div>
                                            <div className="text-xs opacity-75">{cls.startTime}</div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Day Summary */}
                            {dayClasses.length > 0 && (
                                <div className="mt-3 pt-2 border-t border-gray-200">
                                    <div className="flex justify-between text-xs text-gray-600">
                                        <span>Class Count:</span>
                                        <span className="font-semibold">{dayClasses.length}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Week Summary */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">Week Summary</h4>
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <div className="text-2xl font-bold text-gray-800">
                            {classes.filter(c =>
                                daysOfWeek.some(day =>
                                    c.date === day.toISOString().split('T')[0]
                                )
                            ).length}
                        </div>
                        <div className="text-sm text-gray-600">Total Classes</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-green-600">
                            {classes.filter(c =>
                                daysOfWeek.some(day =>
                                    c.date === day.toISOString().split('T')[0] && c.status === 'completed'
                                )
                            ).length}
                        </div>
                        <div className="text-sm text-gray-600">Completed</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-blue-600">
                            {classes.filter(c =>
                                daysOfWeek.some(day =>
                                    c.date === day.toISOString().split('T')[0] && c.status === 'upcoming'
                                )
                            ).length}
                        </div>
                        <div className="text-sm text-gray-600">Upcoming</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-yellow-600">
                            {classes.filter(c =>
                                daysOfWeek.some(day =>
                                    c.date === day.toISOString().split('T')[0] && c.status === 'scheduled'
                                )
                            ).length}
                        </div>
                        <div className="text-sm text-gray-600">Scheduled</div>
                    </div>
                </div>
            </div>
        </div>
    );
}