"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen, Users, DollarSign, Calendar,
  TrendingUp, Clock, CheckCircle, AlertCircle,
  ArrowUpRight, ArrowDownRight, MessageSquare,
  FileText, Video, Download, Settings,
  Plus, BarChart3, Bell, Search,
  ChevronRight, Grid, List, Filter,
  Edit2, Trash2, X, Save
} from "lucide-react";
import { MoodResults } from "@/components/DashboardComponents/teacher/mood-results";
import { MoodCard } from "@/components/DashboardComponents/teacher/mood-card";
import StudentMoodTracker from "@/components/DashboardComponents/teacher/StudentMoodTracker";
import UpcomingClasses from "@/components/DashboardComponents/teacher/UpcomingClasses";
import StatsCards from "@/components/DashboardComponents/teacher/StatsCards";
import StudentCard from "@/components/DashboardComponents/teacher/StudentCard";
import TeacherListItem from "@/components/DashboardComponents/teacher/TeacherListItem";

export default function TeacherDashboard() {
  const [timeRange, setTimeRange] = useState("week");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock Data (will be replaced by API)
  const [dashboardData, setDashboardData] = useState({
    // Stats
    stats: {
      enrolledCourses: 13,
      totalStudents: 156,
      activeCourses: 8,
      totalCourses: 11,
      completedCourses: 6,
      totalEarnings: 45200,
      monthlyEarnings: 12500,
      attendanceRate: 78
    },

    // Active Students
    activeStudents: [
      {
        id: 1,
        name: "Ahmed Mohamed",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed",
        location: "Cairo",
        joinDate: "Jan 15, 2024",
        coursesEnrolled: 3,
        status: "active"
      },
      {
        id: 2,
        name: "Sarah Ali",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sara",
        location: "Alexandria",
        joinDate: "Jan 10, 2024",
        coursesEnrolled: 2,
        status: "active"
      },
      {
        id: 3,
        name: "Mohamed Khaled",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=mohamed",
        location: "Giza",
        joinDate: "Jan 5, 2024",
        coursesEnrolled: 4,
        status: "active"
      },
      {
        id: 4,
        name: "Fatima Abdullah",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=fatima",
        location: "Mansoura",
        joinDate: "Dec 20, 2023",
        coursesEnrolled: 2,
        status: "active"
      },
      {
        id: 5,
        name: "Khaled Saeed",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=khaled",
        location: "Alexandria",
        joinDate: "Dec 12, 2023",
        coursesEnrolled: 3,
        status: "inactive"
      }
    ],

    // Upcoming Classes
    upcomingClasses: [
      {
        id: 1,
        title: "Advanced HTML - Session 3",
        date: "2024-01-15",
        time: "10:00 - 11:30",
        type: "online",
        teacher: "You",
        studentsCount: 15
      },
      {
        id: 2,
        title: "CSS Grid - Practical Apps",
        date: "2024-01-15",
        time: "14:00 - 15:30",
        type: "offline",
        teacher: "You",
        studentsCount: 12,
        location: "Hall 303"
      },
      {
        id: 3,
        title: "JavaScript Basics",
        date: "2024-01-16",
        time: "09:00 - 10:30",
        type: "online",
        teacher: "You",
        studentsCount: 18
      }
    ],

    // Mood Data
    moodData: [
      { mood: 4.2, energy: 75, timestamp: "2024-01-15T10:00:00", type: "before" },
      { mood: 4.5, energy: 80, timestamp: "2024-01-14T14:00:00", type: "after" },
      { mood: 3.8, energy: 65, timestamp: "2024-01-13T09:00:00", type: "before" },
      { mood: 4.0, energy: 70, timestamp: "2024-01-12T16:00:00", type: "after" },
      { mood: 3.5, energy: 60, timestamp: "2024-01-11T11:00:00", type: "before" }
    ],

    // Notifications
    notifications: [
      { id: 1, type: "assignment", message: "3 new assignments need grading", time: "2 hours", priority: "high" },
      { id: 2, type: "payment", message: "New payment received: 1500 EGP", time: "4 hours", priority: "medium" },
      { id: 3, type: "student", message: "New student joined React course", time: "1 day", priority: "low" },
      { id: 4, type: "lesson", message: "Need to prepare tomorrow's lesson", time: "1 day", priority: "high" }
    ],

    // Tasks
    tasks: [
      { id: 1, title: "Grade HTML assignments", course: "Web Development", dueDate: "Tomorrow", completed: false },
      { id: 2, title: "Prepare CSS lesson", course: "Web Development", dueDate: "Day after tomorrow", completed: true },
      { id: 3, title: "Review student projects", course: "React", dueDate: "Thursday", completed: false }
    ]
  });

  // Task Management State
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", course: "General", dueDate: "Today" });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskData, setEditTaskData] = useState({});

  const handleAddTask = () => {
    if (!newTask.title) return;
    const task = {
      id: Date.now(),
      ...newTask,
      completed: false
    };
    setDashboardData(prev => ({
      ...prev,
      tasks: [task, ...prev.tasks]
    }));
    setNewTask({ title: "", course: "General", dueDate: "Today" });
    setIsAddingTask(false);
  };

  const handleDeleteTask = (taskId) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setDashboardData(prev => ({
        ...prev,
        tasks: prev.tasks.filter(t => t.id !== taskId)
      }));
    }
  };

  const handleStartEdit = (task) => {
    setEditingTaskId(task.id);
    setEditTaskData({ ...task });
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditTaskData({});
  };

  const handleSaveEdit = () => {
    setDashboardData(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === editingTaskId ? { ...t, ...editTaskData } : t)
    }));
    setEditingTaskId(null);
    setEditTaskData({});
  };

  // Simulated API fetch
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      // API call would go here
      // const response = await fetch('/api/teacher/dashboard');
      // const data = await response.json();

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    fetchDashboardData();
  }, [timeRange]);

  // Filter keys
  const filteredStudents = dashboardData.activeStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle Task Completion
  const handleTaskToggle = (taskId) => {
    setDashboardData(prev => ({
      ...prev,
      tasks: prev.tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }));
  };

  // Sort tasks: Incomplete first, then completed
  const sortedTasks = [...dashboardData.tasks].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="ltr">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Teacher Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome, here is an overview of your performance and activities</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for student or course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=teacher"
                alt="Teacher"
                className="w-10 h-10 rounded-full"
              />
              <div className="hidden md:block">
                <p className="font-medium">Ahmed (Teacher)</p>
                <p className="text-sm text-gray-500">Web Development Teacher</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-7xl mx-auto">
        {/* Quick Stats */}
        <StatsCards />

        {/* Notifications & Alerts (Section 2) */}
        <div className="mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Notifications & Alerts</h2>
                <span className="text-sm text-gray-600">3 New</span>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {dashboardData.notifications.map((notification) => (
                <div key={notification.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 ${notification.priority === 'high' ? 'text-red-500' :
                      notification.priority === 'medium' ? 'text-yellow-500' :
                        'text-blue-500'
                      }`}>
                      <AlertCircle size={20} />
                    </div>

                    <div className="flex-1">
                      <p className="text-gray-800">{notification.message}</p>
                      <p className="text-sm text-gray-500 mt-1">{notification.time} ago</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200">
              <Link
                href="/notifications"
                className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <span>View All Notifications</span>
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Student Mood Analysis (Full Width) */}
        <div className="mb-6">
          <MoodResults
            results={dashboardData.moodData}
            title="Student Mood Analysis"
            showExport={true}
            onRefresh={() => console.log('Refresh clicked')}
          />
        </div>

        {/* Active Students (Full Width) */}
        <div className="mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Active Students</h2>
                  <p className="text-gray-600 text-sm mt-1">Latest students enrolled in your courses</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-400"}`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "text-gray-400"}`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>

            {viewMode === "grid" ? (
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredStudents.slice(0, 4).map((student) => (
                  <StudentCard key={student.id} student={student} />
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Student</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Location</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Join Date</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Courses</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredStudents.slice(0, 5).map((student) => (
                      <TeacherListItem key={student.id} student={student} />
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="p-4 border-t border-gray-200">
              <Link
                href="/students"
                className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <span>View All Students</span>
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Upcoming Classes Full Width */}
        <div className="mb-6">
          <UpcomingClasses
            classes={dashboardData.upcomingClasses}
            role="teacher"
          />
        </div>

        {/* Remaining Items Grid - 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Urgent Tasks + Student Mood Tracker */}
          <div className="space-y-6">

            {/* Urgent Tasks */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">Urgent Tasks</h2>
                  <span className="text-sm text-gray-600">{dashboardData.tasks.filter(t => t.completed).length} Completed</span>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {/* Add Task Form */}
                {isAddingTask && (
                  <div className="p-4 bg-blue-50 animate-fadeIn">
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Task Title"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Course/Category"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          value={newTask.course}
                          onChange={(e) => setNewTask({ ...newTask, course: e.target.value })}
                        />
                        <input
                          type="text"
                          placeholder="Due Date"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          value={newTask.dueDate}
                          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                        />
                      </div>
                      <div className="flex justify-end gap-2 mt-2">
                        <button
                          onClick={() => setIsAddingTask(false)}
                          className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-200 rounded-lg"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleAddTask}
                          disabled={!newTask.title}
                          className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                          Save Task
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Task List */}
                {sortedTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 transition-all duration-200 group ${task.completed ? 'bg-gray-50' : 'hover:bg-gray-50'
                      }`}
                  >
                    {editingTaskId === task.id ? (
                      // Edit Mode
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editTaskData.title}
                          onChange={(e) => setEditTaskData({ ...editTaskData, title: e.target.value })}
                          className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editTaskData.course}
                            onChange={(e) => setEditTaskData({ ...editTaskData, course: e.target.value })}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                          <input
                            type="text"
                            value={editTaskData.dueDate}
                            onChange={(e) => setEditTaskData({ ...editTaskData, dueDate: e.target.value })}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={handleCancelEdit}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                            title="Cancel"
                          >
                            <X size={18} />
                          </button>
                          <button
                            onClick={handleSaveEdit}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                            title="Save"
                          >
                            <Save size={18} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={task.completed}
                              className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                              onChange={() => handleTaskToggle(task.id)}
                            />
                          </label>

                          <div className="flex-1">
                            <h4 className={`font-medium transition-all ${task.completed ? 'text-gray-500 line-through decoration-gray-400' : 'text-gray-800'
                              }`}>
                              {task.title}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">{task.course} • {task.dueDate}</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!task.completed && (
                            <button
                              onClick={() => handleStartEdit(task)}
                              className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        {/* Status Icon */}
                        <div className="group-hover:hidden ml-2">
                          {task.completed ? (
                            <CheckCircle size={20} className="text-green-500" />
                          ) : (
                            <div className="flex items-center gap-2 text-yellow-500 bg-yellow-50 px-3 py-1 rounded-full text-xs font-medium">
                              <Clock size={16} />
                              <span className="hidden sm:inline">Pending</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {!isAddingTask && (
                <div className="p-4 border-t border-gray-200">
                  <button
                    onClick={() => setIsAddingTask(true)}
                    className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Plus size={18} />
                    <span>Add New Task</span>
                  </button>
                </div>
              )}
            </div>

            {/* Student Mood Tracker */}
            <StudentMoodTracker />
          </div>

          {/* Right Column: Quick Actions + Recent Mood */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>

              <div className="grid grid-cols-2 gap-4">
                <Link href="/courses/new">
                  <button className="bg-blue-50 border border-blue-200 rounded-xl p-4 hover:bg-blue-100 transition-colors w-full text-left h-32 flex flex-col justify-between group">
                    <div className="flex items-center justify-between mb-2">
                      <BookOpen size={24} className="text-blue-600 group-hover:scale-110 transition-transform" />
                      <span className="text-blue-700 font-medium text-sm">New Course</span>
                    </div>
                    <p className="text-xs text-gray-600">Create a new educational course</p>
                  </button>
                </Link>

                <Link href="/lesson-builder">
                  <button className="bg-green-50 border border-green-200 rounded-xl p-4 hover:bg-green-100 transition-colors w-full text-left h-32 flex flex-col justify-between group">
                    <div className="flex items-center justify-between mb-2">
                      <FileText size={24} className="text-green-600 group-hover:scale-110 transition-transform" />
                      <span className="text-green-700 font-medium text-sm">New Lesson</span>
                    </div>
                    <p className="text-xs text-gray-600">Create new lesson content</p>
                  </button>
                </Link>

                <Link href="/schedule">
                  <button className="bg-purple-50 border border-purple-200 rounded-xl p-4 hover:bg-purple-100 transition-colors w-full text-left h-32 flex flex-col justify-between group">
                    <div className="flex items-center justify-between mb-2">
                      <Calendar size={24} className="text-purple-600 group-hover:scale-110 transition-transform" />
                      <span className="text-purple-700 font-medium text-sm">Schedule</span>
                    </div>
                    <p className="text-xs text-gray-600">Manage your schedule</p>
                  </button>
                </Link>

                <Link href="/analytics">
                  <button className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 hover:bg-yellow-100 transition-colors w-full text-left h-32 flex flex-col justify-between group">
                    <div className="flex items-center justify-between mb-2">
                      <BarChart3 size={24} className="text-yellow-600 group-hover:scale-110 transition-transform" />
                      <span className="text-yellow-700 font-medium text-sm">Reports</span>
                    </div>
                    <p className="text-xs text-gray-600">View reports and stats</p>
                  </button>
                </Link>
              </div>
            </div>

            {/* Recent Mood Cards */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Ratings</h2>
              <div className="space-y-4">
                <MoodCard
                  mood={4.5}
                  energy={85}
                  timestamp="2024-01-15T10:00:00"
                  type="before"
                  title="Before Class"
                  description="Great mood and high energy"
                  compact={true}
                />
                <MoodCard
                  mood={3.8}
                  energy={65}
                  timestamp="2024-01-14T14:00:00"
                  type="after"
                  title="After Class"
                  description="Successful teaching session"
                  compact={true}
                />
              </div>
              <Link
                href="/mood-tracker"
                className="mt-4 flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
              >
                <span>View All Ratings</span>
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-blue-600 mb-2">{dashboardData.stats.totalStudents}</div>
            <div className="text-sm font-medium text-gray-500">Total Students</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-green-600 mb-2">{dashboardData.stats.activeCourses}</div>
            <div className="text-sm font-medium text-gray-500">Active Courses</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-purple-600 mb-2">{dashboardData.stats.attendanceRate}%</div>
            <div className="text-sm font-medium text-gray-500">Attendance Rate</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-yellow-600 mb-2">{dashboardData.stats.totalEarnings.toLocaleString()} EGP</div>
            <div className="text-sm font-medium text-gray-500">Yearly Earnings</div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 md:hidden z-10">
        <div className="flex justify-around p-4">
          <Link href="/" className="flex flex-col items-center text-blue-600">
            <Grid size={24} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link href="/courses" className="flex flex-col items-center text-gray-600">
            <BookOpen size={24} />
            <span className="text-xs mt-1">Courses</span>
          </Link>
          <Link href="/schedule" className="flex flex-col items-center text-gray-600">
            <Calendar size={24} />
            <span className="text-xs mt-1">Schedule</span>
          </Link>
          <Link href="/students" className="flex flex-col items-center text-gray-600">
            <Users size={24} />
            <span className="text-xs mt-1">Students</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}