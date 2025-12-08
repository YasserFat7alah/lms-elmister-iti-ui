import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DashboardCourseCard = ({ course }) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full">
      
      <div className="relative w-full h-48 overflow-hidden">
        <Image 
          src={course.image} 
          alt={course.title} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm hover:text-red-500 transition-colors">
            <Heart size={18} />
        </button>
      </div>

      <div className="p-5 flex flex-col flex-1">
        
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <User size={16} className="text-gray-400" />
                <span>{course.instructor}</span>
            </div>
            <Badge variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-200 font-normal">
                {course.category}
            </Badge>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 flex-1">
            {course.title}
        </h3>

        <div className="flex items-center gap-2 mb-4">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="font-bold text-gray-900">{course.rating}</span>
            <span className="text-gray-400 text-sm">({course.reviews} Reviews)</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
            <span className="text-xl font-bold text-[#FF0055]">${course.price}</span>
            
            <Link href={`/courses/${course.id}`}>
                <Button className="bg-[#1A1A1A] hover:bg-black text-white rounded-full px-6 h-10 text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Course 
                    <span className="text-lg">›</span>
                </Button>
            </Link>
        </div>

      </div>
    </div>
  );
};

export default DashboardCourseCard;