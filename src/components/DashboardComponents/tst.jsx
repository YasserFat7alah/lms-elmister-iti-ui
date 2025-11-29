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



"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Book, User } from "lucide-react";

const NavItem = ({collapsed}) => {
  const pathname = usePathname();

  const mainLinks = [
    { name: "Home", path: "/dashboard", icon: <House/> },
    { name: "Courses", path: "/courses", icon: <Book/> },
    { name: "Students", path: "/students", icon: <User/> },
  ];

  return (
    <nav className="flex flex-col gap-2">

      {mainLinks.map((link) => {
        return (
          <Link
            href={link.path}
            key={link.name}
            className={`flex items-center ${collapsed && 'justify-center'} gap-3 p-2 rounded-md transition-colors
              ${pathname === link.path ?  "bg-blue-100 text-blue-700 font-semibold"
                : "text-gray-600 hover:text-blue-800 hover:bg-gray-100"}
            `}
          >
            <div className={`w-5 h-5`}>{link.icon}</div>
            <span className={`${collapsed && 'lg:hidden'} ${!collapsed && 'inline'}`}>
              {link.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default NavItem;