import TopBar from '@/components/dashboardComponents/Header/TopBar'
import DashboardLayout from '@/components/shared/dashboard/DashboardLayout'
import React from 'react'
import StudentTopbar from './studentComponent/StudentTopbar'

const layout = ({children}) => {
  return (
    <DashboardLayout TopBarComponent={StudentTopbar}>
        {children}
    </DashboardLayout>
  )
}

export default layout