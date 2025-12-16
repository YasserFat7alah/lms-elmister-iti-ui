"use client"

import { useGetQuizByIdQuery, useGetMyQuizSubmissionsQuery } from "@/redux/api/endPoints/quizzesApiSlice";
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Clock, Calendar, FileText, CheckCircle, AlertCircle, PlayCircle, Trophy, Flag } from 'lucide-react';
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { format } from "date-fns";

const StudentQuizDetailsPage = () => {
    const { quizId } = useParams();
    const router = useRouter();

    const { data: quizData, isLoading: isQuizLoading } = useGetQuizByIdQuery(quizId);
    // Fetch submissions to check status
    const { data: submissionData, isLoading: isSubmissionLoading } = useGetMyQuizSubmissionsQuery(quizId);

    const quiz = quizData?.data;
    const submission = submissionData?.data?.[0]; // Get latest submission if any

    const isLoading = isQuizLoading || isSubmissionLoading;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (!quiz) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-xl font-bold text-gray-800">Quiz not found</h2>
                <Link href="/dashboard/student/quizzes" className="text-indigo-600 hover:underline mt-4 inline-block">
                    Back to Quizzes
                </Link>
            </div>
        );
    }

    // --- Status Logic ---
    const isSubmitted = !!submission;
    const isGraded = submission?.isGraded;
    const isOverdue = new Date() > new Date(quiz.dueDate);
    const canTakeQuiz = !isSubmitted && !isOverdue;

    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard/student" },
        { label: "My Quizzes", href: "/dashboard/student/quizzes" },
        { label: quiz.title }
    ];

    return (
        <div className="p-4 max-w-5xl mx-auto space-y-8 pb-20">
            <Breadcrumbs items={breadcrumbItems} />

            {/* Header / Banner */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-indigo-50/50 p-8 border-b border-indigo-50">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                                {quiz.course?.title || 'Course Quiz'}
                            </span>
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{quiz.title}</h1>
                            <p className="text-gray-600 text-lg max-w-2xl">
                                {quiz.description || "No description provided."}
                            </p>
                        </div>

                        {/* Status Badge */}
                        <div className="shrink-0">
                            {isGraded ? (
                                <div className="flex flex-col items-end">
                                    <span className="px-4 py-2 bg-green-100 text-green-800 rounded-xl font-bold flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5" /> Graded
                                    </span>
                                    <span className="text-2xl font-bold text-gray-900 mt-2">
                                        {submission.score} <span className="text-sm text-gray-400 font-medium">/ {quiz.totalGrade}</span>
                                    </span>
                                </div>
                            ) : isSubmitted ? (
                                <div className="flex flex-col items-end">
                                    <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-xl font-bold flex items-center gap-2">
                                        <Clock className="w-5 h-5" /> Submitted
                                    </span>
                                    <span className="text-sm text-gray-500 mt-1 font-medium">Pending Grade</span>
                                </div>
                            ) : isOverdue ? (
                                <span className="px-4 py-2 bg-red-100 text-red-800 rounded-xl font-bold flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5" /> Closed
                                </span>
                            ) : (
                                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-xl font-bold flex items-center gap-2">
                                    <Flag className="w-5 h-5" /> Available
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    <div className="p-6 text-center">
                        <Clock className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Duration</p>
                        <p className="text-lg font-bold text-gray-900">{quiz.duration} mins</p>
                    </div>
                    <div className="p-6 text-center">
                        <FileText className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Questions</p>
                        <p className="text-lg font-bold text-gray-900">{quiz.questions?.length || 0}</p>
                    </div>
                    <div className="p-6 text-center">
                        <Trophy className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Total Points</p>
                        <p className="text-lg font-bold text-gray-900">{quiz.totalGrade}</p>
                    </div>
                    <div className="p-6 text-center">
                        <Calendar className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Due Date</p>
                        <p className={`text-lg font-bold ${isOverdue && !isSubmitted ? 'text-red-500' : 'text-gray-900'}`}>
                            {quiz.dueDate ? format(new Date(quiz.dueDate), 'MMM dd, yyyy') : 'No Date'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Action Section */}
            <div className="flex justify-center pt-4">
                {canTakeQuiz && (
                    <Link
                        href={`/dashboard/student/quizzes/${quizId}/take`}
                        className="flex items-center gap-3 px-8 py-4 bg-[#392b80] text-white text-lg font-bold rounded-2xl hover:bg-[#2d2265] transition-all shadow-xl shadow-indigo-100 transform hover:-translate-y-1"
                    >
                        <PlayCircle className="w-6 h-6" />
                        Start Quiz Now
                    </Link>
                )}

                {(isSubmitted || isGraded) && (
                    <Link
                        href={`/dashboard/student/quizzes/${quizId}/result`}
                        className="flex items-center gap-3 px-8 py-4 bg-white text-[#392b80] border-2 border-[#392b80] text-lg font-bold rounded-2xl hover:bg-indigo-50 transition-all shadow-md"
                    >
                        <FileText className="w-6 h-6" />
                        View Quiz Results
                    </Link>
                )}

                {isOverdue && !isSubmitted && (
                    <div className="text-center p-8 bg-gray-50 rounded-3xl border border-gray-200">
                        <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-gray-700">Quiz Closed</h3>
                        <p className="text-gray-500 mt-1">The due date for this quiz has passed.</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default StudentQuizDetailsPage;
