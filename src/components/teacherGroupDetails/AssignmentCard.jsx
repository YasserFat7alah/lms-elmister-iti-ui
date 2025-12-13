import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Eye, Pencil, Trash2, Calendar, Clock, FileText } from "lucide-react";

const AssignmentCard = ({ assignment, onView, onEdit, onDelete }) => {
  return (
    <div className="group flex items-center justify-between p-4 border rounded-xl bg-white hover:shadow-md transition-all duration-200">
      <div className="flex-1 min-w-0 pr-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-pink-50 rounded-lg">
            <FileText className="text-[#FF4667]" size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 truncate">{assignment.title}</h4>
            {assignment.description && (
              <p className="text-sm text-gray-500 truncate mt-1">{assignment.description}</p>
            )}
            <div className="flex flex-wrap gap-3 mt-2">
              <span className="flex items-center gap-1 text-xs text-gray-600">
                <Calendar size={12} />
                {new Date(assignment.dueDate).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-600">
                <Clock size={12} />
                {new Date(assignment.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full font-medium">
                Grade: {assignment.totalGrade}
              </span>
              {assignment.allowLateSubmission && (
                <span className="text-xs px-2 py-0.5 bg-orange-50 text-orange-700 rounded-full font-medium">
                  Late: -{assignment.latePenaltyPerDay}%/day
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Actions Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={() => onView(assignment)} className="cursor-pointer">
            <Eye size={16} className="mr-2" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onEdit(assignment)} className="cursor-pointer">
            <Pencil size={16} className="mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onDelete(assignment)} 
            className="cursor-pointer text-red-600 focus:text-red-600"
          >
            <Trash2 size={16} className="mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AssignmentCard;