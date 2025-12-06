'use client';

import { useState } from 'react';
import { useClasses } from '@/hooks/useClasses';
import WeeklyView from './WeeklyView';
import StatisticsChart from './StatisticsChart';

export default function ScheduleOverview() {
    const { classes, isLoading } = useClasses();
    const [viewMode, setViewMode] = useState('weekly'); // 'weekly' or 'statistics'

    // Quick Stats
    const stats = {
        total: classes.length,
        completed: classes.filter(c => c.status === 'completed').length,
        upcoming: classes.filter(c => c.status === 'upcoming').length,
        thisWeek: classes.filter(c => {
            const classDate = new Date(c.date);
            const today = new Date();
            const nextWeek = new Date(today);
            nextWeek.setDate(today.getDate() + 7);
            return classDate >= today && classDate <= nextWeek;
        }).length
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow">
            {/* Header */}
            <div className="border-b border-gray-200 p-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Schedule Overview</h2>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setViewMode('weekly')}
                            className={`px-4 py-2 rounded-lg ${viewMode === 'weekly' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                            Weekly
                        </button>
                        <button
                            onClick={() => setViewMode('statistics')}
                            className={`px-4 py-2 rounded-lg ${viewMode === 'statistics' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                        >
                            Statistics
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border-b">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center">
                        <div className="bg-blue-100 p-3 rounded-full mr-3">
                            <span className="text-blue-600 text-xl">📚</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total Classes</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center">
                        <div className="bg-green-100 p-3 rounded-full mr-3">
                            <span className="text-green-600 text-xl">✅</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Completed</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.completed}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex items-center">
                        <div className="bg-yellow-100 p-3 rounded-full mr-3">
                            <span className="text-yellow-600 text-xl">⏰</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Upcoming</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.upcoming}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center">
                        <div className="bg-purple-100 p-3 rounded-full mr-3">
                            <span className="text-purple-600 text-xl">📅</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">This Week</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.thisWeek}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-4">
                {viewMode === 'weekly' ? (
                    <WeeklyView classes={classes} />
                ) : (
                    <StatisticsChart classes={classes} />
                )}
            </div>

            {/* Important Alerts */}
            <div className="bg-gray-50 border-t border-gray-200 p-4">
                <h3 className="font-semibold text-gray-700 mb-2">Important Alerts:</h3>
                <ul className="space-y-1">
                    {classes
                        .filter(c => c.status === 'upcoming')
                        .slice(0, 3)
                        .map(cls => (
                            <li key={cls.id} className="flex items-center text-sm text-gray-600">
                                <span className="mr-2">🔔</span>
                                <span>{cls.subject} - {cls.grade} on {cls.date} at {cls.startTime}</span>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}