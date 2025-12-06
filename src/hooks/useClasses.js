import { useState, useEffect } from 'react';

export function useClasses() {
    const [classes, setClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            // Mock class data
            const mockClasses = [
                {
                    id: 1,
                    subject: 'Mathematics',
                    grade: '10th Grade',
                    date: '2024-01-15',
                    startTime: '08:00',
                    endTime: '09:30',
                    teacher: 'Ahmed Mohamed',
                    studentsCount: 25,
                    status: 'completed'
                },
                // ... more data
            ];

            setClasses(mockClasses);
        } catch (error) {
            console.error('Error fetching classes:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return { classes, isLoading, refetch: fetchClasses };
}

export function useUpcomingClasses() {
    const { classes, isLoading } = useClasses();
    const upcoming = classes.filter(cls =>
        new Date(cls.date + 'T' + cls.startTime) > new Date()
    );

    return { classes: upcoming, isLoading };
}