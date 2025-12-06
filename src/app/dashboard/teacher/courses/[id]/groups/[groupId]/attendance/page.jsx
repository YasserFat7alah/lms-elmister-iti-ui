"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Calendar, Users, CheckCircle, XCircle, Clock,
    AlertCircle, Download, Filter, Search, Plus,
    BarChart3, FileText, Settings, ChevronRight,
    TrendingUp, CalendarDays, UserCheck, UserX,
    RefreshCw, Eye, Edit, MoreVertical,
    ChevronDown, ExternalLink, Mail
} from "lucide-react";

const AttendancePage = () => {
    const router = useRouter();

    const [activeTab, setActiveTab] = useState("today");
    const [selectedGroup, setSelectedGroup] = useState("all");
    const [selectedCourse, setSelectedCourse] = useState("all");
    const [dateRange, setDateRange] = useState("week");
    const [searchTerm, setSearchTerm] = useState("");

    const [courses, setCourses] = useState([
        { id: 1, title: "Web Development Bootcamp", code: "WEB-101" },
        { id: 2, title: "JavaScript Advanced", code: "JS-201" },
        { id: 3, title: "React Masterclass", code: "REACT-301" }
    ]);

    const [groups, setGroups] = useState([
        { id: 1, name: "Morning Group", courseId: 1, students: 15 },
        { id: 2, name: "Evening Group", courseId: 1, students: 12 },
        { id: 3, name: "Advanced Group", courseId: 2, students: 8 }
    ]);

    // Today's attendance data
    const [todayAttendance, setTodayAttendance] = useState([
        {
            id: 1,
            groupId: 1,
            groupName: "Morning Group",
            course: "Web Development Bootcamp",
            session: "HTML & CSS Basics",
            time: "10:00 - 12:00",
            totalStudents: 15,
            present: 12,
            absent: 2,
            late: 1,
            attendanceRate: 80,
            status: "completed"
        },
        {
            id: 2,
            groupId: 2,
            groupName: "Evening Group",
            course: "Web Development Bootcamp",
            session: "JavaScript Functions",
            time: "18:00 - 20:00",
            totalStudents: 12,
            present: 10,
            absent: 1,
            late: 1,
            attendanceRate: 83,
            status: "upcoming"
        },
        {
            id: 3,
            groupId: 3,
            groupName: "Advanced Group",
            course: "JavaScript Advanced",
            session: "Async/Await",
            time: "14:00 - 16:00",
            totalStudents: 8,
            present: 7,
            absent: 1,
            late: 0,
            attendanceRate: 88,
            status: "in-progress"
        }
    ]);

    // Attendance history
    const [attendanceHistory, setAttendanceHistory] = useState([
        {
            id: 1,
            date: "2024-03-10",
            group: "Morning Group",
            course: "Web Development Bootcamp",
            present: 14,
            absent: 1,
            late: 0,
            rate: 93
        },
        {
            id: 2,
            date: "2024-03-09",
            group: "Morning Group",
            course: "Web Development Bootcamp",
            present: 13,
            absent: 2,
            late: 0,
            rate: 87
        },
        {
            id: 3,
            date: "2024-03-08",
            group: "Evening Group",
            course: "Web Development Bootcamp",
            present: 11,
            absent: 1,
            late: 0,
            rate: 92
        },
        {
            id: 4,
            date: "2024-03-07",
            group: "Advanced Group",
            course: "JavaScript Advanced",
            present: 8,
            absent: 0,
            late: 0,
            rate: 100
        },
        {
            id: 5,
            date: "2024-03-06",
            group: "Morning Group",
            course: "Web Development Bootcamp",
            present: 12,
            absent: 3,
            late: 0,
            rate: 80
        }
    ]);

    // Student attendance data
    const [studentAttendance, setStudentAttendance] = useState([
        {
            id: 101,
            name: "Ahmed Mohamed",
            group: "Morning Group",
            totalSessions: 24,
            present: 22,
            absent: 1,
            late: 1,
            attendanceRate: 92,
            lastAttendance: "2024-03-10",
            status: "present"
        },
        {
            id: 102,
            name: "Sara Ali",
            group: "Morning Group",
            totalSessions: 24,
            present: 23,
            absent: 1,
            late: 0,
            attendanceRate: 96,
            lastAttendance: "2024-03-10",
            status: "present"
        },
        {
            id: 103,
            name: "Mohamed Khaled",
            group: "Evening Group",
            totalSessions: 20,
            present: 18,
            absent: 2,
            late: 0,
            attendanceRate: 90,
            lastAttendance: "2024-03-09",
            status: "absent"
        },
        {
            id: 104,
            name: "Fatima Abdullah",
            group: "Advanced Group",
            totalSessions: 16,
            present: 15,
            absent: 1,
            late: 0,
            attendanceRate: 94,
            lastAttendance: "2024-03-08",
            status: "present"
        },
        {
            id: 105,
            name: "Ali Hassan",
            group: "Morning Group",
            totalSessions: 24,
            present: 20,
            absent: 3,
            late: 1,
            attendanceRate: 83,
            lastAttendance: "2024-03-10",
            status: "late"
        }
    ]);

    // Statistics
    const [stats, setStats] = useState({
        todayRate: 85,
        weekRate: 88,
        monthRate: 90,
        totalSessions: 45,
        totalPresent: 40,
        totalAbsent: 4,
        totalLate: 1
    });

    const tabs = [
        { id: "today", label: "Today", icon: CalendarDays },
        { id: "history", label: "History", icon: Calendar },
        { id: "students", label: "Students", icon: Users },
        { id: "reports", label: "Reports", icon: BarChart3 }
    ];

    // Get status badge
    const getStatusBadge = (status) => {
        switch (status) {
            case 'present':
                return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Present</span>;
            case 'absent':
                return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Absent</span>;
            case 'late':
                return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Late</span>;
            case 'excused':
                return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Excused</span>;
            default:
                return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Not Recorded</span>;
        }
    };

    const getSessionStatusBadge = (status) => {
        const config = {
            'completed': { color: 'bg-gray-100 text-gray-800', icon: CheckCircle },
            'in-progress': { color: 'bg-blue-100 text-blue-800', icon: Clock },
            'upcoming': { color: 'bg-green-100 text-green-800', icon: Calendar }
        };

        const { color, icon: Icon } = config[status] || config.completed;

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${color}`}>
                <Icon size={12} />
                {status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    // Filter data based on selections
    const filteredTodayAttendance = todayAttendance.filter(session => {
        if (selectedGroup !== "all" && session.groupId !== parseInt(selectedGroup)) return false;
        if (selectedCourse !== "all") {
            const group = groups.find(g => g.id === session.groupId);
            if (group && group.courseId !== parseInt(selectedCourse)) return false;
        }
        return true;
    });

    const filteredStudentAttendance = studentAttendance.filter(student => {
        if (searchTerm && !student.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        if (selectedGroup !== "all" && student.group !== groups.find(g => g.id === parseInt(selectedGroup))?.name) return false;
        return true;
    });

    const filteredAttendanceHistory = attendanceHistory.filter(record => {
        if (selectedGroup !== "all" && record.group !== groups.find(g => g.id === parseInt(selectedGroup))?.name) return false;
        return true;
    });

    // Handle quick attendance
    const handleQuickAttendance = (groupId) => {
        router.push(`/attendance/daily?group=${groupId}`);
    };

    // Handle export
    const handleExport = (type) => {
        alert(`Exporting ${type} data...`);
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Attendance Management</h1>
                        <p className="text-gray-600 mt-2">Track and manage student attendance across all courses</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href="/attendance/reports">
                            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 px-4 py-2.5 border border-blue-200 rounded-lg hover:bg-blue-50">
                                <BarChart3 size={18} />
                                <span>View Reports</span>
                            </button>
                        </Link>

                        <Link href="/attendance/daily">
                            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700">
                                <Plus size={18} />
                                <span>Take Attendance</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-green-600">{stats.todayRate}%</p>
                            <p className="text-sm text-gray-600">Today's Rate</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <UserCheck size={24} className="text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-blue-600">{stats.weekRate}%</p>
                            <p className="text-sm text-gray-600">Weekly Average</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <TrendingUp size={24} className="text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-purple-600">{stats.totalPresent}</p>
                            <p className="text-sm text-gray-600">Total Present</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <CheckCircle size={24} className="text-purple-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-red-600">{stats.totalAbsent}</p>
                            <p className="text-sm text-gray-600">Total Absent</p>
                        </div>
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <UserX size={24} className="text-red-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs and Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between px-6">
                        <nav className="flex space-x-8 rtl:space-x-reverse overflow-x-auto">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === tab.id
                                            ? "border-blue-500 text-blue-600"
                                            : "border-transparent text-gray-500 hover:text-gray-700"
                                            }`}
                                    >
                                        <Icon size={18} />
                                        <span>{tab.label}</span>
                                    </button>
                                );
                            })}
                        </nav>

                        <div className="flex items-center gap-3 py-4 md:py-0">
                            <div className="flex items-center gap-2">
                                <Filter size={18} className="text-gray-500" />
                                <select
                                    value={selectedGroup}
                                    onChange={(e) => setSelectedGroup(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                >
                                    <option value="all">All Groups</option>
                                    {groups.map(group => (
                                        <option key={group.id} value={group.id}>
                                            {group.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            >
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                                <option value="quarter">This Quarter</option>
                                <option value="year">This Year</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {/* Today's Attendance Tab */}
                    {activeTab === "today" && (
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <h2 className="text-lg font-semibold text-gray-800">Today's Sessions</h2>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleExport("today")}
                                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 px-3 py-2 border border-blue-200 rounded-lg"
                                    >
                                        <Download size={16} />
                                        <span>Export</span>
                                    </button>

                                    <Link href="/attendance/settings">
                                        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-3 py-2 border border-gray-300 rounded-lg">
                                            <Settings size={16} />
                                            <span>Settings</span>
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Sessions List */}
                                <div className="space-y-4">
                                    {filteredTodayAttendance.map((session) => (
                                        <div key={session.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="font-bold text-gray-800">{session.session}</h3>
                                                        {getSessionStatusBadge(session.status)}
                                                    </div>
                                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                                        <span>{session.groupName}</span>
                                                        <span className="text-gray-300">•</span>
                                                        <span>{session.course}</span>
                                                        <span className="text-gray-300">•</span>
                                                        <span>{session.time}</span>
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-gray-800">{session.attendanceRate}%</div>
                                                    <div className="text-sm text-gray-600">Attendance Rate</div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-4 mb-4">
                                                <div className="text-center p-3 bg-green-50 rounded-lg">
                                                    <div className="text-xl font-bold text-green-600">{session.present}</div>
                                                    <div className="text-sm text-green-700">Present</div>
                                                </div>
                                                <div className="text-center p-3 bg-red-50 rounded-lg">
                                                    <div className="text-xl font-bold text-red-600">{session.absent}</div>
                                                    <div className="text-sm text-red-700">Absent</div>
                                                </div>
                                                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                                                    <div className="text-xl font-bold text-yellow-600">{session.late}</div>
                                                    <div className="text-sm text-yellow-700">Late</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="text-sm text-gray-600">
                                                    Total Students: {session.totalStudents}
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Link href={`/attendance/daily?group=${session.groupId}`}>
                                                        <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 px-3 py-1.5 border border-blue-200 rounded-lg hover:bg-blue-50">
                                                            {session.status === 'completed' ? 'View' : 'Take Attendance'}
                                                        </button>
                                                    </Link>

                                                    <button className="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">
                                                        <MoreVertical size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Statistics */}
                                <div className="space-y-6">
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                                        <h3 className="font-semibold text-blue-800 mb-4">Today's Summary</h3>

                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm text-blue-700">Overall Attendance Rate</span>
                                                    <span className="text-sm font-bold text-blue-800">{stats.todayRate}%</span>
                                                </div>
                                                <div className="w-full bg-blue-200 rounded-full h-2">
                                                    <div
                                                        className="bg-blue-600 h-2 rounded-full"
                                                        style={{ width: `${stats.todayRate}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-3 bg-white rounded-lg border border-blue-100">
                                                    <div className="text-center">
                                                        <div className="text-2xl font-bold text-gray-800">
                                                            {filteredTodayAttendance.reduce((sum, s) => sum + s.present, 0)}
                                                        </div>
                                                        <div className="text-sm text-gray-600">Total Present</div>
                                                    </div>
                                                </div>

                                                <div className="p-3 bg-white rounded-lg border border-blue-100">
                                                    <div className="text-center">
                                                        <div className="text-2xl font-bold text-gray-800">
                                                            {filteredTodayAttendance.reduce((sum, s) => sum + s.absent, 0)}
                                                        </div>
                                                        <div className="text-sm text-gray-600">Total Absent</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-3 bg-white border border-blue-200 rounded-lg">
                                                <div className="text-sm text-blue-700">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <AlertCircle size={14} />
                                                        <span className="font-medium">Note</span>
                                                    </div>
                                                    <p>{filteredTodayAttendance.filter(s => s.status === 'upcoming').length} upcoming sessions today</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                                        <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>

                                        <div className="space-y-3">
                                            <button
                                                onClick={() => handleQuickAttendance(1)}
                                                className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle size={16} className="text-green-600" />
                                                    <span className="text-gray-700">Take Morning Group Attendance</span>
                                                </div>
                                                <ChevronRight size={16} className="text-gray-400" />
                                            </button>

                                            <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                                                <div className="flex items-center gap-2">
                                                    <Mail size={16} className="text-blue-600" />
                                                    <span className="text-gray-700">Send Absence Notifications</span>
                                                </div>
                                                <ChevronRight size={16} className="text-gray-400" />
                                            </button>

                                            <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                                                <div className="flex items-center gap-2">
                                                    <Download size={16} className="text-purple-600" />
                                                    <span className="text-gray-700">Export Daily Report</span>
                                                </div>
                                                <ChevronRight size={16} className="text-gray-400" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* History Tab */}
                    {activeTab === "history" && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-800">Attendance History</h2>
                                <button
                                    onClick={() => handleExport("history")}
                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 px-3 py-2 border border-blue-200 rounded-lg"
                                >
                                    <Download size={16} />
                                    <span>Export History</span>
                                </button>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Group</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Present</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Absent</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredAttendanceHistory.map((record) => (
                                            <tr key={record.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-gray-900">{record.date}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-gray-900">{record.group}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-gray-900">{record.course}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <CheckCircle size={14} className="text-green-500" />
                                                        <span className="font-medium text-green-600">{record.present}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <XCircle size={14} className="text-red-500" />
                                                        <span className="font-medium text-red-600">{record.absent}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-16 bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className={`h-2 rounded-full ${record.rate >= 90 ? 'bg-green-600' :
                                                                    record.rate >= 80 ? 'bg-blue-600' :
                                                                        record.rate >= 70 ? 'bg-yellow-600' : 'bg-red-600'
                                                                    }`}
                                                                style={{ width: `${record.rate}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="font-medium text-gray-800">{record.rate}%</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded">
                                                            <Eye size={14} />
                                                        </button>
                                                        <button className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 rounded">
                                                            <Edit size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Trends */}
                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                                <h3 className="font-semibold text-gray-800 mb-4">Attendance Trends</h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="p-4 bg-blue-50 rounded-lg">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-600">{stats.weekRate}%</div>
                                            <div className="text-sm text-blue-700">Weekly Average</div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-green-50 rounded-lg">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-green-600">{stats.monthRate}%</div>
                                            <div className="text-sm text-green-700">Monthly Average</div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-purple-50 rounded-lg">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-purple-600">+2.5%</div>
                                            <div className="text-sm text-purple-700">vs Last Month</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Students Tab */}
                    {activeTab === "students" && (
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">Student Attendance</h2>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {filteredStudentAttendance.length} students
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Search students..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>

                                    <button
                                        onClick={() => handleExport("students")}
                                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 px-3 py-2 border border-blue-200 rounded-lg"
                                    >
                                        <Download size={16} />
                                        <span>Export</span>
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Group</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sessions</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance Rate</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Attendance</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredStudentAttendance.map((student) => (
                                            <tr key={student.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-gray-900">{student.name}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-gray-900">{student.group}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-gray-900">
                                                        {student.present}/{student.totalSessions}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-20 bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className={`h-2 rounded-full ${student.attendanceRate >= 90 ? 'bg-green-600' :
                                                                    student.attendanceRate >= 80 ? 'bg-blue-600' :
                                                                        student.attendanceRate >= 70 ? 'bg-yellow-600' : 'bg-red-600'
                                                                    }`}
                                                                style={{ width: `${student.attendanceRate}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="font-medium text-gray-800">{student.attendanceRate}%</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-gray-900">{student.lastAttendance}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {getStatusBadge(student.status)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded">
                                                            <Eye size={14} />
                                                        </button>
                                                        <button className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 rounded">
                                                            <Edit size={14} />
                                                        </button>
                                                        <button className="p-1.5 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded">
                                                            <Mail size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Student Statistics */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white border border-gray-200 rounded-xl p-6">
                                    <h3 className="font-semibold text-gray-800 mb-4">Attendance Distribution</h3>
                                    <div className="space-y-3">
                                        {['Excellent (90-100%)', 'Good (80-89%)', 'Average (70-79%)', 'Needs Improvement (<70%)'].map((range, index) => {
                                            const count = [8, 12, 5, 2][index];
                                            const percentage = (count / 27) * 100;

                                            return (
                                                <div key={range} className="space-y-1">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600">{range}</span>
                                                        <span className="font-medium">{count} students</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className={`h-2 rounded-full ${index === 0 ? 'bg-green-500' :
                                                                index === 1 ? 'bg-blue-500' :
                                                                    index === 2 ? 'bg-yellow-500' : 'bg-red-500'
                                                                }`}
                                                            style={{ width: `${percentage}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-xl p-6">
                                    <h3 className="font-semibold text-gray-800 mb-4">Top Performers</h3>
                                    <div className="space-y-3">
                                        {[
                                            { name: "Sara Ali", rate: 96, group: "Morning Group" },
                                            { name: "Fatima Abdullah", rate: 94, group: "Advanced Group" },
                                            { name: "Ahmed Mohamed", rate: 92, group: "Morning Group" }
                                        ].map((student, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                                <div>
                                                    <div className="font-medium text-green-800">{student.name}</div>
                                                    <div className="text-sm text-green-700">{student.group}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-green-600">{student.rate}%</div>
                                                    <div className="text-xs text-green-700">Attendance</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-xl p-6">
                                    <h3 className="font-semibold text-gray-800 mb-4">Need Attention</h3>
                                    <div className="space-y-3">
                                        {[
                                            { name: "Ali Hassan", rate: 83, group: "Morning Group", issues: 3 },
                                            { name: "Mohamed Khaled", rate: 90, group: "Evening Group", issues: 2 },
                                            { name: "Omar Mahmoud", rate: 78, group: "Advanced Group", issues: 5 }
                                        ].map((student, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                                                <div>
                                                    <div className="font-medium text-red-800">{student.name}</div>
                                                    <div className="text-sm text-red-700">{student.group}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-red-600">{student.rate}%</div>
                                                    <div className="text-xs text-red-700">{student.issues} absences</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Reports Tab */}
                    {activeTab === "reports" && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-800">Attendance Reports</h2>
                                <Link href="/attendance/reports">
                                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700">
                                        <BarChart3 size={16} />
                                        <span>Advanced Reports</span>
                                    </button>
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <Link href="/attendance/reports?type=daily">
                                    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer">
                                        <div className="flex items-center justify-between mb-4">
                                            <CalendarDays size={24} className="text-blue-600" />
                                            <ChevronRight size={20} className="text-blue-500" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Daily Reports</h3>
                                        <p className="text-sm text-gray-600">Daily attendance summaries and breakdowns</p>
                                    </div>
                                </Link>

                                <Link href="/attendance/reports?type=weekly">
                                    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer">
                                        <div className="flex items-center justify-between mb-4">
                                            <Calendar size={24} className="text-green-600" />
                                            <ChevronRight size={20} className="text-green-500" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Weekly Reports</h3>
                                        <p className="text-sm text-gray-600">Weekly trends and performance analysis</p>
                                    </div>
                                </Link>

                                <Link href="/attendance/reports?type=monthly">
                                    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer">
                                        <div className="flex items-center justify-between mb-4">
                                            <TrendingUp size={24} className="text-purple-600" />
                                            <ChevronRight size={20} className="text-purple-500" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Monthly Reports</h3>
                                        <p className="text-sm text-gray-600">Monthly summaries and insights</p>
                                    </div>
                                </Link>

                                <Link href="/attendance/reports?type=student">
                                    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer">
                                        <div className="flex items-center justify-between mb-4">
                                            <Users size={24} className="text-yellow-600" />
                                            <ChevronRight size={20} className="text-yellow-500" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Student Reports</h3>
                                        <p className="text-sm text-gray-600">Individual student attendance history</p>
                                    </div>
                                </Link>

                                <Link href="/attendance/reports?type=group">
                                    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer">
                                        <div className="flex items-center justify-between mb-4">
                                            <UserCheck size={24} className="text-red-600" />
                                            <ChevronRight size={20} className="text-red-500" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Group Reports</h3>
                                        <p className="text-sm text-gray-600">Group-wise attendance analysis</p>
                                    </div>
                                </Link>

                                <Link href="/attendance/reports?type=certificate">
                                    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer">
                                        <div className="flex items-center justify-between mb-4">
                                            <FileText size={24} className="text-indigo-600" />
                                            <ChevronRight size={20} className="text-indigo-500" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Certificates</h3>
                                        <p className="text-sm text-gray-600">Attendance certificates and documents</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AttendancePage;