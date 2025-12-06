'use client'

import { useState } from 'react'
import { X, Frown, Meh, Smile, Laugh, Angry, Zap } from 'lucide-react'

// Re-export MoodResults from the sibling file
export { MoodResults } from './mood-results'

export function MoodSurvey({ open, onOpenChange, type = 'general', onSubmit, isLoading }) {
    const [mood, setMood] = useState(3)
    const [energy, setEnergy] = useState(50)
    const [step, setStep] = useState(1)

    if (!open) return null

    const moodOptions = [
        { value: 1, label: 'Very Bad', icon: Angry, color: 'text-red-500', bg: 'bg-red-100' },
        { value: 2, label: 'Bad', icon: Frown, color: 'text-orange-500', bg: 'bg-orange-100' },
        { value: 3, label: 'Normal', icon: Meh, color: 'text-yellow-500', bg: 'bg-yellow-100' },
        { value: 4, label: 'Good', icon: Smile, color: 'text-blue-500', bg: 'bg-blue-100' },
        { value: 5, label: 'Excellent', icon: Laugh, color: 'text-green-500', bg: 'bg-green-100' },
    ]

    const handleSubmit = () => {
        onSubmit(mood, energy)
        // Reset after a delay or let parent handle closing
        setTimeout(() => setStep(1), 500)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="relative p-6 bg-gradient-to-r from-violet-600 to-indigo-600">
                    <button
                        onClick={() => onOpenChange(false)}
                        className="absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {step === 1 ? 'How do you feel?' : 'How is your energy?'}
                    </h2>
                    <p className="text-indigo-100">
                        {step === 1 ? 'Select the emoji that best reflects your mood' : 'Drag the slider to adjust your energy level'}
                    </p>
                </div>

                {/* Content */}
                <div className="p-8">
                    <div className="min-h-[200px]">
                        {step === 1 ? (
                            <div
                                key="step1"
                                className="grid grid-cols-5 gap-3 animate-in slide-in-from-left-4 fade-in duration-300"
                            >
                                {moodOptions.map((option) => {
                                    const Icon = option.icon
                                    const isSelected = mood === option.value
                                    return (
                                        <button
                                            key={option.value}
                                            onClick={() => setMood(option.value)}
                                            className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-200 ${isSelected
                                                    ? `${option.bg} scale-110 shadow-lg ring-2 ring-offset-2 ring-indigo-500`
                                                    : 'hover:bg-gray-50 hover:scale-105'
                                                }`}
                                        >
                                            <Icon
                                                className={`w-8 h-8 ${isSelected ? option.color : 'text-gray-400'}`}
                                                strokeWidth={isSelected ? 2.5 : 1.5}
                                            />
                                        </button>
                                    )
                                })}
                            </div>
                        ) : (
                            <div
                                key="step2"
                                className="space-y-8 animate-in slide-in-from-right-4 fade-in duration-300"
                            >
                                <div className="flex flex-col items-center">
                                    <div className="relative mb-8">
                                        <Zap
                                            className={`w-16 h-16 transition-colors duration-300 ${energy > 70 ? 'text-yellow-500 fill-yellow-500' :
                                                    energy > 40 ? 'text-blue-500' : 'text-gray-300'
                                                }`}
                                        />
                                        <div className="absolute -top-2 -right-8 bg-black text-white px-2 py-1 rounded-lg text-sm font-bold">
                                            {energy}%
                                        </div>
                                    </div>

                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={energy}
                                        onChange={(e) => setEnergy(parseInt(e.target.value))}
                                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                    />

                                    <div className="flex justify-between w-full mt-2 text-sm text-gray-400">
                                        <span>Low</span>
                                        <span>Medium</span>
                                        <span>High</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="mt-8 flex justify-end gap-3">
                        {step === 2 && (
                            <button
                                onClick={() => setStep(1)}
                                className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl font-medium transition-colors"
                            >
                                Back
                            </button>
                        )}
                        <button
                            onClick={() => step === 1 ? setStep(2) : handleSubmit()}
                            disabled={isLoading}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                step === 1 ? 'Next' : 'Submit Check-in'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
