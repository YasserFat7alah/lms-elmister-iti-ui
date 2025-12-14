"use client"
import React from 'react'
import CourseTabs from "@/components/DashboardComponents/admin/courses/CourseTabs";
import HeaderAdmin from '@/components/dashboardComponents/admin/HeaderAdmin';
import { useGetCoursesQuery } from '@/redux/api/endPoints/coursesApiSlice';
import CourseCardStates from '@/components/DashboardComponents/admin/courses/CourseCardStates';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

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
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard/admin' },
            { label: 'Courses' }
          ]}
        />
      </div>
      <CourseCardStates courses={courses} publishedCourses={publishedCourses} draftCourses={draftCourses}
        archivedCourses={archivedCourses} inReviewCourses={inReviewCourses}
      />
      <CourseTabs courses={courses} publishedCourses={publishedCourses} draftCourses={draftCourses}
        archivedCourses={archivedCourses} inReviewCourses={inReviewCourses}
      />
    </div>
  )
}

export default page

