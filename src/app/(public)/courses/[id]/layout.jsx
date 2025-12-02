"use client"
import CourseBanner from '@/components/coursesComponent/courseDetails/CourseBanner';
import { mockCourses } from '@/data/mockCourses';
import { mockTeachers } from '@/data/mockTeacher';
import { useParams } from 'next/navigation';
import React from 'react'

const layout = ({children}) => {

    const {id} = useParams();

    const course = mockCourses.find( c => c.id.toString() === id);
    const teacher = mockTeachers.find(t => t.id === course.teacherId);

    if(!course) return <div>Course not found .</div>

    
  return (
    <div>
        <CourseBanner imgSrc={course.thumbnail.url} course={course} teacher={teacher} />
        <div  className="max-w-6xl mx-auto px-4 md:px-0 mt-6">
            {children}
        </div>
    </div>
  )
}

export default layout