"use client";
import React from "react";
import { Mail, MapPin, Calendar, BookOpen, MoreVertical } from "lucide-react";

const StudentCard = ({ student }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      
      {/* Student Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">

          {/* Full Image Instead Of Avatar */}
          <img
            src={student.image}
            alt={student.name}
            className="w-14 h-14 rounded-full object-cover"
          />

          <div>
            <h3 className="font-semibold text-gray-800 text-lg">{student.name}</h3>
            <div className="flex items-center space-x-1 text-gray-600">
              <MapPin size={14} />
              <span className="text-sm">@{student.location}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
            <Mail size={16} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      {/* Student Info Section */}
      <div className="space-y-3 border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar size={16} />
            <span className="text-sm">{student.joinDate}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <BookOpen size={16} />
            <span className="text-sm font-medium">{student.coursesEnrolled} Courses</span>
          </div>
        </div>

        {/* Status Section */}
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                student.status === "active" ? "bg-green-500" : "bg-gray-400"
              }`}
            ></div>

            <span
              className={`text-xs font-medium ${
                student.status === "active" ? "text-green-600" : "text-gray-600"
              }`}
            >
              {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
            </span>
          </div>

          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View Profile
          </button>
        </div>
      </div>

    </div>
  );
};

export default StudentCard;
