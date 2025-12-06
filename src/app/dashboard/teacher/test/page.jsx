'use client'

import { MoodResults } from '@/components/DashboardComponents/teacher/mood-results'

export default function DashboardPage() {
  const moodData = [
    { mood: 4, energy: 80, timestamp: '2024-01-15T10:00:00Z', type: 'before' },
    { mood: 5, energy: 85, timestamp: '2024-01-15T11:00:00Z', type: 'after' },
    { mood: 3, energy: 60, timestamp: '2024-01-16T09:30:00Z', type: 'before' },
    { mood: 4, energy: 70, timestamp: '2024-01-16T10:30:00Z', type: 'after' },
  ]

  return (
    <div className="p-6">
      <MoodResults
        results={moodData}
        title="Weekly Analysis"
        showDetails={true}
        showExport={true}
        onRefresh={() => console.log('Refreshing...')}
      />
    </div>
  )
}