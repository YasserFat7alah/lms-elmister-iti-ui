"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus, Filter, Search, Edit, Trash2, Eye,
  BookOpen, Clock, Users, DollarSign, Users2,
  Building, Calendar, MapPin, BarChart3, MoreVertical,
  ChevronRight, Download, Share2, Copy, CheckCircle
} from "lucide-react";

const TeacherCourses = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("published");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [copiedCourseId, setCopiedCourseId] = useState(null);

  // Course statistics
  const courseStats = [
    { title: "Total Courses", value: "45", color: "bg-blue-500", icon: BookOpen, link: "/courses" },
    { title: "Active Courses", value: "21", color: "bg-green-500", icon: BookOpen, link: "/courses?status=active" },
    { title: "Draft Courses", value: "15", color: "bg-yellow-500", icon: Clock, link: "/courses?status=draft" },
    { title: "Total Students", value: "156", color: "bg-purple-500", icon: Users, link: "/students" },
    { title: "Active Groups", value: "78", color: "bg-red-500", icon: Users2, link: "/courses?view=groups" },
  ];

  // Sample courses data with group info
  const courses = [
    {
      id: 1,
      title: "Integrated Web Development Course",
      description: "Comprehensive course to learn web development from scratch to professional level",
      groups: 3,
      totalStudents: 45,
      activeStudents: 42,
      status: "published",
      category: "Web Development",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=webdev",
      priceRange: "1500-2500",
      revenue: 67500,
      lastUpdated: "2 days ago",
      creationDate: "2024-01-01",
      groupsInfo: [
        { id: 1, name: "Morning Group", price: 1500, schedule: "Sat, Mon, Wed - 10 AM", students: 15, status: "active" },
        { id: 2, name: "Evening Group", price: 1800, schedule: "Sat, Mon, Wed - 6 PM", students: 18, status: "active" },
        { id: 3, name: "Intensive Group", price: 2500, schedule: "Daily - 2 PM", students: 12, status: "full" }
      ]
    },
    {
      id: 2,
      title: "Advanced React.js & Next.js",
      description: "Master React.js with Next.js, TypeScript, and advanced state management",
      groups: 2,
      totalStudents: 32,
      activeStudents: 30,
      status: "published",
      category: "Frontend Development",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=react",
      priceRange: "2000-3000",
      revenue: 50000,
      lastUpdated: "1 week ago",
      creationDate: "2024-01-15",
      groupsInfo: [
        { id: 4, name: "Beginner Group", price: 2000, schedule: "Sun, Tue - 4 PM", students: 20, status: "active" },
        { id: 5, name: "Advanced Group", price: 3000, schedule: "Thu, Fri - 7 PM", students: 12, status: "active" }
      ]
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      description: "Complete UI/UX design course with Figma, prototyping, and design systems",
      groups: 1,
      totalStudents: 28,
      activeStudents: 25,
      status: "published",
      category: "Design",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=design",
      priceRange: "1200",
      revenue: 33600,
      lastUpdated: "3 days ago",
      creationDate: "2024-01-10",
      groupsInfo: [
        { id: 6, name: "Design Group", price: 1200, schedule: "Mon, Wed - 3 PM", students: 28, status: "active" }
      ]
    },
    {
      id: 4,
      title: "Node.js Backend Development",
      description: "Build scalable backend APIs with Node.js, Express, and MongoDB",
      groups: 2,
      totalStudents: 24,
      activeStudents: 22,
      status: "draft",
      category: "Backend Development",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=nodejs",
      priceRange: "1800-2200",
      revenue: 0,
      lastUpdated: "Just now",
      creationDate: "2024-02-01",
      groupsInfo: [
        { id: 7, name: "Weekend Group", price: 1800, schedule: "Sat, Sun - 11 AM", students: 0, status: "draft" },
        { id: 8, name: "Weekday Group", price: 2200, schedule: "Tue, Thu - 8 PM", students: 0, status: "draft" }
      ]
    },
    {
      id: 5,
      title: "Mobile App Development with React Native",
      description: "Build cross-platform mobile applications using React Native",
      groups: 1,
      totalStudents: 18,
      activeStudents: 16,
      status: "pending",
      category: "Mobile Development",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=mobile",
      priceRange: "2500",
      revenue: 0,
      lastUpdated: "1 month ago",
      creationDate: "2023-12-15",
      groupsInfo: [
        { id: 9, name: "Mobile Group", price: 2500, schedule: "Mon, Wed, Fri - 5 PM", students: 18, status: "pending" }
      ]
    },
    {
      id: 6,
      title: "Data Science & Machine Learning",
      description: "Introduction to data science, Python, and machine learning algorithms",
      groups: 0,
      totalStudents: 0,
      activeStudents: 0,
      status: "inactive",
      category: "Data Science",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=datascience",
      priceRange: "3000",
      revenue: 0,
      lastUpdated: "2 months ago",
      creationDate: "2023-11-20",
      groupsInfo: []
    }
  ];

  // Filter options
  const filters = [
    { key: "all", label: "All Courses", count: 45, color: "bg-gray-100 text-gray-800" },
    { key: "published", label: "Active (21)", count: 21, color: "bg-green-100 text-green-800" },
    { key: "pending", label: "Pending (2)", count: 2, color: "bg-yellow-100 text-yellow-800" },
    { key: "draft", label: "Draft (15)", count: 15, color: "bg-blue-100 text-blue-800" },
    { key: "inactive", label: "Inactive (7)", count: 7, color: "bg-red-100 text-red-800" }
  ];

  // Filter courses based on active filter and search term
  const filteredCourses = courses.filter(course => {
    const matchesFilter = activeFilter === "all" || course.status === activeFilter;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Handle course actions
  const handleDeleteCourse = (courseId) => {
    if (confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      console.log("Deleting course:", courseId);
      // API call to delete course
    }
  };

  const handleDuplicateCourse = (courseId) => {
    setCopiedCourseId(courseId);
    console.log("Duplicating course:", courseId);
    setTimeout(() => setCopiedCourseId(null), 2000);
  };

  const handleExportData = (format) => {
    console.log(`Exporting data in ${format} format`);
    setShowExportMenu(false);
  };

  const handleViewAnalytics = (courseId) => {
    router.push(`/courses/${courseId}/analytics`);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      published: { color: "bg-green-100 text-green-800", label: "Active" },
      draft: { color: "bg-blue-100 text-blue-800", label: "Draft" },
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
      inactive: { color: "bg-red-100 text-red-800", label: "Inactive" }
    };
    return statusConfig[status] || statusConfig.draft;
  };

  const getGroupStatusBadge = (status) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800", label: "Active" },
      full: { color: "bg-purple-100 text-purple-800", label: "Full" },
      draft: { color: "bg-blue-100 text-blue-800", label: "Draft" },
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" }
    };
    return statusConfig[status] || statusConfig.draft;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Courses Management</h1>
          <p className="text-gray-600 mt-2">Create, manage, and organize your educational courses</p>
        </div>

        <div className="flex items-center gap-3 mt-4 lg:mt-0">
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download size={18} />
              <span>Export</span>
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => handleExportData("csv")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  Export as CSV
                </button>
                <button
                  onClick={() => handleExportData("excel")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  Export as Excel
                </button>
                <button
                  onClick={() => handleExportData("pdf")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  Export as PDF
                </button>
              </div>
            )}
          </div>

          <Link href="/dashboard/teacher/courses/create">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              <Plus size={20} />
              <span>Create New Course</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Course Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {courseStats.map((stat, index) => (
          <Link key={index} href={stat.link}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Search and Filters Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-0">
          {/* Search Bar */}
          <div className="relative flex-1 lg:max-w-md">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search courses by title, description, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${activeFilter === filter.key
                  ? "bg-blue-600 text-white"
                  : filter.color
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
        {filteredCourses.map((course) => {
          const statusBadge = getStatusBadge(course.status);

          return (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Course Header with Image */}
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  <div className="text-white text-center">
                    <BookOpen size={48} className="mx-auto opacity-80 mb-2" />
                    <span className="text-sm font-medium">{course.category}</span>
                  </div>
                </div>

                {/* Status and Groups Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusBadge.color}`}>
                    {statusBadge.label}
                  </span>

                  {course.groups > 0 && (
                    <div className="bg-white rounded-lg px-3 py-1 shadow-md">
                      <div className="flex items-center gap-1">
                        <Users2 size={14} />
                        <span className="text-gray-900 font-bold">{course.groups} Groups</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Actions Menu */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => setSelectedCourse(selectedCourse === course.id ? null : course.id)}
                    className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {selectedCourse === course.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <Link href={`/courses/${course.id}/edit`}>
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors">
                          Edit Course
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDuplicateCourse(course.id)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                      >
                        {copiedCourseId === course.id ? (
                          <span className="flex items-center gap-2">
                            <CheckCircle size={14} className="text-green-500" />
                            Copied!
                          </span>
                        ) : (
                          "Duplicate Course"
                        )}
                      </button>
                      <button
                        onClick={() => handleViewAnalytics(course.id)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                      >
                        View Analytics
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Delete Course
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2">
                  {course.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {course.description}
                </p>

                {/* Course Meta Information */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-sm">
                    <div className="text-gray-500 mb-1">Total Students</div>
                    <div className="font-bold text-gray-800">{course.totalStudents}</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-gray-500 mb-1">Price Range</div>
                    <div className="font-bold text-blue-600">{course.priceRange} EGP</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-gray-500 mb-1">Revenue</div>
                    <div className="font-bold text-green-600">{course.revenue.toLocaleString()} EGP</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-gray-500 mb-1">Last Updated</div>
                    <div className="font-bold text-gray-800">{course.lastUpdated}</div>
                  </div>
                </div>

                {/* Groups Preview */}
                {course.groups > 0 && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700">Available Groups</span>
                      <span className="text-xs text-gray-500">{course.groups} group(s)</span>
                    </div>
                    <div className="space-y-2">
                      {course.groupsInfo.slice(0, 2).map((group, idx) => {
                        const groupStatus = getGroupStatusBadge(group.status);
                        return (
                          <div key={idx} className="flex items-center justify-between text-sm p-2 bg-white rounded border">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-gray-800">{group.name}</span>
                                <span className={`px-2 py-1 text-xs rounded ${groupStatus.color}`}>
                                  {groupStatus.label}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                <Calendar size={12} />
                                <span>{group.schedule}</span>
                              </div>
                            </div>
                            <div className="text-right ml-4">
                              <div className="font-bold text-blue-600">{group.price} EGP</div>
                              <div className="text-xs text-gray-500">{group.students} students</div>
                            </div>
                          </div>
                        );
                      })}
                      {course.groupsInfo.length > 2 && (
                        <Link href={`/courses/${course.id}/groups`}>
                          <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 py-1">
                            View all {course.groupsInfo.length} groups
                            <ChevronRight size={14} className="inline ml-1" />
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <Link href={`/courses/${course.id}`}>
                      <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors">
                        <Eye size={16} />
                        <span className="text-sm font-medium">View</span>
                      </button>
                    </Link>

                    <Link href={`/courses/${course.id}/edit`}>
                      <button className="flex items-center gap-1 text-green-600 hover:text-green-800 transition-colors">
                        <Edit size={16} />
                        <span className="text-sm font-medium">Edit</span>
                      </button>
                    </Link>
                  </div>

                  <div className="flex items-center gap-3">
                    {course.groups > 0 && (
                      <Link href={`/courses/${course.id}/groups`}>
                        <button className="flex items-center gap-1 text-purple-600 hover:text-purple-800 transition-colors">
                          <Users2 size={16} />
                          <span className="text-sm font-medium">Groups</span>
                        </button>
                      </Link>
                    )}

                    <Link href={`/courses/${course.id}/analytics`}>
                      <button className="flex items-center gap-1 text-orange-600 hover:text-orange-800 transition-colors">
                        <BarChart3 size={16} />
                        <span className="text-sm font-medium">Analytics</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No courses found</h3>
          <p className="text-gray-500 mb-6">Try changing your search or filter criteria</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setSearchTerm("")}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Search
            </button>
            <Link href="/courses/new">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Create New Course
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Pagination */}
      {filteredCourses.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-gray-600">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredCourses.length}</span> of{' '}
              <span className="font-medium">45</span> courses
            </p>

            <div className="flex items-center gap-2">
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
                3
              </button>

              <span className="px-2 text-gray-500">...</span>

              <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                5
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

export default TeacherCourses;