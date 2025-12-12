"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Edit, Share2, Download, MoreVertical,
  BookOpen, Users, Calendar, Clock, DollarSign,
  MapPin, Video, FileText, BarChart3, MessageSquare,
  CheckCircle, XCircle, AlertCircle, TrendingUp,
  ChevronRight, Users2, Building, Target, Award,
  Star, Eye, Trash2, Copy, Settings, Grid, List,
  Plus, Filter, Search, RefreshCw, ExternalLink,
  FileCheck, ClipboardList, PenTool, Upload,
  CheckSquare, AlertTriangle, Timer
} from "lucide-react";

// Mock course data moved outside component to be static
const mockCourse = {
  id: "1", // Example ID
  title: "Integrated Web Development Course",
  description: "A comprehensive course covering HTML, CSS, JavaScript, React, and Node.js. Learn web development from scratch and build real-world projects.",
  instructor: "John Doe",
  category: "Web Development",
  level: "Beginner to Advanced",
  duration: "12 weeks",
  totalLessons: 36,
  totalHours: 72,
  price: 2500,
  currency: "EGP",
  status: "published",
  createdAt: "2024-01-01",
  updatedAt: "2024-02-15",
  enrollmentCount: 45,
  maxStudents: 60,
  rating: 4.8,
  reviews: 128,

  // Course details
  objectives: [
    "Master HTML5 semantic elements",
    "Learn CSS Grid and Flexbox",
    "Build dynamic web applications with JavaScript",
    "Create responsive React applications",
    "Develop backend APIs with Node.js",
    "Deploy full-stack applications"
  ],

  requirements: [
    "Basic computer skills",
    "No programming experience required",
    "Dedication to complete assignments",
    "Internet connection"
  ],

  // Course statistics
  stats: {
    completionRate: 78,
    avgGrade: 85,
    attendanceRate: 92,
    satisfactionRate: 94
  },

  // Schedule
  schedule: {
    type: "weekly",
    days: ["Monday", "Wednesday", "Friday"],
    time: "18:00 - 20:00",
    timezone: "GMT+2"
  },

  // Groups in this course
  groups: [
    {
      id: 1,
      name: "Morning Group",
      schedule: "Sat, Mon, Wed - 10:00 AM",
      students: 15,
      maxStudents: 20,
      price: 1500,
      status: "active",
      startDate: "2024-03-01",
      endDate: "2024-05-24"
    },
    {
      id: 2,
      name: "Evening Group",
      schedule: "Sat, Mon, Wed - 6:00 PM",
      students: 18,
      maxStudents: 25,
      price: 1800,
      status: "active",
      startDate: "2024-03-05",
      endDate: "2024-05-28"
    },
    {
      id: 3,
      name: "Intensive Group",
      schedule: "Daily - 2:00 PM",
      students: 12,
      maxStudents: 15,
      price: 2500,
      status: "full",
      startDate: "2024-03-10",
      endDate: "2024-05-15"
    }
  ],

  // Lessons/modules
  lessons: [
    {
      id: 1,
      title: "HTML5 & Semantic Web",
      description: "Learn modern HTML5 and semantic markup",
      duration: "4 hours",
      type: "video",
      status: "published",
      order: 1,
      resources: 3,
      assignments: 2
    },
    {
      id: 2,
      title: "CSS Fundamentals & Flexbox",
      description: "Master CSS styling and Flexbox layout",
      duration: "6 hours",
      type: "video",
      status: "published",
      order: 2,
      resources: 4,
      assignments: 3
    },
    {
      id: 3,
      title: "JavaScript Basics",
      description: "Introduction to JavaScript programming",
      duration: "8 hours",
      type: "video",
      status: "published",
      order: 3,
      resources: 5,
      assignments: 4
    }
  ],

  // Assignments Data
  assignments: [
    {
      id: 1,
      title: "HTML Portfolio Website",
      description: "Create a personal portfolio website using HTML5 semantic elements",
      dueDate: "2024-02-25",
      submissions: 42,
      totalStudents: 45,
      status: "grading",
      averageGrade: 85,
      type: "project",
      points: 100,
      lessonId: 1
    },
    {
      id: 2,
      title: "CSS Grid Layout Exercise",
      description: "Build a responsive web page using CSS Grid layout",
      dueDate: "2024-03-03",
      submissions: 40,
      totalStudents: 45,
      status: "submitted",
      averageGrade: 78,
      type: "exercise",
      points: 50,
      lessonId: 2
    },
    {
      id: 3,
      title: "JavaScript Calculator",
      description: "Create a functional calculator using vanilla JavaScript",
      dueDate: "2024-03-10",
      submissions: 38,
      totalStudents: 45,
      status: "active",
      averageGrade: null,
      type: "project",
      points: 100,
      lessonId: 3
    },
    {
      id: 4,
      title: "React Todo App",
      description: "Build a todo application using React.js with state management",
      dueDate: "2024-03-17",
      submissions: 0,
      totalStudents: 45,
      status: "upcoming",
      averageGrade: null,
      type: "project",
      points: 150,
      lessonId: 4
    }
  ],

  // Enhanced Students Data
  students: [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      enrollmentDate: "2024-01-15",
      group: "Morning Group",
      progress: 85,
      attendance: 95,
      assignmentsSubmitted: 8,
      assignmentsGraded: 7,
      averageGrade: 88,
      status: "active",
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      name: "Sarah Williams",
      email: "sarah.w@example.com",
      enrollmentDate: "2024-01-20",
      group: "Evening Group",
      progress: 92,
      attendance: 100,
      assignmentsSubmitted: 9,
      assignmentsGraded: 9,
      averageGrade: 94,
      status: "active",
      lastActive: "1 day ago"
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.b@example.com",
      enrollmentDate: "2024-01-25",
      group: "Intensive Group",
      progress: 78,
      attendance: 85,
      assignmentsSubmitted: 6,
      assignmentsGraded: 5,
      averageGrade: 76,
      status: "active",
      lastActive: "3 days ago"
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.d@example.com",
      enrollmentDate: "2024-02-01",
      group: "Evening Group",
      progress: 65,
      attendance: 90,
      assignmentsSubmitted: 5,
      assignmentsGraded: 4,
      averageGrade: 72,
      status: "at-risk",
      lastActive: "1 week ago"
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.w@example.com",
      enrollmentDate: "2024-02-05",
      group: "Morning Group",
      progress: 45,
      attendance: 70,
      assignmentsSubmitted: 3,
      assignmentsGraded: 2,
      averageGrade: 65,
      status: "inactive",
      lastActive: "2 weeks ago"
    }
  ],

  // Recent activities
  recentActivities: [
    {
      id: 1,
      type: "enrollment",
      message: "5 new students enrolled",
      time: "2 hours ago",
      icon: "Users"
    },
    {
      id: 2,
      type: "assignment",
      message: "Assignment #3 submissions received",
      time: "1 day ago",
      icon: "FileText"
    },
    {
      id: 3,
      type: "lesson",
      message: "Lesson 4 published",
      time: "2 days ago",
      icon: "Video"
    },
    {
      id: 4,
      type: "payment",
      message: "Monthly revenue: 15,000 EGP",
      time: "3 days ago",
      icon: "DollarSign"
    }
  ]
};

