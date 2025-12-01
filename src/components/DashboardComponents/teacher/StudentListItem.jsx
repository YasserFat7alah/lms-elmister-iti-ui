"use client";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";

const TeacherListItem = ({ student }) => {
  return (
    <tr key={student.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <img
            src={student.image}
            alt={student.name}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{student.name}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-600">@{student.location}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-600">{student.joinDate}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{student.coursesEnrolled} Courses</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${student.status === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
          }`}>
          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center space-x-2">
          <button className="text-blue-600 hover:text-blue-900">
            View
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <Mail size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TeacherListItem;
