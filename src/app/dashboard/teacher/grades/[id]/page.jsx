"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, Search, Filter, Download, Mail, Phone,
  Users, CheckCircle, Clock, AlertCircle, FileText,
  BarChart3, Eye, MessageSquare, Calendar, BookOpen,
  ChevronDown, ChevronUp, Award, Star, TrendingUp
} from "lucide-react";

const CourseStudentsPage = () => {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId;
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [expandedStudent, setExpandedStudent] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // list, grid, assignments

  // بيانات الكورس
  const course = {
    id: courseId,
    title: "تطوير الويب المتكامل",
    groups: ["المجموعة الصباحية", "المجموعة المسائية", "المجموعة المكثفة"],
    totalStudents: 45,
    activeStudents: 38,
    completionRate: "85%",
    averageGrade: "88%"
  };

  // بيانات الطلاب مع تفاصيل الواجبات
  const students = [
    {
      id: 1,
      name: "أحمد محمد",
      email: "ahmed@example.com",
      phone: "+201012345678",
      group: "المجموعة الصباحية",
      joinDate: "2024-01-15",
      status: "active",
      progress: 92,
      overallGrade: "A",
      assignments: [
        { id: 1, title: "واجب HTML الأول", dueDate: "2024-02-10", submittedDate: "2024-02-09", status: "submitted", grade: 45, maxGrade: 50, feedback: "عمل ممتاز" },
        { id: 2, title: "مشروع CSS النهائي", dueDate: "2024-02-20", submittedDate: "2024-02-18", status: "graded", grade: 140, maxGrade: 150, feedback: "إبداعي ومنظم" },
        { id: 3, title: "اختبار JavaScript", dueDate: "2024-03-01", submittedDate: "2024-02-28", status: "submitted", grade: null, maxGrade: 100, feedback: "" },
        { id: 4, title: "مشروع React", dueDate: "2024-03-15", submittedDate: null, status: "pending", grade: null, maxGrade: 200, feedback: "" }
      ],
      attendance: "95%",
      lastActivity: "منذ 2 ساعة",
      notes: "طالب مجتهد ومتابع"
    },
    {
      id: 2,
      name: "سارة علي",
      email: "sara@example.com",
      phone: "+201098765432",
      group: "المجموعة الصباحية",
      joinDate: "2024-01-16",
      status: "active",
      progress: 88,
      overallGrade: "B+",
      assignments: [
        { id: 1, title: "واجب HTML الأول", dueDate: "2024-02-10", submittedDate: "2024-02-10", status: "graded", grade: 42, maxGrade: 50, feedback: "جيد لكن يحتاج تحسين" },
        { id: 2, title: "مشروع CSS النهائي", dueDate: "2024-02-20", submittedDate: "2024-02-19", status: "graded", grade: 135, maxGrade: 150, feedback: "منظم لكن يفتقر للإبداع" },
        { id: 3, title: "اختبار JavaScript", dueDate: "2024-03-01", submittedDate: "2024-02-29", status: "graded", grade: 85, maxGrade: 100, feedback: "أداء جيد" },
        { id: 4, title: "مشروع React", dueDate: "2024-03-15", submittedDate: null, status: "pending", grade: null, maxGrade: 200, feedback: "" }
      ],
      attendance: "92%",
      lastActivity: "منذ يوم",
      notes: "متفوقة في التطبيقات العملية"
    },
    {
      id: 3,
      name: "محمد خالد",
      email: "mohamed@example.com",
      phone: "+201055555555",
      group: "المجموعة المسائية",
      joinDate: "2024-01-20",
      status: "active",
      progress: 75,
      overallGrade: "C+",
      assignments: [
        { id: 1, title: "واجب HTML الأول", dueDate: "2024-02-10", submittedDate: "2024-02-12", status: "late", grade: 38, maxGrade: 50, feedback: "متأخر - يحتاج تركيز أكثر" },
        { id: 2, title: "مشروع CSS النهائي", dueDate: "2024-02-20", submittedDate: null, status: "missed", grade: 0, maxGrade: 150, feedback: "لم يسلم" },
        { id: 3, title: "اختبار JavaScript", dueDate: "2024-03-01", submittedDate: "2024-03-02", status: "late", grade: 72, maxGrade: 100, feedback: "متأخر - يحتاج مراجعة" },
        { id: 4, title: "مشروع React", dueDate: "2024-03-15", submittedDate: null, status: "pending", grade: null, maxGrade: 200, feedback: "" }
      ],
      attendance: "80%",
      lastActivity: "منذ 3 أيام",
      notes: "يحتاج متابعة خاصة"
    },
    {
      id: 4,
      name: "فاطمة عبدالله",
      email: "fatima@example.com",
      phone: "+201066666666",
      group: "المجموعة المكثفة",
      joinDate: "2024-02-01",
      status: "active",
      progress: 95,
      overallGrade: "A+",
      assignments: [
        { id: 1, title: "واجب HTML الأول", dueDate: "2024-02-10", submittedDate: "2024-02-08", status: "graded", grade: 48, maxGrade: 50, feedback: "ممتاز" },
        { id: 2, title: "مشروع CSS النهائي", dueDate: "2024-02-20", submittedDate: "2024-02-15", status: "graded", grade: 148, maxGrade: 150, feedback: "إبداعي ومتميز" },
        { id: 3, title: "اختبار JavaScript", dueDate: "2024-03-01", submittedDate: "2024-02-25", status: "graded", grade: 95, maxGrade: 100, feedback: "متفوقة" },
        { id: 4, title: "مشروع React", dueDate: "2024-03-15", submittedDate: "2024-03-10", status: "submitted", grade: null, maxGrade: 200, feedback: "قيد المراجعة" }
      ],
      attendance: "98%",
      lastActivity: "منذ ساعة",
      notes: "طالبة متميزة وتفوق التوقعات"
    },
    {
      id: 5,
      name: "علي حسن",
      email: "ali@example.com",
      phone: "+201077777777",
      group: "المجموعة المسائية",
      joinDate: "2024-01-25",
      status: "inactive",
      progress: 45,
      overallGrade: "D",
      assignments: [
        { id: 1, title: "واجب HTML الأول", dueDate: "2024-02-10", submittedDate: "2024-02-15", status: "late", grade: 25, maxGrade: 50, feedback: "ضعيف - يحتاج إعادة" },
        { id: 2, title: "مشروع CSS النهائي", dueDate: "2024-02-20", submittedDate: null, status: "missed", grade: 0, maxGrade: 150, feedback: "لم يسلم" },
        { id: 3, title: "اختبار JavaScript", dueDate: "2024-03-01", submittedDate: null, status: "missed", grade: 0, maxGrade: 100, feedback: "غائب" },
        { id: 4, title: "مشروع React", dueDate: "2024-03-15", submittedDate: null, status: "pending", grade: null, maxGrade: 200, feedback: "" }
      ],
      attendance: "65%",
      lastActivity: "منذ أسبوع",
      notes: "غير منتظم - يحتاج متابعة"
    }
  ];

  // إحصائيات سريعة
  const stats = [
    { title: "إجمالي الطلاب", value: course.totalStudents, icon: Users, color: "bg-blue-500", change: "+5" },
    { title: "الواجبات المسلمة", value: "68%", icon: FileText, color: "bg-green-500", change: "+12%" },
    { title: "متوسط الدرجات", value: course.averageGrade, icon: BarChart3, color: "bg-purple-500", change: "+3%" },
    { title: "نسبة الإكمال", value: course.completionRate, icon: CheckCircle, color: "bg-yellow-500", change: "+8%" },
  ];

  const groups = ["all", ...course.groups];
  const statuses = [
    { id: "all", label: "جميع الحالات" },
    { id: "active", label: "نشط" },
    { id: "inactive", label: "غير نشط" },
    { id: "at-risk", label: "في خطر" }
  ];

  const assignmentStatuses = {
    submitted: { label: "مسلم", color: "bg-green-100 text-green-800", icon: CheckCircle },
    graded: { label: "مصحح", color: "bg-blue-100 text-blue-800", icon: FileText },
    pending: { label: "قيد الانتظار", color: "bg-yellow-100 text-yellow-800", icon: Clock },
    late: { label: "متأخر", color: "bg-orange-100 text-orange-800", icon: AlertCircle },
    missed: { label: "مفوت", color: "bg-red-100 text-red-800", icon: AlertCircle }
  };

  const getStudentGradeColor = (grade) => {
    if (grade >= 90) return "bg-gradient-to-r from-green-500 to-emerald-600";
    if (grade >= 80) return "bg-gradient-to-r from-blue-500 to-cyan-600";
    if (grade >= 70) return "bg-gradient-to-r from-yellow-500 to-amber-600";
    if (grade >= 60) return "bg-gradient-to-r from-orange-500 to-red-600";
    return "bg-gradient-to-r from-red-500 to-pink-600";
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup === "all" || student.group === selectedGroup;
    const matchesStatus = selectedStatus === "all" || student.status === selectedStatus;
    return matchesSearch && matchesGroup && matchesStatus;
  });

  const calculateSubmissionStats = () => {
    const totalAssignments = students.reduce((sum, student) => sum + student.assignments.length, 0);
    const submittedAssignments = students.reduce((sum, student) => 
      sum + student.assignments.filter(a => a.status === "submitted" || a.status === "graded").length, 0
    );
    const gradedAssignments = students.reduce((sum, student) => 
      sum + student.assignments.filter(a => a.status === "graded").length, 0
    );
    const lateAssignments = students.reduce((sum, student) => 
      sum + student.assignments.filter(a => a.status === "late").length, 0
    );

    return {
      totalAssignments,
      submittedAssignments,
      gradedAssignments,
      lateAssignments,
      submissionRate: totalAssignments > 0 ? Math.round((submittedAssignments / totalAssignments) * 100) : 0,
      gradingRate: submittedAssignments > 0 ? Math.round((gradedAssignments / submittedAssignments) * 100) : 0
    };
  };

  const submissionStats = calculateSubmissionStats();

  const toggleStudentExpansion = (studentId) => {
    setExpandedStudent(expandedStudent === studentId ? null : studentId);
  };

  const getAssignmentStatus = (assignment) => {
    if (!assignment.submittedDate) return "pending";
    if (assignment.grade !== null) return "graded";
    if (new Date(assignment.submittedDate) > new Date(assignment.dueDate)) return "late";
    return "submitted";
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <button
            onClick={() => router.push(`/courses/${courseId}`)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors rtl:space-x-reverse"
          >
            <ArrowLeft size={20} />
            <span>العودة للكورس</span>
          </button>
          
          <div className="h-6 w-px bg-gray-300"></div>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-800">طلاب الكورس</h1>
            <p className="text-gray-600">{course.title}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 rtl:space-x-reverse mt-4 lg:mt-0">
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors rtl:space-x-reverse">
            <Download size={18} />
            <span>تصدير التقارير</span>
          </button>
          
          <Link href={`/courses/${courseId}/students/add`}>
            <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors rtl:space-x-reverse">
              <Users size={18} />
              <span>إضافة طالب</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              {stat.change && (
                <div className="mt-2 text-sm text-green-600 flex items-center">
                  <TrendingUp size={14} className="ml-1" />
                  <span>+{stat.change} عن الشهر الماضي</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Assignment Stats Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 text-right">إحصائيات الواجبات</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{submissionStats.submittedAssignments}</div>
            <div className="text-sm text-gray-600">واجبات مسلمة</div>
            <div className="text-xs text-blue-600 mt-1">{submissionStats.submissionRate}% معدل التسليم</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{submissionStats.gradedAssignments}</div>
            <div className="text-sm text-gray-600">تم تصحيحها</div>
            <div className="text-xs text-green-600 mt-1">{submissionStats.gradingRate}% معدل التصحيح</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{submissionStats.lateAssignments}</div>
            <div className="text-sm text-gray-600">متأخرة</div>
            <div className="text-xs text-yellow-600 mt-1">تتطلب متابعة</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{students.length}</div>
            <div className="text-sm text-gray-600">طالب مسجل</div>
            <div className="text-xs text-purple-600 mt-1">{course.groups.length} مجموعات</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 lg:max-w-md">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="ابحث عن طالب بالاسم أو البريد..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 text-sm ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
            >
              قائمة
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 text-sm ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
            >
              شبكة
            </button>
            <button
              onClick={() => setViewMode("assignments")}
              className={`px-4 py-2 text-sm ${viewMode === "assignments" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
            >
              الواجبات
            </button>
          </div>

          {/* Filters */}
          <div className="flex space-x-3 rtl:space-x-reverse">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">المجموعة</label>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-right min-w-[150px]"
              >
                {groups.map(group => (
                  <option key={group} value={group}>
                    {group === "all" ? "جميع المجموعات" : group}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">الحالة</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-right min-w-[150px]"
              >
                {statuses.map(status => (
                  <option key={status.id} value={status.id}>{status.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Students List View */}
      {viewMode === "list" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الطالب</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المجموعة</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التقدم</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الواجبات</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المعدل</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحضور</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((student) => {
                  const submittedAssignments = student.assignments.filter(a => 
                    a.status === "submitted" || a.status === "graded"
                  ).length;
                  const totalAssignments = student.assignments.length;
                  const averageGrade = student.assignments
                    .filter(a => a.grade)
                    .reduce((acc, curr) => acc + (curr.grade / curr.maxGrade * 100), 0) / 
                    (student.assignments.filter(a => a.grade).length || 1);
                  
                  return (
                    <React.Fragment key={student.id}>
                      <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleStudentExpansion(student.id)}>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${getStudentGradeColor(student.progress)}`}>
                              {student.name.charAt(0)}
                            </div>
                            <div className="mr-4 text-right">
                              <div className="font-medium text-gray-900">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="text-sm text-gray-900">{student.group}</div>
                          <div className="text-xs text-gray-500">انضم: {student.joinDate}</div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${getStudentGradeColor(student.progress)}`}
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{student.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="text-sm">
                            <span className="font-medium text-gray-900">{submittedAssignments}/{totalAssignments}</span>
                            <span className="text-gray-500 mr-2"> واجب</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {Math.round((submittedAssignments / totalAssignments) * 100)}% معدل التسليم
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <div className={`px-3 py-1 text-sm font-bold rounded-full ${getStudentGradeColor(averageGrade)} text-white`}>
                              {student.overallGrade}
                            </div>
                            <div className="text-sm text-gray-900">{Math.round(averageGrade)}%</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="text-sm text-gray-900">{student.attendance}</div>
                          <div className="text-xs text-gray-500">آخر نشاط: {student.lastActivity}</div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <button className="text-blue-600 hover:text-blue-800">
                              <Eye size={16} />
                            </button>
                            <button className="text-green-600 hover:text-green-800">
                              <MessageSquare size={16} />
                            </button>
                            <button className="text-purple-600 hover:text-purple-800">
                              <BarChart3 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                      
                      {/* Expanded Row - Assignments Details */}
                      {expandedStudent === student.id && (
                        <tr className="bg-gray-50">
                          <td colSpan="7" className="px-6 py-4">
                            <div className="bg-white rounded-lg p-6">
                              <h4 className="font-bold text-gray-800 mb-4 text-right">تفاصيل الواجبات للطالب: {student.name}</h4>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                {student.assignments.map((assignment) => {
                                  const statusInfo = assignmentStatuses[getAssignmentStatus(assignment)];
                                  const StatusIcon = statusInfo.icon;
                                  const percentage = assignment.maxGrade > 0 ? Math.round((assignment.grade || 0) / assignment.maxGrade * 100) : 0;
                                  
                                  return (
                                    <div key={assignment.id} className="border rounded-lg p-4">
                                      <div className="flex justify-between items-center mb-3">
                                        <h5 className="font-medium text-gray-800 text-right">{assignment.title}</h5>
                                        <span className={`px-2 py-1 text-xs rounded-full flex items-center space-x-1 rtl:space-x-reverse ${statusInfo.color}`}>
                                          <StatusIcon size={12} />
                                          <span>{statusInfo.label}</span>
                                        </span>
                                      </div>
                                      
                                      <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                          <span className="text-gray-600">تاريخ التسليم:</span>
                                          <span className="font-medium">{assignment.dueDate}</span>
                                        </div>
                                        
                                        {assignment.submittedDate && (
                                          <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">تاريخ التقديم:</span>
                                            <span className={`font-medium ${new Date(assignment.submittedDate) > new Date(assignment.dueDate) ? 'text-orange-600' : 'text-green-600'}`}>
                                              {assignment.submittedDate}
                                            </span>
                                          </div>
                                        )}
                                        
                                        <div className="flex justify-between text-sm">
                                          <span className="text-gray-600">الدرجة:</span>
                                          <span className="font-bold">
                                            {assignment.grade !== null ? `${assignment.grade}/${assignment.maxGrade}` : '--'}
                                          </span>
                                        </div>
                                        
                                        {assignment.grade !== null && (
                                          <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                              className={`h-2 rounded-full ${percentage >= 80 ? 'bg-green-500' : percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                              style={{ width: `${percentage}%` }}
                                            ></div>
                                          </div>
                                        )}
                                        
                                        {assignment.feedback && (
                                          <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-700">
                                            {assignment.feedback}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              
                              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                <div className="text-sm text-gray-600">
                                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                                    <Award size={14} />
                                    <span>ملاحظات المعلم: {student.notes}</span>
                                  </div>
                                </div>
                                <div className="flex space-x-3 rtl:space-x-reverse">
                                  <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 rtl:space-x-reverse">
                                    <FileText size={14} />
                                    <span className="text-sm">عرض جميع الواجبات</span>
                                  </button>
                                  <button className="flex items-center space-x-1 text-green-600 hover:text-green-800 rtl:space-x-reverse">
                                    <MessageSquare size={14} />
                                    <span className="text-sm">إرسال ملاحظة</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Empty State */}
          {filteredStudents.length === 0 && (
            <div className="p-12 text-center">
              <Users size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">لا توجد نتائج</h3>
              <p className="text-gray-500 mb-6">لم يتم العثور على طلاب يطابقون معايير البحث</p>
            </div>
          )}
        </div>
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => {
            const submittedAssignments = student.assignments.filter(a => 
              a.status === "submitted" || a.status === "graded"
            ).length;
            const totalAssignments = student.assignments.length;
            
            return (
              <div key={student.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Student Header */}
                <div className={`p-6 ${getStudentGradeColor(student.progress)}`}>
                  <div className="flex justify-between items-center">
                    <div className="text-right">
                      <h3 className="text-lg font-bold text-white">{student.name}</h3>
                      <p className="text-white/80 text-sm">{student.email}</p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white">
                      {student.name.charAt(0)}
                    </div>
                  </div>
                </div>

                {/* Student Details */}
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-right">
                        <div className="text-sm text-gray-600">المجموعة</div>
                        <div className="font-medium">{student.group}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">تاريخ الانضمام</div>
                        <div className="font-medium">{student.joinDate}</div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>التقدم العام</span>
                        <span>{student.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getStudentGradeColor(student.progress)}`}
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">
                          {submittedAssignments}/{totalAssignments}
                        </div>
                        <div className="text-sm text-gray-600">واجبات</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-xl font-bold text-green-600">{student.attendance}</div>
                        <div className="text-sm text-gray-600">حضور</div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <div className={`px-3 py-1 text-sm font-bold rounded-full ${getStudentGradeColor(student.progress)} text-white`}>
                            {student.overallGrade}
                          </div>
                          <span className="text-sm text-gray-600">التقدير</span>
                        </div>
                        <div className="text-sm text-gray-600">{student.lastActivity}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex justify-between">
                    <button 
                      onClick={() => toggleStudentExpansion(student.id)}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 rtl:space-x-reverse"
                    >
                      {expandedStudent === student.id ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                      <span className="text-sm">عرض الواجبات</span>
                    </button>
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <MessageSquare size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Assignments */}
                {expandedStudent === student.id && (
                  <div className="border-t border-gray-200 p-4 bg-white">
                    <h4 className="font-medium text-gray-800 mb-3 text-right">الواجبات الأخيرة</h4>
                    <div className="space-y-2">
                      {student.assignments.slice(0, 2).map((assignment) => {
                        const statusInfo = assignmentStatuses[getAssignmentStatus(assignment)];
                        const StatusIcon = statusInfo.icon;
                        
                        return (
                          <div key={assignment.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <div className="text-right">
                              <div className="text-sm font-medium">{assignment.title}</div>
                              <div className="text-xs text-gray-500">{assignment.dueDate}</div>
                            </div>
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              {assignment.grade !== null && (
                                <span className="text-sm font-bold">
                                  {assignment.grade}/{assignment.maxGrade}
                                </span>
                              )}
                              <span className={`px-2 py-1 text-xs rounded-full flex items-center ${statusInfo.color}`}>
                                <StatusIcon size={10} className="ml-1" />
                                <span>{statusInfo.label}</span>
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <Link href={`/courses/${courseId}/students/${student.id}/assignments`}>
                      <button className="w-full mt-3 text-center text-blue-600 hover:text-blue-800 text-sm">
                        عرض جميع الواجبات →
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Assignments View */}
      {viewMode === "assignments" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 text-right">تتبع الواجبات حسب الطالب</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الطالب</th>
                    {students[0].assignments.map((assignment) => (
                      <th key={assignment.id} className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        <div className="flex flex-col">
                          <span className="font-medium">{assignment.title}</span>
                          <span className="text-xs text-gray-500">{assignment.dueDate}</span>
                        </div>
                      </th>
                    ))}
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المجموع</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.map((student) => {
                    const totalSubmitted = student.assignments.filter(a => 
                      a.status === "submitted" || a.status === "graded"
                    ).length;
                    const totalGraded = student.assignments.filter(a => a.status === "graded").length;
                    
                    return (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="mr-4 text-right">
                              <div className="font-medium text-gray-900">{student.name}</div>
                              <div className="text-xs text-gray-500">{student.group}</div>
                            </div>
                          </div>
                        </td>
                        
                        {student.assignments.map((assignment) => {
                          const statusInfo = assignmentStatuses[getAssignmentStatus(assignment)];
                          const StatusIcon = statusInfo.icon;
                          const percentage = assignment.maxGrade > 0 ? Math.round((assignment.grade || 0) / assignment.maxGrade * 100) : 0;
                          
                          return (
                            <td key={assignment.id} className="px-6 py-4 text-center">
                              <div className="flex flex-col items-center space-y-1">
                                <span className={`px-2 py-1 text-xs rounded-full flex items-center space-x-1 ${statusInfo.color}`}>
                                  <StatusIcon size={10} />
                                  <span>{statusInfo.label}</span>
                                </span>
                                
                                {assignment.grade !== null ? (
                                  <div className="text-center">
                                    <div className="font-bold text-gray-800">{assignment.grade}/{assignment.maxGrade}</div>
                                    <div className="text-xs text-gray-600">{percentage}%</div>
                                  </div>
                                ) : assignment.submittedDate ? (
                                  <div className="text-xs text-green-600">مسلم</div>
                                ) : (
                                  <div className="text-xs text-gray-400">--</div>
                                )}
                                
                                {assignment.submittedDate && (
                                  <div className="text-xs text-gray-500">
                                    {new Date(assignment.submittedDate).toLocaleDateString('ar-EG')}
                                  </div>
                                )}
                              </div>
                            </td>
                          );
                        })}
                        
                        <td className="px-6 py-4 text-center">
                          <div className="flex flex-col items-center">
                            <div className="font-bold text-gray-800">
                              {totalSubmitted}/{student.assignments.length}
                            </div>
                            <div className="text-xs text-gray-600">
                              {totalGraded} مصححة
                            </div>
                            <div className={`text-xs px-2 py-1 rounded-full mt-1 ${
                              totalSubmitted === student.assignments.length 
                                ? 'bg-green-100 text-green-800'
                                : totalSubmitted >= student.assignments.length * 0.7
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {Math.round((totalSubmitted / student.assignments.length) * 100)}%
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Assignment Status Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-right">ملخص حالة الواجبات</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(assignmentStatuses).map(([status, info]) => {
                const StatusIcon = info.icon;
                const count = filteredStudents.reduce((sum, student) => 
                  sum + student.assignments.filter(a => getAssignmentStatus(a) === status).length, 0
                );
                const percentage = filteredStudents.length > 0 
                  ? Math.round((count / (filteredStudents.length * students[0].assignments.length)) * 100)
                  : 0;
                
                return (
                  <div key={status} className="text-center p-4 rounded-lg" style={{ backgroundColor: `${info.color.split(' ')[0].replace('bg-', 'bg-')}20` }}>
                    <div className={`w-12 h-12 ${info.color.split(' ')[0]} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <StatusIcon size={24} className="text-white" />
                    </div>
                    <div className="text-2xl font-bold mb-1">{count}</div>
                    <div className="text-sm mb-1">{info.label}</div>
                    <div className="text-xs text-gray-600">{percentage}% من الإجمالي</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseStudentsPage;