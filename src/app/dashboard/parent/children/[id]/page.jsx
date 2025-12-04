"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { children } from "@/data/parentData";
import { IoReturnUpBack } from "react-icons/io5";
import { useParams } from "next/navigation";
import React from "react";
import ChildCourseDetails from '@/components/dashboardComponents/parent/mychildComponent/ChildCourseDetails';
import Link from "next/link";

const page = () => {
  const { id } = useParams();

  const child = children.find((c) => c.id === id);

  return (
    <div className='max-w-7xl mx-auto'>
        <div className="my-2">
            <Link href={`/dashboard/parent/children`} 
                className=" text-pink-500 font-semibold pb-2 flex items-center gap-2"
            >   
                <span className="p-1 bg-pink-500 text-white rounded-full"><IoReturnUpBack size={20} /></span>
                <span className="border-b pb-2">Back To My Children</span>
            </Link>

        </div>

        {/* Header Card with Child Info */}
        <div className="flex items-center gap-4 my-6 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <Avatar className="w-20 h-20 ring-4 ring-gray-100">
            <AvatarImage src={child.avatar} />
            <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-[#FF0055] to-[#FF3377] text-white">
                {child.name.charAt(0)}
            </AvatarFallback>
            </Avatar>
            <div>
            <h2 className="text-2xl font-bold text-[#392b80]">{child.name}</h2>
            <p className="text-gray-500 font-medium">{child.grade}</p>
            </div>
        </div>

        {/* Courses Section */}
        <ChildCourseDetails child={child}/>

        
    </div>

  );
};

export default page;
