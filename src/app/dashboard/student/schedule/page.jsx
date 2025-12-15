import React from 'react'
import CourseTable from '@/components/shared/CourseTable';

import Breadcrumbs from "@/components/shared/Breadcrumbs";

const page = () => {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard/student" },
    { label: "Schedule" }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <Breadcrumbs items={breadcrumbItems} className="w-fit" />
      <CourseTable />
    </div>
  )
}

export default page