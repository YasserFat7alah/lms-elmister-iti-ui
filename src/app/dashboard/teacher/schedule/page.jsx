import React from 'react'
import CourseTable from '@/components/shared/CourseTable';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

const page = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 p-6 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/dashboard/teacher' },
          { label: 'Student Schedule' }
        ]}
      />
      <CourseTable />
    </div>
  )
}

export default page