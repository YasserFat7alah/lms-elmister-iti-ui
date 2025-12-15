"use client"

import { useGetQuizByIdQuery, useSubmitQuizMutation } from "@/redux/api/endPoints/quizzesApiSlice";
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { Clock, AlertTriangle, CheckCircle, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';

const TakeQuizPage = () => {
    const { quizId } = useParams();
    const router = useRouter();
    const { data: quizData, isLoading: isQuizLoading } = useGetQuizByIdQuery(quizId);
    const [submitQuiz, { isLoading: isSubmitting }] = useSubmitQuizMutation();

    const quiz = quizData?.data;

    // State for answers: { questionId: answer }
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(null);

    // Initialize timer when quiz loads
    useEffect(() => {
        if (quiz && quiz.duration) {
            // Check if there is a recorded start time? For MVP, assume start time is page load.
            // Ideally backend tracks start time.
            // Here just simplified timer based on duration.
            // Better: Timer should be based on (EndDate - Now) or (StartTime + Duration - Now).
            // Let's just use duration for display.
            setTimeLeft(quiz.duration * 60); // seconds
        }
    }, [quiz]);

    useEffect(() => {
        if (!timeLeft && timeLeft !== 0) return; // Wait for init

        if (timeLeft <= 0) {
            toast.error("Time is up! You cannot submit anymore.");
            router.push('/dashboard/student/quizzes');
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, router]);

    // Format time
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleAnswerChange = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        // Format answers for API
        const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
            questionId,
            answer
        }));

        try {
            await submitQuiz({ quizId, answers: formattedAnswers }).unwrap();
            toast.success('Quiz submitted successfully!');
            router.push(`/dashboard/student/quizzes/${quizId}/result`);
        } catch (error) {
            console.error('Error submitting quiz:', error);
            toast.error(`Failed to submit quiz: ${error.data?.message || 'Unknown error'}`);
        }
    };

    if (isQuizLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (!quiz) return <div className="p-6">Quiz not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6 pb-24">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 sticky top-4 z-10">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">{quiz.title}</h1>
                            <p className="text-sm text-gray-500">{quiz.questions.length} Questions • {quiz.totalGrade} Points</p>
                        </div>
                        {timeLeft !== null && (
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-bold text-lg ${timeLeft < 60 ? 'bg-red-50 text-red-600' : 'bg-indigo-50 text-indigo-600'
                                }`}>
                                <Clock className="w-5 h-5" />
                                {formatTime(timeLeft)}
                            </div>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {quiz.questions.map((question, index) => (
                        <div key={question._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex justify-between mb-4">
                                <span className="font-semibold text-gray-900">Question {index + 1}</span>
                                <span className="text-sm text-gray-500">{question.points} pts</span>
                            </div>

                            <p className="text-lg text-gray-800 mb-6">{question.text}</p>

                            <div className="space-y-3">
                                {question.type === 'mcq' && question.options.map((option, optIndex) => (
                                    <label key={optIndex} className={`flex items-center p-4 rounded-lg border cursor-pointer transition ${answers[question._id] === option
                                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}>
                                        <input
                                            type="radio"
                                            name={question._id}
                                            value={option}
                                            checked={answers[question._id] === option}
                                            onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                                            className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 mr-3"
                                        />
                                        <span>{option}</span>
                                    </label>
                                ))}

                                {question.type === 'true-false' && (
                                    <div className="flex gap-4">
                                        {['true', 'false'].map((val) => (
                                            <label key={val} className={`flex-1 flex items-center justify-center p-4 rounded-lg border cursor-pointer transition capitalize ${answers[question._id] === val
                                                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}>
                                                <input
                                                    type="radio"
                                                    name={question._id}
                                                    value={val}
                                                    checked={answers[question._id] === val}
                                                    onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                                                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 mr-2"
                                                />
                                                {val}
                                            </label>
                                        ))}
                                    </div>
                                )}

                                {question.type === 'short-answer' && (
                                    <textarea
                                        rows="3"
                                        value={answers[question._id] || ''}
                                        onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="Type your answer here..."
                                    />
                                )}
                            </div>
                        </div>
                    ))}

                    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg flex justify-end">
                        <div className="max-w-3xl w-full mx-auto flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold shadow-lg shadow-indigo-200 transition disabled:opacity-50 flex items-center"
                            >
                                {isSubmitting ? 'Submitting...' : (
                                    <>
                                        Submit Quiz <CheckCircle className="w-5 h-5 ml-2" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TakeQuizPage;
