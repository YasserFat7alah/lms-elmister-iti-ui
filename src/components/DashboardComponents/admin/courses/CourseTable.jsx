import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {  Search,  Edit,   Trash2,  Eye,  BookOpen, Users, Clock, DollarSign, CheckCircle, Archive } from "lucide-react";

const CourseTable = ({ data, title, searchTerm, setSearchTerm, onEdit, onDelete, onView }) => {
  return (
    
    <Card className="shadow-xl border border-gray-100 bg-white rounded-2xl overflow-hidden mt-6">
      <div className="bg-gradient-to-r from-[#FF0055]/5 to-indigo-500/5 p-6 border-b border-gray-100">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              {title}
              <span className="text-sm font-normal text-gray-500">
                ({data.length} courses)
              </span>
            </h2>
            <p className="text-sm text-gray-600 mt-1">Manage course content and settings</p>
          </div>

          {/* Search */}
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0055]/20 focus:border-[#FF0055] transition-all"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Course
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Teacher
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Students
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      {/* <div>
                        {course.status === "archived" ? (
                            <Archive className="w-6 h-6 p-1 rounded-full text-gray-700 bg-gray-100" />
                          ) : <CheckCircle className="w-6 h-6 p-1 rounded-full text-green-700 bg-green-100 " /> 
                        }
                      </div> */}
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{course.title}</p>
                        <p className="text-xs text-gray-500">Course ID: {course.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 font-medium">{course.teacher}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <Users className="w-4 h-4 text-gray-400" />
                      {course.students}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {course.duration}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      {course.price}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      className={`${
                        course.status === "active"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {course.status === "active" ? <CheckCircle className="w-3 h-3 mr-1" /> : <Archive className="w-3 h-3 mr-1" />}
                      {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onView(course)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group"
                        title="View Course"
                      >
                        <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </button>
                      <button
                        onClick={() => onEdit(course)}
                        className="p-2 text-[#FF0055] hover:bg-[#FF0055]/10 rounded-lg transition-colors group"
                        title="Edit Course"
                      >
                        <Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </button>
                      <button
                        onClick={() => onDelete(course.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors group"
                        title="Delete Course"
                      >
                        <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-gray-500">No courses found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default CourseTable;