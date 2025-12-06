'use client';

import { useState, useEffect } from 'react';
import DailySchedule from '@/components/schedule/DailySchedule';
import DateSelector from '@/components/schedule/DateSelector';
import StatsCard from '@/components/schedule/StatsCard';

export default function DailyPage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dailyStats, setDailyStats] = useState({
        totalClasses: 0,
        completed: 0,
        upcoming: 0,
        cancelled: 0
    });

    // Mock data for today
    const todaysClasses = [
        {
            id: 1,
            subject: 'Mathematics',
            grade: '10th Grade',
            startTime: '08:00',
            endTime: '09:30',
            teacher: 'Ahmed Mohamed',
            studentsCount: 25,
            status: 'completed'
        },
        {
            id: 2,
            subject: 'Science',
            grade: '9th Grade',
            startTime: '10:00',
            endTime: '11:30',
            teacher: 'Sara Ali',
            studentsCount: 30,
            status: 'upcoming'
        },
        {
            id: 3,
            subject: 'Arabic Language',
            grade: '8th Grade',
            startTime: '12:00',
            endTime: '13:30',
            teacher: 'Mohamed Khaled',
            studentsCount: 28,
            status: 'scheduled'
        }
    ];

    useEffect(() => {
        // Calculate daily statistics
        const stats = {
            totalClasses: todaysClasses.length,
            completed: todaysClasses.filter(c => c.status === 'completed').length,
            upcoming: todaysClasses.filter(c => c.status === 'upcoming').length,
            cancelled: todaysClasses.filter(c => c.status === 'cancelled').length
        };
        setDailyStats(stats);
    }, [selectedDate]);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-primary">Today's Schedule</h1>
                <DateSelector
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                />
            </div>

            {/* Quick Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <StatsCard
                    title="Total Classes"
                    value={dailyStats.totalClasses}
                    color="blue"
                    icon="📚"
                />
                <StatsCard
                    title="Completed"
                    value={dailyStats.completed}
                    color="green"
                    icon="✅"
                />
                <StatsCard
                    title="Upcoming"
                    value={dailyStats.upcoming}
                    color="yellow"
                    icon="⏰"
                />
                <StatsCard
                    title="Cancelled"
                    value={dailyStats.cancelled}
                    color="red"
                    icon="❌"
                />
            </div>

            {/* Today's Schedule */}
            <div className="bg-white rounded-lg shadow">
                <DailySchedule
                    classes={todaysClasses}
                    date={selectedDate}
                />
            </div>

            {/* Today's Notes */}
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Today's Notes</h3>
                <ul className="space-y-2">
                    <li className="flex items-center text-yellow-700">
                        <span className="mr-2">•</span>
                        Science class starts at 10:00 - Make sure materials are ready
                    </li>
                    <li className="flex items-center text-yellow-700">
                        <span className="mr-2">•</span>
                        Meeting with school administration after the last class
                    </li>
                </ul>
            </div>
        </div>
    );
}