'use client';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MenuIcon, LayoutDashboard  } from 'lucide-react';
import NavItem from '@/components/dashboardComponents/NavItem';


const Sidebar = ({open , setOpen}) => {

  const [collapsed , setCollapsed] = useState(true);
  
  return (
    <>

      {/* SIDEBAR */}
      <aside className={`
        fixed lg:static h-screen z-20 top-0 left-0 bg-white shadow-md p-4 flex flex-col 
        transform transition-all duration-300 ease-in-out
        ${open ? "translate-x-0 w-56" : "-translate-x-full lg:translate-x-0"}
        ${collapsed ? "lg:w-20" : "lg:w-64"}
      `}>

        {/* DESKTOP COLLAPSE BUTTON */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="
            hidden lg:flex absolute top-4 right-[-12px]
            bg-white p-1 rounded-full shadow border
          "
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        {/* MOBILE CLOSE BUTTON */}
        <button
          onClick={() => setOpen(false)}
          className="lg:hidden absolute top-4 right-4 bg-gray-200 p-1 rounded-full shadow hover:bg-gray-300 transition"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        <div className={`flex ${collapsed && 'justify-center'} items-center gap-2 border-gray-300 border-b mb-4 pb-4`}>
          <LayoutDashboard className="w-6 h-6 text-blue-800" />

            <h2 className={` font-bold text-blue-800 ${collapsed && 'lg:hidden'} ${!collapsed && 'inline'}`}>
              Dashboard
            </h2>
        </div>

        {/* PASS collapsed TO NavItem */}
        <NavItem collapsed={collapsed} />

      </aside>

      {/* MOBILE SIDEBAR OVERLAY */}
      {open && (
        <div
        className='fixed inset-0 bg-black/10 lg:hidden z-10'
        onClick={() => setOpen(false)}></div>
      )}
    </>
  )
}

export default Sidebar