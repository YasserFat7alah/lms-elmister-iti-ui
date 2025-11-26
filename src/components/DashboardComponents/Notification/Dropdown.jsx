"use client";

import { Bell, CheckCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, 
    DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator} from "@/components/ui/dropdown-menu";



const notifications = [
    { id: 1, title: "New Course registered", time: "2 min ago" },
    { id: 2, title: "New assighnment received", time: "10 min ago" },
    { id: 3, title: "Payment processed successfully for math course", time: "1 hour ago" },
  ];

  const unreadCount = notifications.length;

const Dropdown = () => {
  return (
     <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative">
          <Bell className="h-6 w-6 text-gray-700" />

          {/* BADGE FOR NOTIFICATION COUNT */}
          {unreadCount > 0 && (
            <span
              className="
                absolute -top-1 -right-1 
                bg-red-500 text-white text-xs 
                px-1.5 py-0.5 rounded-full
              "
            >
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-72 ml-3 bg-white shadow-lg rounded-lg"
      >
        <DropdownMenuLabel className="font-semibold">
          Notifications
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {notifications.map((n) => (
          <DropdownMenuItem
            key={n.id}
            className="flex flex-col items-start py-2"
          >
            <span className="font-medium">{n.title}</span>
            <span className="text-xs text-gray-500">{n.time}</span>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex items-center gap-2 text-green-600">
          <CheckCircle className="w-4 h-4" />
          Mark all as read
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Dropdown