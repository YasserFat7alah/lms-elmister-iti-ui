"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft, Download, Filter, Calendar, Users,
    BarChart3, TrendingUp, FileText, Printer, Mail,
    ChevronDown, Eye, CheckCircle, XCircle, Clock,
    UserCheck, UserX, CalendarDays, RefreshCw,
    ExternalLink, Search, ChevronRight
} from "lucide-react";

const AttendanceReportsPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const reportType = searchParams.get("type") || "overview";

    const [startDate, setStartDate] = useState("2024-03-01");
    const [endDate, setEndDate] = useState("2024-03-10");
    const [selectedGroup, setSelectedGroup] = useState("all");
    const [selectedCourse, setSelectedCourse] = useState("all");
    const [reportFormat, setReportFormat] = useState("pdf");

    const [loading, setLoading] = useState(false);
    const [reportData, setReportData] = useState(null);

    const reportTypes = [
        { id: "overview", label: "Overview", icon: BarChart3 },
        { id: "daily", label: "Daily", icon: CalendarDays },
        { id: "weekly", label: "Weekly", icon: Calendar },
        { id: "monthly", label: "Monthly", icon: TrendingUp },
        { id: "student", label: "Student", icon: Users },
        { id: "group", label: "Group", icon: UserCheck },
        { id: "certificate", label: "Certificate", icon: FileText }
    ];

    // Mock report data
    const mockReportData = {
        overview: {
            title: "Attendance Overview Report",
            period: "March 1 - March 10, 2024",
            summary: {
                totalSessions: 45,
                totalPresent: 850,
                totalAbsent: 78,
                totalLate: 42,
                averageRate: 88,
                bestGroup: "Morning Group (92%)",
                worstGroup: "Evening Group (84%)"
            },
            trends: [
                { date: "Mar 1", rate: 85 },
                { date: "Mar 2", rate: 87 },
                { date: "Mar 3", rate: 90 },
                { date: "Mar 4", rate: 88 },
                { date: "Mar 5", rate: 86 },
                { date: "Mar 6", rate: 89 },
                { date: "Mar 7", rate: 91 },
                { date: "Mar 8", rate: 88 },
                { date: "Mar 9", rate: 87 },
                { date: "Mar 10", rate: 90 }
            ]
        },
        daily: {
            title: "Daily Attendance Report",
            date: "March 10, 2024",
            data: [
                { group: "Morning Group", present: 14, absent: 1, late: 0, rate: 93 },
                { group: "Evening Group", present: 11, absent: 1, late: 0, rate: 92 },
                { group: "Advanced Group", present: 8, absent: 0, late: 0, rate: 100 }
            ]
        },
        student: {
            title: "Student Attendance Report",
            student: "Ahmed Mohamed",
            period: "March 1 - March 10, 2024",
            summary: {
                totalSessions: 10,
                present: 9,
                absent: 1,
                late: 0,
                rate: 90,
                lastAttendance: "2024-03-10"
            },
            details: [
                { date: "Mar 1", status: "present", time: "09:55" },
                { date: "Mar 2", status: "present", time: "09:58" },
                { date: "Mar 3", status: "present", time: "10:00" },
                { date: "Mar 4", status: "absent", time: "", notes: "Sick leave" },
                { date: "Mar 5", status: "present", time: "10:05" },
                { date: "Mar 6", status: "present", time: "09:50" },
                { date: "Mar 7", status: "present", time: "09:55" },
                { date: "Mar 8", status: "present", time: "10:02" },
                { date: "Mar 9", status: "present", time: "09:58" },
                { date: "Mar 10", status: "present", time: "09:55" }
            ]
        }
    };

    useEffect(() => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setReportData(mockReportData[reportType] || mockReportData.overview);
            setLoading(false);
        }, 500);
    }, [reportType]);

    const handleGenerateReport = () => {
        setLoading(true);
        setTimeout(() => {
            alert(`Report generated for ${reportType} from ${startDate} to ${endDate}`);
            setLoading(false);
        }, 1000);
    };

    const handleExport = () => {
        alert(`Exporting ${reportFormat} report...`);
    };

    const handlePrint = () => {
        window.print();
    };

    const handleSendEmail = () => {
        alert("Report sent via email");
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto p-6">
                <div className="animate-pulse space-y-6">
                    <div className="h-12 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-64 bg-gray-200 rounded-xl"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <Link href="/attendance">
                            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
                                <ArrowLeft size={20} />
                                <span>Back to Attendance</span>
                            </button>
                        </Link>

                        <div className="h-6 w-px bg-gray-300"></div>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Attendance Reports</h1>
                            <p className="text-gray-600">Generate and analyze attendance reports</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 px-3 py-2 border border-blue-200 rounded-lg"
                        >
                            <Printer size={16} />
                            <span>Print</span>
                        </button>

                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700"
                        >
                            <Download size={16} />
                            <span>Export</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left Sidebar - Report Types */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <h3 className="font-semibold text-gray-800 mb-4">Report Types</h3>
                        <div className="space-y-1">
                            {reportTypes.map((type) => {
                                const Icon = type.icon;
                                return (
                                    <Link key={type.id} href={`/attendance/reports?type=${type.id}`}>
                                        <button
                                            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${reportType === type.id
                                                ? "bg-blue-50 text-blue-700 border border-blue-200"
                                                : "text-gray-700 hover:bg-gray-50"
                                                }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Icon size={18} />
                                                <span>{type.label}</span>
                                            </div>
                                            <ChevronRight size={16} className="text-gray-400" />
                                        </button>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <h3 className="font-semibold text-gray-800 mb-4">Filters</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                                <div className="space-y-2">
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                    />
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                                <select
                                    value={reportFormat}
                                    onChange={(e) => setReportFormat(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                >
                                    <option value="pdf">PDF Document</option>
                                    <option value="excel">Excel Spreadsheet</option>
                                    <option value="csv">CSV File</option>
                                    <option value="html">HTML Report</option>
                                </select>
                            </div>

                            <button
                                onClick={handleGenerateReport}
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {loading ? "Generating..." : "Generate Report"}
                            </button>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>

                        <div className="space-y-3">
                            <button
                                onClick={handleSendEmail}
                                className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                <div className="flex items-center gap-2">
                                    <Mail size={16} className="text-blue-600" />
                                    <span className="text-gray-700">Email Report</span>
                                </div>
                                <ChevronRight size={16} className="text-gray-400" />
                            </button>

                            <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                                <div className="flex items-center gap-2">
                                    <Download size={16} className="text-green-600" />
                                    <span className="text-gray-700">Download All</span>
                                </div>
                                <ChevronRight size={16} className="text-gray-400" />
                            </button>

                            <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                                <div className="flex items-center gap-2">
                                    <RefreshCw size={16} className="text-purple-600" />
                                    <span className="text-gray-700">Refresh Data</span>
                                </div>
                                <ChevronRight size={16} className="text-gray-400" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Report Content */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Report Header */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{reportData?.title}</h2>
                                <p className="text-gray-600 mt-1">
                                    {reportData?.period || reportData?.date || "Custom Report"}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-white text-blue-700 border border-blue-200 rounded-full text-sm font-medium">
                                    Generated: {new Date().toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Report Content */}
                    {reportType === "overview" && reportData && (
                        <div className="space-y-6">
                            {/* Summary Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-800">{reportData.summary.totalSessions}</div>
                                        <div className="text-sm text-gray-600">Total Sessions</div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">{reportData.summary.totalPresent}</div>
                                        <div className="text-sm text-gray-600">Total Present</div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-red-600">{reportData.summary.totalAbsent}</div>
                                        <div className="text-sm text-gray-600">Total Absent</div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">{reportData.summary.averageRate}%</div>
                                        <div className="text-sm text-gray-600">Average Rate</div>
                                    </div>
                                </div>
                            </div>

                            {/* Trends Chart */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h3 className="font-semibold text-gray-800 mb-4">Attendance Trends</h3>
                                <div className="h-64 flex items-end justify-between">
                                    {reportData.trends.map((day, index) => (
                                        <div key={index} className="flex flex-col items-center">
                                            <div
                                                className="w-8 bg-blue-500 rounded-t-lg"
                                                style={{ height: `${day.rate}%` }}
                                            ></div>
                                            <div className="mt-2 text-xs text-gray-500">{day.date}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Insights */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                    <h3 className="font-semibold text-gray-800 mb-4">Performance Insights</h3>
                                    <div className="space-y-4">
                                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                            <div className="flex items-center gap-2 mb-1">
                                                <UserCheck size={16} className="text-green-600" />
                                                <span className="font-medium text-green-700">Best Performing Group</span>
                                            </div>
                                            <p className="text-sm text-green-600">{reportData.summary.bestGroup}</p>
                                        </div>

                                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                            <div className="flex items-center gap-2 mb-1">
                                                <UserX size={16} className="text-yellow-600" />
                                                <span className="font-medium text-yellow-700">Needs Attention</span>
                                            </div>
                                            <p className="text-sm text-yellow-600">{reportData.summary.worstGroup}</p>
                                        </div>

                                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                            <div className="flex items-center gap-2 mb-1">
                                                <TrendingUp size={16} className="text-blue-600" />
                                                <span className="font-medium text-blue-700">Overall Trend</span>
                                            </div>
                                            <p className="text-sm text-blue-600">Attendance improved by 5% compared to last period</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                    <h3 className="font-semibold text-gray-800 mb-4">Recommendations</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-2">
                                            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                            </div>
                                            <span className="text-gray-700">Focus on improving Evening Group attendance</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                            </div>
                                            <span className="text-gray-700">Consider morning sessions for better attendance</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                            </div>
                                            <span className="text-gray-700">Send reminders for late students</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                            </div>
                                            <span className="text-gray-700">Review attendance policies with students</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {reportType === "daily" && reportData && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h3 className="font-semibold text-gray-800 mb-4">Daily Attendance Summary</h3>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Group</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Present</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Absent</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Late</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance Rate</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {reportData.data.map((group, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4">
                                                        <div className="font-medium text-gray-900">{group.group}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <CheckCircle size={14} className="text-green-500" />
                                                            <span className="font-medium">{group.present}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <XCircle size={14} className="text-red-500" />
                                                            <span className="font-medium">{group.absent}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <Clock size={14} className="text-yellow-500" />
                                                            <span className="font-medium">{group.late}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-20 bg-gray-200 rounded-full h-2">
                                                                <div
                                                                    className={`h-2 rounded-full ${group.rate >= 90 ? 'bg-green-600' :
                                                                            group.rate >= 80 ? 'bg-blue-600' :
                                                                                'bg-yellow-600'
                                                                        }`}
                                                                    style={{ width: `${group.rate}%` }}
                                                                ></div>
                                                            </div>
                                                            <span className="font-medium">{group.rate}%</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${group.rate >= 90 ? 'bg-green-100 text-green-800' :
                                                                group.rate >= 80 ? 'bg-blue-100 text-blue-800' :
                                                                    'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                            {group.rate >= 90 ? 'Excellent' : group.rate >= 80 ? 'Good' : 'Needs Improvement'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {reportType === "student" && reportData && (
                        <div className="space-y-6">
                            {/* Student Summary */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                                        <div className="text-2xl font-bold text-gray-800">{reportData.summary.totalSessions}</div>
                                        <div className="text-sm text-gray-600">Total Sessions</div>
                                    </div>

                                    <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                                        <div className="text-2xl font-bold text-green-600">{reportData.summary.present}</div>
                                        <div className="text-sm text-gray-600">Present</div>
                                    </div>

                                    <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                                        <div className="text-2xl font-bold text-red-600">{reportData.summary.absent}</div>
                                        <div className="text-sm text-gray-600">Absent</div>
                                    </div>

                                    <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                                        <div className="text-2xl font-bold text-blue-600">{reportData.summary.rate}%</div>
                                        <div className="text-sm text-gray-600">Attendance Rate</div>
                                    </div>
                                </div>
                            </div>

                            {/* Attendance Details */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h3 className="font-semibold text-gray-800 mb-4">Attendance Details</h3>

                                <div className="space-y-3">
                                    {reportData.details.map((record, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                                            <div className="flex items-center gap-4">
                                                <div className="font-medium text-gray-800">{record.date}</div>
                                                <div className={`px-2 py-1 rounded text-xs font-medium ${record.status === 'present' ? 'bg-green-100 text-green-800' :
                                                        record.status === 'absent' ? 'bg-red-100 text-red-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                                </div>
                                            </div>

                                            <div className="text-sm text-gray-600">
                                                {record.time && (
                                                    <span className="flex items-center gap-1">
                                                        <Clock size={12} />
                                                        {record.time}
                                                    </span>
                                                )}
                                                {record.notes && (
                                                    <span className="text-gray-500"> - {record.notes}</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Analysis */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h3 className="font-semibold text-gray-800 mb-4">Performance Analysis</h3>

                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm text-gray-600">Attendance Consistency</span>
                                            <span className="text-sm font-bold text-gray-800">{reportData.summary.rate}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${reportData.summary.rate >= 90 ? 'bg-green-600' :
                                                        reportData.summary.rate >= 80 ? 'bg-blue-600' :
                                                            'bg-yellow-600'
                                                    }`}
                                                style={{ width: `${reportData.summary.rate}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                        <h4 className="font-medium text-blue-800 mb-2">Recommendations</h4>
                                        <ul className="space-y-1 text-sm text-blue-700">
                                            <li>• Student has {reportData.summary.absent} absence(s) that need attention</li>
                                            <li>• Overall attendance rate is {reportData.summary.rate >= 90 ? 'excellent' : reportData.summary.rate >= 80 ? 'good' : 'needs improvement'}</li>
                                            <li>• Last attendance was on {reportData.summary.lastAttendance}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Report Actions */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h3 className="font-medium text-gray-800 mb-2">Report Actions</h3>
                                <p className="text-sm text-gray-600">Download, share, or print this report</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleSendEmail}
                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 px-4 py-2.5 border border-blue-200 rounded-lg"
                                >
                                    <Mail size={16} />
                                    <span>Email Report</span>
                                </button>

                                <button
                                    onClick={handleExport}
                                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700"
                                >
                                    <Download size={16} />
                                    <span>Download {reportFormat.toUpperCase()}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceReportsPage;