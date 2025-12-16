"use client"

import { useGetStudentQuizzesQuery } from "@/redux/api/endPoints/quizzesApiSlice";
import { PlayCircle, CheckCircle, Clock, AlertCircle, FileText } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Breadcrumbs from "@/components/shared/Breadcrumbs";

const StudentQuizzesPage = () => {
    const router = useRouter();
    const { data, isLoading, isError } = useGetStudentQuizzesQuery();
    const quizzes = data?.data || [];

    // Sort: Due date soonest first
    const sortedQuizzes = [...quizzes].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard/student" },
        { label: "My Quizzes" }
    ];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#392b80]"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-6 text-center text-red-500">
                Failed to load quizzes. Please try again later.
            </div>
        );
    }

    return (
        <div className="p-4 max-w-7xl mx-auto space-y-10 pb-20">
            {/* Header Section */}
            <div className="space-y-6">
                <Breadcrumbs items={breadcrumbItems} className="w-fit" />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-linear-to-r from-white to-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <div>
                        <h1 className="text-3xl font-extrabold text-[#392b80] flex items-center gap-3">
                            My Quizzes
                        </h1>
                        <p className="text-slate-500 mt-2 text-lg">Track your upcoming assessments and view your grades.</p>
                    </div>
                </div>
            </div>

            {sortedQuizzes.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-sm p-12 text-center border border-gray-100">
                    <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-[#392b80]" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">All Caught Up!</h3>
                    <p className="text-gray-500">You don't have any pending quizzes at the moment.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedQuizzes.map((quiz) => {
                        const isSubmitted = ['submitted', 'graded'].includes(quiz.submissionStatus);
                        const isOverdue = new Date() > new Date(quiz.dueDate) && !isSubmitted;
                        const isGraded = quiz.submissionStatus === 'graded';

                        // Fail if score is 0 or less than half
                        const isFailed = isGraded && (quiz.myScore < (quiz.totalGrade / 2) || quiz.myScore === 0);

                        let statusColor = 'bg-blue-50 text-blue-700';
                        let StatusIcon = PlayCircle;

                        // New Logic: Always go to Details Page
                        let link = `/dashboard/student/quizzes/${quiz._id}`;

                        if (isGraded) {
                            if (isFailed) {
                                statusColor = 'bg-red-50 text-red-700';
                                StatusIcon = AlertCircle;
                            } else {
                                statusColor = 'bg-green-50 text-green-700';
                                StatusIcon = CheckCircle;
                            }
                        } else if (isSubmitted) {
                            statusColor = 'bg-yellow-50 text-yellow-700';
                            StatusIcon = Clock;
                        } else if (isOverdue) {
                            statusColor = 'bg-red-50 text-red-700';
                            StatusIcon = AlertCircle;
                        }

                        const handleQuizClick = (e) => {
                            router.push(link);
                        };

                        return (
                            <div
                                key={quiz._id}
                                onClick={handleQuizClick}
                                className="block group cursor-pointer"
                            >
                                <div className={`bg-white rounded-3xl shadow-sm border p-6 hover:shadow-md transition duration-300 relative h-full flex flex-col ${isFailed ? 'border-red-200 bg-red-50/20' : 'border-gray-200 hover:border-[#392b80]'} ${isOverdue ? 'opacity-75' : ''}`}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-1 group-hover:text-[#392b80] transition-colors">{quiz.title}</h3>
                                            <span className="text-sm text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full">{quiz.course?.title || 'Course'}</span>
                                        </div>
                                        {isGraded ? (
                                            <div className={`px-3 py-1 rounded-xl font-bold text-sm flex items-center gap-1 ${isFailed ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                                {isFailed && <AlertCircle className="w-4 h-4" />}
                                                {!isFailed && <CheckCircle className="w-4 h-4" />}
                                                {quiz.myScore} / {quiz.totalGrade}
                                            </div>
                                        ) : (
                                            <div className={`p-2 rounded-xl ${statusColor}`}>
                                                <StatusIcon className="w-5 h-5" />
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-sm text-gray-600 mb-6 line-clamp-2 flex-1">
                                        {quiz.description || 'No description provided.'}
                                    </p>

                                    <div className="space-y-3 pt-4 border-t border-gray-100">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500 flex items-center">
                                                <Clock className="w-4 h-4 mr-1" /> Duration
                                            </span>
                                            <span className="font-bold text-gray-900">{quiz.duration} mins</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500 flex items-center">
                                                <FileText className="w-4 h-4 mr-1" /> Questions
                                            </span>
                                            <span className="font-bold text-gray-900">{quiz.questions?.length || 0}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">Due Date</span>
                                            <span className={`font-bold ${isOverdue ? 'text-red-600' : 'text-gray-900'}`}>
                                                {new Date(quiz.dueDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default StudentQuizzesPage;
