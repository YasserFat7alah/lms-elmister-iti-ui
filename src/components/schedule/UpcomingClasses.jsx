'use client';

import { useUpcomingClasses } from '@/hooks/useClasses';
import { useRouter } from 'next/navigation';

export default function UpcomingClasses({ limit = 3 }) {
    const { classes, isLoading } = useUpcomingClasses();
    const router = useRouter();

    const upcomingClasses = classes.slice(0, limit);

    const formatTime = (date, time) => {
        const classDateTime = new Date(`${date}T${time}`);
        const now = new Date();
        const diffHours = Math.floor((classDateTime - now) / (1000 * 60 * 60));

        if (diffHours < 24) {
            return `in ${diffHours} hours`;
        } else {
            const diffDays = Math.floor(diffHours / 24);
            return `in ${diffDays} days`;
        }
    };

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">Upcoming Classes</h2>
                <button
                    onClick={() => router.push('/schedule/upcoming')}
                    className="text-primary text-sm hover:underline"
                >
                    View All
                </button>
            </div>

            {upcomingClasses.length === 0 ? (
                <div className="text-center py-6">
                    <p className="text-gray-500">No upcoming classes</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {upcomingClasses.map(cls => (
                        <div
                            key={cls.id}
                            className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition"
                            onClick={() => router.push(`/schedule/class/${cls.id}`)}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-semibold text-gray-800">{cls.subject}</h3>
                                    <p className="text-sm text-gray-600">{cls.grade}</p>
                                </div>
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                    {formatTime(cls.date, cls.startTime)}
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-sm text-gray-600">
                                <div className="flex items-center">
                                    <span className="mr-2">👨‍🏫</span>
                                    <span>{cls.teacher}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-2">⏰</span>
                                    <span>{cls.startTime}</span>
                                </div>
                            </div>

                            <div className="mt-2 pt-2 border-t border-gray-100">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500">
                                        {cls.studentsCount} Students Enrolled
                                    </span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Start class
                                            console.log('Start class:', cls.id);
                                        }}
                                        className="text-xs bg-primary text-white px-3 py-1 rounded hover:bg-primary-dark"
                                    >
                                        Start Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Note */}
            <div className="mt-4 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                    {upcomingClasses.length} upcoming classes of {classes.length}
                </p>
            </div>
        </div>
    );
}