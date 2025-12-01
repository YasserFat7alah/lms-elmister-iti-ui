"use client";
import React, { useState } from "react";
import StudentCard from "@/components/DashboardComponents/teacher/StudentCard";
import StudentListItem from "@/components/DashboardComponents/teacher/StudentListItem";
import { 
  Search, Filter, Mail, MapPin, Calendar, 
  BookOpen, Eye, MessageCircle, MoreVertical,
  Download, Upload, Plus
} from "lucide-react";

const TeacherStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"

  // Student statistics
  const studentStats = [
    { title: "Total Students", value: "156", change: "+12%", color: "bg-blue-500" },
    { title: "Active Students", value: "124", change: "+8%", color: "bg-green-500" },
    { title: "New Students", value: "23", change: "+15%", color: "bg-purple-500" },
    { title: "Completion Rate", value: "78%", change: "+5%", color: "bg-orange-500" },
  ];

  // Sample students data matching your design
  const students = [
    {
      id: 1,
      name: "Ronald Richard",
      location: "New York",
      joinDate: "12 Aug 2025",
      coursesEnrolled: 10,
      image: "/s1.jpg",
      status: "active"
    },
    {
      id: 2,
      name: "Nancy More",
      location: "Los Angeles",
      joinDate: "15 Jul 2025",
      coursesEnrolled: 8,
      image: "/s1.jpg",
      status: "active"
    },
    {
      id: 3,
      name: "Patrick Alleman",
      location: "Alabama",
      joinDate: "18 Jun 2025",
      coursesEnrolled: 12,
      image: "/s1.jpg",
      status: "active"
    },
    {
      id: 4,
      name: "Olive Paxson",
      location: "Brisbane",
      joinDate: "03 May 2025",
      coursesEnrolled: 7,
      image: "/s1.jpg",
      status: "inactive"
    },
    {
      id: 5,
      name: "Chris Thomas",
      location: "New York",
      joinDate: "14 Apr 2025",
      coursesEnrolled: 4,
      image: "/s1.jpg",
      status: "active"
    },
    {
      id: 6,
      name: "Joyce Perron",
      location: "Ontario",
      joinDate: "17 Mar 2025",
      coursesEnrolled: 6,
      image: "/s1.jpg",
      status: "inactive"
    }
  ];

  // Filter options
  const filters = [
    { key: "all", label: "All Students", count: students.length },
    { key: "active", label: "Active", count: students.filter(s => s.status === "active").length },
    { key: "inactive", label: "Inactive", count: students.filter(s => s.status === "inactive").length },
  ];

  // Filter students based on active filter and search term
  const filteredStudents = students.filter(student => {
    const matchesFilter = activeFilter === "all" || student.status === activeFilter;
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Students Grid</h1>
            <p className="text-gray-600 mt-2">Manage and track your students' progress</p>
          </div>
          
          <div className="flex space-x-3 mt-4 lg:mt-0">
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "grid" 
                    ? "bg-white text-gray-800 shadow-sm" 
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "list" 
                    ? "bg-white text-gray-800 shadow-sm" 
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                List
              </button>
            </div>

            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Plus size={18} />
              <span>Add Student</span>
            </button>
          </div>
        </div>

        {/* Student Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {studentStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white`}>
                  <BookOpen size={24} />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-green-600 text-sm font-medium">{stat.change}</span>
                <span className="text-gray-500 text-sm ml-1">from last month</span>
              </div>
            </div>
          ))}
        </div>

   

        {/* Search and Filters Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            
            {/* Search Bar */}
            <div className="relative flex-1 lg:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search students by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex space-x-2 overflow-x-auto">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                    activeFilter === filter.key
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>
          </div>
        </div>
           {/* GRID VIEW */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      )}

        {/* Students List View */}
        {viewMode === "list" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Join Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Courses
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <StudentListItem key={student.id} student={student} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredStudents.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'No students match your current filters'}
            </p>
            {(searchTerm || activeFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter("all");
                }}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {filteredStudents.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredStudents.length}</span> of{' '}
                <span className="font-medium">156</span> students
              </p>
              
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  Previous
                </button>
                
                <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  1
                </button>
                
                <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                  2
                </button>
                
                <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
   
  );
};

export default TeacherStudents;