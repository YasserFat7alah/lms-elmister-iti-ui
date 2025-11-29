"use client";
import { useState } from "react";
import Sidebar from "@/components/DashboardComponents/Sidebar/Sidebar";
import LMSNavbar from "@/components/shared/dashboard/LMSNavbar";
import { Header } from "@/components/shared/Header";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-gray-50">
      
      <LMSNavbar setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 overflow-hidden">
        
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth">
          {children}
        </main>
        
      </div>

    </div>
  );
}