"use client";
import { Edit2 } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import React from "react";

const StatusDropdownSub = ({ currentStatus, subscriptionId, onStatusChange }) => {
  const handleStatusClick = (newStatus) => {
    onStatusChange(subscriptionId, newStatus);
  };

  const getColorClasses = () => {
    switch (currentStatus) {
      case "active":
        return "bg-green-50 text-green-700 border border-green-200";
      case "pending":
        return "bg-yellow-50 text-yellow-700 border border-yellow-200";
      default:
        return "bg-red-50 text-red-700 border border-red-200";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
        <button
          className={`px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1 shadow-sm hover:brightness-95 transition ${getColorClasses()}`}
        >
          {currentStatus}
          <Edit2 className="w-3 h-3 opacity-80" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-28 p-1 rounded-md shadow-md" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem
          onClick={() => handleStatusClick("active")}
          className="text-[12px] text-green-700 cursor-pointer hover:bg-green-50 rounded-md"
        >
          Active
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleStatusClick("pending")}
          className="text-[12px] text-yellow-700 cursor-pointer hover:bg-yellow-50 rounded-md"
        >
          Pending
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleStatusClick("expired")}
          className="text-[12px] text-red-700 cursor-pointer hover:bg-red-50 rounded-md"
        >
          Expired
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusDropdownSub;
