import React from 'react'
import CourseTabs from "@/components/dashboardComponents/admin/courses/CourseTabs";
import HeaderAdmin from '@/components/dashboardComponents/admin/HeaderAdmin';

const page = () => {
  return (
    <div className="p-6">
      <HeaderAdmin title="Course Management" description=" Manage all platform users and their roles"/>
      <CourseTabs />
  </div>
  )
}

export default page