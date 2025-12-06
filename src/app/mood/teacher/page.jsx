// app/teacher/dashboard/page.jsx
'use client'

import { useState, useEffect } from 'react'
import { MoodResults } from '@/components/mood/mood-results'
import {
    BarChart3,
    TrendingUp,
    Users,
    Calendar,
    Activity,
    Brain
} from 'lucide-react'

export default function TeacherDashboard() {
    const [moodData, setMoodData] = useState([])

    useEffect(() => {
        // جلب بيانات المزاج من localStorage أو API
        const loadMoodData = () => {
            // Mock data if empty for demonstration
            const mockData = [
                {
                    title: 'Introduction to React',
                    results: [
                        { mood: 3, energy: 60, type: 'before' },
                        { mood: 4, energy: 80, type: 'after' }
                    ]
                },
                {
                    title: 'Advanced Hooks',
                    results: [
                        { mood: 4, energy: 70, type: 'before' },
                        { mood: 5, energy: 90, type: 'after' }
                    ]
                }
            ]

            const stored = localStorage.getItem('lessons_mood_data')
            const lessons = stored ? JSON.parse(stored) : mockData
            setMoodData(lessons)
        }
        loadMoodData()
    }, [])

    const calculateStats = () => {
        const allMoods = moodData.flatMap(lesson => lesson.results || [])

        if (allMoods.length === 0) return null

        const avgMood = allMoods.reduce((sum, r) => sum + (r.mood || 0), 0) / allMoods.length
        const avgEnergy = allMoods.reduce((sum, r) => sum + (r.energy || 0), 0) / allMoods.length

        const moodChanges = moodData.filter(lesson => {
            const before = lesson.results?.find(r => r.type === 'before')
            const after = lesson.results?.find(r => r.type === 'after')
            return before && after
        }).map(lesson => {
            const before = lesson.results.find(r => r.type === 'before')
            const after = lesson.results.find(r => r.type === 'after')
            return {
                lesson: lesson.title,
                moodChange: (after.mood - before.mood).toFixed(1),
                energyChange: (after.energy - before.energy).toFixed(0)
            }
        })

        return {
            avgMood,
            avgEnergy,
            totalResponses: allMoods.length,
            moodChanges,
            lessonCount: moodData.length
        }
    }

    const stats = calculateStats()

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold mb-8">لوحة تحكم المعلم</h1>

            {/* إحصائيات سريعة */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold">{stats?.avgMood?.toFixed(1) || '0.0'}</div>
                            <div className="text-sm text-gray-600">متوسط المزاج</div>
                        </div>
                        <BarChart3 className="w-8 h-8 text-blue-500" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold">{stats?.avgEnergy?.toFixed(0) || '0'}%</div>
                            <div className="text-sm text-gray-600">متوسط الطاقة</div>
                        </div>
                        <Activity className="w-8 h-8 text-green-500" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold">{stats?.totalResponses || 0}</div>
                            <div className="text-sm text-gray-600">إجابة</div>
                        </div>
                        <Users className="w-8 h-8 text-purple-500" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold">{stats?.lessonCount || 0}</div>
                            <div className="text-sm text-gray-600">درس</div>
                        </div>
                        <Calendar className="w-8 h-8 text-amber-500" />
                    </div>
                </div>
            </div>

            {/* نتائج المزاج */}
            {stats && (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <div className="flex items-center gap-2 mb-6">
                        <Brain className="w-6 h-6 text-indigo-600" />
                        <h2 className="text-xl font-semibold">تحليلات المزاج والطاقة</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* متوسط النتائج */}
                        <div>
                            <h3 className="font-medium mb-4">المتوسطات العامة</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm">المزاج العام</span>
                                        <span className="text-sm font-medium">{stats.avgMood.toFixed(1)}/5</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-500 h-2 rounded-full"
                                            style={{ width: `${(stats.avgMood / 5) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm">مستوى الطاقة</span>
                                        <span className="text-sm font-medium">{stats.avgEnergy.toFixed(0)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-green-500 h-2 rounded-full"
                                            style={{ width: `${stats.avgEnergy}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* تغيرات المزاج */}
                        <div>
                            <h3 className="font-medium mb-4">تغيرات المزاج بعد الدروس</h3>
                            <div className="space-y-3">
                                {stats.moodChanges.slice(0, 3).map((change, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-sm">{change.lesson}</span>
                                        <div className="flex items-center gap-4">
                                            <div className={`px-2 py-1 rounded text-xs ${parseFloat(change.moodChange) > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {parseFloat(change.moodChange) > 0 ? '+' : ''}{change.moodChange} مزاج
                                            </div>
                                            <div className={`px-2 py-1 rounded text-xs ${parseFloat(change.energyChange) > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {parseFloat(change.energyChange) > 0 ? '+' : ''}{change.energyChange}% طاقة
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* قائمة الدروس مع استبيانات المزاج */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">استبيانات الدروس</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-right p-3">الدرس</th>
                                <th className="text-right p-3">المزاج قبل</th>
                                <th className="text-right p-3">المزاج بعد</th>
                                <th className="text-right p-3">الطاقة قبل</th>
                                <th className="text-right p-3">الطاقة بعد</th>
                                <th className="text-right p-3">التغير</th>
                            </tr>
                        </thead>
                        <tbody>
                            {moodData.map((lesson, index) => {
                                const before = lesson.results?.find(r => r.type === 'before')
                                const after = lesson.results?.find(r => r.type === 'after')

                                if (!before || !after) return null

                                const moodChange = after.mood - before.mood
                                const energyChange = after.energy - before.energy

                                return (
                                    <tr key={index} className="border-b hover:bg-gray-50">
                                        <td className="p-3">{lesson.title}</td>
                                        <td className="p-3">{before.mood}/5</td>
                                        <td className="p-3">{after.mood}/5</td>
                                        <td className="p-3">{before.energy}%</td>
                                        <td className="p-3">{after.energy}%</td>
                                        <td className="p-3">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-sm ${moodChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {moodChange > 0 ? '+' : ''}{moodChange.toFixed(1)}
                                                </span>
                                                <span className={`text-sm ${energyChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {energyChange > 0 ? '+' : ''}{energyChange.toFixed(0)}%
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}