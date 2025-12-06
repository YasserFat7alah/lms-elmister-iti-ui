'use client';

import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import arLocale from '@fullcalendar/core/locales/ar';
import { useClasses } from '@/hooks/useClasses';

export default function CalendarPage() {
    const { classes, isLoading } = useClasses();
    const [currentView, setCurrentView] = useState('dayGridMonth');

    // Convert data to match FullCalendar format
    const calendarEvents = classes.map(cls => ({
        id: cls.id,
        title: `${cls.subject} - ${cls.grade}`,
        start: new Date(cls.date + 'T' + cls.startTime),
        end: new Date(cls.date + 'T' + cls.endTime),
        backgroundColor: getSubjectColor(cls.subject),
        borderColor: getSubjectColor(cls.subject),
        extendedProps: {
            teacher: cls.teacher,
            students: cls.studentsCount,
            status: cls.status
        }
    }));

    function getSubjectColor(subject) {
        const colors = {
            'Mathematics': '#3B82F6',
            'Science': '#10B981',
            'Arabic Language': '#8B5CF6',
            'English Language': '#EF4444',
            'History': '#F59E0B',
            'Geography': '#06B6D4'
        };
        return colors[subject] || '#6B7280';
    }

    const handleEventClick = (info) => {
        alert(`Class Details:
Subject: ${info.event.title}
Teacher: ${info.event.extendedProps.teacher}
Students: ${info.event.extendedProps.students}
Status: ${info.event.extendedProps.status}`);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-primary">Calendar</h1>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setCurrentView('dayGridMonth')}
                        className={`px-4 py-2 rounded ${currentView === 'dayGridMonth' ? 'bg-primary text-white' : 'bg-gray-200'}`}
                    >
                        Month
                    </button>
                    <button
                        onClick={() => setCurrentView('timeGridWeek')}
                        className={`px-4 py-2 rounded ${currentView === 'timeGridWeek' ? 'bg-primary text-white' : 'bg-gray-200'}`}
                    >
                        Week
                    </button>
                    <button
                        onClick={() => setCurrentView('timeGridDay')}
                        className={`px-4 py-2 rounded ${currentView === 'timeGridDay' ? 'bg-primary text-white' : 'bg-gray-200'}`}
                    >
                        Day
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView={currentView}
                    events={calendarEvents}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    eventClick={handleEventClick}
                    height="70vh"
                />
            </div>
        </div>
    );
}