"use client"

import { useGetQuizByIdQuery, useGetQuizSubmissionsQuery, useGetSubmissionByIdQuery, useGradeSubmissionMutation } from "@/redux/api/endPoints/quizzesApiSlice";
import { useParams } from 'next/navigation';
import { Calendar, Clock, FileText, User, CheckCircle, XCircle, X } from 'lucide-react';
import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

const SubmissionReviewModal = ({ submissionId, onClose }) => {
    const { data: submissionData, isLoading } = useGetSubmissionByIdQuery(submissionId);
    const [gradeSubmission, { isLoading: isGrading }] = useGradeSubmissionMutation();
    const submission = submissionData?.data;

    // Local state for manual grading (if we want to add points)
    const [extraPoints, setExtraPoints] = useState(0);
    const [feedback, setFeedback] = useState('');

    if (isLoading) return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl">Loading submission...</div>
        </div>
    );

    if (!submission) return null;

    const quiz = submission.quiz;
    const answers = submission.answers || [];

    const handleGrade = async () => {
        try {
            await gradeSubmission({
                submissionId,
                additionalScore: Number(extraPoints),
                feedback
            }).unwrap();
            toast.success('Submission graded successfully');
            onClose();
        } catch (error) {
            console.error(error);
            toast.error('Failed to save grade');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Review Submission</h2>
                        <p className="text-sm text-gray-500">Student: {submission.student?.name}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Score Summary */}
                    <div className="flex items-center gap-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                        <div>
                            <span className="block text-xs text-indigo-600 font-semibold uppercase tracking-wider">Current Score</span>
                            <span className="text-2xl font-bold text-indigo-900">{submission.score} <span className="text-indigo-400 text-lg">/ {quiz.totalGrade}</span></span>
                        </div>
                        <div className="h-10 w-px bg-indigo-200"></div>
                        <div>
                            <span className="block text-xs text-indigo-600 font-semibold uppercase tracking-wider">Status</span>
                            <span className="font-medium text-indigo-900 capitalize">{submission.isGraded ? 'Graded' : 'Pending Review'}</span>
                        </div>
                    </div>

                    {/* Questions & Answers */}
                    <div className="space-y-6">
                        {quiz.questions.map((question, index) => {
                            const studentAnswer = answers.find(a => a.questionId === question._id)?.answer;
                            const isCorrect = String(studentAnswer) === String(question.correctAnswer);

                            // For MCQ/TrueFalse, we know if it's correct (automated)
                            // For Short Answer, it's manual.
                            const isAutoGraded = ['mcq', 'true-false'].includes(question.type);

                            return (
                                <div key={question._id} className="border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between">
                                        <h3 className="font-semibold text-gray-900">Question {index + 1} <span className="text-gray-500 font-normal ml-2">({question.points} pts)</span></h3>
                                        {isAutoGraded && (
                                            isCorrect ?
                                                <span className="text-green-600 flex items-center text-sm font-medium"><CheckCircle className="w-4 h-4 mr-1" /> Correct</span> :
                                                <span className="text-red-500 flex items-center text-sm font-medium"><XCircle className="w-4 h-4 mr-1" /> Incorrect</span>
                                        )}
                                    </div>
                                    <div className="p-4 space-y-3">
                                        <p className="text-gray-800 text-lg">{question.text}</p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                            <div className={`p-3 rounded-lg border ${isAutoGraded ? (isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200') : 'bg-gray-50 border-gray-200'}`}>
                                                <span className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Student Answer</span>
                                                <p className="font-medium text-gray-900">{studentAnswer || <span className="italic text-gray-400">No answer provided</span>}</p>
                                            </div>
                                            <div className="p-3 rounded-lg border border-gray-200 bg-white">
                                                <span className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Correct Answer</span>
                                                <p className="font-medium text-gray-900">{question.correctAnswer || <span className="italic text-gray-400">Manual review required</span>}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Manual Grading */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h3 className="font-bold text-gray-900 mb-4">Manual Grading & Feedback</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Points (e.g. for short answers)</label>
                                <input
                                    type="number"
                                    value={extraPoints}
                                    onChange={(e) => setExtraPoints(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    placeholder="0"
                                />
                                <p className="text-xs text-gray-500 mt-1">Add points to the current score.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Feedback to Student</label>
                                <textarea
                                    rows="2"
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Great job!..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
                    <button onClick={onClose} className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition">Cancel</button>
                    <button
                        onClick={handleGrade}
                        disabled={isGrading}
                        className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-50"
                    >
                        {isGrading ? 'Saving...' : 'Save Grade'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const QuizDetailsPage = () => {
    const { quizId } = useParams();
    const { data: quizData, isLoading: isQuizLoading } = useGetQuizByIdQuery(quizId);
    const { data: submissionsData, isLoading: isSubmissionsLoading } = useGetQuizSubmissionsQuery(quizId);
    const [selectedSubmissionId, setSelectedSubmissionId] = useState(null);

    const quiz = quizData?.data;
    const submissions = submissionsData?.data || [];

    if (isQuizLoading || isSubmissionsLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (!quiz) return <div className="p-6">Quiz not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Quiz Details Card */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">{quiz.title}</h1>
                            <p className="text-gray-500 text-sm mb-4">{quiz.description || 'No description provided.'}</p>

                            <div className="space-y-4 py-4 border-t border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 flex items-center text-sm"><Calendar className="w-4 h-4 mr-2" /> Due Date</span>
                                    <span className="font-medium text-gray-900 text-sm">{new Date(quiz.dueDate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 flex items-center text-sm"><Clock className="w-4 h-4 mr-2" /> Duration</span>
                                    <span className="font-medium text-gray-900 text-sm">{quiz.duration} mins</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 flex items-center text-sm"><FileText className="w-4 h-4 mr-2" /> Questions</span>
                                    <span className="font-medium text-gray-900 text-sm">{quiz.questions.length}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 flex items-center text-sm"><CheckCircle className="w-4 h-4 mr-2" /> Total Points</span>
                                    <span className="font-medium text-gray-900 text-sm">{quiz.totalGrade}</span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${quiz.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                    }`}>
                                    Status: {quiz.status.toUpperCase()}
                                </span>
                            </div>
                        </div>

                        {/* Questions Preview (Optional) */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <h3 className="font-semibold text-gray-900 mb-4">Questions Preview</h3>
                            <div className="space-y-4">
                                {quiz.questions.map((q, i) => (
                                    <div key={i} className="p-3 bg-gray-50 rounded-lg text-sm">
                                        <p className="font-medium text-gray-800 mb-1">{i + 1}. {q.text}</p>
                                        <div className="flex justify-between text-xs text-gray-500">
                                            <span>{q.type}</span>
                                            <span>{q.points} pts</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Submissions List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="text-lg font-bold text-gray-900">Student Submissions</h2>
                                <span className="bg-indigo-100 text-indigo-700 py-1 px-3 rounded-full text-xs font-semibold">
                                    {submissions.length} Submitted
                                </span>
                            </div>

                            {submissions.length === 0 ? (
                                <div className="p-12 text-center text-gray-500">
                                    No submissions yet.
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                                            <tr>
                                                <th className="px-6 py-4 font-semibold">Student</th>
                                                <th className="px-6 py-4 font-semibold">Submitted At</th>
                                                <th className="px-6 py-4 font-semibold">Grade</th>
                                                <th className="px-6 py-4 font-semibold">Status</th>
                                                <th className="px-6 py-4 font-semibold text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {submissions.map((submission) => (
                                                <tr key={submission._id} className="hover:bg-gray-50/50">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                                                <User className="w-4 h-4" />
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-sm text-gray-900">{submission.student?.name || 'Unknown'}</p>
                                                                <p className="text-xs text-gray-500">{submission.student?.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {new Date(submission.submittedAt).toLocaleString()}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="font-bold text-gray-900 text-sm">{submission.score}</span>
                                                        <span className="text-gray-400 text-xs"> / {quiz.totalGrade}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {submission.isGraded ? (
                                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                                                                <CheckCircle className="w-3 h-3 mr-1" /> Graded
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700">
                                                                Needs Grading
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button
                                                            className="text-indigo-600 hover:text-indigo-900 text-sm font-medium disabled:opacity-50"
                                                            onClick={() => setSelectedSubmissionId(submission._id)}
                                                        >
                                                            Review
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* Modal */}
            {selectedSubmissionId && (
                <SubmissionReviewModal
                    submissionId={selectedSubmissionId}
                    onClose={() => setSelectedSubmissionId(null)}
                />
            )}
        </div>
    );
};

export default QuizDetailsPage;
