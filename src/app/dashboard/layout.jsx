"use client";
import { useState } from "react";
import Sidebar from "@/components/DashboardComponents/Sidebar/Sidebar";
import LMSNavbar from "@/components/shared/dashboard/LMSNavbar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50"> 
      
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex flex-1 flex-col overflow-hidden">
        
        <LMSNavbar setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 md:px-6 md:py-3 scroll-smooth">
          {children} 

        </main>
        
      </div>

    </div>
  );
}