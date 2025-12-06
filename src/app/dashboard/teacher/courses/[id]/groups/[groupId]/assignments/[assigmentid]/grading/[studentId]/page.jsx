"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft, Save, CheckCircle, Star, MessageSquare,
    Clock, Calendar, User, Mail, FileText, Paperclip,
    Download, Upload, Eye, Edit, ExternalLink, Award,
    Target, ThumbsUp, ThumbsDown, Send, BookOpen,
    ChevronDown, AlertCircle, FileCode, FileImage,
    FileArchive, FileVideo, Hash, Copy, BarChart3,
    TrendingUp, Users
} from "lucide-react";

const StudentGradingPage = () => {
    const params = useParams();
    const router = useRouter();
    const { courseId, groupId, assignmentId, studentId } = params;

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showRubric, setShowRubric] = useState(true);
    const [showComments, setShowComments] = useState(true);
    const [gradeHistory, setGradeHistory] = useState([]);

    // Student and Assignment Data
    const [student, setStudent] = useState({
        id: studentId,
        name: "Ahmed Mohamed",
        email: "ahmed@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed",
        studentId: "STU-101",
        joined: "2024-02-15",
        totalAssignments: 5,
        averageGrade: 85,
        attendance: 92,
        lastActive: "2024-03-09"
    });

    const [assignment, setAssignment] = useState({
        id: assignmentId,
        title: "HTML & CSS Portfolio Project",
        description: "Create a responsive personal portfolio website using HTML5 and CSS3 with at least 4 pages and mobile-friendly design.",
        dueDate: "2024-03-10",
        dueTime: "23:59",
        points: 100,
        type: "project",
        status: "submitted",
        rubric: [
            {
                id: 1,
                criteria: "Code Quality & Organization",
                description: "Clean, well-structured, commented code following best practices",
                weight: 30,
                maxScore: 30,
                examples: "Proper indentation, meaningful variable names, code comments"
            },
            {
                id: 2,
                criteria: "Design & Responsiveness",
                description: "Visually appealing design that works on all screen sizes",
                weight: 30,
                maxScore: 30,
                examples: "Mobile-first approach, CSS Grid/Flexbox, consistent styling"
            },
            {
                id: 3,
                criteria: "Functionality & Features",
                description: "All required features work correctly",
                weight: 20,
                maxScore: 20,
                examples: "Working navigation, contact form, responsive images"
            },
            {
                id: 4,
                criteria: "Creativity & Innovation",
                description: "Unique design elements and creative solutions",
                weight: 10,
                maxScore: 10,
                examples: "Original design, creative animations, unique features"
            },
            {
                id: 5,
                criteria: "Documentation & Deployment",
                description: "Clear documentation and proper deployment",
                weight: 10,
                maxScore: 10,
                examples: "README file, deployment to hosting service, clear instructions"
            }
        ]
    });

    const [submission, setSubmission] = useState({
        id: 1,
        submittedAt: "2024-03-09T18:30:00",
        status: "submitted",
        files: [
            { id: 1, name: "portfolio-website.zip", size: "4.2 MB", type: "zip" },
            { id: 2, name: "live-demo.txt", size: "0.1 KB", type: "text", url: "https://ahmed-portfolio.netlify.app" },
            { id: 3, name: "screenshot-desktop.png", size: "1.8 MB", type: "image" },
            { id: 4, name: "screenshot-mobile.png", size: "1.2 MB", type: "image" },
            { id: 5, name: "README.md", size: "2.3 KB", type: "text" }
        ],
        notes: "I focused on mobile-first design and tried to implement all required features. Please let me know if there are any accessibility issues.",
        late: false,
        lateBy: 0 // hours
    });

    // Grading State
    const [grades, setGrades] = useState(
        assignment.rubric.map(criteria => ({
            criteriaId: criteria.id,
            score: 0,
            comment: "",
            strengths: "",
            improvements: ""
        }))
    );

    const [overallFeedback, setOverallFeedback] = useState("");
    const [finalGrade, setFinalGrade] = useState(0);
    const [gradeLetter, setGradeLetter] = useState("");
    const [allowResubmission, setAllowResubmission] = useState(false);
    const [sendNotification, setSendNotification] = useState(true);
    const [publishImmediately, setPublishImmediately] = useState(true);

    // Calculate total grade
    useEffect(() => {
        const totalScore = grades.reduce((sum, grade) => {
            const criteria = assignment.rubric.find(c => c.id === grade.criteriaId);
            return sum + (grade.score || 0);
        }, 0);

        const totalMax = assignment.rubric.reduce((sum, criteria) => sum + criteria.maxScore, 0);
        const percentage = (totalScore / totalMax) * 100;
        const calculatedGrade = Math.round((percentage / 100) * assignment.points);

        setFinalGrade(calculatedGrade);

        // Determine letter grade
        if (percentage >= 90) setGradeLetter("A");
        else if (percentage >= 80) setGradeLetter("B");
        else if (percentage >= 70) setGradeLetter("C");
        else if (percentage >= 60) setGradeLetter("D");
        else setGradeLetter("F");
    }, [grades, assignment]);

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Mock API calls
                await new Promise(resolve => setTimeout(resolve, 800));

                // Fetch grade history
                const mockHistory = [
                    { assignment: "JavaScript Basics", grade: 88, date: "2024-02-20" },
                    { assignment: "CSS Layout Challenge", grade: 92, date: "2024-02-27" },
                    { assignment: "DOM Manipulation", grade: 76, date: "2024-03-05" }
                ];
                setGradeHistory(mockHistory);

            } catch (error) {
                console.error("Error fetching data:", error);
                alert("Failed to load grading data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [assignmentId, studentId]);

    // Handle rubric score change
    const handleScoreChange = (criteriaId, value) => {
        setGrades(prev => prev.map(grade => {
            if (grade.criteriaId === criteriaId) {
                const criteria = assignment.rubric.find(c => c.id === criteriaId);
                const score = Math.max(0, Math.min(value, criteria.maxScore));
                return { ...grade, score };
            }
            return grade;
        }));
    };

    // Handle rubric comment change
    const handleCommentChange = (criteriaId, field, value) => {
        setGrades(prev => prev.map(grade => {
            if (grade.criteriaId === criteriaId) {
                return { ...grade, [field]: value };
            }
            return grade;
        }));
    };

    // Quick score templates
    const applyTemplate = (template) => {
        const updatedGrades = grades.map(grade => {
            const criteria = assignment.rubric.find(c => c.id === grade.criteriaId);
            let score = grade.score;
            let comment = grade.comment;
            let strengths = grade.strengths;
            let improvements = grade.improvements;

            switch (template) {
                case "excellent":
                    score = criteria.maxScore;
                    comment = "Excellent work!";
                    strengths = "Perfect implementation";
                    improvements = "None needed";
                    break;
                case "good":
                    score = Math.floor(criteria.maxScore * 0.8);
                    comment = "Good work with minor issues";
                    strengths = "Solid understanding";
                    improvements = "Minor improvements needed";
                    break;
                case "average":
                    score = Math.floor(criteria.maxScore * 0.7);
                    comment = "Meets basic requirements";
                    strengths = "Functional implementation";
                    improvements = "Several areas need improvement";
                    break;
                case "needs_work":
                    score = Math.floor(criteria.maxScore * 0.5);
                    comment = "Needs significant improvement";
                    strengths = "Attempted requirements";
                    improvements = "Major revisions needed";
                    break;
            }

            return { ...grade, score, comment, strengths, improvements };
        });

        setGrades(updatedGrades);
    };

    // Get file icon
    const getFileIcon = (type) => {
        switch (type) {
            case 'zip': return <FileArchive className="text-yellow-500" size={20} />;
            case 'image': return <FileImage className="text-green-500" size={20} />;
            case 'text': return <FileText className="text-blue-500" size={20} />;
            default: return <FileText className="text-gray-500" size={20} />;
        }
    };

    // Handle grade submission
    const handleSubmitGrade = async () => {
        setIsSubmitting(true);
        try {
            // Prepare data for API
            const gradeData = {
                studentId,
                assignmentId,
                grades,
                overallFeedback,
                finalGrade,
                gradeLetter,
                allowResubmission,
                sendNotification,
                publishImmediately,
                gradedAt: new Date().toISOString()
            };

            console.log("Submitting grade:", gradeData);

            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            alert("Grade submitted successfully!");
            router.push(`/courses/${courseId}/groups/${groupId}/assignments/${assignmentId}/submissions`);

        } catch (error) {
            console.error("Error submitting grade:", error);
            alert("Failed to submit grade. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto p-6">
                <div className="animate-pulse space-y-6">
                    <div className="h-12 bg-gray-200 rounded w-1/2"></div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                            <div className="h-64 bg-gray-200 rounded-xl"></div>
                            <div className="h-48 bg-gray-200 rounded-xl"></div>
                        </div>
                        <div className="space-y-4">
                            <div className="h-48 bg-gray-200 rounded-xl"></div>
                            <div className="h-32 bg-gray-200 rounded-xl"></div>
                        </div>
                    </div>
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
                        <Link href={`/courses/${courseId}/groups/${groupId}/assignments/${assignmentId}/submissions`}>
                            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
                                <ArrowLeft size={20} />
                                <span>Back to Submissions</span>
                            </button>
                        </Link>

                        <div className="h-6 w-px bg-gray-300"></div>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Grade Assignment</h1>
                            <p className="text-gray-600">
                                {assignment.title} • {student.name}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href={`/grading`}>
                            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 px-3 py-2 border border-blue-200 rounded-lg">
                                <BookOpen size={16} />
                                <span>Grading Dashboard</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Student & Submission Info */}
                <div className="space-y-6">
                    {/* Student Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Student Information</h3>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                                <img
                                    src={student.avatar}
                                    alt={student.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-800">{student.name}</h4>
                                <p className="text-gray-600">{student.email}</p>
                                <p className="text-sm text-gray-500 mt-1">ID: {student.studentId}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Average Grade:</span>
                                <span className="font-bold text-blue-600">{student.averageGrade}%</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Attendance:</span>
                                <span className="font-bold text-green-600">{student.attendance}%</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Assignments:</span>
                                <span className="font-medium">{student.totalAssignments}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Last Active:</span>
                                <span className="font-medium">{student.lastActive}</span>
                            </div>
                        </div>
                    </div>

                    {/* Submission Details */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Submission Details</h3>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Submitted:</span>
                                <span className="font-medium">
                                    {new Date(submission.submittedAt).toLocaleDateString()} at{" "}
                                    {new Date(submission.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">Due Date:</span>
                                <span className="font-medium">{assignment.dueDate} at {assignment.dueTime}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">Status:</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${submission.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                                        submission.status === 'late' ? 'bg-red-100 text-red-800' :
                                            'bg-gray-100 text-gray-800'
                                    }`}>
                                    {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                                </span>
                            </div>

                            {submission.late && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Late by:</span>
                                    <span className="font-medium text-red-600">{submission.lateBy} hours</span>
                                </div>
                            )}
                        </div>

                        {/* Files */}
                        <div className="mt-4">
                            <h4 className="font-medium text-gray-700 mb-2">Submitted Files ({submission.files.length})</h4>
                            <div className="space-y-2">
                                {submission.files.map((file) => (
                                    <div key={file.id} className="flex items-center justify-between p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                                        <div className="flex items-center gap-2">
                                            {getFileIcon(file.type)}
                                            <div>
                                                <div className="text-sm font-medium text-gray-800">{file.name}</div>
                                                <div className="text-xs text-gray-500">{file.size}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            {file.url ? (
                                                <a
                                                    href={file.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                                                >
                                                    <ExternalLink size={14} />
                                                </a>
                                            ) : (
                                                <button className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded">
                                                    <Eye size={14} />
                                                </button>
                                            )}
                                            <button className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded">
                                                <Download size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Student Notes */}
                        {submission.notes && (
                            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-1">
                                    <MessageSquare size={14} />
                                    Student Notes
                                </h4>
                                <p className="text-sm text-blue-700">{submission.notes}</p>
                            </div>
                        )}
                    </div>

                    {/* Grade History */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Grade History</h3>

                        <div className="space-y-3">
                            {gradeHistory.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-2 border border-gray-200 rounded-lg">
                                    <div>
                                        <div className="font-medium text-gray-800">{item.assignment}</div>
                                        <div className="text-xs text-gray-500">{item.date}</div>
                                    </div>
                                    <div className={`font-bold ${item.grade >= 90 ? 'text-green-600' :
                                            item.grade >= 80 ? 'text-blue-600' :
                                                item.grade >= 70 ? 'text-yellow-600' :
                                                    'text-red-600'
                                        }`}>
                                        {item.grade}%
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-800">{student.averageGrade}%</div>
                                <div className="text-sm text-gray-600">Overall Average</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Column - Rubric Grading */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Assignment Info */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">{assignment.title}</h3>
                                <p className="text-gray-600">{assignment.description}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-gray-800">{assignment.points} points</div>
                                <div className="text-sm text-gray-600">Total Points</div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Templates */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Grading Templates</h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <button
                                onClick={() => applyTemplate("excellent")}
                                className="p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100"
                            >
                                <div className="font-medium text-green-800">Excellent</div>
                                <div className="text-sm text-green-700">90-100%</div>
                            </button>

                            <button
                                onClick={() => applyTemplate("good")}
                                className="p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100"
                            >
                                <div className="font-medium text-blue-800">Good</div>
                                <div className="text-sm text-blue-700">80-89%</div>
                            </button>

                            <button
                                onClick={() => applyTemplate("average")}
                                className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100"
                            >
                                <div className="font-medium text-yellow-800">Average</div>
                                <div className="text-sm text-yellow-700">70-79%</div>
                            </button>

                            <button
                                onClick={() => applyTemplate("needs_work")}
                                className="p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100"
                            >
                                <div className="font-medium text-red-800">Needs Work</div>
                                <div className="text-sm text-red-700">Below 70%</div>
                            </button>
                        </div>
                    </div>

                    {/* Rubric Grading */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-800">Rubric Grading</h3>
                            <button
                                onClick={() => setShowRubric(!showRubric)}
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                            >
                                <ChevronDown size={16} className={`transition-transform ${showRubric ? 'rotate-180' : ''}`} />
                                <span>{showRubric ? 'Hide Rubric' : 'Show Rubric'}</span>
                            </button>
                        </div>

                        {showRubric && (
                            <div className="space-y-6">
                                {assignment.rubric.map((criteria) => {
                                    const grade = grades.find(g => g.criteriaId === criteria.id);

                                    return (
                                        <div key={criteria.id} className="p-4 border border-gray-200 rounded-lg">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h4 className="font-bold text-gray-800">{criteria.criteria}</h4>
                                                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                                            {criteria.weight}%
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-2">{criteria.description}</p>
                                                    <p className="text-xs text-gray-500">Example: {criteria.examples}</p>
                                                </div>

                                                <div className="text-right ml-4">
                                                    <div className="text-2xl font-bold text-gray-800">
                                                        {grade?.score || 0}/{criteria.maxScore}
                                                    </div>
                                                    <div className="text-sm text-gray-600">Points</div>
                                                </div>
                                            </div>

                                            {/* Score Slider */}
                                            <div className="mb-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm text-gray-600">Score</span>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => handleScoreChange(criteria.id, (grade?.score || 0) - 1)}
                                                            disabled={(grade?.score || 0) <= 0}
                                                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            type="number"
                                                            value={grade?.score || 0}
                                                            onChange={(e) => handleScoreChange(criteria.id, parseInt(e.target.value) || 0)}
                                                            className="w-20 border border-gray-300 rounded-lg p-2 text-center"
                                                            min="0"
                                                            max={criteria.maxScore}
                                                        />
                                                        <button
                                                            onClick={() => handleScoreChange(criteria.id, (grade?.score || 0) + 1)}
                                                            disabled={(grade?.score || 0) >= criteria.maxScore}
                                                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>

                                                <input
                                                    type="range"
                                                    min="0"
                                                    max={criteria.maxScore}
                                                    value={grade?.score || 0}
                                                    onChange={(e) => handleScoreChange(criteria.id, parseInt(e.target.value))}
                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                />

                                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                                    <span>0</span>
                                                    <span>{Math.floor(criteria.maxScore / 2)}</span>
                                                    <span>{criteria.maxScore}</span>
                                                </div>
                                            </div>

                                            {/* Comments */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Strengths
                                                    </label>
                                                    <textarea
                                                        value={grade?.strengths || ""}
                                                        onChange={(e) => handleCommentChange(criteria.id, 'strengths', e.target.value)}
                                                        rows="2"
                                                        className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                                                        placeholder="What was done well..."
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Areas for Improvement
                                                    </label>
                                                    <textarea
                                                        value={grade?.improvements || ""}
                                                        onChange={(e) => handleCommentChange(criteria.id, 'improvements', e.target.value)}
                                                        rows="2"
                                                        className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                                                        placeholder="What could be improved..."
                                                    />
                                                </div>
                                            </div>

                                            {/* Overall Comment */}
                                            <div className="mt-3">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Overall Comment for this Criteria
                                                </label>
                                                <textarea
                                                    value={grade?.comment || ""}
                                                    onChange={(e) => handleCommentChange(criteria.id, 'comment', e.target.value)}
                                                    rows="2"
                                                    className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                                                    placeholder="Overall feedback for this criteria..."
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Overall Feedback */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Overall Feedback</h3>
                            <button
                                onClick={() => setShowComments(!showComments)}
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                            >
                                <ChevronDown size={16} className={`transition-transform ${showComments ? 'rotate-180' : ''}`} />
                                <span>{showComments ? 'Hide' : 'Show'}</span>
                            </button>
                        </div>

                        {showComments && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        General Feedback
                                    </label>
                                    <textarea
                                        value={overallFeedback}
                                        onChange={(e) => setOverallFeedback(e.target.value)}
                                        rows="6"
                                        className="w-full border border-gray-300 rounded-lg p-3"
                                        placeholder="Provide overall feedback to the student. Highlight strengths, areas for improvement, and specific suggestions..."
                                    />
                                </div>

                                {/* Feedback Templates */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Quick Feedback Phrases
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            "Excellent work overall!",
                                            "Good understanding of concepts.",
                                            "Needs more attention to detail.",
                                            "Well-organized code structure.",
                                            "Creative solution approach.",
                                            "Missing some requirements.",
                                            "Great presentation and documentation.",
                                            "Could improve testing coverage."
                                        ].map((phrase, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setOverallFeedback(prev => prev + (prev ? "\n\n" : "") + phrase)}
                                                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                                            >
                                                {phrase}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Grade Summary & Submission */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-green-800 mb-6">Grade Summary</h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                                <div className="text-3xl font-bold text-green-600">{finalGrade}</div>
                                <div className="text-sm text-gray-600">Points Awarded</div>
                            </div>

                            <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                                <div className="text-3xl font-bold text-gray-800">{assignment.points}</div>
                                <div className="text-sm text-gray-600">Total Points</div>
                            </div>

                            <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                                <div className="text-3xl font-bold text-blue-600">
                                    {((finalGrade / assignment.points) * 100).toFixed(1)}%
                                </div>
                                <div className="text-sm text-gray-600">Percentage</div>
                            </div>

                            <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                                <div className="text-3xl font-bold text-purple-600">{gradeLetter}</div>
                                <div className="text-sm text-gray-600">Letter Grade</div>
                            </div>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="allowResubmission"
                                    checked={allowResubmission}
                                    onChange={(e) => setAllowResubmission(e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600"
                                />
                                <label htmlFor="allowResubmission" className="text-sm text-gray-700">
                                    Allow Resubmission
                                </label>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="sendNotification"
                                    checked={sendNotification}
                                    onChange={(e) => setSendNotification(e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600"
                                />
                                <label htmlFor="sendNotification" className="text-sm text-gray-700">
                                    Send Email Notification
                                </label>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="publishImmediately"
                                    checked={publishImmediately}
                                    onChange={(e) => setPublishImmediately(e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600"
                                />
                                <label htmlFor="publishImmediately" className="text-sm text-gray-700">
                                    Publish Immediately
                                </label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-sm text-gray-600">
                                Review all feedback before submitting
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => router.back()}
                                    className="px-6 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleSubmitGrade}
                                    disabled={isSubmitting}
                                    className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            <span>Submitting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle size={18} />
                                            <span>Submit Grade</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentGradingPage;