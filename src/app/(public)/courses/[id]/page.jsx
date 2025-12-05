"use client";

import { useParams } from 'next/navigation';
import AboutInstractor from '@/components/coursesComponent/courseDetails/AboutInstractor';
import CommentForm from '@/components/coursesComponent/courseDetails/CommentForm';
import CommentsList from '@/components/coursesComponent/courseDetails/CommentsList';
import CourseFeature from '@/components/coursesComponent/courseDetails/CourseFeature';
import CourseGroup from '@/components/coursesComponent/courseDetails/CourseGroup';
import DetailsSidebar from '@/components/coursesComponent/courseDetails/DetailsSidebar';
import OverView from '@/components/coursesComponent/courseDetails/OverView';
import PriceAndBtnsCourse from '@/components/coursesComponent/courseDetails/PriceAndBtnsCourse';
import { useGetCourseByIdQuery } from '@/redux/api/endPoints/coursesApiSlice';

export default function Page() {
    const { id } = useParams();

    // 1. جلب البيانات من الـ API
    const { data: courseData, isLoading, isError, error } = useGetCourseByIdQuery(id);

    // 2. استخراج الكورس من الـ ResponseWrapper
    const course = courseData?.data;

    // 3. استخراج المدرس (موجود جاهز جوه الكورس)
    const teacher = course?.teacherId; 


    // handling loading & error states
    if (isLoading) return <div className="p-10 text-center">Loading Course Details...</div>;
    
    if (isError || !course) {
        return <div className="p-10 text-center text-red-600">
            Course not found or Server Error. 
            <br/> <small>{error?.data?.message}</small>
        </div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 md:gap-0 overflow-x-hidden md:mr-5">
            {/* LEFT SIDE */}

            <div className="pb-1 md:pb-0">
                <div className='md:hidden'>
                    <PriceAndBtnsCourse course={course}/>
                </div>
                
                <OverView course={course} />
                
                <CourseGroup groups={course.groups || []} />

                <div className='md:hidden'>
                    <CourseFeature course={course}/>
                </div>

                {/* بنبعت المدرس اللي استخرجناه من الكورس مباشرة */}
                <AboutInstractor course={course} teacher={teacher} />

                <CommentForm />

                <div className='md:hidden'>
                    <CommentsList  />
                </div>

            </div>
            
            {/* MOBILE SIDEBAR  */}
            <div>
                {/* السايدبار غالباً بيحتاج الكورس والمدرس */}
                <DetailsSidebar course={course} teacher={teacher} />
            </div>
        </div>
    );
}