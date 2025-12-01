// 'use client'
// import Sidebar from '@/components/DashboardComponents/sidebar/Sidebar.jsx'
// // import Header from '@/components/Layout/Header'
// // import Footer from '@/components/Layout/Footer'

// export default function TeachersLayout({ children }) {
//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />
      
//       <div className="flex-1 flex flex-col ml-0 lg:ml-64">
//         {/* <Header /> */}
        
//         <main className="flex-1 p-4 lg:p-6">
//           <div className="max-w-7xl mx-auto">
//             {children}
//           </div>
//         </main>
        
//         {/* <Footer /> */}
//       </div>
//     </div>
//   )
// }
"use client";
import { useState } from "react";
import Sidebar from "@/components/DashboardComponents/teacher/Sidbar";
import LMSNavbar from "@/components/shared/dashboard/LMSNavbar";
import { Header } from "@/components/shared/Header";
import PageBreadcrumb from "@/components/shared/dashboard/PageBreadcrumb";

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