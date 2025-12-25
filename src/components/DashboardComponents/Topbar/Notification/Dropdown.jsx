"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bell, CheckCircle, X } from "lucide-react";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { useGetNotificationsQuery, useMarkNotificationAsReadMutation, useDeleteNotificationMutation } from "@/redux/api/endPoints/notificationsApiSlice";
import { setNotifications, addNotification, markAsRead, markAllAsRead, deleteNotification } from "@/redux/slices/notificationSlice";
import { useSocket } from "@/lib/socket/socketContext";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";
import { isProductionEnvironment } from "@/lib/socket/socket";

const Dropdown = () => {
  const isProduction = isProductionEnvironment();
  const dispatch = useDispatch();
  const { socket, connected } = useSocket();
  const { notifications, unreadCount } = useSelector((state) => state.notifications);

  // Fetch notifications using RTK Query
  const { data: fetchedNotifications, isLoading } = useGetNotificationsQuery();
  const [markNotificationAsReadMutation] = useMarkNotificationAsReadMutation();
  const [deleteNotificationMutation] = useDeleteNotificationMutation();

  // Sync fetched notifications to Redux store
  useEffect(() => {
    if (fetchedNotifications) {
      dispatch(setNotifications(fetchedNotifications));
    }
  }, [fetchedNotifications, dispatch]);

  // Listen for real-time notifications via socket
  useEffect(() => {
    // Disable real-time notifications in production
    if (isProduction) return;
    if (!socket || !connected) return;

    const handleNotification = (notification) => {
      dispatch(addNotification(notification));
      toast(notification.title || "New Notification", {
        icon: '🔔',
        duration: 4000,
      });
    };

    socket.on("notification", handleNotification);
    return () => socket.off("notification", handleNotification);
  }, [socket, connected, dispatch, isProduction]);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsReadMutation(notificationId).unwrap();
      dispatch(markAsRead(notificationId));
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const handleDelete = async (notificationId, e) => {
    e.stopPropagation(); // Prevent marking as read when deleting
    try {
      await deleteNotificationMutation(notificationId).unwrap();
      dispatch(deleteNotification(notificationId));
      toast.success("Notification deleted");
    } catch (error) {
      console.error("Failed to delete notification:", error);
      toast.error("Failed to delete notification");
    }
  };

  const formatTimeAgo = (date) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch {
      return "recently";
    }
  };

  return (
    <DropdownMenu onOpenChange={(open) => console.log("🔔 Dropdown state changed:", open ? "OPENED" : "CLOSED")}>
      <DropdownMenuTrigger asChild>
        <button
          onClick={() => console.log("🔔 Bell icon clicked! Button is receiving click events.")}
          className="relative outline-none focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md p-1 transition-all"
        >
          <Bell className="h-6 w-6 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 bg-white shadow-lg rounded-lg overflow-hidden z-[9999] p-0"
      >
        {/* Header */}
        <div className="flex flex-col gap-2 p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            {notifications.length > 0 && !isLoading && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
              >
                <CheckCircle size={14} />
                Mark all read
              </button>
            )}
          </div>
          {/* Production Warning */}
          {isProduction && (
            <div className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-yellow-800 text-xs">
              <span>⚠️</span>
              <span>Real-time notifications disabled in production</span>
            </div>
          )}
        </div>
        {/* Loading state for notifications */}
        {isLoading && (
          <div className="py-3 px-4 text-center text-gray-500 text-sm">
            Loading notifications...
          </div>
        )}

        {/* Scrollable Notifications List */}
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 && !isLoading ? (
            <div className="py-12 text-center text-gray-500 text-sm">
              No notifications found
            </div>
          ) : (
            notifications.map((n) => (
              <div key={n._id} className="relative group">
                <DropdownMenuItem
                  className={`flex flex-col items-start py-3 px-4 cursor-pointer border-b border-gray-100 last:border-b-0 ${!n.isRead ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'
                    }`}
                  onClick={() => !n.isRead && handleMarkAsRead(n._id)}
                >
                  <div className="flex justify-between items-start w-full pr-6">
                    <span className="font-medium text-gray-900">{n.title}</span>
                    {!n.isRead && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-1"></span>
                    )}
                  </div>
                  <span className="text-sm text-gray-600 mt-1">{n.message}</span>
                  <span className="text-xs text-gray-500 mt-1">{formatTimeAgo(n.createdAt)}</span>
                </DropdownMenuItem>

                {/* Delete Button */}
                <button
                  onClick={(e) => handleDelete(n._id, e)}
                  className="absolute top-3 right-2 p-1 opacity-0 group-hover:opacity-100 hover:bg-red-100 rounded transition-all"
                  title="Delete notification"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;