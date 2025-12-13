"use client";
import React from "react";
import { studentStats, enrolledCourses } from "@/data/studentData";
import DashboardCourseCard from "@/components/DashboardComponents/student/DashboardCourseCard";

import { BookOpen, PlayCircle, Trophy } from "lucide-react";
import PageBreadcrumb from "@/components/shared/dashboard/PageBreadcrumb";
import DashboardBanner from "@/components/shared/dashboard/DashboardBanner";

export default function StudentDashboardPage() {

  const getIcon = (iconName) => {
    switch (iconName) {
      case "book": return <BookOpen size={28} />;
      case "play": return <PlayCircle size={28} />;
      case "award": return <Trophy size={28} />;
      default: return <BookOpen size={28} />;
    }
  };

  return (
    <div className="space-y-8">
      <PageBreadcrumb />
      <DashboardBanner />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {studentStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${stat.color}`}>
              {getIcon(stat.icon)}
            </div>
            <div>
              <p className="text-gray-500 font-medium mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recently Enrolled Courses</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <DashboardCourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>

    </div>
  );
}