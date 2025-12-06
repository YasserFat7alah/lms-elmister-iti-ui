'use client';

import { useState } from 'react';

export default function ClassForm({ onSubmit, isSubmitting }) {
    const [formData, setFormData] = useState({
        subject: '',
        grade: '',
        date: new Date().toISOString().split('T')[0],
        startTime: '08:00',
        endTime: '09:30',
        teacher: '',
        maxStudents: 30,
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const subjects = [
        'Mathematics', 'Science', 'Arabic Language', 'English Language',
        'History', 'Geography', 'Physics', 'Chemistry'
    ];

    const grades = [
        'Grade 7', 'Grade 8', 'Grade 9',
        'Grade 10', 'Grade 11', 'Grade 12'
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Subject */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                    </label>
                    <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    >
                        <option value="">Select Subject</option>
                        {subjects.map(subject => (
                            <option key={subject} value={subject}>{subject}</option>
                        ))}
                    </select>
                </div>

                {/* Grade */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Grade *
                    </label>
                    <select
                        name="grade"
                        value={formData.grade}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    >
                        <option value="">Select Grade</option>
                        {grades.map(grade => (
                            <option key={grade} value={grade}>{grade}</option>
                        ))}
                    </select>
                </div>

                {/* Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date *
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    />
                </div>

                {/* Start Time */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Time *
                    </label>
                    <input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    />
                </div>

                {/* End Time */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Time *
                    </label>
                    <input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    />
                </div>

                {/* Teacher */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teacher *
                    </label>
                    <input
                        type="text"
                        name="teacher"
                        value={formData.teacher}
                        onChange={handleChange}
                        placeholder="Teacher Name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    />
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class Description (Optional)
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Any additional notes about the class..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            {/* Max Students */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Students
                </label>
                <input
                    type="number"
                    name="maxStudents"
                    value={formData.maxStudents}
                    onChange={handleChange}
                    min="1"
                    max="50"
                    className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50"
                >
                    {isSubmitting ? 'Scheduling...' : 'Schedule Class'}
                </button>
            </div>
        </form>
    );
}