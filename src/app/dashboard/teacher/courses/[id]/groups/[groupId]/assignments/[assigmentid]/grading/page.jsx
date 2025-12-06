"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Search, Filter, CheckCircle, Clock, AlertCircle,
    User, Users, FileText, Calendar, ChevronRight,
    Star, TrendingUp, Award, BarChart3, Download,
    Mail, MessageSquare, FileCode, BookOpen,
    ChevronDown, Filter as FilterIcon, RefreshCw,
    Eye, Edit, ExternalLink
} from "lucide-react";

const GradingDashboardPage = () => {
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [selectedCourse, setSelectedCourse] = useState("all");
    const [selectedGroup, setSelectedGroup] = useState("all");
    const [sortBy, setSortBy] = useState("dueDate");

    const [courses, setCourses] = useState([
        { id: 1, title: "Web Development Bootcamp", code: "WEB-101" },
        { id: 2, title: "JavaScript Advanced", code: "JS-201" },
        { id: 3, title: "React Masterclass", code: "REACT-301" }
    ]);

    const [groups, setGroups] = useState([
        { id: 1, name: "Morning Group", courseId: 1 },
        { id: 2, name: "Evening Group", courseId: 1 },
        { id: 3, name: "Advanced Group", courseId: 2 }
    ]);

    // Mock data for submissions needing grading
    const [submissions, setSubmissions] = useState([
        {
            id: 1,
            studentId: 101,
            studentName: "Ahmed Mohamed",
            studentEmail: "ahmed@example.com",
            studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed1",
            courseId: 1,
            courseTitle: "Web Development Bootcamp",
            groupId: 1,
            groupName: "Morning Group",
            assignmentId: 101,
            assignmentTitle: "HTML & CSS Portfolio Project",
            assignmentType: "project",
            dueDate: "2024-03-10",
            submittedAt: "2024-03-09T18:30:00",
            daysLate: 0,
            priority: "high", // high, medium, low
            estimatedTime: 15, // minutes
            filesCount: 3,
            rubricAvailable: true,
            previousGrade: 85, // average from previous assignments
            notes: "Student requested early feedback"
        },
        {
            id: 2,
            studentId: 102,
            studentName: "Sara Ali",
            studentEmail: "sara@example.com",
            studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sara1",
            courseId: 1,
            courseTitle: "Web Development Bootcamp",
            groupId: 1,
            groupName: "Morning Group",
            assignmentId: 102,
            assignmentTitle: "JavaScript Functions Assignment",
            assignmentType: "exercise",
            dueDate: "2024-03-05",
            submittedAt: "2024-03-10T10:45:00",
            daysLate: 5,
            priority: "high",
            estimatedTime: 10,
            filesCount: 1,
            rubricAvailable: true,
            previousGrade: 92,
            notes: "Late submission - needs attention"
        },
        {
            id: 3,
            studentId: 103,
            studentName: "Mohamed Khaled",
            studentEmail: "mohamed@example.com",
            studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mohamed1",
            courseId: 1,
            courseTitle: "Web Development Bootcamp",
            groupId: 2,
            groupName: "Evening Group",
            assignmentId: 103,
            assignmentTitle: "Responsive Design Challenge",
            assignmentType: "challenge",
            dueDate: "2024-03-15",
            submittedAt: "2024-03-14T22:30:00",
            daysLate: 0,
            priority: "medium",
            estimatedTime: 20,
            filesCount: 2,
            rubricAvailable: true,
            previousGrade: 76,
            notes: ""
        },
        {
            id: 4,
            studentId: 104,
            studentName: "Fatima Abdullah",
            studentEmail: "fatima@example.com",
            studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fatima1",
            courseId: 2,
            courseTitle: "JavaScript Advanced",
            groupId: 3,
            groupName: "Advanced Group",
            assignmentId: 201,
            assignmentTitle: "Async/Await Exercises",
            assignmentType: "exercise",
            dueDate: "2024-03-12",
            submittedAt: "2024-03-11T14:20:00",
            daysLate: 0,
            priority: "low",
            estimatedTime: 8,
            filesCount: 1,
            rubricAvailable: true,
            previousGrade: 88,
            notes: ""
        },
        {
            id: 5,
            studentId: 105,
            studentName: "Ali Hassan",
            studentEmail: "ali@example.com",
            studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ali1",
            courseId: 1,
            courseTitle: "Web Development Bootcamp",
            groupId: 1,
            groupName: "Morning Group",
            assignmentId: 104,
            assignmentTitle: "DOM Manipulation Project",
            assignmentType: "project",
            dueDate: "2024-03-08",
            submittedAt: "2024-03-10T23:45:00",
            daysLate: 2,
            priority: "high",
            estimatedTime: 25,
            filesCount: 4,
            rubricAvailable: false,
            previousGrade: 65,
            notes: "Struggling student - needs supportive feedback"
        },
        {
            id: 6,
            studentId: 106,
            studentName: "Noura Ahmed",
            studentEmail: "noura@example.com",
            studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=noura1",
            courseId: 3,
            courseTitle: "React Masterclass",
            groupId: 4,
            groupName: "React Group",
            assignmentId: 301,
            assignmentTitle: "Component Library",
            assignmentType: "project",
            dueDate: "2024-03-20",
            submittedAt: "2024-03-18T09:15:00",
            daysLate: 0,
            priority: "medium",
            estimatedTime: 30,
            filesCount: 5,
            rubricAvailable: true,
            previousGrade: 95,
            notes: "Top performer - expect excellent work"
        },
        {
            id: 7,
            studentId: 107,
            studentName: "Omar Mahmoud",
            studentEmail: "omar@example.com",
            studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=omar1",
            courseId: 2,
            courseTitle: "JavaScript Advanced",
            groupId: 3,
            groupName: "Advanced Group",
            assignmentId: 202,
            assignmentTitle: "Promise Chain Exercises",
            assignmentType: "exercise",
            dueDate: "2024-03-14",
            submittedAt: "2024-03-13T16:40:00",
            daysLate: 0,
            priority: "low",
            estimatedTime: 12,
            filesCount: 1,
            rubricAvailable: true,
            previousGrade: 82,
            notes: ""
        },
        {
            id: 8,
            studentId: 108,
            studentName: "Lina Samir",
            studentEmail: "lina@example.com",
            studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lina1",
            courseId: 1,
            courseTitle: "Web Development Bootcamp",
            groupId: 2,
            groupName: "Evening Group",
            assignmentId: 105,
            assignmentTitle: "CSS Grid Layout",
            assignmentType: "challenge",
            dueDate: "2024-03-16",
            submittedAt: "2024-03-15T21:10:00",
            daysLate: 0,
            priority: "medium",
            estimatedTime: 18,
            filesCount: 3,
            rubricAvailable: true,
            previousGrade: 79,
            notes: ""
        }
    ]);

    const [stats, setStats] = useState({
        total: 0,
        highPriority: 0,
        mediumPriority: 0,
        lowPriority: 0,
        totalTime: 0,
        byCourse: {},
        byGroup: {}
    });

    // Calculate statistics
    useEffect(() => {
        const total = submissions.length;
        const highPriority = submissions.filter(s => s.priority === "high").length;
        const mediumPriority = submissions.filter(s => s.priority === "medium").length;
        const lowPriority = submissions.filter(s => s.priority === "low").length;
        const totalTime = submissions.reduce((sum, s) => sum + s.estimatedTime, 0);

        // Group by course
        const byCourse = {};
        submissions.forEach(s => {
            byCourse[s.courseId] = (byCourse[s.courseId] || 0) + 1;
        });

        // Group by group
        const byGroup = {};
        submissions.forEach(s => {
            byGroup[s.groupId] = (byGroup[s.groupId] || 0) + 1;
        });

        setStats({
            total,
            highPriority,
            mediumPriority,
            lowPriority,
            totalTime,
            byCourse,
            byGroup
        });
    }, [submissions]);

    // Filter submissions
    const filteredSubmissions = submissions.filter(submission => {
        // Search filter
        const matchesSearch =
            submission.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            submission.assignmentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            submission.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;

        // Priority filter
        if (selectedFilter !== "all" && submission.priority !== selectedFilter) return false;

        // Course filter
        if (selectedCourse !== "all" && submission.courseId !== parseInt(selectedCourse)) return false;

        // Group filter
        if (selectedGroup !== "all" && submission.groupId !== parseInt(selectedGroup)) return false;

        return true;
    }).sort((a, b) => {
        // Sort logic
        if (sortBy === "dueDate") {
            return new Date(a.dueDate) - new Date(b.dueDate);
        } else if (sortBy === "priority") {
            const priorityOrder = { high: 1, medium: 2, low: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        } else if (sortBy === "student") {
            return a.studentName.localeCompare(b.studentName);
        } else if (sortBy === "course") {
            return a.courseTitle.localeCompare(b.courseTitle);
        }
        return 0;
    });

    // Get priority badge
    const getPriorityBadge = (priority) => {
        const config = {
            high: { color: "bg-red-100 text-red-800", icon: AlertCircle },
            medium: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
            low: { color: "bg-green-100 text-green-800", icon: CheckCircle }
        };

        const { color, icon: Icon } = config[priority] || config.medium;

        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color}`}>
                <Icon size={12} />
                {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
            </span>
        );
    };

    // Get assignment type icon
    const getAssignmentTypeIcon = (type) => {
        switch (type) {
            case 'project': return <FileCode size={14} className="text-purple-500" />;
            case 'exercise': return <FileText size={14} className="text-blue-500" />;
            case 'challenge': return <Award size={14} className="text-yellow-500" />;
            default: return <FileText size={14} className="text-gray-500" />;
        }
    };

    // Handle quick grade
    const handleQuickGrade = (submissionId) => {
        const submission = submissions.find(s => s.id === submissionId);
        if (submission) {
            router.push(`/courses/${submission.courseId}/groups/${submission.groupId}/assignments/${submission.assignmentId}/grade/${submission.studentId}`);
        }
    };

    // Handle mark as graded
    const handleMarkAsGraded = (submissionId) => {
        setSubmissions(prev => prev.filter(s => s.id !== submissionId));
    };

    // Handle bulk mark as graded
    const handleBulkMarkAsGraded = () => {
        const selectedIds = filteredSubmissions.slice(0, 3).map(s => s.id);
        setSubmissions(prev => prev.filter(s => !selectedIds.includes(s.id)));
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Grading Dashboard</h1>
                        <p className="text-gray-600 mt-2">Manage and grade student submissions efficiently</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleBulkMarkAsGraded}
                            className="flex items-center gap-2 text-green-600 hover:text-green-800 px-4 py-2.5 border border-green-200 rounded-lg hover:bg-green-50"
                        >
                            <CheckCircle size={18} />
                            <span>Quick Grade Batch</span>
                        </button>

                        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700">
                            <Download size={18} />
                            <span>Export Queue</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                            <p className="text-sm text-gray-600">Pending Submissions</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText size={24} className="text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-red-600">{stats.highPriority}</p>
                            <p className="text-sm text-gray-600">High Priority</p>
                        </div>
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <AlertCircle size={24} className="text-red-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-yellow-600">{stats.mediumPriority}</p>
                            <p className="text-sm text-gray-600">Medium Priority</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Clock size={24} className="text-yellow-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{Math.ceil(stats.totalTime / 60)}h</p>
                            <p className="text-sm text-gray-600">Estimated Time</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Clock size={24} className="text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
                        {/* Search */}
                        <div className="relative flex-1 sm:max-w-md">
                            <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by student, assignment, or course..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Priority Filter */}
                        <div className="flex items-center gap-2">
                            <FilterIcon size={18} className="text-gray-500" />
                            <select
                                value={selectedFilter}
                                onChange={(e) => setSelectedFilter(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2.5"
                            >
                                <option value="all">All Priorities</option>
                                <option value="high">High Priority</option>
                                <option value="medium">Medium Priority</option>
                                <option value="low">Low Priority</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Course Filter */}
                        <select
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2.5"
                        >
                            <option value="all">All Courses</option>
                            {courses.map(course => (
                                <option key={course.id} value={course.id}>
                                    {course.code} - {course.title}
                                </option>
                            ))}
                        </select>

                        {/* Sort */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2.5"
                        >
                            <option value="dueDate">Sort by Due Date</option>
                            <option value="priority">Sort by Priority</option>
                            <option value="student">Sort by Student</option>
                            <option value="course">Sort by Course</option>
                        </select>
                    </div>
                </div>

                {/* Quick Filters */}
                <div className="flex flex-wrap gap-2 mt-4">
                    <button
                        onClick={() => {
                            setSelectedFilter("high");
                            setSelectedCourse("all");
                            setSelectedGroup("all");
                        }}
                        className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm hover:bg-red-100"
                    >
                        High Priority Only
                    </button>

                    <button
                        onClick={() => {
                            setSelectedFilter("all");
                            setSelectedCourse("1");
                            setSelectedGroup("all");
                        }}
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-sm hover:bg-blue-100"
                    >
                        Web Development Only
                    </button>

                    <button
                        onClick={() => {
                            setSelectedFilter("all");
                            setSelectedCourse("all");
                            setSelectedGroup("all");
                            setSortBy("dueDate");
                        }}
                        className="px-3 py-1.5 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg text-sm hover:bg-gray-100"
                    >
                        Due Soonest
                    </button>

                    <button
                        onClick={() => {
                            setSearchTerm("");
                            setSelectedFilter("all");
                            setSelectedCourse("all");
                            setSelectedGroup("all");
                            setSortBy("priority");
                        }}
                        className="px-3 py-1.5 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg text-sm hover:bg-gray-100"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Submissions List */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Submissions Needing Grading ({filteredSubmissions.length})
                        </h2>
                        <div className="text-sm text-gray-600">
                            Estimated time: {Math.ceil(filteredSubmissions.reduce((sum, s) => sum + s.estimatedTime, 0) / 60)}h
                        </div>
                    </div>

                    {/* Submissions Grid */}
                    <div className="space-y-4">
                        {filteredSubmissions.map((submission) => (
                            <div key={submission.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                    {/* Left Column - Student & Assignment Info */}
                                    <div className="flex-1">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                                <img
                                                    src={submission.studentAvatar}
                                                    alt={submission.studentName}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="font-bold text-gray-800">{submission.studentName}</h3>
                                                    {getPriorityBadge(submission.priority)}
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <BookOpen size={14} className="text-gray-500" />
                                                        <span className="text-sm text-gray-700">{submission.courseTitle}</span>
                                                        <span className="text-gray-300">•</span>
                                                        <Users size={14} className="text-gray-500" />
                                                        <span className="text-sm text-gray-700">{submission.groupName}</span>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        {getAssignmentTypeIcon(submission.assignmentType)}
                                                        <span className="font-medium text-gray-900">{submission.assignmentTitle}</span>
                                                        <span className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                                                            {submission.assignmentType}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar size={12} />
                                                            Due: {submission.dueDate}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock size={12} />
                                                            Submitted: {new Date(submission.submittedAt).toLocaleDateString()}
                                                        </span>
                                                        {submission.daysLate > 0 && (
                                                            <span className="text-red-600">
                                                                {submission.daysLate} day{submission.daysLate !== 1 ? 's' : ''} late
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Previous Performance */}
                                                <div className="mt-3 flex items-center gap-4">
                                                    <div className="flex items-center gap-2">
                                                        <TrendingUp size={14} className="text-gray-500" />
                                                        <span className="text-sm text-gray-600">Previous Average:</span>
                                                        <span className={`font-medium ${submission.previousGrade >= 90 ? 'text-green-600' :
                                                            submission.previousGrade >= 80 ? 'text-blue-600' :
                                                                submission.previousGrade >= 70 ? 'text-yellow-600' :
                                                                    'text-red-600'
                                                            }`}>
                                                            {submission.previousGrade}%
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-1">
                                                        <FileText size={12} className="text-gray-500" />
                                                        <span className="text-sm text-gray-600">{submission.filesCount} file{submission.filesCount !== 1 ? 's' : ''}</span>
                                                    </div>

                                                    {!submission.rubricAvailable && (
                                                        <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                                                            No Rubric
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Notes */}
                                                {submission.notes && (
                                                    <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
                                                        <div className="flex items-start gap-2">
                                                            <AlertCircle size={14} className="text-yellow-600 mt-0.5" />
                                                            <span className="text-sm text-yellow-700">{submission.notes}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column - Actions */}
                                    <div className="lg:w-48 flex flex-col gap-3">
                                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                                            <div className="text-sm text-gray-600">Est. Time</div>
                                            <div className="text-lg font-bold text-gray-800">{submission.estimatedTime} min</div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={() => handleQuickGrade(submission.id)}
                                                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700"
                                            >
                                                <CheckCircle size={16} />
                                                Grade Now
                                            </button>

                                            <div className="flex gap-2">
                                                <Link href={`/courses/${submission.courseId}/groups/${submission.groupId}/assignments/${submission.assignmentId}/submissions/${submission.studentId}`}>
                                                    <button className="flex-1 flex items-center justify-center gap-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 py-2 rounded-lg hover:bg-gray-50">
                                                        <Eye size={14} />
                                                        View
                                                    </button>
                                                </Link>

                                                <button
                                                    onClick={() => handleMarkAsGraded(submission.id)}
                                                    className="flex-1 flex items-center justify-center gap-1 text-sm text-green-600 hover:text-green-800 border border-green-200 py-2 rounded-lg hover:bg-green-50"
                                                >
                                                    <CheckCircle size={14} />
                                                    Done
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {filteredSubmissions.length === 0 && (
                            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                                    <CheckCircle className="text-green-600" size={32} />
                                </div>
                                <h3 className="text-lg font-medium text-gray-700 mb-2">All Caught Up!</h3>
                                <p className="text-gray-500 max-w-md mx-auto">
                                    No submissions need grading right now. Great work!
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Sidebar - Statistics & Tools */}
                <div className="space-y-6">
                    {/* Progress */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <h3 className="font-semibold text-gray-800 mb-4">Grading Progress</h3>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm text-gray-600">Overall Progress</span>
                                    <span className="text-sm font-bold text-gray-800">
                                        {Math.round((stats.total / (stats.total + 12)) * 100)}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full"
                                        style={{ width: `${Math.round((stats.total / (stats.total + 12)) * 100)}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div className="text-center p-2 bg-red-50 rounded">
                                    <div className="text-lg font-bold text-red-600">{stats.highPriority}</div>
                                    <div className="text-xs text-red-700">High</div>
                                </div>
                                <div className="text-center p-2 bg-yellow-50 rounded">
                                    <div className="text-lg font-bold text-yellow-600">{stats.mediumPriority}</div>
                                    <div className="text-xs text-yellow-700">Medium</div>
                                </div>
                                <div className="text-center p-2 bg-green-50 rounded">
                                    <div className="text-lg font-bold text-green-600">{stats.lowPriority}</div>
                                    <div className="text-xs text-green-700">Low</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>

                        <div className="space-y-3">
                            <button
                                onClick={handleBulkMarkAsGraded}
                                className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                <div className="flex items-center gap-2">
                                    <CheckCircle size={16} className="text-green-600" />
                                    <span className="text-gray-700">Grade Next 3 Submissions</span>
                                </div>
                                <ChevronRight size={16} className="text-gray-400" />
                            </button>

                            <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                                <div className="flex items-center gap-2">
                                    <Mail size={16} className="text-blue-600" />
                                    <span className="text-gray-700">Send Reminders</span>
                                </div>
                                <ChevronRight size={16} className="text-gray-400" />
                            </button>

                            <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                                <div className="flex items-center gap-2">
                                    <Download size={16} className="text-purple-600" />
                                    <span className="text-gray-700">Export Grading Data</span>
                                </div>
                                <ChevronRight size={16} className="text-gray-400" />
                            </button>

                            <button className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                                <div className="flex items-center gap-2">
                                    <BarChart3 size={16} className="text-yellow-600" />
                                    <span className="text-gray-700">View Analytics</span>
                                </div>
                                <ChevronRight size={16} className="text-gray-400" />
                            </button>
                        </div>
                    </div>

                    {/* Performance Insights */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <h3 className="font-semibold text-gray-800 mb-4">Performance Insights</h3>

                        <div className="space-y-4">
                            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <TrendingUp size={16} className="text-green-600" />
                                    <span className="font-medium text-green-700">Grading Speed</span>
                                </div>
                                <p className="text-sm text-green-600">
                                    You're grading 15% faster than average
                                </p>
                            </div>

                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <Star size={16} className="text-blue-600" />
                                    <span className="font-medium text-blue-700">Quality Score</span>
                                </div>
                                <p className="text-sm text-blue-600">
                                    Student satisfaction: 94% (Excellent)
                                </p>
                            </div>

                            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <Clock size={16} className="text-yellow-600" />
                                    <span className="font-medium text-yellow-700">Time Management</span>
                                </div>
                                <p className="text-sm text-yellow-600">
                                    Complete grading in 3 days to stay on schedule
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                    <CheckCircle size={14} className="text-green-600" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-800">Graded HTML Project</div>
                                    <div className="text-xs text-gray-500">5 minutes ago</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                    <Mail size={14} className="text-blue-600" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-800">Sent feedback to 3 students</div>
                                    <div className="text-xs text-gray-500">1 hour ago</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                    <Download size={14} className="text-purple-600" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-800">Exported grades report</div>
                                    <div className="text-xs text-gray-500">3 hours ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Grading by Course</h3>
                    <div className="space-y-3">
                        {courses.map(course => (
                            <div key={course.id} className="flex items-center justify-between">
                                <span className="text-gray-700">{course.code}</span>
                                <span className="font-medium text-gray-800">
                                    {stats.byCourse[course.id] || 0} submissions
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Time Estimates</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-700">Quick Grading (&lt;5 min)</span>
                            <span className="font-medium text-green-600">
                                {submissions.filter(s => s.estimatedTime <= 5).length}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-700">Medium (5-15 min)</span>
                            <span className="font-medium text-yellow-600">
                                {submissions.filter(s => s.estimatedTime > 5 && s.estimatedTime <= 15).length}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-700">Detailed (15+ min)</span>
                            <span className="font-medium text-red-600">
                                {submissions.filter(s => s.estimatedTime > 15).length}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Recommendations</h3>
                    <div className="space-y-3">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <div className="text-sm font-medium text-blue-700 mb-1">Start with high priority</div>
                            <div className="text-xs text-blue-600">
                                Grade {stats.highPriority} high priority submissions first
                            </div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <div className="text-sm font-medium text-green-700 mb-1">Use rubric templates</div>
                            <div className="text-xs text-green-600">
                                {submissions.filter(s => s.rubricAvailable).length} submissions have rubrics
                            </div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                            <div className="text-sm font-medium text-purple-700 mb-1">Schedule grading sessions</div>
                            <div className="text-xs text-purple-600">
                                Aim for 2-3 sessions of 60 minutes each
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GradingDashboardPage;