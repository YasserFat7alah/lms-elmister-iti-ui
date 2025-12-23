"use client";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineNotificationsActive } from "react-icons/md";
import Link from 'next/link';
import { useGetNotificationsQuery } from '@/redux/api/endPoints/notificationsApiSlice';
import { setNotifications } from '@/redux/slices/notificationSlice';
import { formatDistanceToNow } from 'date-fns';

const RecentNotification = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector(state => state.notifications);

  // Fetch notifications using RTK Query
  const { data: fetchedNotifications, isLoading } = useGetNotificationsQuery();

  // Sync fetched notifications to Redux store
  useEffect(() => {
    if (fetchedNotifications) {
      dispatch(setNotifications(fetchedNotifications));
    }
  }, [fetchedNotifications, dispatch]);

  const formatTimeAgo = (date) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch {
      return "recently";
    }
  };

  if (isLoading) return <div className="p-4 text-center text-gray-500">Loading...</div>;
  if (notifications.length === 0) return <div className='p-4 text-center text-gray-500'>No notifications found</div>;

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm my-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-lg text-[#392b80]">Recent Notifications</h2>
        <Link href="/dashboard/parent/notifications" className="text-blue-600 hover:underline text-sm">
          View All
        </Link>
      </div>

      <div className="rounded-2xl border shadow-sm overflow-hidden">
        {notifications.slice(0, 3).map(item => (
          <div
            key={item._id}
            className={`flex items-start gap-2 p-4 cursor-pointer border-b ${item.isRead ? "bg-white" : "bg-blue-50"
              }`}
          >
            <p className="text-blue-500 mt-1"><MdOutlineNotificationsActive size={20} /></p>
            <div>
              <p className="font-medium text-gray-800">{item.title}</p>
              <p className="text-sm text-gray-600">{item.message}</p>
              <p className="text-gray-500 text-sm">{formatTimeAgo(item.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentNotification;
