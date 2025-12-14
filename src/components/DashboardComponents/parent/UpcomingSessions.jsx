"use client";
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { PiDotOutlineFill } from 'react-icons/pi';
import { useGetChildrenQuery } from "@/redux/api/endPoints/childrenApiSlice";
import { Skeleton } from "@/components/ui/skeleton";

const UpcomingSessionsCard = () => {
    const { data: childrenData, isLoading: isLoadingChildren } = useGetChildrenQuery();
    const children = Array.isArray(childrenData) ? childrenData : childrenData?.data || [];

    // Calculate upcoming sessions from all children's enrollments
    const upcomingSessions = React.useMemo(() => {
        if (!children || children.length === 0) return [];

        const now = new Date();
        const sessions = [];

        // Days of week mapping
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        // Process each child's enrollments
        children.forEach(child => {
            // Get enrollments for this child
            const enrollments = child?.enrolledCourses || [];

            enrollments.forEach(enrollment => {
                const group = enrollment.group;
                const course = enrollment.course || group?.courseId || group?.course;
                const teacher = enrollment.teacher || course?.teacherId || group?.teacherId;

                // Get schedule from group
                const schedule = group?.schedule || [];

                if (Array.isArray(schedule) && schedule.length > 0) {
                    schedule.forEach(scheduleItem => {
                        if (scheduleItem && scheduleItem.day && scheduleItem.time) {
                            // Find the next occurrence of this day
                            const dayName = scheduleItem.day;
                            const targetDayIndex = daysOfWeek.indexOf(dayName);

                            if (targetDayIndex !== -1) {
                                const today = now.getDay();
                                let daysUntilNext = targetDayIndex - today;

                                // If the class is today, check if it's already passed
                                if (daysUntilNext === 0) {
                                    const [hours, minutes] = scheduleItem.time.split(':');
                                    const sessionTime = new Date();
                                    sessionTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

                                    if (sessionTime <= now) {
                                        // If today's class has passed, get next week's
                                        daysUntilNext = 7;
                                    }
                                } else if (daysUntilNext < 0) {
                                    // If the day has passed this week, get next week's
                                    daysUntilNext += 7;
                                }

                                // Calculate next session date
                                const nextSessionDate = new Date(now);
                                nextSessionDate.setDate(now.getDate() + daysUntilNext);
                                const [hours, minutes] = scheduleItem.time.split(':');
                                nextSessionDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

                                // Get teacher name safely
                                const getTeacherName = () => {
                                    if (teacher && typeof teacher === 'object' && !Array.isArray(teacher)) {
                                        return teacher.name || teacher.username || 'Teacher';
                                    }
                                    return 'Teacher';
                                };

                                // Add session to list
                                sessions.push({
                                    id: `${child._id}-${enrollment._id}-${scheduleItem.day}`,
                                    childName: child.name,
                                    childId: child._id,
                                    subject: course?.title || group?.title || 'Course',
                                    grade: child.grade ? `Grade ${child.grade}` : 'N/A',
                                    tutor: getTeacherName(),
                                    status: group?.type === 'online' ? 'Online' : 'In-Person',
                                    date: nextSessionDate.toISOString(),
                                    startTime: scheduleItem.time,
                                    dayOfWeek: dayName,
                                    enrollmentStatus: enrollment.status
                                });
                            }
                        }
                    });
                }
            });
        });

        // Sort by date and time (soonest first) and limit to next 5-10 sessions
        return sessions
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .filter(session => session.enrollmentStatus === 'active' || session.enrollmentStatus === 'trialing')
            .slice(0, 10); // Show maximum 10 upcoming sessions
    }, [children]);

    // Format date: Mon, 12 Dec
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
    };

    // Format time: 2:00 PM
    const formatTime = (timeStr) => {
        if (!timeStr) return '';
        const [hours, minutes] = timeStr.split(':');
        const date = new Date();
        date.setHours(parseInt(hours, 10));
        date.setMinutes(parseInt(minutes, 10));
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    };

    return (
        <Card className="w-full rounded-2xl shadow-sm hover:shadow-md transition-all bg-white">
            <CardHeader className='flex flex-row items-center justify-between border-b border-b-gray-100 py-3 mt-1 px-5' >
                <h4 className='font-semibold'>Upcoming Sessions</h4>
                <button className='text-sm text-pink-600 font-semibold'>View All</button>
            </CardHeader>
            <CardContent className=''>
                {isLoadingChildren ? (
                    <div className='space-y-4 py-4'>
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                ) : upcomingSessions.length === 0 ? (
                    <div className='py-8 text-center text-gray-500'>
                        <p>No upcoming sessions</p>
                        <p className='text-xs mt-2 text-gray-400'>Enroll your children in courses to see their upcoming sessions</p>
                    </div>
                ) : (
                    upcomingSessions.map(session => (
                        <div key={session.id} className='border-b border-b-gray-100 last:border-b-0 py-4 '>
                            <div>
                                <div className='flex justify-between items-center text-gray-800 '>
                                    <p className='font-medium'>
                                        <span>{session.subject}</span>
                                        <span className='text-gray-400 mx-2'>|</span>
                                        <span className='text-sm text-gray-600'>{session.grade}</span>
                                    </p>
                                    <p>
                                        {session.status === 'Online' ?
                                            <span className='text-green-600 bg-green-500/20 py-1 px-2 rounded-lg text-xs font-medium'>{session.status}</span>
                                            : <span className='text-blue-600 bg-blue-500/20 py-1 px-2 rounded-lg text-xs font-medium'>{session.status}</span>
                                        }
                                    </p>
                                </div>
                                <p className='text-gray-500 flex items-center text-sm mt-1'>
                                    <span className="font-medium text-gray-700">{session.childName}</span>
                                    <span className="mx-2 text-gray-300"> <PiDotOutlineFill size={16} />  </span>
                                    <span>{session.tutor}</span>
                                </p>
                                <p className='text-[#392b80] text-sm font-medium mt-1'>
                                    {formatDate(session.date)}
                                    <span className="mx-2 text-gray-300"> • </span>
                                    {formatTime(session.startTime)}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </CardContent>

        </Card>
    )
}

export default UpcomingSessionsCard