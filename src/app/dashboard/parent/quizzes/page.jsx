"use client"

import { useGetChildrenQuery } from "@/redux/api/endPoints/childrenApiSlice";
import { useGetChildQuizzesQuery } from "@/redux/api/endPoints/quizzesApiSlice";
import { useState } from "react";
import { User, CheckCircle, Clock, AlertCircle, PlayCircle, Lock, FileText } from 'lucide-react';

const ChildQuizzesList = ({ childId }) => {
    // New query that returns ALL quizzes with status
    const { data, isLoading, isError } = useGetChildQuizzesQuery(childId);
    const quizzes = data?.data || [];

    if (isLoading) return <div className="text-sm text-gray-500">Loading quizzes...</div>;
    if (isError) return <div className="text-sm text-red-500">Failed to load.</div>;
    if (quizzes.length === 0) return <div className="text-sm text-gray-400 italic">No quizzes assigned.</div>;

    // Helper to determine status display
    const getStatusBadge = (quiz) => {
        const isSubmitted = ['submitted', 'graded'].includes(quiz.submissionStatus);
        const isOverdue = new Date() > new Date(quiz.dueDate) && !isSubmitted;
        const isGraded = quiz.submissionStatus === 'graded';

        if (isGraded) {
            return (
                <span className="text-xs text-green-600 font-medium flex items-center justify-end bg-green-50 px-2 py-1 rounded">
                    <CheckCircle className="w-3 h-3 mr-1" /> Graded ({quiz.score}/{quiz.totalGrade})
                </span>
            );
        }
        if (isSubmitted) {
            return (
                <span className="text-xs text-yellow-600 font-medium flex items-center justify-end bg-yellow-50 px-2 py-1 rounded">
                    <Clock className="w-3 h-3 mr-1" /> Submitted
                </span>
            );
        }
        if (isOverdue) {
            // Did not submit and deadline passed
            return (
                <span className="text-xs text-red-600 font-medium flex items-center justify-end bg-red-50 px-2 py-1 rounded">
                    <AlertCircle className="w-3 h-3 mr-1" /> Overdue (Missed)
                </span>
            );
        }
        // Active/Pending but not overdue
        return (
            <span className="text-xs text-blue-600 font-medium flex items-center justify-end bg-blue-50 px-2 py-1 rounded">
                <PlayCircle className="w-3 h-3 mr-1" /> Assigned
            </span>
        );
    };

    return (
        <div className="space-y-4 mt-4">
            {quizzes.map((quiz) => (
                <div key={quiz._id} className="bg-white rounded-2xl p-5 flex items-center justify-between border border-gray-100 hover:border-[#392b80] hover:shadow-md transition duration-200">
                    <div>
                        <h4 className="font-bold text-gray-900 text-lg">{quiz.title}</h4>
                        <div className="flex gap-4 text-sm text-gray-500 mt-1 font-medium">
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Due: {new Date(quiz.dueDate).toLocaleDateString()}</span>
                            <span className="bg-gray-100 px-2 rounded-md text-xs py-0.5 flex items-center">{quiz.course?.title}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        {getStatusBadge(quiz)}
                    </div>
                </div>
            ))}
        </div>
    );
};

import Breadcrumbs from "@/components/shared/Breadcrumbs";

const ParentQuizzesPage = () => {
    const { data: childrenData, isLoading } = useGetChildrenQuery();
    const children = Array.isArray(childrenData) ? childrenData : childrenData?.data || [];
    const [selectedChild, setSelectedChild] = useState(null);

    // Auto-select first child
    if (children.length > 0 && !selectedChild) {
        setSelectedChild(children[0]._id);
    }

    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard/parent" },
        { label: "Children's Quizzes" }
    ];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#392b80]"></div>
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
                            Children's Grades
                        </h1>
                        <p className="text-slate-500 mt-2 text-lg">Detailed view of your children's performance.</p>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {/* Child Selector Tabs */}
                {children.length > 0 && (
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-200">
                        {children.map((child) => (
                            <button
                                key={child._id}
                                onClick={() => setSelectedChild(child._id)}
                                className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition whitespace-nowrap font-bold ${selectedChild === child._id
                                    ? 'bg-[#392b80] text-white border-[#392b80] shadow-md shadow-[#392b80]/20'
                                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedChild === child._id ? 'bg-white/20' : 'bg-gray-100'}`}>
                                    <User className={`w-4 h-4 ${selectedChild === child._id ? 'text-white' : 'text-gray-500'}`} />
                                </div>
                                <span>{child.name}</span>
                            </button>
                        ))}
                    </div>
                )}

                {/* Content Area */}
                {selectedChild && (
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                        <h2 className="text-xl font-bold text-[#392b80] mb-6 flex items-center gap-2">
                            <FileText className="w-5 h-5" /> Quiz Results
                        </h2>

                        <ChildQuizzesList childId={selectedChild} />
                    </div>
                )}

                {children.length === 0 && (
                    <div className="text-center p-12 text-gray-500 bg-white rounded-3xl border border-dashed border-gray-200">
                        No children linked to your account.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ParentQuizzesPage;
