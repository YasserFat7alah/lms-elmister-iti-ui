"use client";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineNotificationsActive } from "react-icons/md";
import Link from 'next/link';
import { setLoading, setNotifications } from '@/redux/slices/notificationSlice';

const RecentNotification = () => {
  const dispatch = useDispatch();
  const { notifications, isLoading } = useSelector(state => state.notifications);

  // fetch Notifications
  useEffect(() => {
    dispatch(setLoading(true));

    setTimeout(() => {  // Simulate async fetch
      const dummy = [
        { id: "n1", user: "Ahmed Salem", title: "New math assignment posted", read: false, timeAgo: "Just now" },
        { id: "n2", user: "Sarah Salem", title: "Science project update", read: false, timeAgo: "3 hours ago" },
        { id: "n3", user: "Sarah Salem", title: "New study materials uploaded", read: true, timeAgo: "2 days ago" }
      ];
      dispatch(setNotifications(dummy));
      dispatch(setLoading(false));
    }, 500);
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (notifications.length === 0) return <div className='text-center text-gray-500'>No notifications found</div>;

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
            key={item.id}
            className={`flex items-start gap-2 p-4 cursor-pointer border-b  ${
              item.read ? "bg-white" : "bg-blue-50"
            }`}
          >
            <p className="text-blue-500 mt-1"><MdOutlineNotificationsActive size={20} /></p>
            <div>
              <p className="font-medium text-gray-800">{item.user} : <span className="text-gray-700">{item.title}</span></p>
              <p className="text-gray-500 text-sm">{item.timeAgo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentNotification;
