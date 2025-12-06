'use client';

import { useState } from 'react';
import ClassCard from '@/components/schedule/ClassCard';
import FilterBar from '@/components/schedule/FilterBar';
import { useUpcomingClasses } from '@/hooks/useClasses';

export default function UpcomingPage() {
    const [filter, setFilter] = useState('all');
    const { classes, isLoading } = useUpcomingClasses();

    const filteredClasses = classes.filter(cls => {
        if (filter === 'all') return true;
        if (filter === 'today') {
            const today = new Date().toISOString().split('T')[0];
            return cls.date === today;
        }
        return cls.status === filter;
    });

    const handleStartClass = (classId) => {
        // Start class - can be connected to API call
        console.log('Starting class:', classId);
    };

    if (isLoading) {
        return (
            <div className="container mx-auto p-4">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-primary">Upcoming Classes</h1>

            <FilterBar currentFilter={filter} onFilterChange={setFilter} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {filteredClasses.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500 text-lg">No upcoming classes</p>
                    </div>
                ) : (
                    filteredClasses.map(cls => (
                        <ClassCard
                            key={cls.id}
                            classData={cls}
                            onStartClass={handleStartClass}
                        />
                    ))
                )}
            </div>
        </div>
    );
}