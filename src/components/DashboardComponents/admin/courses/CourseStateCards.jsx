import React from "react";
import { Card } from "@/components/ui/card";
import { BookOpen, CheckCircle, Archive, Users } from "lucide-react";

const CourseStateCards = ({ courses, activeCourses, archivedCourses }) => {
  const totalStudents = courses.reduce((sum, course) => sum + course.totalStudents, 0);

  return (
    <div className="grid md:grid-cols-4 gap-4">
      <Card className="p-5 bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-blue-600 font-medium">Total Courses</p>
            <h3 className="text-2xl font-bold text-blue-900">{courses.length}</h3>
          </div>
        </div>
      </Card>

      <Card className="p-5 bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-500 rounded-xl shadow-lg">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-green-600 font-medium">Active</p>
            <h3 className="text-2xl font-bold text-green-900">{activeCourses.length}</h3>
          </div>
        </div>
      </Card>

      <Card className="p-5 bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gray-500 rounded-xl shadow-lg">
            <Archive className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium">Archived</p>
            <h3 className="text-2xl font-bold text-gray-900">{archivedCourses.length}</h3>
          </div>
        </div>
      </Card>

      <Card className="p-5 bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200 hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500 rounded-xl shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-purple-600 font-medium">Total Students</p>
            <h3 className="text-2xl font-bold text-purple-900">{totalStudents}</h3>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CourseStateCards;
