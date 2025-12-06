'use client';

import { useState, useEffect } from 'react';

export default function DateSelector({ selectedDate, onDateChange }) {
    const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));

    const daysInMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0
    ).getDate();

    const firstDayOfMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        1
    ).getDay();

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const generateDays = () => {
        const days = [];

        // Previous month days
        const prevMonthDays = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            0
        ).getDate();

        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            days.push({
                date: new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, prevMonthDays - i),
                isCurrentMonth: false,
                isSelected: false
            });
        }

        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
            days.push({
                date,
                isCurrentMonth: true,
                isSelected: date.toDateString() === selectedDate.toDateString()
            });
        }

        // Next month days
        const remainingCells = 42 - days.length; // 6 weeks × 7 days
        for (let i = 1; i <= remainingCells; i++) {
            days.push({
                date: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, i),
                isCurrentMonth: false,
                isSelected: false
            });
        }

        return days;
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const handleToday = () => {
        const today = new Date();
        setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
        onDateChange(today);
    };

    const formatMonthYear = (date) => {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    };

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={handlePrevMonth}
                    className="p-2 hover:bg-gray-100 rounded"
                >
                    ← Previous Month
                </button>

                <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-semibold">
                        {formatMonthYear(currentMonth)}
                    </h3>
                    <button
                        onClick={handleToday}
                        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
                    >
                        Today
                    </button>
                </div>

                <button
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-gray-100 rounded"
                >
                    Next Month →
                </button>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {weekdays.map(day => (
                    <div key={day} className="text-center text-sm font-semibold text-gray-600 p-2">
                        {day}
                    </div>
                ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-1">
                {generateDays().map((day, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            if (day.isCurrentMonth) {
                                onDateChange(day.date);
                            }
                        }}
                        className={`
              h-10 rounded-lg flex items-center justify-center text-sm
              ${day.isCurrentMonth ? 'text-gray-800' : 'text-gray-400'}
              ${day.isSelected ? 'bg-primary text-white' : ''}
              ${!day.isSelected && day.isCurrentMonth ? 'hover:bg-gray-100' : ''}
              ${day.date.toDateString() === new Date().toDateString() && !day.isSelected ? 'border-2 border-primary' : ''}
            `}
                        disabled={!day.isCurrentMonth}
                    >
                        {day.date.getDate()}
                    </button>
                ))}
            </div>

            {/* Direct Date Selection */}
            <div className="mt-4 pt-4 border-t">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select a specific date:
                </label>
                <input
                    type="date"
                    value={selectedDate.toISOString().split('T')[0]}
                    onChange={(e) => onDateChange(new Date(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>
        </div>
    );
}