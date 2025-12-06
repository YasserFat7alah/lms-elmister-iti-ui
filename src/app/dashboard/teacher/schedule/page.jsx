import Link from 'next/link';
import ScheduleOverview from '@/components/schedule/ScheduleOverview';
import QuickActions from '@/components/schedule/QuickActions';
import UpcomingClasses from '@/components/schedule/UpcomingClasses';

export const metadata = {
    title: 'Schedule - Overview',
    description: 'Complete overview of class schedule',
};

export default function SchedulePage() {
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-primary">Schedule</h1>
                <Link
                    href="/schedule/create"
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
                >
                    + Schedule New Class
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Section - Quick Actions & Upcoming Classes */}
                <div className="lg:col-span-1 space-y-6">
                    <QuickActions />
                    <UpcomingClasses limit={5} />
                </div>

                {/* Main Section - Overview */}
                <div className="lg:col-span-2">
                    <ScheduleOverview />
                </div>
            </div>
        </div>
    );
}