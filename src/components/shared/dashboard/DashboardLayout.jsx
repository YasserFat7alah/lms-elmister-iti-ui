import DashboardHeader from '@/components/DashboardComponents/Header/DashboardHeader';
import Sidebar from '@/components/DashboardComponents/sidebar/Sidebar';
import React from 'react'


const DashboardLayout = ({ children, TopBarComponent }) => {
  return (
    <div>
      <DashboardHeader />

      {TopBarComponent && <TopBarComponent />}


      <div className="relative flex h-screen mb-5 overflow-hidden ">
        <Sidebar />

        <main className="w-full ">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout;