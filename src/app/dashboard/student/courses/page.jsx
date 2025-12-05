"use client";
import React from "react";
import { enrolledCourses } from "@/data/studentData";
import EnrolledCourseCard from "@/components/dashboardComponents/student/EnrolledCourseCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen } from "lucide-react";

export default function EnrolledCoursesPage() {
  
  const activeCourses = enrolledCourses.filter(c => c.status === "active");
  const completedCourses = enrolledCourses.filter(c => c.status === "completed");

  return (
    <div className="space-y-8">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <BookOpen className="text-[#FF0055]" /> Enrolled Courses
            </h1>
            <p className="text-gray-500 text-sm mt-1">
                You have enrolled in <span className="font-bold text-gray-900">{enrolledCourses.length}</span> courses.
            </p>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        
        <TabsList className="bg-white border border-gray-100 p-1 rounded-lg mb-6 h-auto inline-flex">
          <TabsTrigger value="all" className="rounded-md px-6 py-2 data-[state=active]:bg-[#FF0055] data-[state=active]:text-white">
            All Courses
          </TabsTrigger>
          <TabsTrigger value="active" className="rounded-md px-6 py-2 data-[state=active]:bg-[#FF0055] data-[state=active]:text-white">
            Active
          </TabsTrigger>
          <TabsTrigger value="completed" className="rounded-md px-6 py-2 data-[state=active]:bg-[#FF0055] data-[state=active]:text-white">
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="animate-in fade-in-50 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map(course => (
                    <EnrolledCourseCard key={course.id} course={course} />
                ))}
            </div>
        </TabsContent>

        <TabsContent value="active" className="animate-in fade-in-50 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeCourses.length > 0 ? (
                    activeCourses.map(course => <EnrolledCourseCard key={course.id} course={course} />)
                ) : (
                    <EmptyState />
                )}
            </div>
        </TabsContent>

        <TabsContent value="completed" className="animate-in fade-in-50 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedCourses.length > 0 ? (
                    completedCourses.map(course => <EnrolledCourseCard key={course.id} course={course} />)
                ) : (
                    <EmptyState type="completed" />
                )}
            </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}

// كومبوننت صغير لحالة الفراغ
const EmptyState = ({ type = "active" }) => (
    <div className="col-span-full py-12 text-center bg-white rounded-xl border border-dashed border-gray-200">
        <p className="text-gray-500">No {type} courses found.</p>
    </div>
);