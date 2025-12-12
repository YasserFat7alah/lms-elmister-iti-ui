import { useState, useEffect } from 'react';

export function useClassrooms() {
    const [classrooms, setClassrooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchClassrooms();
    }, []);

    const fetchClassrooms = async () => {
        try {
            // محاكاة بيانات الفصول
            const mockClassrooms = [
                {
                    id: '1',
                    title: 'رياضيات الصف العاشر',
                    subject: 'رياضيات',
                    teacher: 'أحمد محمد',
                    description: 'درس في الجبر والهندسة',
                    status: 'active',
                    scheduleTime: '10:00',
                    duration: 90,
                    maxStudents: 50,
                    currentStudents: 35,
                    activeStudents: 25,
                    accessCode: 'MATH101',
                    isPrivate: false,
                    createdAt: '2024-01-15T08:00:00Z'
                },
                // ... بيانات إضافية
            ];

            setClassrooms(mockClassrooms);
        } catch (error) {
            console.error('Error fetching classrooms:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return { classrooms, isLoading, refetch: fetchClassrooms };
}

export function useClassroom(classId) {
    const [classroom, setClassroom] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchClassroom();
    }, [classId]);

    const fetchClassroom = async () => {
        try {
            // محاكاة بيانات فصل معين
            const mockClassroom = {
                id: classId,
                title: 'رياضيات الصف العاشر',
                subject: 'رياضيات',
                teacher: 'أحمد محمد',
                description: 'درس في الجبر والهندسة',
                status: 'active',
                scheduleTime: '10:00',
                duration: 90,
                participants: [
                    { id: 1, name: 'أحمد محمد', role: 'teacher', isOnline: true },
                    { id: 2, name: 'سارة علي', role: 'student', isOnline: true },
                    // ... إلخ
                ]
            };

            setClassroom(mockClassroom);
        } catch (error) {
            setError('فشل في تحميل بيانات الفصل');
        } finally {
            setIsLoading(false);
        }
    };

    return { classroom, isLoading, error };
}

export function useRecordings() {
    const [recordings, setRecordings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchRecordings();
    }, []);

    const fetchRecordings = async () => {
        try {
            const mockRecordings = [
                {
                    id: '1',
                    title: 'درس الجبر - الفصل الأول',
                    subject: 'رياضيات',
                    teacher: 'أحمد محمد',
                    description: 'شرح مفصل لمعادلات الدرجة الأولى',
                    date: '2024-01-10',
                    duration: 3600, // ثانية
                    size: 1024 * 1024 * 250, // بايت
                    views: 150,
                    videoUrl: '/recordings/math1.mp4',
                    subtitlesUrl: '/recordings/math1.vtt',
                    thumbnail: '/thumbnails/math1.jpg',
                    isMine: true,
                    age: 5 // أيام
                },
                // ... بيانات إضافية
            ];

            setRecordings(mockRecordings);
        } catch (error) {
            console.error('Error fetching recordings:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return { recordings, isLoading, refetch: fetchRecordings };
}