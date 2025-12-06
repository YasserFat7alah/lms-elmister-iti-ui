'use client'

import { useState, useEffect } from 'react'
import { MoodSurvey } from '@/components/mood/mood-survey'
import { SimpleMoodResults } from '@/components/mood/mood-card'
import { Brain, Plus, Calendar } from 'lucide-react'

export default function StudentMoodPage() {
    const [showSurvey, setShowSurvey] = useState(false)
    const [moodHistory, setMoodHistory] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    // Load history on mount
    useEffect(() => {
        const saved = localStorage.getItem('student_mood_history')
        if (saved) {
            setMoodHistory(JSON.parse(saved))
        }
    }, [])

    const handleMoodSubmit = (mood, energy) => {
        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            const newEntry = {
                mood,
                energy,
                timestamp: new Date().toISOString(),
                id: Date.now()
            }

            const newHistory = [newEntry, ...moodHistory]
            setMoodHistory(newHistory)
            localStorage.setItem('student_mood_history', JSON.stringify(newHistory))

            setIsLoading(false)
            setShowSurvey(false)
        }, 800)
    }

    const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return 'Good Morning'
        if (hour < 18) return 'Good Afternoon'
        return 'Good Evening'
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{getGreeting()}, Student! 👋</h1>
                    <p className="text-gray-500 mt-1">Track your mood and energy to optimize your learning journey.</p>
                </div>
                <button
                    onClick={() => setShowSurvey(true)}
                    className="group flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-indigo-500/30"
                >
                    <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>New Check-in</span>
                </button>
            </header>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-violet-500 to-indigo-600 rounded-3xl p-6 text-white shadow-xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                            <Brain className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold opacity-90">Weekly Insight</h3>
                            <p className="text-sm opacity-75">Your mood patterns</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <div>
                                <div className="text-4xl font-bold mb-1">
                                    {moodHistory.length > 0 ? (moodHistory.reduce((a, b) => a + b.mood, 0) / moodHistory.length).toFixed(1) : '-'}
                                </div>
                                <div className="text-sm opacity-75">Avg Mood Score</div>
                            </div>
                            <div className="h-12 w-px bg-white/20"></div>
                            <div className="text-right">
                                <div className="text-4xl font-bold mb-1">
                                    {moodHistory.length > 0 ? Math.round(moodHistory.reduce((a, b) => a + b.energy, 0) / moodHistory.length) + '%' : '-'}
                                </div>
                                <div className="text-sm opacity-75">Avg Energy</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="md:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-center">
                    {moodHistory.length > 0 ? (
                        <SimpleMoodResults results={moodHistory} />
                    ) : (
                        <div className="text-center text-gray-400">
                            <Brain className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p>No check-ins yet. Start tracking today!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* History List */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">Recent Check-ins</h3>
                    <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                <div className="divide-y divide-gray-100">
                    {moodHistory.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No history available
                        </div>
                    ) : (
                        moodHistory.map((entry) => (
                            <div key={entry.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl
                    ${entry.mood >= 4 ? 'bg-green-100' : entry.mood >= 3 ? 'bg-blue-100' : 'bg-orange-100'}
                  `}>
                                        {entry.mood >= 4.5 ? '😊' : entry.mood >= 3.5 ? '🙂' : entry.mood >= 2.5 ? '😐' : '😕'}
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">
                                            {new Date(entry.timestamp).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {new Date(entry.timestamp).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500">Energy</div>
                                        <div className="font-semibold text-gray-900">{entry.energy}%</div>
                                    </div>
                                    <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-indigo-500 rounded-full"
                                            style={{ width: `${entry.energy}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Mood Survey Modal */}
            <MoodSurvey
                open={showSurvey}
                onOpenChange={setShowSurvey}
                onSubmit={handleMoodSubmit}
                isLoading={isLoading}
            />
        </div>
    )
}
