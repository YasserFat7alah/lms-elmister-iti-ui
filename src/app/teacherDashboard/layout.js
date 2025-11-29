import TopBar from '@/components/dashboardComponents/Header/TopBar'
import DashboardLayout from '@/components/shared/dashboard/DashboardLayout'
import React from 'react'
import TeacherTopbar from './teacherComponents/TeacherTopbar'

const layout = ({children}) => {
  return (
    <DashboardLayout TopBarComponent={TeacherTopbar}>
        {children}
    </DashboardLayout>
  )
}

export default layout