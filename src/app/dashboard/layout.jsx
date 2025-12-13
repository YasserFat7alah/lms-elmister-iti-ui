"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "@/components/DashboardComponents/Sidebar/Sidebar";
import LMSNavbar from "@/components/shared/dashboard/LMSNavbar";
import { FullPageLoader } from "@/components/shared/Loader";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !userInfo) {
    return <FullPageLoader message="Initializing Dashboard..." />;
  }

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