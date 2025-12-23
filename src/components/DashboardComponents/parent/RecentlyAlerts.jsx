import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { PiDotOutlineFill } from 'react-icons/pi';
import { Bell } from 'lucide-react';
import { useGetNotificationsQuery } from '@/redux/api/endPoints/notificationsApiSlice';
import { formatDistanceToNow } from 'date-fns';

const RecentlyAlerts = () => {
    const { data: notifications = [], isLoading } = useGetNotificationsQuery();

    // Get the 5 most recent notifications
    const recentNotifications = notifications.slice(0, 5);

    return (
        <Card className="w-full rounded-2xl shadow-sm hover:shadow-md transition-all bg-white">
            <CardHeader className='border-b border-b-gray-100 py-3 mt-1 px-5'>
                <h4 className='font-semibold'>Notifications</h4>
            </CardHeader>
            <CardContent className=''>
                {isLoading ? (
                    <div className='py-4 text-center text-gray-500'>
                        Loading notifications...
                    </div>
                ) : recentNotifications.length === 0 ? (
                    <div className='py-8 text-center text-gray-500'>
                        <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>No notifications yet</p>
                    </div>
                ) : (
                    recentNotifications.map(notification => (
                        <div key={notification._id} className='border-b last:border-b-0 py-4'>
                            <div className='flex gap-2'>
                                <p className={`mt-1 ${notification.isRead ? 'text-gray-400' : 'text-yellow-400'}`}>
                                    <Bell size={20} />
                                </p>
                                <div className='flex-1'>
                                    <p className={`${notification.isRead ? 'text-gray-600' : 'text-gray-800 font-medium'}`}>
                                        {notification.title}
                                    </p>
                                    <p className='text-gray-600 text-sm mt-1'>{notification.message}</p>
                                    <p className='text-gray-500 flex items-center text-sm mt-1'>
                                        <span>{formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
};

export default RecentlyAlerts;