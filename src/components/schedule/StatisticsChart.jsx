'use client';

import { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

export default function StatisticsChart({ classes }) {
    const [chartType, setChartType] = useState('bar'); // 'bar', 'pie', 'line'

    // Statistics data by subject
    const subjectStats = classes.reduce((acc, cls) => {
        if (!acc[cls.subject]) {
            acc[cls.subject] = {
                subject: cls.subject,
                total: 0,
                completed: 0,
                upcoming: 0
            };
        }
        acc[cls.subject].total++;
        if (cls.status === 'completed') acc[cls.subject].completed++;
        if (cls.status === 'upcoming') acc[cls.subject].upcoming++;
        return acc;
    }, {});

    const barData = Object.values(subjectStats);

    // Pie chart data by status
    const statusData = [
        { name: 'Completed', value: classes.filter(c => c.status === 'completed').length, color: '#10B981' },
        { name: 'Upcoming', value: classes.filter(c => c.status === 'upcoming').length, color: '#3B82F6' },
        { name: 'Scheduled', value: classes.filter(c => c.status === 'scheduled').length, color: '#F59E0B' },
        { name: 'Cancelled', value: classes.filter(c => c.status === 'cancelled').length, color: '#EF4444' }
    ];

    // Weekly data
    const weeklyData = [
        { day: 'Sunday', classes: 4 },
        { day: 'Monday', classes: 6 },
        { day: 'Tuesday', classes: 5 },
        { day: 'Wednesday', classes: 3 },
        { day: 'Thursday', classes: 7 },
        { day: 'Friday', classes: 0 },
        { day: 'Saturday', classes: 2 }
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-200 rounded shadow">
                    <p className="font-semibold">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: {entry.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div>
            {/* Control Buttons */}
            <div className="flex space-x-2 mb-4">
                <button
                    onClick={() => setChartType('bar')}
                    className={`px-4 py-2 rounded-lg ${chartType === 'bar' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                >
                    Bar Chart
                </button>
                <button
                    onClick={() => setChartType('pie')}
                    className={`px-4 py-2 rounded-lg ${chartType === 'pie' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                >
                    Pie Chart
                </button>
                <button
                    onClick={() => setChartType('line')}
                    className={`px-4 py-2 rounded-lg ${chartType === 'line' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                >
                    Weekly
                </button>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Main Chart */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-700 mb-4">
                        {chartType === 'bar' ? 'Statistics by Subject' :
                            chartType === 'pie' ? 'Class Distribution by Status' :
                                'Classes During the Week'}
                    </h3>

                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            {chartType === 'bar' ? (
                                <BarChart data={barData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="subject" />
                                    <YAxis />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Bar dataKey="total" name="Total Classes" fill="#3B82F6" />
                                    <Bar dataKey="completed" name="Completed" fill="#10B981" />
                                    <Bar dataKey="upcoming" name="Upcoming" fill="#F59E0B" />
                                </BarChart>
                            ) : chartType === 'pie' ? (
                                <PieChart>
                                    <Pie
                                        data={statusData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {statusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                </PieChart>
                            ) : (
                                <BarChart data={weeklyData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="classes" name="Class Count" fill="#8B5CF6" />
                                </BarChart>
                            )}
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Quick Statistics */}
                <div className="space-y-4">
                    {/* Top Subjects */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h3 className="font-semibold text-gray-700 mb-3">Most Active Subjects</h3>
                        <div className="space-y-2">
                            {barData
                                .sort((a, b) => b.total - a.total)
                                .slice(0, 5)
                                .map((item, index) => (
                                    <div key={item.subject} className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <span className="text-lg font-bold text-gray-400 mr-2">
                                                #{index + 1}
                                            </span>
                                            <span>{item.subject}</span>
                                        </div>
                                        <span className="font-semibold">{item.total} classes</span>
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Active Teachers */}
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h3 className="font-semibold text-gray-700 mb-3">Active Teachers</h3>
                        <div className="space-y-3">
                            {[
                                { name: 'Ahmed Mohamed', classes: 24, subject: 'Mathematics' },
                                { name: 'Sara Ali', classes: 18, subject: 'Science' },
                                { name: 'Mohamed Khaled', classes: 15, subject: 'Arabic Language' },
                                { name: 'Fatima Hassan', classes: 12, subject: 'English Language' }
                            ].map((teacher, index) => (
                                <div key={teacher.name} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                                            👨‍🏫
                                        </div>
                                        <div>
                                            <div className="font-medium">{teacher.name}</div>
                                            <div className="text-xs text-gray-500">{teacher.subject}</div>
                                        </div>
                                    </div>
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                                        {teacher.classes} classes
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Statistics */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                        {classes.length}
                    </div>
                    <div className="text-sm text-gray-600">Total Classes</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                        {Math.round((classes.filter(c => c.status === 'completed').length / classes.length) * 100) || 0}%
                    </div>
                    <div className="text-sm text-gray-600">Completion Rate</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                        {new Set(classes.map(c => c.subject)).size}
                    </div>
                    <div className="text-sm text-gray-600">Number of Subjects</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                        {new Set(classes.map(c => c.grade)).size}
                    </div>
                    <div className="text-sm text-gray-600">Number of Grades</div>
                </div>
            </div>
        </div>
    );
}