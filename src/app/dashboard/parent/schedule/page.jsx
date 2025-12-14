import React from 'react'
import CourseTable from '@/components/shared/CourseTable';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

const page = () => {
  return (
    <div>
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/dashboard/parent' },
          { label: 'Schedule' }
        ]}
      />

      <CourseTable />






    </div>
  )
}

export default page