"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, CheckCircle2, AlertCircle, Lock, ArrowRight } from "lucide-react";
import { getAssignmentStatus, formatDate, STATUS } from './utils/assignmentUtils';

export default function AssignmentCard({ assignment, submission }) {
  const router = useRouter();
  const { status, label, color } = getAssignmentStatus(assignment, submission);

  const handleClick = () => {
    router.push(`/dashboard/student/assignments/${assignment._id}`);
  };

  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center gap-4">

      {/* Left Border Status Indicator */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-xl ${status === STATUS.LATE ? 'bg-red-500' :
          status === STATUS.GRADED ? 'bg-green-500' :
            status === STATUS.SUBMITTED ? 'bg-blue-500' : 'bg-gray-300'
        }`} />

      {/* Icon */}
      <div className="p-3 bg-gray-50 rounded-full shrink-0">
        {status === STATUS.GRADED ? <CheckCircle2 className="w-6 h-6 text-green-600" /> :
          status === STATUS.LATE ? <AlertCircle className="w-6 h-6 text-red-600" /> :
            <Calendar className="w-6 h-6 text-gray-600" />}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{assignment.courseName || assignment.course?.title}</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${color}`}>
            {label}
          </span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {assignment.title}
        </h3>
        <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
          <span>Due: {formatDate(assignment.dueDate)}</span>
          {status === STATUS.LATE && (
            <span className="text-red-600 font-medium text-xs bg-red-50 px-2 py-0.5 rounded">
              -{assignment.latePenaltyPerDay} Marks/Day Penalty
            </span>
          )}
        </p>
      </div>

      {/* Action Button */}
      <button
        onClick={handleClick}
        className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium 
        transition-colors bg-black text-white hover:bg-gray-800
        ${status === STATUS.LATE ? 'bg-red-500' :
            status === STATUS.GRADED ? 'bg-green-500' :
              status === STATUS.SUBMITTED ? 'bg-yellow-500' :
                status === STATUS.MISSED ? 'bg-gray-300' : 'bg-blue-500'
          }
        `}
      >
        {status === STATUS.TODO && "Start"}
        {status === STATUS.LATE && "Submit Late"}
        {status === STATUS.SUBMITTED && "View / Edit"}
        {(status === STATUS.GRADED || status === STATUS.OVERDUE_SUBMITTED) && "View Result"}
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}