const CourseDetails = () => {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId;

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    // Simulate API call
    const fetchCourseDetails = async () => {
      setLoading(true);
      setTimeout(() => {
        // In a real app, verify if courseId matches to avoid using stale props
        setCourse({ ...mockCourse, id: courseId });
        setLoading(false);
      }, 1000);
    };

    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  const handleDeleteCourse = () => {
    if (confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      console.log("Deleting course:", courseId);
      router.push("/courses");
    }
  };

  const handleDuplicateCourse = () => {
    console.log("Duplicating course:", courseId);
  };

  const handleShareCourse = () => {
    const shareUrl = `${window.location.origin}/courses/${courseId}`;
    navigator.clipboard.writeText(shareUrl);
    alert("Course link copied to clipboard!");
  };

  const getStatusColor = (status) => {
    const colors = {
      published: "bg-green-100 text-green-800",
      draft: "bg-blue-100 text-blue-800",
      pending: "bg-yellow-100 text-yellow-800",
      inactive: "bg-red-100 text-red-800",
      full: "bg-purple-100 text-purple-800",
      active: "bg-green-100 text-green-800",
      "at-risk": "bg-yellow-100 text-yellow-800",
      grading: "bg-blue-100 text-blue-800",
      submitted: "bg-green-100 text-green-800",
      upcoming: "bg-gray-100 text-gray-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusLabel = (status) => {
    const labels = {
      published: "Active",
      draft: "Draft",
      pending: "Pending",
      inactive: "Inactive",
      full: "Full",
      active: "Active",
      "at-risk": "At Risk",
      grading: "Grading",
      submitted: "Submitted",
      upcoming: "Upcoming"
    };
    return labels[status] || status;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-4">
              <div className="h-48 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Course not found</h3>
          <p className="text-gray-500 mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <Link href="/courses">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Back to Courses
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Safe accessors to prevent crashes
  const assignments = course?.assignments || [];
  const lessons = course?.lessons || [];
  const students = course?.students || [];
  const groups = course?.groups || [];
  const objectives = course?.objectives || [];
  const requirements = course?.requirements || [];
  const recentActivities = course?.recentActivities || [];

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4">
      {/* Header with Back Button and Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/courses">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft size={20} />
            </button>
          </Link>

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-800">{course.title}</h1>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(course.status)}`}>
                {getStatusLabel(course.status)}
              </span>
            </div>
            <p className="text-gray-600 mt-1">Course ID: {course.id} • Created: {course.createdAt}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Actions */}
          <div className="relative">
            <button
              onClick={() => setShowActionsMenu(!showActionsMenu)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <MoreVertical size={18} />
              <span>Actions</span>
            </button>

            {showActionsMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <Link href={`/courses/${courseId}/edit`}>
                  <button className="flex items-center gap-2 w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors">
                    <Edit size={16} />
                    <span>Edit Course</span>
                  </button>
                </Link>

                <button
                  onClick={handleDuplicateCourse}
                  className="flex items-center gap-2 w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors"
                >
                  <Copy size={16} />
                  <span>Duplicate Course</span>
                </button>

                <button
                  onClick={handleShareCourse}
                  className="flex items-center gap-2 w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors"
                >
                  <Share2 size={16} />
                  <span>Share Course Link</span>
                </button>

                <div className="border-t border-gray-200">
                  <button
                    onClick={() => console.log("Export data")}
                    className="flex items-center gap-2 w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors"
                  >
                    <Download size={16} />
                    <span>Export Course Data</span>
                  </button>
                </div>

                <div className="border-t border-gray-200">
                  <button
                    onClick={handleDeleteCourse}
                    className="flex items-center gap-2 w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                    <span>Delete Course</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <Link href={`/courses/${courseId}/edit`}>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Edit size={18} />
              <span>Edit Course</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {[
              { id: "overview", label: "Overview", icon: Eye },
              { id: "lessons", label: "Lessons", icon: BookOpen },
              { id: "assignments", label: "Assignments", icon: FileCheck },
              { id: "students", label: "Students", icon: Users },
              { id: "groups", label: "Groups", icon: Users2 }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-colors ${activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Overview */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Course Description */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Course Description</h3>
                <p className="text-gray-600 mb-6">{course.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{course.totalLessons}</div>
                    <div className="text-sm text-gray-600 mt-1">Lessons</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{course.totalHours}h</div>
                    <div className="text-sm text-gray-600 mt-1">Duration</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{course.enrollmentCount}</div>
                    <div className="text-sm text-gray-600 mt-1">Students</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{course.rating}/5</div>
                    <div className="text-sm text-gray-600 mt-1">Rating</div>
                  </div>
                </div>
              </div>

              {/* Course Objectives & Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Target size={20} />
                    Learning Objectives
                  </h3>
                  <ul className="space-y-2">
                    {objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle size={18} className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <AlertCircle size={20} />
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle size={18} className="text-blue-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">Recent Activities</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    View All
                  </button>
                </div>

                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const Icon = {
                      Users: Users,
                      FileText: FileText,
                      Video: Video,
                      DollarSign: DollarSign
                    }[activity.icon] || AlertCircle;

                    return (
                      <div key={activity.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Icon size={20} className="text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{activity.message}</p>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Lessons Tab */}
          {activeTab === "lessons" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Course Lessons</h3>
                    <p className="text-gray-600 text-sm mt-1">{lessons.length} lessons • {course.totalHours} total hours</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {viewMode === "grid" ? <List size={20} /> : <Grid size={20} />}
                    </button>

                    <Link href={`/courses/${courseId}/lessons/new`}>
                      <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <Plus size={18} />
                        <span>Add Lesson</span>
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Lessons Grid/List */}
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {lessons.map((lesson) => (
                      <div key={lesson.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                Lesson {lesson.order}
                              </span>
                              <span className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(lesson.status)}`}>
                                {getStatusLabel(lesson.status)}
                              </span>
                            </div>
                            <h4 className="font-bold text-gray-800">{lesson.title}</h4>
                          </div>
                          <Video size={20} className="text-gray-400" />
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{lesson.description}</p>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {lesson.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <FileText size={14} />
                              {lesson.resources} resources
                            </span>
                          </div>

                          <Link href={`/courses/${courseId}/lessons/${lesson.id}`}>
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              View Details
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {lessons.map((lesson) => (
                      <div key={lesson.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="font-bold text-blue-600">{lesson.order}</span>
                          </div>

                          <div>
                            <h4 className="font-bold text-gray-800">{lesson.title}</h4>
                            <p className="text-gray-600 text-sm">{lesson.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock size={14} />
                                {lesson.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <FileText size={14} />
                                {lesson.resources} resources
                              </span>
                              <span className="flex items-center gap-1">
                                <Award size={14} />
                                {lesson.assignments} assignments
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Link href={`/courses/${courseId}/lessons/${lesson.id}`}>
                            <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                              Edit
                            </button>
                          </Link>
                          <Link href={`/courses/${courseId}/lessons/${lesson.id}`}>
                            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                              View
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Link href={`/courses/${courseId}/lessons`}>
                    <button className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      View All Lessons and Manage Curriculum
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Assignments Tab */}
          {activeTab === "assignments" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Course Assignments</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {assignments.length} assignments • {
                        assignments.filter(a => a.status === "grading").length
                      } need grading
                    </p>
                  </div>

                  <Link href={`/courses/${courseId}/assignments/new`}>
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      <Plus size={18} />
                      <span>Create Assignment</span>
                    </button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {assignments.map((assignment) => (
                    <div key={assignment.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <h4 className="font-bold text-gray-800">{assignment.title}</h4>
                          <span className={`text-xs px-2 py-1 rounded font-medium ${assignment.status === "grading" ? "bg-red-100 text-red-800" :
                            assignment.status === "active" ? "bg-green-100 text-green-800" :
                              "bg-gray-100 text-gray-800"
                            }`}>
                            {getStatusLabel(assignment.status)}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">Due: {assignment.dueDate}</span>
                      </div>

                      <p className="text-gray-600 text-sm mb-3">{assignment.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Users size={14} />
                            {assignment.submissions}/{assignment.totalStudents} submitted
                          </span>
                          <span className="flex items-center gap-1">
                            <Award size={14} />
                            {assignment.points} points
                          </span>
                        </div>

                        <Link href={`/courses/${courseId}/assignments/${assignment.id}`}>
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Manage
                          </button>
                        </Link>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-3 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Students Tab */}
          {activeTab === "students" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Course Students</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {students.length} students • {
                        students.filter(s => s.status === "active").length
                      } active • {
                        students.filter(s => s.status === "at-risk").length
                      } at risk
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        placeholder="Search students..."
                        className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">
                      <Filter size={18} />
                    </button>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600">
                      <Download size={18} />
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {students.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                <div className="text-sm text-gray-500">{student.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">{student.group}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="w-full max-w-[100px]">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span>{student.progress}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${student.progress >= 80 ? "bg-green-500" :
                                    student.progress >= 50 ? "bg-yellow-500" : "bg-red-500"
                                    }`}
                                  style={{ width: `${student.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600">{student.progress}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">{student.averageGrade}%</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${student.status === "active" ? "bg-green-100 text-green-800" :
                              student.status === "at-risk" ? "bg-red-100 text-red-800" :
                                "bg-gray-100 text-gray-800"
                              }`}>
                              {getStatusLabel(student.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <Link href={`/students/${student.id}`}>
                              <button className="text-blue-600 hover:text-blue-900">View Profile</button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Groups Tab */}
          {activeTab === "groups" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Course Groups</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {groups.length} groups • {groups.reduce((sum, group) => sum + (group.students || 0), 0)} total students
                    </p>
                  </div>

                  <Link href={`/courses/${courseId}/groups/new`}>
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      <Plus size={18} />
                      <span>Add Group</span>
                    </button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {groups.map((group) => (
                    <div key={group.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-bold text-lg text-gray-800">{group.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">{group.schedule}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${group.status === "active" ? "bg-green-100 text-green-800" : "bg-purple-100 text-purple-800"
                          }`}>
                          {getStatusLabel(group.status)}
                        </span>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 flex items-center gap-2">
                            <Users size={16} /> Students
                          </span>
                          <span className="font-medium text-gray-900">{group.students}/{group.maxStudents}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(group.students / group.maxStudents) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 flex items-center gap-2">
                            <Calendar size={16} /> Duration
                          </span>
                          <span className="font-medium text-gray-900">{group.startDate} - {group.endDate}</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button className="flex-1 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                          View Schedule
                        </button>
                        <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                          Manage Group
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Stats & Info */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-800 mb-4">Course Performance</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Completion Rate</span>
                  <span className="font-medium text-green-600">{course.stats?.completionRate}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${course.stats?.completionRate}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Average Grade</span>
                  <span className="font-medium text-blue-600">{course.stats?.avgGrade}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${course.stats?.avgGrade}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Student Satisfaction</span>
                  <span className="font-medium text-purple-600">{course.stats?.satisfactionRate}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${course.stats?.satisfactionRate}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Instructor Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-800 mb-4">Instructor</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 bg-gray-200 rounded-full">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructor}`}
                  alt={course.instructor}
                  className="rounded-full"
                />
              </div>
              <div>
                <div className="font-medium text-gray-900">{course.instructor}</div>
                <div className="text-sm text-gray-500">Senior Instructor</div>
              </div>
            </div>
            <button className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700">
              View Profile
            </button>
          </div>

          {/* Schedule Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-gray-800 mb-4">Schedule Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Calendar size={18} className="text-gray-400 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">{course.schedule?.days.join(", ")}</div>
                  <div className="text-gray-500">Days</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-gray-400 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">{course.schedule?.time}</div>
                  <div className="text-gray-500">{course.schedule?.timezone}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;