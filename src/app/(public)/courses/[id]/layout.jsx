"use client"
import React from 'react';
import { useParams } from 'next/navigation';

import CourseBanner from '@/components/coursesComponent/courseDetails/CourseBanner';
import { useGetCourseByIdQuery } from '@/redux/api/endPoints/coursesApiSlice';
import { mockTeachers } from '@/data/mockTeacher';

const Layout = ({ children }) => {
    
    const { id } = useParams();

    const { data: courseData, isLoading, isError } = useGetCourseByIdQuery(id);

    const course = courseData?.data;
    const teacherId = course?.teacherId; // المدرس موجود جوه الكورس في الـ API بتاعنا

    const teacher = mockTeachers.find(t => t.id === teacherId);

    if (isLoading) {
        return <div className="h-screen flex items-center justify-center">Loading Course...</div>;
    }

    if (isError || !course) {
        return <div className="text-center py-20 text-red-500">Course not found.</div>;
    }

    return (
        <div>
            <CourseBanner 
                imgsrc={course.thumbnail?.url} 
                course={course} 
                teacher={teacher} 
            />
            
            <div className="max-w-6xl mx-auto px-4 md:px-0 mt-6">
                {children}
            </div>
        </div>
    )
}

export default Layout;