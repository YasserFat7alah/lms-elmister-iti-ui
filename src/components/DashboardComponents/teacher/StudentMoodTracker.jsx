// components/schedule/StudentMoodTracker.jsx
"use client";

import { useState, useEffect } from 'react';
import { Smile, Frown, Meh, Activity, TrendingUp, TrendingDown } from 'lucide-react';

export default function StudentMoodTracker() {
  const [moodData, setMoodData] = useState([]);
  const [timeRange, setTimeRange] = useState('week'); // day, week, month

  // Mock Mood Data (Translated)
  const mockMoodData = [
    { studentId: 'student_001', name: 'Ahmed Mohamed', mood: 4, energy: 85, date: '2024-01-15' },
    { studentId: 'student_002', name: 'Sarah Ahmed', mood: 3, energy: 65, date: '2024-01-15' },
    { studentId: 'student_003', name: 'Mohamed Khaled', mood: 5, energy: 95, date: '2024-01-15' },
    { studentId: 'student_004', name: 'Fatima Ali', mood: 2, energy: 45, date: '2024-01-15' },
    { studentId: 'student_005', name: 'Khaled Saeed', mood: 4, energy: 75, date: '2024-01-15' },
  ];

  useEffect(() => {
    // API fetch would happen here
    setMoodData(mockMoodData);
  }, [timeRange]);

  const getMoodIcon = (mood) => {
    if (mood >= 4) return <Smile className="text-green-600" size={20} />;
    if (mood >= 3) return <Meh className="text-yellow-600" size={20} />;
    return <Frown className="text-red-600" size={20} />;
  };

  const getEnergyColor = (energy) => {
    if (energy >= 80) return 'text-green-600';
    if (energy >= 60) return 'text-yellow-600';
    if (energy >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const calculateAverages = () => {
    const totalMood = moodData.reduce((sum, entry) => sum + entry.mood, 0);
    const totalEnergy = moodData.reduce((sum, entry) => sum + entry.energy, 0);

    return {
      avgMood: (totalMood / moodData.length).toFixed(1),
      avgEnergy: (totalEnergy / moodData.length).toFixed(0)
    };
  };

  const averages = calculateAverages();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden" dir="ltr">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Activity className="text-purple-600" size={20} />
          Student Mood Tracker
        </h3>
        <p className="text-sm text-gray-600">Latest student mood updates</p>
      </div>

      <div className="p-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Smile className="text-blue-600" size={20} />
              <span className="text-sm text-gray-600">Average Mood</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{averages.avgMood}/5</div>
            <div className="flex items-center gap-1 text-sm mt-1">
              <TrendingUp size={14} className="text-green-600" />
              <span className="text-green-600">+0.3 from last week</span>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="text-green-600" size={20} />
              <span className="text-sm text-gray-600">Average Energy</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{averages.avgEnergy}%</div>
            <div className="flex items-center gap-1 text-sm mt-1">
              <TrendingDown size={14} className="text-red-600" />
              <span className="text-red-600">-5% from last week</span>
            </div>
          </div>
        </div>

        {/* Student List */}
        <div className="space-y-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Students</span>
            <div className="flex gap-1">
              {['day', 'week', 'month'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 text-xs rounded-full ${timeRange === range
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {range === 'day' ? 'Today' : range === 'week' ? 'Week' : 'Month'}
                </button>
              ))}
            </div>
          </div>

          {moodData.map((student) => (
            <div key={student.studentId} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="font-medium text-gray-700">
                    {student.name.split(' ')[0].charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-800">{student.name}</div>
                  <div className="text-xs text-gray-500">{student.date}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {getMoodIcon(student.mood)}
                  <span className="font-medium">{student.mood}/5</span>
                </div>

                <div className="flex items-center gap-2">
                  <Activity size={16} className={getEnergyColor(student.energy)} />
                  <span className={`font-medium ${getEnergyColor(student.energy)}`}>
                    {student.energy}%
                  </span>
                </div>

                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getEnergyColor(student.energy).replace('text-', 'bg-')}`}
                    style={{ width: `${student.energy}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Note:</span> This data helps understand student mood and provide appropriate support.
          </div>
        </div>
      </div>
    </div>
  );
}