"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft, Edit, Trash2, Eye, Users, Calendar,
    FileText, Clock, Download, Upload, CheckCircle,
    XCircle, AlertCircle, MessageSquare, Paperclip,
    ExternalLink, Copy, BarChart3, Award, Star,
    ChevronRight, Mail, MoreVertical, Target,
    FileCode, FileImage, FileArchive, FileVideo
} from "lucide-react";

const AssignmentDetailsPage = () => {
    const params = useParams();
    const router = useRouter();
    const { courseId, groupId, assignmentId } = params;

    const [assignment, setAssignment] = useState({
        id: assignmentId,
        title: "HTML & CSS Project - Personal Portfolio",
        description: `Create a responsive personal portfolio website using HTML5 and CSS3.

Requirements:
1. At least 4 pages (Home, About, Portfolio, Contact)
2. Responsive design that works on mobile, tablet, and desktop
3. Use CSS Grid or Flexbox for layout
4. Include a navigation menu
5. Add a contact form with validation
6. Deploy to GitHub Pages or Netlify

Evaluation Criteria:
- Code quality and organization (30%)
- Design and responsiveness (30%)
- Functionality (20%)
- Creativity (10%)
- Documentation (10%)`,
        dueDate: "2024-03-10",
        dueTime: "23:59",
        points: 100,
        type: "project",
        status: "active",
        submissions: 12,
        totalStudents: 15,
        averageScore: 85,
        highestScore: 98,
        lowestScore: 72,
        createdAt: "2024-02-20",
        createdBy: "Ahmed Mohamed",

        attachments: [
            { name: "requirements.pdf", size: "2.4 MB", type: "pdf" },
            { name: "design-guide.zip", size: "5.1 MB", type: "zip" },
            { name: "example-website.jpg", size: "1.8 MB", type: "image" }
        ],

        rubric: [
            { criteria: "Code Quality", weight: 30, description: "Clean, organized, commented code" },
            { criteria: "Design", weight: 30, description: "Responsive and visually appealing" },
            { criteria: "Functionality", weight: 20, description: "All features work correctly" },
            { criteria: "Creativity", weight: 10, description: "Unique design elements" },
            { criteria: "Documentation", weight: 10, description: "README and comments" }
        ],

        instructions: [
            "Submit all files in a ZIP archive",
            "Include a README.md file",
            "Test on multiple browsers",
            "Deadline is strict - no late submissions",
            "Contact instructor for questions"
        ]
    });

    const [activeTab, setActiveTab] = useState("overview");

    const getFileIcon = (type) => {
        switch (type) {
            case 'pdf': return <FileText className="text-red-500" size={20} />;
            case 'zip': return <FileArchive className="text-yellow-500" size={20} />;
            case 'image': return <FileImage className="text-green-500" size={20} />;
            default: return <FileText className="text-gray-500" size={20} />;
        }
    };

    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "submissions", label: "Submissions" },
        { id: "rubric", label: "Rubric" },
        { id: "analytics", label: "Analytics" }
    ];

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <Link href={`/courses/${courseId}/groups/${groupId}/assignments`}>
                            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
                                <ArrowLeft size={20} />
                                <span>Back to Assignments</span>
                            </button>
                        </Link>

                        <div className="h-6 w-px bg-gray-300"></div>

                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold text-gray-800">{assignment.title}</h1>
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                    {assignment.type}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 mt-2">
                                <p className="text-gray-600">Assignment #{assignmentId}</p>
                                <p className="text-gray-600">Group: <Link href={`/courses/${courseId}/groups/${groupId}`} className="text-blue-600 hover:underline">View Group</Link></p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 text-green-600 hover:text-green-800 px-3 py-2 border border-green-200 rounded-lg">
                            <Download size={16} />
                            <span>Export</span>
                        </button>

                        <Link href={`/courses/${courseId}/groups/${groupId}/assignments/${assignmentId}/edit`}>
                            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                <Edit size={16} />
                                <span>Edit</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{assignment.points}</p>
                            <p className="text-sm text-gray-600">Points</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Award size={24} className="text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-gray-800">
                                {assignment.submissions}/{assignment.totalStudents}
                            </p>
                            <p className="text-sm text-gray-600">Submissions</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckCircle size={24} className="text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{assignment.averageScore}%</p>
                            <p className="text-sm text-gray-600">Average Score</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <BarChart3 size={24} className="text-purple-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{assignment.dueDate}</p>
                            <p className="text-sm text-gray-600">Due Date</p>
                        </div>
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <Calendar size={24} className="text-red-600" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6 rtl:space-x-reverse">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-6">
                    {/* Overview Tab */}
                    {activeTab === "overview" && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left Column - Description */}
                            <div className="lg:col-span-2 space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Description</h3>
                                    <div className="prose max-w-none">
                                        <pre className="whitespace-pre-wrap font-sans text-gray-700 bg-gray-50 p-4 rounded-lg">
                                            {assignment.description}
                                        </pre>
                                    </div>
                                </div>

                                {/* Instructions */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Submission Instructions</h3>
                                    <ul className="space-y-2">
                                        {assignment.instructions.map((instruction, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                                </div>
                                                <span className="text-gray-700">{instruction}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Right Column - Details */}
                            <div className="space-y-6">
                                {/* Due Date Card */}
                                <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                                    <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                                        <AlertCircle size={18} />
                                        Due Date
                                    </h4>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-red-700">{assignment.dueDate}</div>
                                        <div className="text-red-600">{assignment.dueTime}</div>
                                        <div className="text-sm text-red-500 mt-2">
                                            {assignment.submissions} of {assignment.totalStudents} submitted
                                        </div>
                                    </div>
                                </div>

                                {/* Attachments */}
                                <div className="bg-white border border-gray-200 rounded-xl p-5">
                                    <h4 className="font-semibold text-gray-800 mb-4">Attachments ({assignment.attachments.length})</h4>
                                    <div className="space-y-3">
                                        {assignment.attachments.map((file, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                                                <div className="flex items-center gap-3">
                                                    {getFileIcon(file.type)}
                                                    <div>
                                                        <div className="font-medium text-gray-800">{file.name}</div>
                                                        <div className="text-sm text-gray-500">{file.size}</div>
                                                    </div>
                                                </div>
                                                <button className="text-blue-600 hover:text-blue-800">
                                                    <Download size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="space-y-3">
                                    <Link href={`/courses/${courseId}/groups/${groupId}/assignments/${assignmentId}/submissions`}>
                                        <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700">
                                            <CheckCircle size={18} />
                                            Grade Submissions
                                        </button>
                                    </Link>
                                    <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2.5 rounded-lg hover:bg-gray-50">
                                        <Mail size={18} />
                                        Send Reminder
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Submissions Tab */}
                    {activeTab === "submissions" && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-800">Student Submissions</h3>
                                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700">
                                    <Download size={16} />
                                    <span>Export All</span>
                                </button>
                            </div>

                            {/* Mock submissions data */}
                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {[1, 2, 3].map((i) => (
                                            <tr key={i} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-gray-900">Student {i}</div>
                                                    <div className="text-sm text-gray-500">student{i}@example.com</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">2024-03-09</div>
                                                    <div className="text-xs text-gray-500">18:30</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                                        Submitted
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-gray-800">{85 + i * 3}/100</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded">
                                                            <Eye size={16} />
                                                        </button>
                                                        <button className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 rounded">
                                                            <Edit size={16} />
                                                        </button>
                                                        <button className="p-1.5 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 rounded">
                                                            <MessageSquare size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Rubric Tab */}
                    {activeTab === "rubric" && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-800">Grading Rubric</h3>

                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Criteria</th>
                                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Weight</th>
                                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Description</th>
                                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Example</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {assignment.rubric.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4">
                                                        <div className="font-medium text-gray-900">{item.criteria}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                                            {item.weight}%
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-gray-700">{item.description}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-500">See example in attachments</div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <Target size={20} className="text-blue-600 mt-0.5" />
                                    <div>
                                        <h4 className="font-medium text-blue-800">Grading Notes</h4>
                                        <p className="text-sm text-blue-700 mt-1">
                                            Use this rubric to ensure consistent grading. Consider bonus points for exceptional work.
                                            Provide specific feedback for each criteria.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Analytics Tab */}
                    {activeTab === "analytics" && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-800">Assignment Analytics</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-white border border-gray-200 rounded-xl p-6">
                                    <h4 className="font-semibold text-gray-800 mb-4">Score Distribution</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm text-gray-600">A (90-100)</span>
                                                <span className="text-sm font-bold">4 students</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-green-600 h-2 rounded-full" style={{ width: '33%' }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm text-gray-600">B (80-89)</span>
                                                <span className="text-sm font-bold">6 students</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '50%' }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm text-gray-600">C (70-79)</span>
                                                <span className="text-sm font-bold">2 students</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '17%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-xl p-6">
                                    <h4 className="font-semibold text-gray-800 mb-4">Timeline</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">First Submission</span>
                                            <span className="text-sm font-medium">2 days before</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Last Submission</span>
                                            <span className="text-sm font-medium">1 hour before</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Average Time</span>
                                            <span className="text-sm font-medium">1 day before</span>
                                        </div>
                                        <div className="pt-3 border-t border-gray-200">
                                            <div className="text-sm text-gray-600">3 students submitted late</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-xl p-6">
                                    <h4 className="font-semibold text-gray-800 mb-4">Grading Stats</h4>
                                    <div className="space-y-4">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-gray-800">{assignment.averageScore}%</div>
                                            <div className="text-sm text-gray-600">Average Score</div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-center">
                                                <div className="text-xl font-bold text-green-600">{assignment.highestScore}%</div>
                                                <div className="text-xs text-gray-600">Highest</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-xl font-bold text-red-600">{assignment.lowestScore}%</div>
                                                <div className="text-xs text-gray-600">Lowest</div>
                                            </div>
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

export default AssignmentDetailsPage;