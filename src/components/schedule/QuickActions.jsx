'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function QuickActions() {
    const router = useRouter();
    const [isCreating, setIsCreating] = useState(false);

    const actions = [
        {
            id: 1,
            title: 'Schedule Class',
            description: 'Add a new class to the schedule',
            icon: '➕',
            color: 'bg-blue-100 text-blue-600',
            onClick: () => router.push('/schedule/create')
        },
        {
            id: 2,
            title: 'View Today',
            description: 'All classes for today',
            icon: '📅',
            color: 'bg-green-100 text-green-600',
            onClick: () => router.push('/schedule/daily')
        },
        {
            id: 3,
            title: 'Calendar',
            description: 'Comprehensive calendar view',
            icon: '🗓️',
            color: 'bg-purple-100 text-purple-600',
            onClick: () => router.push('/schedule/calendar')
        },
        {
            id: 4,
            title: 'Upcoming',
            description: 'View classes in coming days',
            icon: '⏰',
            color: 'bg-yellow-100 text-yellow-600',
            onClick: () => router.push('/schedule/upcoming')
        }
    ];

    const quickStats = [
        { label: 'Classes this week', value: '12' },
        { label: 'Enrolled Students', value: '245' },
        { label: 'Active Teachers', value: '15' },
        { label: 'Attendance Rate', value: '94%' }
    ];

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>

            <div className="grid grid-cols-2 gap-3 mb-6">
                {actions.map(action => (
                    <button
                        key={action.id}
                        onClick={action.onClick}
                        className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-50 transition"
                    >
                        <div className={`p-3 rounded-full ${action.color} mb-2`}>
                            <span className="text-xl">{action.icon}</span>
                        </div>
                        <span className="font-medium text-sm text-center">{action.title}</span>
                        <span className="text-xs text-gray-500 mt-1 text-center">{action.description}</span>
                    </button>
                ))}
            </div>

            {/* Quick Stats */}
            <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-3">
                    {quickStats.map((stat, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                            <p className="text-xs text-gray-600">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Create Button */}
            <div className="mt-4">
                <button
                    onClick={() => router.push('/schedule/create')}
                    className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition flex items-center justify-center"
                >
                    <span className="mr-2">+</span>
                    <span>Schedule New Class</span>
                </button>
            </div>
        </div>
    );
}