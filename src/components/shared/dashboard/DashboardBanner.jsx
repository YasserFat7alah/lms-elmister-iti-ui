"use client";
import React from 'react';
import { useSelector } from 'react-redux';
import CardUser from './CardUser';

const DashboardBanner = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const user = userInfo?.user || { name: "Guest User", role: "Student" }; // Fallback



  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-white shadow-sm border mb-8">

      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
      <div className="absolute bottom-0 right-20 w-40 h-40 bg-[#ffffff]/20 rounded-full translate-y-1/3 blur-2xl"></div>

      <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">

        <CardUser user={user} fieldKey='role' />

        {/* <div className="flex flex-col sm:flex-row gap-3"> */}
        {/* <Button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold rounded-full px-6">
                Become a Teacher
            </Button>
            <Button className="bg-[#FF0055] hover:bg-pink-700 text-white font-semibold rounded-full px-6 shadow-md shadow-pink-900/20">
                Teacher Dashboard
            </Button> */}
        {/* </div> */}

      </div>
    </div>
  );
};

export default DashboardBanner;