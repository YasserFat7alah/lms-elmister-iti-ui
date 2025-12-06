"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft, Download, MessageSquare, CheckCircle,
    Star, FileText, Paperclip, Calendar, Clock,
    User, Mail, ExternalLink, Eye, Edit, Award,
    ChevronDown, FileCode, FileImage, FileArchive,
    ThumbsUp, ThumbsDown, Send
} from "lucide-react";

const SubmissionDetailsPage = () => {
    const params = useParams();
    const router = useRouter();
    const { courseId, groupId, assignmentId, submissionId } = params;

    const [grade, setGrade] = useState(88);
    const [feedback, setFeedback] = useState("Good work on the design. The responsive layout works well on mobile and desktop. A few suggestions:\n\n1. Consider adding more comments to your CSS\n2. The contact form validation could be improved\n3. Add more project descriptions in the portfolio section\n\nOverall, great job!");
    const [rubricScores, setRubricScores] = useState([
        { criteria: "Code Quality", score: 25, max: 30, comment: "Good structure but needs more comments" },
        { criteria: "Design", score: 27, max: 30, comment: "Excellent responsive design" },
        { criteria: "Functionality", score: 19, max: 20, comment: "All features work as expected" },
        { criteria: "Creativity", score: 9, max: 10, comment: "Creative color scheme" },
        { criteria: "Documentation", score: 8, max: 10, comment: "Good README file" }
    ]);

    const submission = {
        id: submissionId,
        student: {
            name: "Sara Ali",
            email: "sara@example.com",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sara",
            id: "STU-102",
            joined: "2024-02-16"
        },
        assignment: {
            title: "HTML & CSS Project - Personal Portfolio",
            dueDate: "2024-03-10",
            points: 100,
            type: "Project"
        },
        submittedAt: "2024-03-09T20:15:00",
        status: "graded",
        files: [
            { name: "portfolio-website.zip", size: "2.8 MB", type: "zip", url: "#" },
            { name: "live-demo-link.txt", size: "0.1 KB", type: "text", url: "https://sara-portfolio.netlify.app" },
            { name: "screenshot-1.png", size: "1.2 MB", type: "image", url: "#" },
            { name: "screenshot-2.png", size: "1.1 MB", type: "image", url: "#" }
        ],
        notes: "Submitted with a note: 'Please review the contact form validation specifically.'"
    };

    const handleScoreChange = (index, value) => {
        const updatedScores = [...rubricScores];
        updatedScores[index].score = Math.min(Math.max(0, value), updatedScores[index].max);
        setRubricScores(updatedScores);

        // Calculate total grade
        const totalScore = updatedScores.reduce((sum, item) => sum + item.score, 0);
        const maxScore = updatedScores.reduce((sum, item) => sum + item.max, 0);
        const percentage = (totalScore / maxScore) * 100;
        setGrade(Math.round((percentage / 100) * submission.assignment.points));
    };

    const handleSubmitGrade = () => {
        alert(`Grade submitted: ${grade}/${submission.assignment.points}`);
        router.push(`/courses/${courseId}/groups/${groupId}/assignments/${assignmentId}/submissions`);
    };

    const getFileIcon = (type) => {
        switch (type) {
            case 'zip': return <FileArchive className="text-yellow-500" size={20} />;
            case 'image': return <FileImage className="text-green-500" size={20} />;
            case 'text': return <FileText className="text-blue-500" size={20} />;
            default: return <FileText className="text-gray-500" size={20} />;
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <Link href={`/courses/${courseId}/groups/${groupId}/assignments/${assignmentId}/submissions`}>
                            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
                                <ArrowLeft size={20} />
                                <span>Back to Submissions</span>
                            </button>
                        </Link>

                        <div className="h-6 w-px bg-gray-300"></div>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Submission Review</h1>
                            <p className="text-gray-600">
                                {submission.assignment.title} • {submission.student.name}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 px-3 py-2 border border-blue-200 rounded-lg">
                            <Download size={16} />
                            <span>Download All</span>
                        </button>

                        <button
                            onClick={handleSubmitGrade}
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700"
                        >
                            <CheckCircle size={16} />
                            <span>Submit Grade</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Student Info & Files */}
                <div className="space-y-6">
                    {/* Student Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Student Information</h3>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                                <img
                                    src={submission.student.avatar}
                                    alt={submission.student.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-800">{submission.student.name}</h4>
                                <p className="text-gray-600">{submission.student.email}</p>
                                <p className="text-sm text-gray-500 mt-1">ID: {submission.student.id}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Submitted:</span>
                                <span className="font-medium">
                                    {new Date(submission.submittedAt).toLocaleDateString()} at{" "}
                                    {new Date(submission.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Assignment:</span>
                                <span className="font-medium">{submission.assignment.type}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Due Date:</span>
                                <span className="font-medium">{submission.assignment.dueDate}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Status:</span>
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                    {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Files */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Submitted Files ({submission.files.length})</h3>

                        <div className="space-y-3">
                            {submission.files.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                                    <div className="flex items-center gap-3">
                                        {getFileIcon(file.type)}
                                        <div>
                                            <div className="font-medium text-gray-800">{file.name}</div>
                                            <div className="text-sm text-gray-500">{file.size}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {file.url.startsWith('http') ? (
                                            <a
                                                href={file.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                                            >
                                                <ExternalLink size={16} />
                                            </a>
                                        ) : (
                                            <button className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded">
                                                <Eye size={16} />
                                            </button>
                                        )}
                                        <button className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 rounded">
                                            <Download size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {submission.notes && (
                            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <div className="flex items-start gap-2">
                                    <MessageSquare size={16} className="text-yellow-600 mt-0.5" />
                                    <div className="text-sm text-yellow-700">{submission.notes}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Middle Column - Grading */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Rubric Scoring */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-6">Grading Rubric</h3>

                        <div className="space-y-4">
                            {rubricScores.map((item, index) => (
                                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <h4 className="font-medium text-gray-800">{item.criteria}</h4>
                                            <p className="text-sm text-gray-600 mt-1">{item.comment}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-gray-800">
                                                {item.score}/{item.max}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {((item.score / item.max) * 100).toFixed(0)}%
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <input
                                            type="range"
                                            min="0"
                                            max={item.max}
                                            value={item.score}
                                            onChange={(e) => handleScoreChange(index, parseInt(e.target.value))}
                                            className="flex-1"
                                        />
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleScoreChange(index, item.score - 1)}
                                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                                                disabled={item.score <= 0}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                value={item.score}
                                                onChange={(e) => handleScoreChange(index, parseInt(e.target.value) || 0)}
                                                className="w-16 border border-gray-300 rounded-lg p-2 text-center"
                                                min="0"
                                                max={item.max}
                                            />
                                            <button
                                                onClick={() => handleScoreChange(index, item.score + 1)}
                                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                                                disabled={item.score >= item.max}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold text-blue-800">Total Score</h4>
                                        <p className="text-sm text-blue-700">Based on rubric weights</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold text-blue-600">
                                            {grade}/{submission.assignment.points}
                                        </div>
                                        <div className="text-lg font-medium text-blue-700">
                                            {((grade / submission.assignment.points) * 100).toFixed(1)}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feedback */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Feedback</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Overall Feedback
                                </label>
                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    rows="6"
                                    className="w-full border border-gray-300 rounded-lg p-3"
                                    placeholder="Provide detailed feedback to the student..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Quick Feedback Templates
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        "Excellent work!",
                                        "Good job, but needs improvement.",
                                        "Well structured code.",
                                        "Creative design approach.",
                                        "Missing requirements.",
                                        "Late submission noted."
                                    ].map((template, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setFeedback(prev => prev + "\n\n" + template)}
                                            className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                                        >
                                            {template}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="sendEmail" defaultChecked />
                                    <label htmlFor="sendEmail" className="text-sm text-gray-700">
                                        Send feedback via email
                                    </label>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="allowResubmit" />
                                    <label htmlFor="allowResubmit" className="text-sm text-gray-700">
                                        Allow resubmission
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Grade Summary */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-green-800 mb-4">Grade Summary</h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                                <div className="text-2xl font-bold text-green-600">{grade}</div>
                                <div className="text-sm text-gray-600">Points Awarded</div>
                            </div>

                            <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                                <div className="text-2xl font-bold text-gray-800">{submission.assignment.points}</div>
                                <div className="text-sm text-gray-600">Total Points</div>
                            </div>

                            <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                                <div className="text-2xl font-bold text-blue-600">
                                    {((grade / submission.assignment.points) * 100).toFixed(1)}%
                                </div>
                                <div className="text-sm text-gray-600">Percentage</div>
                            </div>

                            <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                                <div className="text-2xl font-bold text-purple-600">B+</div>
                                <div className="text-sm text-gray-600">Letter Grade</div>
                            </div>
                        </div>

                        <div className="mt-4 flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setGrade(88);
                                    setFeedback("Good work on the design. The responsive layout works well on mobile and desktop. A few suggestions:\n\n1. Consider adding more comments to your CSS\n2. The contact form validation could be improved\n3. Add more project descriptions in the portfolio section\n\nOverall, great job!");
                                }}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Reset
                            </button>

                            <button
                                onClick={handleSubmitGrade}
                                className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                            >
                                <CheckCircle size={18} />
                                Submit Grade & Feedback
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmissionDetailsPage;