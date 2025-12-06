"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft, Save, CheckCircle, XCircle, Clock,
    Calendar, Users, Search, Filter, Download,
    RefreshCw, Check, X, AlertCircle, User,
    Mail, MessageSquare, ChevronDown, Eye
} from "lucide-react";

const DailyAttendancePage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const groupId = searchParams.get("group") || "1";

    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [session, setSession] = useState("morning");
    const [searchTerm, setSearchTerm] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [autoSave, setAutoSave] = useState(true);

    // Group data
    const [group, setGroup] = useState({
        id: parseInt(groupId),
        name: "Morning Group",
        course: "Web Development Bootcamp",
        totalStudents: 15,
        sessionTime: "10:00 - 12:00",
        instructor: "Ahmed Mohamed"
    });

    // Students attendance data
    const [students, setStudents] = useState([
        {
            id: 101,
            name: "Ahmed Mohamed",
            studentId: "STU-101",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed",
            status: "present", // present, absent, late, excused
            checkInTime: "09:55",
            notes: "",
            history: { present: 22, absent: 1, late: 1 }
        },
        {
            id: 102,
            name: "Sara Ali",
            studentId: "STU-102",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sara",
            status: "present",
            checkInTime: "09:58",
            notes: "",
            history: { present: 23, absent: 1, late: 0 }
        },
        {
            id: 103,
            name: "Mohamed Khaled",
            studentId: "STU-103",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mohamed",
            status: "absent",
            checkInTime: "",
            notes: "Sick leave",
            history: { present: 18, absent: 2, late: 0 }
        },
        {
            id: 104,
            name: "Fatima Abdullah",
            studentId: "STU-104",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fatima",
            status: "present",
            checkInTime: "10:05",
            notes: "",
            history: { present: 15, absent: 1, late: 0 }
        },
        {
            id: 105,
            name: "Ali Hassan",
            studentId: "STU-105",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ali",
            status: "late",
            checkInTime: "10:15",
            notes: "Traffic delay",
            history: { present: 20, absent: 3, late: 1 }
        },
        {
            id: 106,
            name: "Noura Ahmed",
            studentId: "STU-106",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=noura",
            status: "present",
            checkInTime: "09:50",
            notes: "",
            history: { present: 24, absent: 0, late: 0 }
        },
        {
            id: 107,
            name: "Omar Mahmoud",
            studentId: "STU-107",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=omar",
            status: "excused",
            checkInTime: "",
            notes: "Official leave",
            history: { present: 21, absent: 2, late: 1 }
        }
    ]);

    // Statistics
    const [stats, setStats] = useState({
        present: 0,
        absent: 0,
        late: 0,
        excused: 0,
        attendanceRate: 0
    });

    // Calculate statistics
    useEffect(() => {
        const present = students.filter(s => s.status === "present").length;
        const absent = students.filter(s => s.status === "absent").length;
        const late = students.filter(s => s.status === "late").length;
        const excused = students.filter(s => s.status === "excused").length;
        const total = students.length;
        const attendanceRate = Math.round(((present + late + excused) / total) * 100);

        setStats({ present, absent, late, excused, attendanceRate });
    }, [students]);

    // Filter students
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle status change
    const handleStatusChange = (studentId, status) => {
        setStudents(prev => prev.map(student => {
            if (student.id === studentId) {
                let checkInTime = student.checkInTime;

                if (status === "present") {
                    checkInTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                } else if (status === "late") {
                    checkInTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                } else {
                    checkInTime = "";
                }

                return { ...student, status, checkInTime };
            }
            return student;
        }));
    };

    // Handle note change
    const handleNoteChange = (studentId, note) => {
        setStudents(prev => prev.map(student => {
            if (student.id === studentId) {
                return { ...student, notes: note };
            }
            return student;
        }));
    };

    // Handle bulk status change
    const handleBulkStatusChange = (status) => {
        setStudents(prev => prev.map(student => {
            let checkInTime = student.checkInTime;

            if (status === "present" || status === "late") {
                checkInTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            } else {
                checkInTime = "";
            }

            return { ...student, status, checkInTime };
        }));
    };

    // Handle submit
    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // Prepare data for API
            const attendanceData = {
                date,
                session,
                groupId,
                students,
                stats,
                recordedBy: "Teacher",
                recordedAt: new Date().toISOString()
            };

            console.log("Submitting attendance:", attendanceData);

            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            alert("Attendance recorded successfully!");
            router.push("/attendance");

        } catch (error) {
            console.error("Error submitting attendance:", error);
            alert("Failed to record attendance. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Get status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'present': return 'bg-green-100 text-green-800 border-green-200';
            case 'absent': return 'bg-red-100 text-red-800 border-red-200';
            case 'late': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'excused': return 'bg-blue-100 text-blue-800 border-blue-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    // Get status icon
    const getStatusIcon = (status) => {
        switch (status) {
            case 'present': return <CheckCircle size={16} />;
            case 'absent': return <XCircle size={16} />;
            case 'late': return <Clock size={16} />;
            case 'excused': return <AlertCircle size={16} />;
            default: return null;
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
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
                            <h1 className="text-2xl font-bold text-gray-800">Take Daily Attendance</h1>
                            <p className="text-gray-600">{group.name} • {group.course}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => handleBulkStatusChange("present")}
                            className="flex items-center gap-2 text-green-600 hover:text-green-800 px-3 py-2 border border-green-200 rounded-lg"
                        >
                            <CheckCircle size={16} />
                            <span>Mark All Present</span>
                        </button>

                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            <Save size={16} />
                            <span>{isSubmitting ? "Saving..." : "Save Attendance"}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Session</label>
                        <select
                            value={session}
                            onChange={(e) => setSession(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        >
                            <option value="morning">Morning (10:00 - 12:00)</option>
                            <option value="afternoon">Afternoon (14:00 - 16:00)</option>
                            <option value="evening">Evening (18:00 - 20:00)</option>
                            <option value="custom">Custom Session</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Search Students</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Name or ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Auto Save</label>
                        <div className="flex items-center gap-2">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={autoSave}
                                    onChange={(e) => setAutoSave(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                            <span className="text-sm text-gray-600">Save changes automatically</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{group.totalStudents}</div>
                        <div className="text-sm text-gray-600">Total Students</div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{stats.present}</div>
                        <div className="text-sm text-gray-600">Present</div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
                        <div className="text-sm text-gray-600">Absent</div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">{stats.late}</div>
                        <div className="text-sm text-gray-600">Late</div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{stats.attendanceRate}%</div>
                        <div className="text-sm text-gray-600">Attendance Rate</div>
                    </div>
                </div>
            </div>

            {/* Students List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check-in Time</th>
                                <th className="px6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance History</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quick Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                                                <img
                                                    src={student.avatar}
                                                    alt={student.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{student.name}</div>
                                                <div className="text-sm text-gray-500">{student.studentId}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <select
                                            value={student.status}
                                            onChange={(e) => handleStatusChange(student.id, e.target.value)}
                                            className={`border rounded-lg px-3 py-1.5 text-sm font-medium ${getStatusColor(student.status)}`}
                                        >
                                            <option value="present" className="bg-green-100 text-green-800">Present</option>
                                            <option value="absent" className="bg-red-100 text-red-800">Absent</option>
                                            <option value="late" className="bg-yellow-100 text-yellow-800">Late</option>
                                            <option value="excused" className="bg-blue-100 text-blue-800">Excused</option>
                                        </select>
                                    </td>

                                    <td className="px-6 py-4">
                                        {student.checkInTime ? (
                                            <div className="flex items-center gap-2">
                                                <Clock size={14} className="text-gray-500" />
                                                <span className="font-medium">{student.checkInTime}</span>
                                            </div>
                                        ) : (
                                            <span className="text-gray-500">-</span>
                                        )}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="text-sm">
                                            <div className="flex items-center gap-3">
                                                <span className="text-green-600">{student.history.present} ✅</span>
                                                <span className="text-red-600">{student.history.absent} ❌</span>
                                                <span className="text-yellow-600">{student.history.late} ⏰</span>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <input
                                            type="text"
                                            value={student.notes}
                                            onChange={(e) => handleNoteChange(student.id, e.target.value)}
                                            placeholder="Add note..."
                                            className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
                                        />
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => handleStatusChange(student.id, "present")}
                                                className={`p-1.5 rounded ${student.status === "present" ? "bg-green-100 text-green-600" : "text-gray-400 hover:text-green-600 hover:bg-green-50"}`}
                                            >
                                                <CheckCircle size={16} />
                                            </button>

                                            <button
                                                onClick={() => handleStatusChange(student.id, "absent")}
                                                className={`p-1.5 rounded ${student.status === "absent" ? "bg-red-100 text-red-600" : "text-gray-400 hover:text-red-600 hover:bg-red-50"}`}
                                            >
                                                <XCircle size={16} />
                                            </button>

                                            <button
                                                onClick={() => handleStatusChange(student.id, "late")}
                                                className={`p-1.5 rounded ${student.status === "late" ? "bg-yellow-100 text-yellow-600" : "text-gray-400 hover:text-yellow-600 hover:bg-yellow-50"}`}
                                            >
                                                <Clock size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h3 className="font-medium text-gray-800 mb-2">Quick Actions</h3>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => handleBulkStatusChange("present")}
                                className="px-3 py-1.5 bg-green-100 text-green-700 border border-green-200 rounded-lg text-sm hover:bg-green-200"
                            >
                                Mark All Present
                            </button>

                            <button
                                onClick={() => handleBulkStatusChange("absent")}
                                className="px-3 py-1.5 bg-red-100 text-red-700 border border-red-200 rounded-lg text-sm hover:bg-red-200"
                            >
                                Mark All Absent
                            </button>

                            <button className="px-3 py-1.5 bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-sm hover:bg-blue-200">
                                <div className="flex items-center gap-1">
                                    <Mail size={14} />
                                    <span>Notify Absent Students</span>
                                </div>
                            </button>

                            <button className="px-3 py-1.5 bg-purple-100 text-purple-700 border border-purple-200 rounded-lg text-sm hover:bg-purple-200">
                                <div className="flex items-center gap-1">
                                    <Download size={14} />
                                    <span>Export Report</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => {
                                setStudents(prev => prev.map(s => ({ ...s, status: "present", checkInTime: "" })));
                            }}
                            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Reset All
                        </button>

                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    <span>Save & Complete</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Summary */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-3">
                        <AlertCircle size={20} className="text-blue-600" />
                        <div>
                            <h4 className="font-medium text-blue-800">Attendance Summary</h4>
                            <p className="text-sm text-blue-700">
                                {stats.present} present • {stats.absent} absent • {stats.late} late • {stats.excused} excused •
                                Overall attendance rate: {stats.attendanceRate}%
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyAttendancePage;