"use client";
import { useState } from "react";
import Sidebar from "@/components/DashboardComponents/Sidebar/Sidebar";
import Topbar from "@/components/DashboardComponents/Topbar/Topbar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="relative flex flex-1 flex-col overflow-hidden">
        
        <Topbar setOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
        
      </div>
    </div>
  );
}