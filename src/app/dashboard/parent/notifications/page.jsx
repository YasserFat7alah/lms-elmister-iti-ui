"use client";

import { markAllAsRead } from "@/redux/slices/notificationSlice";
import { useEffect, useState } from "react";
import { FiClock } from "react-icons/fi";
import { HiBellAlert } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();
  const { notifications, isLoading } = useSelector(state => state.notifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const [showBadge, setShowBadge] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBadge(false);
      dispatch(markAllAsRead());
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  if (isLoading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#392b80]">Notifications</h1>

        {/*  Badge stays for 3s then disappears */}
        {showBadge && unreadCount > 0 && (
          <span className="bg-red-500 text-white px-3 py-1 text-sm rounded-full shadow-md animate-pulse">
            {unreadCount} new
          </span>
        )}
      </div>

      {/* List Container */}
      <div className="rounded-2xl bg-white shadow-lg border overflow-hidden">
        {notifications.map(item => (
          <div 
            key={item.id} 
            className={`flex items-start gap-3 p-5 border-b transition 
              ${item.read ? "bg-white" : "bg-blue-50"}
            `}
          >
            {/* Icon */}
            <div className="mt-1">
              <HiBellAlert 
                className={`w-6 h-6 ${item.read ? "text-gray-400" : "text-blue-600"}`} 
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="font-semibold text-[#392b80]">{item.user}</p>
              <p className="text-gray-700">{item.title}</p>

              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                <FiClock className="w-3 h-3" />
                <span>{item.timeAgo}</span>
              </div>
            </div>

            {/* Dot for unread */}
            {!item.read && (
              <span className="w-2 h-2 bg-blue-600 rounded-full self-center"></span>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default Page;
