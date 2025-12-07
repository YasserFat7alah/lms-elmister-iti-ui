import React from 'react'
import CourseTabs from "@/components/dashboardComponents/admin/courses/CourseTabs";

const page = () => {
  return (
    <div className="p-6">
      <div className="">
        <h1 className="text-2xl font-bold text-[#FF0055]">
          Course Management
        </h1>
        <p className="text-[#392b80] text-sm mt-1">
          Manage all platform users and their roles
        </p>
      </div>
      <CourseTabs />
  </div>
  )
}

export default page