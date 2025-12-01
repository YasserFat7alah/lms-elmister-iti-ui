"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Plus, Filter, Search, Edit, Trash2, Eye,
  BookOpen, Clock, Users, DollarSign
} from "lucide-react";

const TeacherCourses = () => {
  const [activeFilter, setActiveFilter] = useState("published");
  const [searchTerm, setSearchTerm] = useState("");

  // Course statistics
  const courseStats = [
    { title: "Active Courses", value: "45", color: "bg-green-500", icon: BookOpen },
    { title: "Pending Courses", value: "21", color: "bg-yellow-500", icon: Clock },
    { title: "Draft Courses", value: "15", color: "bg-blue-500", icon: BookOpen },
    { title: "Free Courses", value: "16", color: "bg-purple-500", icon: Users },
    { title: "Paid Courses", value: "21", color: "bg-red-500", icon: DollarSign },
  ];

  // Sample courses data
  const courses = [
    {
      id: 1,
      title: "Information About UI/UX Design & Degree",
      description: "Complete guide to UI/UX design principles and degree programs",
      price: 200,
      originalPrice: 900,
      lessons: "12+ Lessons",
      duration: "9hr 30min",
      students: 45,
      status: "published",
      category: "Design",
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      title: "Leading Program - Learn Angular Fundamental From Beginning to Advanced",
      description: "Master Angular framework from basics to advanced concepts",
      price: 150,
      originalPrice: 600,
      lessons: "15+ Lessons",
      duration: "12hr 45min",
      students: 32,
      status: "published",
      category: "Development",
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      title: "Wordpress for Beginners - Master Wordpress Quickly",
      description: "Learn WordPress development and theme customization",
      price: 99,
      originalPrice: 299,
      lessons: "10+ Lessons",
      duration: "8hr 20min",
      students: 28,
      status: "published",
      category: "Development",
      image: "/api/placeholder/300/200"
    },
    {
      id: 4,
      title: "C# Developers Double Your Coding Speed",
      description: "Advanced C# techniques to improve coding efficiency",
      price: 179,
      originalPrice: 450,
      lessons: "18+ Lessons",
      duration: "14hr 15min",
      students: 19,
      status: "published",
      category: "Programming",
      image: "/api/placeholder/300/200"
    },
    {
      id: 5,
      title: "Sketch from A to Z (2022): Become an app designer",
      description: "Complete Sketch tutorial for app design and prototyping",
      price: 0,
      originalPrice: 199,
      lessons: "14+ Lessons",
      duration: "10hr 30min",
      students: 67,
      status: "published",
      category: "Design",
      image: "/api/placeholder/300/200"
    },
    {
      id: 6,
      title: "Build Responsive Real World Websites",
      description: "Learn to create modern responsive websites from scratch",
      price: 129,
      originalPrice: 399,
      lessons: "20+ Lessons",
      duration: "16hr 45min",
      students: 53,
      status: "published",
      category: "Web Development",
      image: "/api/placeholder/300/200"
    }
  ];

  // Filter options
  const filters = [
    { key: "published", label: "Published (45)", count: 45 },
    { key: "pending", label: "Pending (2)", count: 2 },
    { key: "draft", label: "Draft (1)", count: 1 },
    { key: "inactive", label: "Inactive (3)", count: 3 }
  ];

  // Filter courses based on active filter and search term
  const filteredCourses = courses.filter(course => {
    const matchesFilter = activeFilter === "published" || course.status === activeFilter;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDeleteCourse = (courseId) => {
    if (confirm("Are you sure you want to delete this course?")) {
      console.log("Deleting course:", courseId);
      // Add your delete logic here
    }
  };

  const handleEditCourse = (courseId) => {
    console.log("Editing course:", courseId);
    // Add your edit navigation logic here
  };

  return (

    <div className="max-w-7xl mx-auto space-y-6">

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Courses</h1>
          <p className="text-gray-600 mt-2">Manage and organize your courses</p>
        </div>

        <Link href="/teachers/courses/create">
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={20} />
            <span>Add New Course</span>
          </button>
        </Link>
      </div>


      {/* Course Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {courseStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and Filters Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">

          {/* Search Bar */}
          <div className="relative flex-1 lg:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
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
                className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${activeFilter === filter.key
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">

            {/* Course Image */}
            <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
              {/* You can replace this with actual course image */}
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <BookOpen size={48} className="text-white opacity-80" />
              </div>

              {/* Price Badge */}
              <div className="absolute top-4 right-4 bg-white rounded-lg px-3 py-1 shadow-md">
                <div className="flex items-center space-x-1">
                  {course.price === 0 ? (
                    <span className="text-green-600 font-bold text-lg">FREE</span>
                  ) : (
                    <>
                      <span className="text-gray-900 font-bold text-lg">${course.price}</span>
                      <span className="text-gray-500 text-sm line-through">${course.originalPrice}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${course.status === 'published' ? 'bg-green-100 text-green-800' :
                    course.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      course.status === 'draft' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                  }`}>
                  {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Course Content */}
            <div className="p-6">
              <div className="mb-4">
                <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                  {course.category}
                </span>
              </div>

              <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2">
                {course.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {course.description}
              </p>

              {/* Course Meta */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <BookOpen size={16} />
                    <span>{course.lessons}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>{course.duration}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Users size={16} />
                  <span>{course.students} students</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditCourse(course.id)}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Edit size={16} />
                    <span className="text-sm font-medium">Edit</span>
                  </button>

                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 size={16} />
                    <span className="text-sm font-medium">Delete</span>
                  </button>
                </div>

                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors">
                  <Eye size={16} />
                  <span className="text-sm font-medium">Preview</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of{' '}
            <span className="font-medium">45</span> courses
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

    </div>

  );
};

export default TeacherCourses;