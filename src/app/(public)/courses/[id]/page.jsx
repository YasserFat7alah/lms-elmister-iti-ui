"use client";

import AboutInstractor from '@/components/coursesComponent/courseDetails/AboutInstractor';
import CommentForm from '@/components/coursesComponent/courseDetails/CommentForm';
import CommentsList from '@/components/coursesComponent/courseDetails/CommentsList';
import CourseContent from '@/components/coursesComponent/courseDetails/CourseContent';
import CourseFeature from '@/components/coursesComponent/courseDetails/CourseFeature';
import CourseGroup from '@/components/coursesComponent/courseDetails/CourseGroup';
import DetailsSidebar from '@/components/coursesComponent/courseDetails/DetailsSidebar';
import OverView from '@/components/coursesComponent/courseDetails/OverView';
import PriceAndBtnsCourse from '@/components/coursesComponent/courseDetails/PriceAndBtnsCourse';
import { mockCourses } from '@/data/mockCourses';
import { mockTeachers } from '@/data/mockTeacher';
import { useParams } from 'next/navigation';



export default function Page() {
    const { id } = useParams();

    const course = mockCourses.find(c => c.id.toString() === id);
    const teacher = mockTeachers.find(t => t.id === course?.teacherId);



    if (!course) return <div>Course not found.</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 md:gap-0 overflow-x-hidden md:mr-5">
            {/* LEFT SIDE */}

            <div className="pb-1 md:pb-0">
                <div className='md:hidden'>
                    <PriceAndBtnsCourse course={course}/>
                </div>
                <OverView course={course} />
                <CourseGroup groups={course.groups} />

                <div className='md:hidden'>
                    <CourseFeature course={course}/>
                </div>

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
