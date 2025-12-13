'use client';
import React, { useState } from 'react';
import { BookOpen, Users, DollarSign, Wallet, Clock, Archive, CheckCircle, FileText, Star } from 'lucide-react';
import TotalCard from './components/TotalCard';
import AcademicLineChart from './components/AcademicLineChart';
import RecentCourses from '../RecentCourses';
import DateNavigator from './components/DateNavigator';
import { useGetTeacherAcademicChartQuery, useGetTeacherEarningsChartQuery } from '@/redux/api/endPoints/teachersApiSlice';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Helper to get week ranges
const getWeekRange = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay() + 1); // Monday
    const end = new Date(start);
    end.setDate(end.getDate() + 6); // Sunday
    return { start, end };
};

const formatDateRange = (start, end) => {
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
};

const TeacherAnalytics = ({ data }) => {
    if (!data) return null;
    const { stats, graphs, recentCourses } = data;

    // --- CHART STATE MANAGEMENT ---
    const [academicDate, setAcademicDate] = useState(new Date());
    const [earningsDate, setEarningsDate] = useState(new Date());

    const academicWeek = getWeekRange(academicDate);
    const earningsWeek = getWeekRange(earningsDate);

    // --- INDEPENDENT DATA FETCHING ---
    const { data: academicData } = useGetTeacherAcademicChartQuery({
        startDate: academicWeek.start.toISOString().split('T')[0],
        endDate: academicWeek.end.toISOString().split('T')[0]
    });

    const { data: earningsData } = useGetTeacherEarningsChartQuery({
        startDate: earningsWeek.start.toISOString().split('T')[0],
        endDate: earningsWeek.end.toISOString().split('T')[0]
    });

    const handlePrevWeek = (setter, current) => {
        const newDate = new Date(current);
        newDate.setDate(newDate.getDate() - 7);
        setter(newDate);
    };

    const handleNextWeek = (setter, current) => {
        const newDate = new Date(current);
        newDate.setDate(newDate.getDate() + 7);
        setter(newDate);
    };

    // Use fetched data if available (after first navigation), otherwise fall back to initial props for smooth load
    // Actually, initial props match current week, so we can just rely on the new queries or prefer props for initial render to avoid flicker?
    // Let's prefer the query data, but default to props 'graphs' if query is loading/undefined (though query should ideally be fast or pre-cached)
    // Simpler: Just use the query data. It will be undefined initially? No, RTK Query caches. 
    // Wait, initial props 'graphs' has the data for the *initial* range (current week).
    // So we can initialize state with current date, and the queries will fire.
    // To avoid double fetching what we already have, we could use `skip`? But that complicates specialized queries.
    // Let's just use the query data. It's cleaner. If it causes a flash, we can optimize.

    // NOTE: The `graphs` prop from `data` contains the *initial* load (current week).
    // The `academicData` and `earningsData` from hooks will return the specific data for the selected week.
    // We should use `academicData?.data || graphs.academicGrowth` ? No, format diff.
    // The new endpoints return the array directly as `data`. The `graphs.academicGrowth` is the array.

    const displayedAcademicData = academicData?.data || graphs.academicGrowth; // Fallback to initial if query pending?
    const displayedEarningsData = earningsData?.data || graphs.earnings;


    // --- ACADEMIC DATA CORE ---
    const academicStats = [
        {
            title: "Total Courses",
            value: stats.totalCourses,
            icon: <BookOpen size={24} className="text-white" />,
            iconBg: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            lightBg: "#3b82f6",
        },
        {
            title: "Total Students",
            value: stats.totalStudents,
            icon: <Users size={24} className="text-white" />,
            iconBg: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
            lightBg: "#f97316",
        },
        {
            title: "Active Courses",
            value: stats.activeCourses,
            icon: <CheckCircle size={24} className="text-white" />,
            iconBg: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            lightBg: "#10b981",
        },
        {
            title: "Average Rating",
            value: `${stats.averageRating} / 5`,
            icon: <Star size={24} className="text-white" />,
            iconBg: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            lightBg: "#f59e0b",
        }
    ];

    // --- FINANCIAL DATA CORE ---
    const financialStats = [
        {
            title: "Wallet Balance",
            value: `$${stats.balance}`,
            icon: <Wallet size={24} className="text-white" />,
            iconBg: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
            lightBg: "#8b5cf6",
        },
        {
            title: "Total Earnings",
            value: `$${stats.totalEarnings}`,
            icon: <DollarSign size={24} className="text-white" />,
            iconBg: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
            lightBg: "#ec4899",
        },
        {
            title: "Pending Payout",
            value: `$${stats.pendingPayoutsAmount}`,
            icon: <Clock size={24} className="text-white" />,
            iconBg: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            lightBg: "#f59e0b",
        },
        {
            title: "Payout Requests",
            value: stats.pendingPayoutsCount,
            icon: <FileText size={24} className="text-white" />,
            iconBg: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
            lightBg: "#6366f1",
        }
    ];

    return (
        <div className="space-y-8">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* --- COLUMN 1: ACADEMIC OVERVIEW --- */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <BookOpen size={20} className="text-blue-600" /> Growth Overview
                        </h3>
                        <DateNavigator
                            label={formatDateRange(academicWeek.start, academicWeek.end)}
                            onPrev={() => handlePrevWeek(setAcademicDate, academicDate)}
                            onNext={() => handleNextWeek(setAcademicDate, academicDate)}
                            onNextDisabled={academicWeek.end > new Date()}
                        />
                    </div>

                    {/* Chart Section */}
                    <div className="min-h-[300px] border-b border-gray-50 pb-6">
                        <AcademicLineChart
                            data={displayedAcademicData}
                        />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {academicStats.map((item, i) => (
                            <TotalCard key={i} {...item} />
                        ))}
                    </div>
                </div>


                {/* --- COLUMN 2: FINANCIAL OVERVIEW --- */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <DollarSign size={20} className="text-green-600" /> Financial Overview
                        </h3>
                        <DateNavigator
                            label={formatDateRange(earningsWeek.start, earningsWeek.end)}
                            onPrev={() => handlePrevWeek(setEarningsDate, earningsDate)}
                            onNext={() => handleNextWeek(setEarningsDate, earningsDate)}
                            onNextDisabled={earningsWeek.end > new Date()}
                        />
                    </div>

                    {/* Chart Section (Earnings History) */}
                    <div className="h-[300px] border-b border-gray-50 pb-6 w-full">
                        <div className="flex flex-col h-full">
                            <span className="text-sm font-semibold text-gray-600 mb-4 pl-4">
                                Earnings Overview (Selected Week)
                            </span>
                            {displayedEarningsData && displayedEarningsData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={displayedEarningsData}
                                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                        <XAxis
                                            dataKey="name"
                                            fontSize={10}
                                            tickLine={false}
                                            axisLine={false}
                                            stroke="#9ca3af"
                                        />
                                        <YAxis
                                            fontSize={10}
                                            tickLine={false}
                                            axisLine={false}
                                            stroke="#9ca3af"
                                            tickFormatter={(value) => `$${value}`}
                                        />
                                        <Tooltip
                                            cursor={{ fill: '#f9fafb' }}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                        />
                                        <Bar
                                            dataKey="amount"
                                            fill="#3b82f6"
                                            radius={[4, 4, 0, 0]}
                                            name="Earnings"
                                            barSize={32}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex h-full items-center justify-center text-gray-400 text-sm">
                                    No earnings data available
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {financialStats.map((item, i) => (
                            <TotalCard key={i} {...item} />
                        ))}
                    </div>
                </div>

            </div>

            {/* --- RECENTLY CREATED COURSES --- */}
            <RecentCourses courses={recentCourses} />

        </div>
    );
};

export default TeacherAnalytics;
