"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Plus, Filter, Search, Download, Upload,
  BarChart3, Award, CheckCircle, Clock,
  FileText, Edit, Trash2, Eye, Users,
  BookOpen, Calculator, TrendingUp, Filter as FilterIcon
} from "lucide-react";

const GradesManagementPage = () => {
  const [activeTab, setActiveTab] = useState("assignments");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Quick Stats
  const stats = [
    { title: "Active Assessments", value: "12", icon: FileText, color: "bg-blue-500" },
    { title: "Average Grades", value: "87%", icon: BarChart3, color: "bg-green-500" },
    { title: "Submitted Assessments", value: "45", icon: CheckCircle, color: "bg-purple-500" },
    { title: "Under Review", value: "8", icon: Clock, color: "bg-yellow-500" },
    { title: "Top Students", value: "15", icon: Award, color: "bg-red-500" },
  ];

  // Available Courses
  const courses = [
    { id: "all", name: "All Courses" },
    { id: 1, name: "Integrated Web Development" },
    { id: 2, name: "Advanced React.js" },
    { id: 3, name: "UI/UX Design" },
    { id: 4, name: "JavaScript from Scratch" },
  ];

  // Groups
  const groups = [
    { id: "all", name: "All Groups" },
    { id: 1, name: "Morning Group", courseId: 1 },
    { id: 2, name: "Evening Group", courseId: 1 },
    { id: 3, name: "Intensive Group", courseId: 2 },
    { id: 4, name: "Basic Group", courseId: 3 },
  ];

  // Assessments
  const assignments = [
    {
      id: 1,
      title: "Final HTML Exam",
      course: "Integrated Web Development",
      group: "Morning Group",
      type: "exam",
      totalPoints: 100,
      dueDate: "2024-03-15",
      submissions: 15,
      graded: 10,
      averageScore: 85,
      status: "grading"
    },
    {
      id: 2,
      title: "Final CSS Project",
      course: "Integrated Web Development",
      group: "Evening Group",
      type: "project",
      totalPoints: 150,
      dueDate: "2024-03-20",
      submissions: 12,
      graded: 12,
      averageScore: 92,
      status: "completed"
    },
    {
      id: 3,
      title: "First JavaScript Homework",
      course: "JavaScript from Scratch",
      group: "Basic Group",
      type: "homework",
      totalPoints: 50,
      dueDate: "2024-03-10",
      submissions: 20,
      graded: 18,
      averageScore: 78,
      status: "grading"
    },
    {
      id: 4,
      title: "Basic React Quiz",
      course: "Advanced React.js",
      group: "Intensive Group",
      type: "quiz",
      totalPoints: 80,
      dueDate: "2024-03-12",
      submissions: 18,
      graded: 15,
      averageScore: 88,
      status: "grading"
    },
    {
      id: 5,
      title: "Store Interface Design",
      course: "UI/UX Design",
      group: "Basic Group",
      type: "project",
      totalPoints: 200,
      dueDate: "2024-03-25",
      submissions: 10,
      graded: 5,
      averageScore: 90,
      status: "grading"
    }
  ];

  // Grades
  const grades = [
    {
      studentId: 1,
      studentName: "Ahmed Mohamed",
      course: "Integrated Web Development",
      group: "Morning Group",
      assignments: [
        { assignmentId: 1, title: "HTML Exam", score: 85, total: 100, weight: 30 },
        { assignmentId: 2, title: "CSS Project", score: 92, total: 150, weight: 40 },
        { assignmentId: 3, title: "Final Exam", score: 88, total: 100, weight: 30 }
      ],
      totalScore: 88.5,
      grade: "A",
      status: "completed"
    },
    {
      studentId: 2,
      studentName: "Sara Ali",
      course: "Integrated Web Development",
      group: "Morning Group",
      assignments: [
        { assignmentId: 1, title: "HTML Exam", score: 92, total: 100, weight: 30 },
        { assignmentId: 2, title: "CSS Project", score: 98, total: 150, weight: 40 },
        { assignmentId: 3, title: "Final Exam", score: 95, total: 100, weight: 30 }
      ],
      totalScore: 95.4,
      grade: "A+",
      status: "completed"
    },
    {
      studentId: 3,
      studentName: "Mohamed Khaled",
      course: "Integrated Web Development",
      group: "Evening Group",
      assignments: [
        { assignmentId: 1, title: "HTML Exam", score: 78, total: 100, weight: 30 },
        { assignmentId: 2, title: "CSS Project", score: 85, total: 150, weight: 40 },
        { assignmentId: 3, title: "Final Exam", score: 82, total: 100, weight: 30 }
      ],
      totalScore: 82.4,
      grade: "B",
      status: "completed"
    }
  ];

  const tabs = [
    { id: "assignments", label: "Assessments", icon: FileText },
    { id: "grades", label: "Grades", icon: BarChart3 },
    { id: "reports", label: "Reports", icon: TrendingUp },
    { id: "settings", label: "Assessment Settings", icon: FilterIcon }
  ];

  // Filter assignments
  const filteredAssignments = assignments.filter(assignment => {
    const matchesCourse = selectedCourse === "all" || assignment.course === courses.find(c => c.id === selectedCourse)?.name;
    const matchesGroup = selectedGroup === "all" || assignment.group === groups.find(g => g.id === selectedGroup)?.name;
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.course.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCourse && matchesGroup && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      grading: { color: "bg-yellow-100 text-yellow-800", label: "Grading" },
      completed: { color: "bg-green-100 text-green-800", label: "Completed" },
      pending: { color: "bg-blue-100 text-blue-800", label: "Pending" },
      overdue: { color: "bg-red-100 text-red-800", label: "Overdue" }
    };
    return statusConfig[status] || { color: "bg-gray-100 text-gray-800", label: "Undefined" };
  };

  const getTypeBadge = (type) => {
    const typeConfig = {
      exam: { color: "bg-red-100 text-red-800", label: "Exam" },
      quiz: { color: "bg-blue-100 text-blue-800", label: "Quiz" },
      homework: { color: "bg-green-100 text-green-800", label: "Homework" },
      project: { color: "bg-purple-100 text-purple-800", label: "Project" }
    };
    return typeConfig[type] || { color: "bg-gray-100 text-gray-800", label: "Assessment" };
  };

  const calculateGrade = (score) => {
    if (score >= 90) return { grade: "A+", color: "bg-green-500" };
    if (score >= 85) return { grade: "A", color: "bg-green-400" };
    if (score >= 80) return { grade: "B+", color: "bg-blue-500" };
    if (score >= 75) return { grade: "B", color: "bg-blue-400" };
    if (score >= 70) return { grade: "C+", color: "bg-yellow-500" };
    if (score >= 65) return { grade: "C", color: "bg-yellow-400" };
    if (score >= 60) return { grade: "D+", color: "bg-orange-500" };
    if (score >= 50) return { grade: "D", color: "bg-orange-400" };
    return { grade: "F", color: "bg-red-500" };
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Assessments and Grades</h1>
          <p className="text-gray-600 mt-2">Manage and evaluate student performance</p>
        </div>

        <div className="flex items-center space-x-3 rtl:space-x-reverse mt-4 lg:mt-0">
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors rtl:space-x-reverse">
            <Download size={18} />
            <span>Export Grades</span>
          </button>

          <Link href="/grades/new-assignment">
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors rtl:space-x-reverse">
              <Plus size={18} />
              <span>Create New Assessment</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, index) => {
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

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6 rtl:space-x-reverse overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap rtl:space-x-reverse ${activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Filters */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search assessments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Course Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>{course.name}</option>
                  ))}
                </select>
              </div>

              {/* Group Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Group</label>
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  {groups
                    .filter(group => selectedCourse === "all" || group.courseId === selectedCourse || group.id === "all")
                    .map(group => (
                      <option key={group.id} value={group.id}>{group.name}</option>
                    ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="w-full border border-gray-300 rounded-lg p-2">
                  <option value="all">All Statuses</option>
                  <option value="grading">Grading</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Assignments Tab */}
          {activeTab === "assignments" && (
            <div className="space-y-6">
              {/* Assignments Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredAssignments.map((assignment) => {
                  const statusBadge = getStatusBadge(assignment.status);
                  const typeBadge = getTypeBadge(assignment.type);

                  return (
                    <div key={assignment.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                      {/* Assignment Header */}
                      <div className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-gray-800">{assignment.title}</h3>
                            <p className="text-gray-600 text-sm mt-1">{assignment.course} • {assignment.group}</p>
                          </div>
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${typeBadge.color}`}>
                              {typeBadge.label}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusBadge.color}`}>
                              {statusBadge.label}
                            </span>
                          </div>
                        </div>

                        {/* Assignment Details */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-800">{assignment.totalPoints}</div>
                            <div className="text-sm text-gray-600">Total Score</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-800">{assignment.averageScore}%</div>
                            <div className="text-sm text-gray-600">Average</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-800">{assignment.submissions}</div>
                            <div className="text-sm text-gray-600">Submissions</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-800">{assignment.graded}</div>
                            <div className="text-sm text-gray-600">Graded</div>
                          </div>
                        </div>
                      </div>

                      {/* Assignment Actions */}
                      <div className="p-4 bg-gray-50">
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            <Clock size={14} className="inline ml-1" />
                            Due Date: {assignment.dueDate}
                          </div>

                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <Link href={`/grades/assignments/${assignment.id}`}>
                              <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 rtl:space-x-reverse">
                                <Eye size={16} />
                                <span className="text-sm">View</span>
                              </button>
                            </Link>

                            <Link href={`/grades/assignments/${assignment.id}/grade`}>
                              <button className="flex items-center space-x-1 text-green-600 hover:text-green-800 rtl:space-x-reverse">
                                <Edit size={16} />
                                <span className="text-sm">Grade</span>
                              </button>
                            </Link>

                            <button className="flex items-center space-x-1 text-red-600 hover:text-red-800 rtl:space-x-reverse">
                              <Trash2 size={16} />
                              <span className="text-sm">Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Empty State */}
              {filteredAssignments.length === 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                  <FileText size={64} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No assessments found</h3>
                  <p className="text-gray-500 mb-6">No assessments found matching search criteria</p>
                  <Link href="/grades/new-assignment">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Create First Assessment
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Grades Tab */}
          {activeTab === "grades" && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Group</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assessments</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {grades.map((student) => {
                        const gradeInfo = calculateGrade(student.totalScore);

                        return (
                          <tr key={student.studentId} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="ml-4">
                                  <div className="font-medium text-gray-900">{student.studentName}</div>
                                  <div className="text-sm text-gray-500">ID: {student.studentId}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900">{student.course}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900">{student.group}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="space-y-1">
                                {student.assignments.map((assignment, idx) => (
                                  <div key={idx} className="text-xs flex justify-between">
                                    <span>{assignment.title}</span>
                                    <span className="font-medium">
                                      {assignment.score}/{assignment.total}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <div className="text-xl font-bold text-gray-800">{student.totalScore}%</div>
                                <div className={`w-3 h-3 rounded-full ${gradeInfo.color}`}></div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 text-sm font-bold rounded-full ${gradeInfo.color} text-white`}>
                                {gradeInfo.grade}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2 rtl:space-x-reverse">
                                <Link href={`/grades/students/${student.studentId}`}>
                                  <button className="text-blue-600 hover:text-blue-800">
                                    <Eye size={16} />
                                  </button>
                                </Link>
                                <button className="text-green-600 hover:text-green-800">
                                  <Edit size={16} />
                                </button>
                                <button className="text-purple-600 hover:text-purple-800">
                                  <Download size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Grade Distribution Chart */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Grade Distribution</h3>
                <div className="grid grid-cols-5 gap-4">
                  {['A+', 'A', 'B', 'C', 'F'].map((grade, index) => {
                    const colors = ['bg-green-500', 'bg-green-400', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500'];
                    const counts = [5, 8, 12, 6, 2];
                    const total = counts.reduce((a, b) => a + b, 0);
                    const percentage = (counts[index] / total) * 100;

                    return (
                      <div key={grade} className="text-center">
                        <div className="mb-2">
                          <div className="text-2xl font-bold text-gray-800">{counts[index]}</div>
                          <div className="text-sm text-gray-600">Student</div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div
                            className={`h-4 rounded-full ${colors[index]}`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="mt-2">
                          <span className={`px-2 py-1 text-xs font-bold rounded-full ${colors[index]} text-white`}>
                            {grade}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === "reports" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Performance Report */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Performance Report</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Integrated Web Development</span>
                        <span>88%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Advanced React.js</span>
                        <span>92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>UI/UX Design</span>
                        <span>76%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '76%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Assignment Statistics */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Assessment Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">85%</div>
                      <div className="text-sm text-gray-600">Average Grades</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">92%</div>
                      <div className="text-sm text-gray-600">Completion Rate</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">8</div>
                      <div className="text-sm text-gray-600">Under Review</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">3</div>
                      <div className="text-sm text-gray-600">Late</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Grading System Settings</h3>

                <div className="space-y-6">
                  {/* Grading Scale */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Grading Scale</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">A+</span>
                            <span className="font-medium">90% - 100%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">A</span>
                            <span className="font-medium">85% - 89%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">B+</span>
                            <span className="font-medium">80% - 84%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">B</span>
                            <span className="font-medium">75% - 79%</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">C+</span>
                            <span className="font-medium">70% - 74%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">C</span>
                            <span className="font-medium">65% - 69%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">D+</span>
                            <span className="font-medium">60% - 64%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">F</span>
                            <span className="font-medium">Less than 60%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notification Settings */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Notification Settings</h4>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Assessment Submission Notifications</span>
                        <input type="checkbox" className="text-blue-600" defaultChecked />
                      </label>
                      <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">New Grade Notifications</span>
                        <input type="checkbox" className="text-blue-600" defaultChecked />
                      </label>
                      <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">Deadline Reminders</span>
                        <input type="checkbox" className="text-blue-600" defaultChecked />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GradesManagementPage;