'use client';
import React, { useState } from 'react';
import NavItem from '@/components/dashboardComponents/NavItem';
import { FaBars,FaTimes, FaCog, FaSignOutAlt } from "react-icons/fa";


const Sidebar = () => {

  const [open, setOpen] = useState(false);


  return (
    <>
      {/* MOBIL SIDEBAR BUTTON*/}
      <button
        className="md:hidden p-3 text-xl fixed top-1/2 bg-gray-200 rounded-r-lg cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <FaBars />
      </button>

      {/* Overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-lg md:shadow-none md:border md:border-gray-200 md:rounded-md py-3 px-2 z-40 w-64
        transform transition-transform duration-300 md:mx-12 md:w-80
        ${open ? "translate-x-0 overflow-scroll pb-10" : "-translate-x-full"}
        md:translate-x-0 md:static`}
      >
        {/* Close Button mobile only */}
        <div className="flex items-center justify-end pt-4 pr-4  md:hidden">
          <FaTimes className="text-xl" onClick={() => setOpen(false)} />
        </div>

        {/* MAIN CONTENT */}
        <div className="pb-4 pl-5">

          <h3 className="font-semibold text-gray-700 mb-4">Main Menu</h3>

          <NavItem/>

          <hr className="my-4 mr-5" />

          {/*  ACCOUNT SETTING  */}
          <h3 className="font-semibold text-gray-700 mb-4">
            Account Settings
          </h3>

          <ul className="space-y-3">
            <li className="flex items-center gap-3 hover:text-red-500 cursor-pointer">
              <FaCog />
              <span>Settings</span>
            </li>
            <li className="flex items-center gap-3 hover:text-red-500 cursor-pointer">
              <FaSignOutAlt />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}

export default Sidebar