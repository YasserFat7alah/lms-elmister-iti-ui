"use client";

import AboutInstractor from '@/components/coursesComponent/courseDetails/AboutInstractor';
import CommentForm from '@/components/coursesComponent/courseDetails/CommentForm';
import CommentsList from '@/components/coursesComponent/courseDetails/CommentsList';
import CourseContent from '@/components/coursesComponent/courseDetails/CourseContent';
import DetailsSidebar from '@/components/coursesComponent/courseDetails/DetailsSidebar';
import OverView from '@/components/coursesComponent/courseDetails/OverView';
import { mockCourses } from '@/data/mockCourses';
import { mockTeachers } from '@/data/mockTeacher';
import { useParams } from 'next/navigation';



export default function Page() {
    const { id } = useParams();

    const course = mockCourses.find(c => c.id.toString() === id);
    const teacher = mockTeachers.find(t => t.id === course?.teacherId);



    if (!course) return <div>Course not found.</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 md:gap-0 overflow-x-hidden">
            {/* LEFT SIDE */}
            <div className="pb-1 md:pb-0">
                <OverView course={course} />
                <CourseContent sections={course.sections} />
                <AboutInstractor course={course} teacher={teacher} />
                <CommentForm />
                <div className='md:hidden'>
                    <CommentsList  />
                </div>

            </div>
            
            {/* MOBILE SIDEBAR  */}
            <div>
                <DetailsSidebar course={course} />
            </div>
        </div>
    );
}
