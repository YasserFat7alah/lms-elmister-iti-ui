"use client"

import { useGetMyQuizSubmissionsQuery } from "@/redux/api/endPoints/quizzesApiSlice";
import { useParams, useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Clock, Award, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const QuizResultPage = () => {
    const { quizId } = useParams();
    const router = useRouter();
    const { data: submissionsData, isLoading } = useGetMyQuizSubmissionsQuery(quizId);

    const submission = submissionsData?.data?.[0]; // Get the most recent one

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (!submission) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
                <p className="text-gray-500 mb-4">No submission found for this quiz.</p>
                <Link href="/dashboard/student/quizzes" className="text-indigo-600 hover:underline">
                    Back to Quizzes
                </Link>
            </div>
        );
    }

    const { quiz, score, isGraded, submittedAt } = submission;
    const percentage = Math.round((score / quiz.totalGrade) * 100);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-3xl mx-auto">
                <Link href="/dashboard/student/quizzes" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Quizzes
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className={`${percentage >= 70 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                        } p-10 text-white text-center`}>
                        <Award className="w-16 h-16 mx-auto mb-4 opacity-90" />
                        <h1 className="text-3xl font-bold mb-2">{isGraded ? 'Quiz Completed!' : 'Submitted Successfully!'}</h1>
                        <p className="opacity-90">{quiz.title}</p>
                    </div>

                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-10">
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <p className="text-gray-500 text-sm mb-1">Your Score</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {isGraded ? score : '?'}
                                    <span className="text-gray-400 text-lg"> / {quiz.totalGrade}</span>
                                </p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <p className="text-gray-500 text-sm mb-1">Grade</p>
                                <p className={`text-2xl font-bold ${percentage >= 70 ? 'text-green-600' : percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
                                    }`}>
                                    {isGraded ? `${percentage}%` : 'Pending'}
                                </p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <p className="text-gray-500 text-sm mb-1">Submitted At</p>
                                <p className="text-lg font-medium text-gray-900">
                                    {new Date(submittedAt).toLocaleDateString()}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {new Date(submittedAt).toLocaleTimeString()}
                                </p>
                            </div>
                        </div>

                        {!isGraded && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                                <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-yellow-800">Grading in Progress</h4>
                                    <p className="text-sm text-yellow-700 mt-1">
                                        Your quiz includes questions that require manual grading. Your final score will be updated once the teacher reviews your submission.
                                    </p>
                                </div>
                            </div>
                        )}

                        {submission.feedback && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                <h4 className="font-semibold text-blue-800 mb-2">Teacher Feedback</h4>
                                <p className="text-blue-700">{submission.feedback}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizResultPage;
