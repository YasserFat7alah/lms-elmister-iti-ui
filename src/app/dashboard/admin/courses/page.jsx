"use client"
import React from 'react'
import CourseTabs from "@/components/DashboardComponents/admin/courses/CourseTabs";
import HeaderAdmin from '@/components/dashboardComponents/admin/HeaderAdmin';
import { useGetCoursesQuery } from '@/redux/api/endPoints/coursesApiSlice';
import CourseCardStates from '@/components/DashboardComponents/admin/courses/CourseCardStates';

const page = () => {

  const { data } = useGetCoursesQuery();
  
  //  Access the data from API response
  const courses = data?.data || data || [];
  
  // Filter courses by status
  const publishedCourses = courses.filter((c) => c.status === "published");
  const archivedCourses = courses.filter((c) => c.status === "archived");
  const inReviewCourses = courses.filter((c) => c.status === "in-review");
  const draftCourses = courses.filter((c) => c.status === "draft");

  return (
    <div className="px-6">
      <HeaderAdmin title="Course Management" description=" Manage all platform users and their roles"/>
      <CourseCardStates courses={courses} publishedCourses={publishedCourses} draftCourses={draftCourses}
                        archivedCourses={archivedCourses} inReviewCourses={inReviewCourses}
       />
      <CourseTabs  courses={courses} publishedCourses={publishedCourses} draftCourses={draftCourses}
                        archivedCourses={archivedCourses} inReviewCourses={inReviewCourses}
      />
  </div>
  )
}

export default page

