"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft, Search, Filter, CheckCircle, XCircle,
    Clock, Calendar, Download, Upload, Eye, Edit,
    MessageSquare, Star, Award, FileText, Paperclip,
    User, Mail, Phone, ExternalLink, MoreVertical,
    ChevronDown, Filter as FilterIcon, BarChart3,
    Send, RefreshCw, AlertCircle, FileCode,
    FileImage, FileArchive, FileVideo, FileSpreadsheet
} from "lucide-react";

const AssignmentSubmissionsPage = () => {
    const params = useParams();
    const router = useRouter();
    const { courseId, groupId, assignmentId } = params;

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [selectedSubmissions, setSelectedSubmissions] = useState([]);
    const [showBulkGrade, setShowBulkGrade] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Assignment Data
    const [assignment, setAssignment] = useState({
        id: assignmentId,
        title: "HTML & CSS Project - Personal Portfolio",
        dueDate: "2024-03-10",
        dueTime: "23:59",
        points: 100,
        totalStudents: 15,
        gradedCount: 8,
        averageScore: 85
    });

    // Submissions Data
    const [submissions, setSubmissions] = useState([
        {
            id: 1,
            studentId: 101,
            studentName: "Ahmed Mohamed",
            studentEmail: "ahmed@example.com",
            studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed",
            submittedAt: "2024-03-09T18:30:00",
            status: "graded",
            grade: 92,
            feedback: "Excellent work! Very creative design and clean code.",
            late: false,
            files: [
                { name: "portfolio.zip", size: "3.2 MB", type: "zip" },
                { name: "screenshot.jpg", size: "1.5 MB", type: "image" }
            ],
            rubricScores: [
                { criteria: "Code Quality", score: 28, max: 30 },
                { criteria: "Design", score: 27, max: 30 },
                { criteria: "Functionality", score: 20, max: 20 },
                { criteria: "Creativity", score: 10, max: 10 },
                { criteria: "Documentation", score: 7, max: 10 }
            ]
        },
        {
            id: 2,
            studentId: 102,
            studentName: "Sara Ali",
            studentEmail: "sara@example.com",
            studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sara",
            submittedAt: "2024-03-09T20:15:00",
            status: "graded",
            grade: 88,
            feedback: "Good work. Could improve responsiveness on mobile.",
            late: false,
            files: [
                { name: "project-files.zip", size: "2.8 MB", type: "zip" }
            ],
            rubricScores: [
                { criteria: "Code Quality", score: 25, max: 30 },
                { criteria: "Design", score: 26, max: 30 },
                { criteria: "Functionality", score: 19, max: 20 },
                { criteria: "Creativity", score: 9, max: 10 },
                { criteria: "Documentation", score: 9, max: 10 }
            ]
        },
        {
            id: 3,
            studentId: 103,
            studentName: "Mohamed Khaled",
            studentEmail: "mohamed@example.com",
            studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mohamed",
            submittedAt: "2024-03-10T10:45:00",
            status: "graded",
            grade: 76,
            feedback: "Basic functionality works. Needs more polish.",
            late: false,
            files: [
                { name: "submission.zip", size: "1.9 MB", type: "zip" }
            ],
            rubricScores: [
                { criteria: "Code Quality", score: 20, max: 30 },
                { criteria: "Design", score: 22, max: 30 },
                { criteria: "Functionality", score: 18, max: 20 },
                { criteria: "Creativity", score: 7, max: 10 },
                { criteria: "Documentation", score: 9, max: 10 }
            ]
        },
        {
            id: 4,
            studentId: 104,
            studentName: "Fatima Abdullah",
            studentEmail: "fatima@example.com",
            studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fatima",
            submittedAt: "2024-03-10T22:30:00",
            status: "submitted",
            grade: null,
            feedback: "",
            late: true,
            files: [
                { name: "assignment-files.rar", size: "4.1 MB", type: "archive" }
            ],
            rubricScores: []
        },
        {
            id: 5,
            studentId: 105,
            studentName: "Ali Hassan",
            studentEmail: "ali@example.com",
            studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ali",
            submittedAt: "2024-03-10T23:45:00",
            status: "submitted",
            grade: null,
            feedback: "",
            late: true,
            files: [
                { name: "my-portfolio.zip", size: "3.5 MB", type: "zip" },
                { name: "readme.md", size: "2 KB", type: "text" }
            ],
            rubricScores: []
        },
        {
            id: 6,
            studentId: 106,
            studentName: "Noura Ahmed",
            studentEmail: "noura@example.com",
            studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=noura",
            submittedAt: "2024-03-08T14:20:00",
            status: "graded",
            grade: 95,
            feedback: "Outstanding! Perfect implementation.",
            late: false,
            files: [
                { name: "portfolio-project.zip", size: "4.8 MB", type: "zip" },
                { name: "demo.mp4", size: "12.3 MB", type: "video" }
            ],
            rubricScores: [
                { criteria: "Code Quality", score: 30, max: 30 },
                { criteria: "Design", score: 29, max: 30 },
                { criteria: "Functionality", score: 20, max: 20 },
                { criteria: "Creativity", score: 10, max: 10 },
                { criteria: "Documentation", score: 6, max: 10 }
            ]
        },
        {
            id: 7,
            studentId: 107,
            studentName: "Omar Mahmoud",
            studentEmail: "omar@example.com",
            studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=omar",
            submittedAt: null,
            status: "missing",
            grade: null,
            feedback: "",
            late: false,
            files: [],
            rubricScores: []
        }
    ]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Mock API call
                await new Promise(resolve => setTimeout(resolve, 800));
            } catch (error) {
                console.error("Error fetching submissions:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [assignmentId]);

    // Filter submissions
    const filteredSubmissions = submissions.filter(submission => {
        const matchesSearch =
            submission.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            submission.studentEmail.toLowerCase().includes(searchTerm.toLowerCase());

        if (selectedFilter === "all") return matchesSearch;
        if (selectedFilter === "graded") return matchesSearch && submission.status === "graded";
        if (selectedFilter === "submitted") return matchesSearch && submission.status === "submitted";
        if (selectedFilter === "missing") return matchesSearch && submission.status === "missing";
        if (selectedFilter === "late") return matchesSearch && submission.late;
        return matchesSearch;
    });

    // Statistics
    const stats = {
        total: submissions.length,
        graded: submissions.filter(s => s.status === "graded").length,
        submitted: submissions.filter(s => s.status === "submitted").length,
        missing: submissions.filter(s => s.status === "missing").length,
        late: submissions.filter(s => s.late).length,
        averageGrade: submissions
            .filter(s => s.grade)
            .reduce((acc, s) => acc + s.grade, 0) / submissions.filter(s => s.grade).length || 0
    };

    // Handle selection
    const toggleSubmissionSelection = (submissionId) => {
        if (selectedSubmissions.includes(submissionId)) {
            setSelectedSubmissions(selectedSubmissions.filter(id => id !== submissionId));
        } else {
            setSelectedSubmissions([...selectedSubmissions, submissionId]);
        }
    };

    const selectAllSubmissions = () => {
        if (selectedSubmissions.length === filteredSubmissions.length) {
            setSelectedSubmissions([]);
        } else {
            setSelectedSubmissions(filteredSubmissions.map(s => s.id));
        }
    };

    // Bulk actions
    const handleBulkGrade = () => {
        setShowBulkGrade(true);
    };

    const handleSendReminders = () => {
        const missingStudents = submissions
            .filter(s => s.status === "missing")
            .map(s => s.studentName);

        alert(`Sending reminders to ${missingStudents.length} students: ${missingStudents.join(", ")}`);
    };

    const handleExportGrades = () => {
        const data = submissions.map(s => ({
            Student: s.studentName,
            Email: s.studentEmail,
            Status: s.status,
            Grade: s.grade || "Not graded",
            Submitted: s.submittedAt ? new Date(s.submittedAt).toLocaleDateString() : "Not submitted"
        }));

        console.log("Exporting grades:", data);
        alert("Grades exported to console (CSV in real app)");
    };

    // Get status badge
    const getStatusBadge = (submission) => {
        if (submission.status === "graded") {
            return (
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center gap-1">
                    <CheckCircle size={12} />
                    Graded ({submission.grade}/{assignment.points})
                </span>
            );
        }

        if (submission.status === "submitted") {
            return (
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${submission.late ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                    {submission.late ? <Clock size={12} /> : <CheckCircle size={12} />}
                    {submission.late ? 'Late Submission' : 'Submitted'}
                </span>
            );
        }

        return (
            <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium flex items-center gap-1">
                <XCircle size={12} />
                Not Submitted
            </span>
        );
    };

    // Get file icon
    const getFileIcon = (type) => {
        switch (type) {
            case 'zip':
            case 'archive':
                return <FileArchive size={14} className="text-yellow-500" />;
            case 'image':
                return <FileImage size={14} className="text-green-500" />;
            case 'video':
                return <FileVideo size={14} className="text-purple-500" />;
            case 'text':
            case 'md':
                return <FileText size={14} className="text-blue-500" />;
            default:
                return <FileText size={14} className="text-gray-500" />;
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto p-6">
                <div className="animate-pulse space-y-6">
                    <div className="h-12 bg-gray-200 rounded w-1/2"></div>
                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
                        ))}
                    </div>
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
                        <Link href={`/courses/${courseId}/groups/${groupId}/assignments/${assignmentId}`}>
                            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
                                <ArrowLeft size={20} />
                                <span>Back to Assignment</span>
                            </button>
                        </Link>

                        <div className="h-6 w-px bg-gray-300"></div>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">{assignment.title} - Submissions</h1>
                            <p className="text-gray-600">Assignment #{assignmentId} • Due: {assignment.dueDate} at {assignment.dueTime}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleExportGrades}
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 px-3 py-2 border border-blue-200 rounded-lg"
                        >
                            <Download size={16} />
                            <span>Export Grades</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                        <p className="text-sm text-gray-600">Total Students</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{stats.graded}</p>
                        <p className="text-sm text-gray-600">Graded</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{stats.submitted}</p>
                        <p className="text-sm text-gray-600">Submitted</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-red-600">{stats.missing}</p>
                        <p className="text-sm text-gray-600">Missing</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-yellow-600">{stats.late}</p>
                        <p className="text-sm text-gray-600">Late</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">{stats.averageGrade.toFixed(1)}%</p>
                        <p className="text-sm text-gray-600">Average Grade</p>
                    </div>
                </div>
            </div>

            {/* Filters and Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        {/* Search */}
                        <div className="relative flex-1 sm:max-w-md">
                            <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search students by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Filter */}
                        <div className="flex items-center gap-2">
                            <FilterIcon size={18} className="text-gray-500" />
                            <select
                                value={selectedFilter}
                                onChange={(e) => setSelectedFilter(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2.5"
                            >
                                <option value="all">All Submissions</option>
                                <option value="graded">Graded</option>
                                <option value="submitted">Submitted (Ungraded)</option>
                                <option value="missing">Missing</option>
                                <option value="late">Late Submissions</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Bulk Actions */}
                        {selectedSubmissions.length > 0 && (
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">
                                    {selectedSubmissions.length} selected
                                </span>
                                <button
                                    onClick={handleBulkGrade}
                                    className="flex items-center gap-1 text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700"
                                >
                                    <CheckCircle size={14} />
                                    Bulk Grade
                                </button>
                            </div>
                        )}

                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleSendReminders}
                                className="flex items-center gap-1 text-sm text-yellow-600 hover:text-yellow-800 px-3 py-1.5 border border-yellow-200 rounded-lg hover:bg-yellow-50"
                            >
                                <Send size={14} />
                                Send Reminders
                            </button>

                            <Link href={`/courses/${courseId}/groups/${groupId}/assignments/${assignmentId}/analytics`}>
                                <button className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800 px-3 py-1.5 border border-purple-200 rounded-lg hover:bg-purple-50">
                                    <BarChart3 size={14} />
                                    Analytics
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Submissions Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="w-12 px-6 py-3 text-left">
                                    <input
                                        type="checkbox"
                                        checked={selectedSubmissions.length === filteredSubmissions.length && filteredSubmissions.length > 0}
                                        onChange={selectAllSubmissions}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submission</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredSubmissions.map((submission) => (
                                <tr key={submission.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedSubmissions.includes(submission.id)}
                                            onChange={() => toggleSubmissionSelection(submission.id)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                                                <img
                                                    src={submission.studentAvatar}
                                                    alt={submission.studentName}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{submission.studentName}</div>
                                                <div className="text-sm text-gray-500">{submission.studentEmail}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="space-y-2">
                                            {submission.submittedAt ? (
                                                <>
                                                    <div className="text-sm text-gray-900">
                                                        {new Date(submission.submittedAt).toLocaleDateString()}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {new Date(submission.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                    {submission.files.length > 0 && (
                                                        <div className="flex items-center gap-1">
                                                            <Paperclip size={12} className="text-gray-400" />
                                                            <span className="text-xs text-gray-600">
                                                                {submission.files.length} file(s)
                                                            </span>
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <span className="text-sm text-gray-500">Not submitted</span>
                                            )}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        {getStatusBadge(submission)}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            {submission.grade ? (
                                                <>
                                                    <div className="font-bold text-gray-800">
                                                        {submission.grade}/{assignment.points}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {((submission.grade / assignment.points) * 100).toFixed(1)}%
                                                    </div>
                                                </>
                                            ) : submission.status === "submitted" ? (
                                                <span className="text-sm text-yellow-600">Needs grading</span>
                                            ) : (
                                                <span className="text-sm text-gray-500">-</span>
                                            )}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {submission.status === "submitted" && (
                                                <Link href={`/courses/${courseId}/groups/${groupId}/assignments/${assignmentId}/grade/${submission.id}`}>
                                                    <button className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 rounded">
                                                        <CheckCircle size={16} />
                                                    </button>
                                                </Link>
                                            )}

                                            {submission.files.length > 0 && (
                                                <Link href={`/courses/${courseId}/groups/${groupId}/assignments/${assignmentId}/submissions/${submission.id}`}>
                                                    <button className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded">
                                                        <Eye size={16} />
                                                    </button>
                                                </Link>
                                            )}

                                            {submission.status === "graded" && (
                                                <button className="p-1.5 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 rounded">
                                                    <Edit size={16} />
                                                </button>
                                            )}

                                            <button className="p-1.5 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded">
                                                <MessageSquare size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredSubmissions.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                            <FileText className="text-gray-400" size={32} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-700 mb-2">No submissions found</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            {searchTerm ? "No submissions match your search criteria." : "No submissions for this assignment yet."}
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {filteredSubmissions.length > 0 && (
                    <div className="px-6 py-4 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="text-sm text-gray-600">
                                Showing {filteredSubmissions.length} of {submissions.length} submissions
                            </div>

                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                                    Previous
                                </button>
                                <span className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">
                                    1
                                </span>
                                <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Grade Distribution */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="font-medium text-gray-800 mb-4">Grade Distribution</h3>
                    <div className="space-y-3">
                        {['A (90-100)', 'B (80-89)', 'C (70-79)', 'D (60-69)', 'F (<60)'].map((range, index) => {
                            const count = [4, 3, 1, 0, 0][index];
                            const percentage = (count / stats.graded) * 100;

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
                                                    index === 2 ? 'bg-yellow-500' :
                                                        index === 3 ? 'bg-orange-500' : 'bg-red-500'
                                                }`}
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Submission Timeline */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="font-medium text-gray-800 mb-4">Submission Timeline</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="font-medium text-gray-800">First Submission</div>
                                <div className="text-sm text-gray-600">2 days before deadline</div>
                            </div>
                            <div className="text-green-600 font-medium">Early</div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <div className="font-medium text-gray-800">Last Submission</div>
                                <div className="text-sm text-gray-600">15 minutes before deadline</div>
                            </div>
                            <div className="text-blue-600 font-medium">On Time</div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <div className="font-medium text-gray-800">Average Time</div>
                                <div className="text-sm text-gray-600">1 day before deadline</div>
                            </div>
                            <div className="text-green-600 font-medium">Good</div>
                        </div>

                        <div className="pt-3 border-t border-gray-200">
                            <div className="text-sm text-gray-600">
                                {stats.late} late submission{stats.late !== 1 ? 's' : ''}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Required */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="font-medium text-gray-800 mb-4">Action Required</h3>
                    <div className="space-y-4">
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <AlertCircle size={16} className="text-yellow-600" />
                                    <span className="font-medium text-yellow-700">Ungraded Submissions</span>
                                </div>
                                <span className="font-bold text-yellow-800">{stats.submitted}</span>
                            </div>
                            <button className="w-full mt-2 text-sm text-yellow-600 hover:text-yellow-800 font-medium">
                                Start Grading →
                            </button>
                        </div>

                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <AlertCircle size={16} className="text-red-600" />
                                    <span className="font-medium text-red-700">Missing Submissions</span>
                                </div>
                                <span className="font-bold text-red-800">{stats.missing}</span>
                            </div>
                            <button
                                onClick={handleSendReminders}
                                className="w-full mt-2 text-sm text-red-600 hover:text-red-800 font-medium"
                            >
                                Send Reminders →
                            </button>
                        </div>

                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Star size={16} className="text-blue-600" />
                                    <span className="font-medium text-blue-700">Top Performer</span>
                                </div>
                                <span className="font-bold text-blue-800">Noura Ahmed (95%)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bulk Grade Modal */}
            {showBulkGrade && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-gray-800">Bulk Grade Submissions</h3>
                                <button
                                    onClick={() => setShowBulkGrade(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <XCircle size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-blue-700">
                                        Grading {selectedSubmissions.length} selected submission{selectedSubmissions.length !== 1 ? 's' : ''}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Apply Grade
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter grade (0-100)"
                                        className="w-full border border-gray-300 rounded-lg p-3"
                                        min="0"
                                        max={assignment.points}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Common Feedback
                                    </label>
                                    <textarea
                                        rows="3"
                                        className="w-full border border-gray-300 rounded-lg p-3"
                                        placeholder="Enter common feedback for all selected submissions..."
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="sendNotification" defaultChecked />
                                        <label htmlFor="sendNotification" className="text-sm text-gray-700">
                                            Send notification to students
                                        </label>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="applyRubric" />
                                        <label htmlFor="applyRubric" className="text-sm text-gray-700">
                                            Apply same rubric scores
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 mt-6">
                                <button
                                    onClick={() => setShowBulkGrade(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        alert("Bulk grading applied!");
                                        setShowBulkGrade(false);
                                    }}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Apply Grades
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignmentSubmissionsPage;