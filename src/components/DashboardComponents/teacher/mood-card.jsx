'use client'

import { useState, useEffect } from 'react'
import {
    TrendingUp,
    TrendingDown,
    Minus,
    Activity,
    Heart,
    Brain,
    Zap,
    BarChart3,
    Download,
    RefreshCw,
    Calendar,
    Users,
    Clock,
    Target,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react'

export function MoodResults({
    results = [],
    showDetails = true,
    showExport = true,
    title = "Mood and Energy Results",
    onRefresh,
    isLoading = false
}) {
    const [timeRange, setTimeRange] = useState('week')
    const [expanded, setExpanded] = useState(false)

    if (!results || results.length === 0) {
        return (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 text-center border border-gray-200">
                <div className="text-gray-400 mb-3">
                    <Brain className="w-12 h-12 mx-auto opacity-50" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No data yet</h3>
                <p className="text-gray-500 text-sm">
                    Start completing mood surveys to see your analytics here
                </p>
            </div>
        )
    }

    // Data Analysis
    const analysis = analyzeMoodData(results, timeRange)

    const renderTrendIcon = (value) => {
        if (value > 0) return <ArrowUpRight className="w-4 h-4 text-green-500" />
        if (value < 0) return <ArrowDownRight className="w-4 h-4 text-red-500" />
        return <Minus className="w-4 h-4 text-gray-400" />
    }

    const getMoodEmoji = (score) => {
        if (score >= 4.5) return "😊"
        if (score >= 3.5) return "🙂"
        if (score >= 2.5) return "😐"
        if (score >= 1.5) return "😕"
        return "😢"
    }

    const getEnergyColor = (level) => {
        if (level >= 75) return 'text-green-600 bg-green-50 border-green-200'
        if (level >= 50) return 'text-amber-600 bg-amber-50 border-amber-200'
        if (level >= 25) return 'text-orange-600 bg-orange-50 border-orange-200'
        return 'text-red-600 bg-red-50 border-red-200'
    }

    const getMoodColor = (score) => {
        if (score >= 4) return 'text-green-600 bg-green-50 border-green-200'
        if (score >= 3) return 'text-blue-600 bg-blue-50 border-blue-200'
        if (score >= 2) return 'text-amber-600 bg-amber-50 border-amber-200'
        return 'text-red-600 bg-red-50 border-red-200'
    }

    const handleExport = () => {
        const data = {
            analysis,
            rawData: results,
            exportedAt: new Date().toISOString()
        }

        const dataStr = JSON.stringify(data, null, 2)
        const blob = new Blob([dataStr], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `mood_analysis_${new Date().toISOString().split('T')[0]}.json`
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
                            <Brain className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                            <p className="text-sm text-gray-500 flex items-center gap-2">
                                <Users className="w-3 h-3" />
                                {analysis.totalEntries} entries •
                                <Clock className="w-3 h-3 ml-2" />
                                Last updated: {analysis.lastUpdate}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {showExport && (
                            <button
                                onClick={handleExport}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Export Data"
                            >
                                <Download className="w-4 h-4 text-gray-600" />
                            </button>
                        )}

                        {onRefresh && (
                            <button
                                onClick={onRefresh}
                                disabled={isLoading}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                                title="Refresh Data"
                            >
                                <RefreshCw className={`w-4 h-4 text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
                            </button>
                        )}

                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            {expanded ? 'Hide Details' : 'Show Details'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Stats */}
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Average Mood Card */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Heart className="w-5 h-5 text-blue-600" />
                                <span className="font-medium text-blue-700">Overall Mood</span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMoodColor(analysis.averageMood)}`}>
                                {getMoodEmoji(analysis.averageMood)}
                            </span>
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <div className="text-3xl font-bold text-gray-800 mb-1">
                                    {analysis.averageMood.toFixed(1)}
                                    <span className="text-lg text-gray-500">/5</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm">
                                    {renderTrendIcon(analysis.moodTrend)}
                                    <span className={`font-medium ${analysis.moodTrend > 0 ? 'text-green-600' : analysis.moodTrend < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                                        {analysis.moodTrend > 0 ? '+' : ''}{analysis.moodTrend.toFixed(1)} vs last week
                                    </span>
                                </div>
                            </div>
                            <div className="text-4xl">
                                {getMoodEmoji(analysis.averageMood)}
                            </div>
                        </div>
                    </div>

                    {/* Average Energy Card */}
                    <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Zap className="w-5 h-5 text-green-600" />
                                <span className="font-medium text-green-700">Energy Level</span>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getEnergyColor(analysis.averageEnergy)}`}>
                                {analysis.averageEnergy >= 75 ? 'High' :
                                    analysis.averageEnergy >= 50 ? 'Medium' :
                                        analysis.averageEnergy >= 25 ? 'Low' : 'Very Low'}
                            </div>
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <div className="text-3xl font-bold text-gray-800 mb-1">
                                    {analysis.averageEnergy.toFixed(0)}
                                    <span className="text-lg text-gray-500">%</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm">
                                    {renderTrendIcon(analysis.energyTrend)}
                                    <span className={`font-medium ${analysis.energyTrend > 0 ? 'text-green-600' : analysis.energyTrend < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                                        {analysis.energyTrend > 0 ? '+' : ''}{analysis.energyTrend.toFixed(0)}% vs last week
                                    </span>
                                </div>
                            </div>
                            <div className="relative w-16 h-16">
                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="none"
                                        stroke="#e5e7eb"
                                        strokeWidth="8"
                                    />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="none"
                                        stroke="#10b981"
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                        strokeDasharray={`${analysis.averageEnergy * 2.51} 251`}
                                        transform="rotate(-90 50 50)"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                                    {analysis.averageEnergy.toFixed(0)}%
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Consistency Card */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Target className="w-5 h-5 text-purple-600" />
                                <span className="font-medium text-purple-700">Consistency</span>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${analysis.consistency >= 80 ? 'bg-green-100 text-green-700' :
                                analysis.consistency >= 60 ? 'bg-blue-100 text-blue-700' :
                                    'bg-amber-100 text-amber-700'
                                }`}>
                                {analysis.consistency >= 80 ? 'Stable' :
                                    analysis.consistency >= 60 ? 'Medium' : 'Volatile'}
                            </div>
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <div className="text-3xl font-bold text-gray-800 mb-1">
                                    {analysis.consistency.toFixed(0)}
                                    <span className="text-lg text-gray-500">%</span>
                                </div>
                                <div className="text-sm text-gray-600">
                                    Emotional Consistency
                                </div>
                            </div>
                            <div className="text-4xl">
                                {analysis.consistency >= 80 ? '🎯' :
                                    analysis.consistency >= 60 ? '⚖️' : '🌊'}
                            </div>
                        </div>
                    </div>

                    {/* Activity Level Card */}
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Activity className="w-5 h-5 text-amber-600" />
                                <span className="font-medium text-amber-700">Tracking Activity</span>
                            </div>
                            <div className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                                {analysis.activityLevel}
                            </div>
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <div className="text-3xl font-bold text-gray-800 mb-1">
                                    {analysis.dailyAverage}
                                </div>
                                <div className="text-sm text-gray-600">
                                    Daily Average
                                </div>
                            </div>
                            <div className="text-4xl">
                                {analysis.activityLevel === 'Active' ? '🔥' :
                                    analysis.activityLevel === 'Medium' ? '📊' : '📉'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Time Range Selector */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-700">Time Period</h4>
                        <div className="flex gap-2">
                            {['day', 'week', 'month', 'year'].map((range) => (
                                <button
                                    key={range}
                                    onClick={() => setTimeRange(range)}
                                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${timeRange === range
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {range === 'day' ? 'Today' :
                                        range === 'week' ? 'Week' :
                                            range === 'month' ? 'Month' : 'Year'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Expanded Details */}
                {expanded && showDetails && (
                    <div className="space-y-6 animate-fadeIn">
                        {/* Progress Bars */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 rounded-xl p-5">
                                <h5 className="font-medium mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4" />
                                    Mood Evolution
                                </h5>
                                <div className="space-y-4">
                                    {analysis.moodDistribution.map((item, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-600">{item.label}</span>
                                                <span className="font-medium">{item.percentage}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full ${index === 0 ? 'bg-red-500' :
                                                        index === 1 ? 'bg-amber-500' :
                                                            index === 2 ? 'bg-blue-500' :
                                                                index === 3 ? 'bg-green-400' : 'bg-green-600'
                                                        }`}
                                                    style={{ width: `${item.percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-5">
                                <h5 className="font-medium mb-4 flex items-center gap-2">
                                    <BarChart3 className="w-4 h-4" />
                                    Energy Distribution
                                </h5>
                                <div className="space-y-4">
                                    {analysis.energyDistribution.map((item, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-600">{item.range}</span>
                                                <span className="font-medium">{item.count} sessions</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full ${index === 0 ? 'bg-green-600' :
                                                        index === 1 ? 'bg-green-500' :
                                                            index === 2 ? 'bg-amber-500' :
                                                                index === 3 ? 'bg-orange-500' : 'bg-red-500'
                                                        }`}
                                                    style={{ width: `${(item.count / analysis.totalEntries) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Insights */}
                        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-xl p-5">
                            <h5 className="font-medium mb-4 text-indigo-700">💡 Insights & Analysis</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {analysis.insights.map((insight, index) => (
                                    <div key={index} className="bg-white/50 backdrop-blur-sm rounded-lg p-4">
                                        <div className="flex items-start gap-3">
                                            <div className={`p-2 rounded-lg ${insight.type === 'positive' ? 'bg-green-100 text-green-600' :
                                                insight.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                                                    'bg-blue-100 text-blue-600'
                                                }`}>
                                                {insight.type === 'positive' ? '✨' :
                                                    insight.type === 'warning' ? '⚠️' : '📝'}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium mb-1">{insight.title}</p>
                                                <p className="text-xs text-gray-600">{insight.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-gray-50 rounded-xl p-5">
                            <h5 className="font-medium mb-4">Recent Activities</h5>
                            <div className="space-y-3">
                                {analysis.recentActivity.map((activity, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${getMoodColor(activity.mood)}`}>
                                                {getMoodEmoji(activity.mood)}
                                            </div>
                                            <div>
                                                <p className="font-medium">{activity.type === 'before' ? 'Before Class' : 'After Class'}</p>
                                                <p className="text-sm text-gray-500">{activity.time}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold">{activity.mood.toFixed(1)}/5</div>
                                            <div className="text-sm text-gray-500">{activity.energy}% Energy</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date().toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                        <span>•</span>
                        <span>Last updated: {analysis.lastUpdate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>Recent Data</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Data Analysis Function
function analyzeMoodData(results, timeRange) {
    const now = new Date()
    let filteredResults = results

    // Filter by time range
    if (timeRange === 'day') {
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        filteredResults = results.filter(r => new Date(r.timestamp) >= startOfDay)
    } else if (timeRange === 'week') {
        const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
        filteredResults = results.filter(r => new Date(r.timestamp) >= startOfWeek)
    } else if (timeRange === 'month') {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
        filteredResults = results.filter(r => new Date(r.timestamp) >= startOfMonth)
    }

    // Calculate averages
    const averageMood = filteredResults.length > 0
        ? filteredResults.reduce((sum, r) => sum + r.mood, 0) / filteredResults.length
        : 0

    const averageEnergy = filteredResults.length > 0
        ? filteredResults.reduce((sum, r) => sum + r.energy, 0) / filteredResults.length
        : 0

    // Calculate trends
    const lastWeekResults = results.filter(r => {
        const date = new Date(r.timestamp)
        const weekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
        const twoWeeksAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 14)
        return date >= twoWeeksAgo && date < weekAgo
    })

    const lastWeekMood = lastWeekResults.length > 0
        ? lastWeekResults.reduce((sum, r) => sum + r.mood, 0) / lastWeekResults.length
        : averageMood

    const lastWeekEnergy = lastWeekResults.length > 0
        ? lastWeekResults.reduce((sum, r) => sum + r.energy, 0) / lastWeekResults.length
        : averageEnergy

    const moodTrend = averageMood - lastWeekMood
    const energyTrend = averageEnergy - lastWeekEnergy

    // Mood Distribution
    const moodDistribution = [
        { label: 'Very Bad (1)', count: filteredResults.filter(r => r.mood < 1.5).length },
        { label: 'Bad (2)', count: filteredResults.filter(r => r.mood >= 1.5 && r.mood < 2.5).length },
        { label: 'Normal (3)', count: filteredResults.filter(r => r.mood >= 2.5 && r.mood < 3.5).length },
        { label: 'Good (4)', count: filteredResults.filter(r => r.mood >= 3.5 && r.mood < 4.5).length },
        { label: 'Excellent (5)', count: filteredResults.filter(r => r.mood >= 4.5).length }
    ].map(item => ({
        ...item,
        percentage: filteredResults.length > 0 ? Math.round((item.count / filteredResults.length) * 100) : 0
    }))

    // Energy Distribution
    const energyDistribution = [
        { range: 'Very High (75-100%)', count: filteredResults.filter(r => r.energy >= 75).length },
        { range: 'High (50-74%)', count: filteredResults.filter(r => r.energy >= 50 && r.energy < 75).length },
        { range: 'Medium (25-49%)', count: filteredResults.filter(r => r.energy >= 25 && r.energy < 50).length },
        { range: 'Low (1-24%)', count: filteredResults.filter(r => r.energy > 0 && r.energy < 25).length },
        { range: 'Very Low (0%)', count: filteredResults.filter(r => r.energy === 0).length }
    ]

    // Calculate Consistency (lower variance = higher consistency)
    const moodVariance = filteredResults.length > 1
        ? Math.sqrt(filteredResults.reduce((sum, r) => sum + Math.pow(r.mood - averageMood, 2), 0) / filteredResults.length)
        : 0

    const consistency = Math.max(0, 100 - (moodVariance * 20))

    // Activity Level
    const entriesPerDay = filteredResults.length / 7 // Assuming a week
    let activityLevel = 'Low'
    if (entriesPerDay >= 2) activityLevel = 'Active'
    else if (entriesPerDay >= 1) activityLevel = 'Medium'

    // Insights
    const insights = []

    if (moodTrend > 0.5) {
        insights.push({
            type: 'positive',
            title: 'Mood Improvement!',
            description: 'Your mood is consistently improving, keep up the positive activities'
        })
    } else if (moodTrend < -0.5) {
        insights.push({
            type: 'warning',
            title: 'Noticeable Drop',
            description: 'We noticed a drop in your mood recently, try to get some rest'
        })
    }

    if (averageEnergy < 30) {
        insights.push({
            type: 'warning',
            title: 'Low Energy',
            description: 'Your energy level is low, you might need more rest or nutrition'
        })
    } else if (averageEnergy > 70) {
        insights.push({
            type: 'positive',
            title: 'High Energy',
            description: 'Your energy level is excellent! This is a great time for learning and productivity'
        })
    }

    if (consistency > 80) {
        insights.push({
            type: 'positive',
            title: 'High Consistency',
            description: 'Your emotions are very stable, this is a good sign of mental health'
        })
    }

    // Recent Activity
    const recentActivity = filteredResults
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 5)
        .map(r => ({
            ...r,
            time: new Date(r.timestamp).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            })
        }))

    return {
        totalEntries: filteredResults.length,
        averageMood,
        averageEnergy,
        moodTrend,
        energyTrend,
        moodDistribution,
        energyDistribution,
        consistency,
        activityLevel,
        dailyAverage: (filteredResults.length / 30).toFixed(1),
        insights,
        recentActivity,
        lastUpdate: new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }
}

// Simplified Component for Quick Use
export function SimpleMoodResults({ results }) {
    if (!results || results.length === 0) return null

    const avgMood = results.reduce((sum, r) => sum + r.mood, 0) / results.length
    const avgEnergy = results.reduce((sum, r) => sum + r.energy, 0) / results.length

    return (
        <div className="flex items-center gap-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
            <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{avgMood.toFixed(1)}</div>
                <div className="text-xs text-gray-600">Avg Mood</div>
            </div>
            <div className="h-8 w-px bg-blue-200"></div>
            <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{Math.round(avgEnergy)}%</div>
                <div className="text-xs text-gray-600">Avg Energy</div>
            </div>
            <div className="h-8 w-px bg-blue-200"></div>
            <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{results.length}</div>
                <div className="text-xs text-gray-600">Entries</div>
            </div>
        </div>
    )
}

// Quick Card Component
export function MoodCard({ mood, energy, timestamp, type }) {
    const getTypeLabel = () => {
        switch (type) {
            case 'before': return 'Before Class'
            case 'after': return 'After Class'
            default: return 'Assessment'
        }
    }

    const getMoodColor = (score) => {
        if (score >= 4) return 'text-green-600'
        if (score >= 3) return 'text-blue-600'
        if (score >= 2) return 'text-amber-600'
        return 'text-red-600'
    }

    return (
        <div className="bg-white rounded-xl p-4 border shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">{getTypeLabel()}</span>
                <span className="text-xs text-gray-500">
                    {new Date(timestamp).toLocaleTimeString('en-US')}
                </span>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-center">
                    <div className={`text-3xl font-bold ${getMoodColor(mood)}`}>
                        {mood.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-500">Mood</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-gray-800">
                        {energy}%
                    </div>
                    <div className="text-xs text-gray-500">Energy</div>
                </div>
                <div className="flex-1">
                    <div className="text-sm text-gray-600 mb-1">Progress</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500"
                            style={{ width: `${(mood / 5) * 100}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}