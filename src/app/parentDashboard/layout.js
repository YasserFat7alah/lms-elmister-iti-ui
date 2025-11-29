import TopBar from '@/components/dashboardComponents/Header/TopBar'
import DashboardLayout from '@/components/shared/dashboard/DashboardLayout'
import React from 'react'

const layout = ({children}) => {
  return (
    <DashboardLayout TopBarComponent={TopBar}>
        {children}
    </DashboardLayout>
  )
}

export default layout