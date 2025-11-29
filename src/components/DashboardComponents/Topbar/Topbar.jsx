"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaBars } from "react-icons/fa"; // أيقونتك المفضلة
import Dropdown from "./Notification/Dropdown"; 
import AvatarMenu from "./AvatarMenu";

const Topbar = ({ setOpen }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const user = isMounted ? userInfo?.user : null;

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between bg-white px-4 shadow-sm md:px-8 border-b">
      
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setOpen((prev) => !prev)} 
          className="p-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 md:hidden"
        >
          <FaBars className="text-xl" />
        </button>
        
        <button 
          onClick={() => setOpen((prev) => !prev)} 
          className="hidden md:block p-2 text-gray-500 hover:text-primary transition-colors"
        >
          <FaBars className="text-xl" />
        </button>

        <div className="hidden md:block ml-2">
            <h1 className="text-lg font-bold text-gray-800">
                {user ? `Hi, ${user.name.split(' ')[0]}` : "Dashboard"}
            </h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Dropdown />
        <AvatarMenu user={user} />
      </div>
    </header>
  );
};

export default Topbar;