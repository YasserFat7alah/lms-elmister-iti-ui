'use client'
import React, { useState } from 'react'
import Sidebar from '../component/Dashboard/Sidebar'
import Topbar from '../component/Dashboard/Topbar'

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-muted/10">
      
      <Sidebar 
        open={sidebarOpen} 
        setOpen={setSidebarOpen} 
      />

      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        
        <Topbar 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen} 
        />

        <main className="w-full flex-grow p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}