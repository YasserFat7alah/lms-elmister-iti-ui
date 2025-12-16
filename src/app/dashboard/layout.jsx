"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import Sidebar from "@/components/DashboardComponents/sidebar/Sidebar";
import LMSNavbar from "@/components/shared/dashboard/LMSNavbar";
import { FullPageLoader } from "@/components/shared/Loader";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { userInfo } = useSelector((state) => state.auth);

  // Initialize isMounted to true directly, as it's only used to prevent server-side rendering issues
  // and should be true as soon as the component mounts on the client.
  // No need for a separate useEffect to set it.
  // const [isMounted, setIsMounted] = useState(false); // Old state
  // useEffect(() => { setIsMounted(true); }, []); // Old effect

  useEffect(() => {
    if (userInfo?.user) {
      const user = userInfo.user;
      const isTeacherRoute = pathname?.startsWith("/dashboard/teacher");
      const isCompleteProfileRoute = pathname === "/completeProfile";
      
    //   if (isTeacherRoute && !isCompleteProfileRoute && user.role === "teacher") {
    //     if (!isTeacherProfileComplete(user)) {
    //       router.replace("/completeProfile");
    //     }
    //   }
    }
  }, [isMounted, userInfo, pathname, router]);

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
