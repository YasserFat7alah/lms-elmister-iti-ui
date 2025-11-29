import DashboardHeader from '@/components/dashboardComponents/Header/DashboardHeader';
import Sidebar from '@/components/dashboardComponents/Sidebar';
import React from 'react'


const DashboardLayout = ({children , TopBarComponent}) => {
  return (
    <div>
        {/* MAIN BANNER */}
        <DashboardHeader/>

        {/* TOPBAR CONATAIN INFO AND MORE OPTIONS */}
        {TopBarComponent && <TopBarComponent/>}


        {/* MAIN LAYOUT */}
        <div className="relative flex h-screen mb-5 overflow-hidden ">
            <Sidebar/>

            <main className="w-full ">
                {children}
            </main>
        </div>
    </div>
  )
}

export default DashboardLayout;