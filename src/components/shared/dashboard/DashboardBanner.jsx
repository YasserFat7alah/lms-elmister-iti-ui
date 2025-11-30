"use client";
import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Edit2, CheckCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const DashboardBanner = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const user = userInfo?.user || { name: "Guest User", role: "Student" }; // Fallback

  

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-r from-[#195EC2] via-[#2176E3] to-[#0A264F] shadow-lg mb-8">
      
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
      <div className="absolute bottom-0 right-20 w-40 h-40 bg-[#FF0055]/20 rounded-full translate-y-1/3 blur-2xl"></div>

      <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-white/20 shadow-xl">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-2xl font-bold bg-[#FF0055] text-white">
                        {user.name.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-1 right-1 bg-[#10D876] text-white p-1 rounded-full border-2 border-[#195EC2]">
                    <CheckCircle size={14} fill="white" className="text-[#10D876]" />
                </div>
            </div>

            <div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                    <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                    <Edit2 size={16} className="text-blue-200 cursor-pointer hover:text-white" />
                </div>
                <p className="text-blue-100 mt-1 capitalize">{user.role}</p>
            </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
            {/* <Button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold rounded-full px-6">
                Become an Instructor
            </Button>
            <Button className="bg-[#FF0055] hover:bg-pink-700 text-white font-semibold rounded-full px-6 shadow-md shadow-pink-900/20">
                Instructor Dashboard
            </Button> */}
        </div>

      </div>
    </div>
  );
};

export default DashboardBanner;