import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PlayCircle, CheckCircle, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"; 
import { Badge } from "@/components/ui/badge";

const EnrolledCourseCard = ({ course }) => {
  const isCompleted = course.progress === 100;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full">
      
      <div className="relative w-full h-44 overflow-hidden">
        <Image 
          src={course.image} 
          alt={course.title} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
            <Badge className="bg-white/90 text-gray-800 hover:bg-white font-medium backdrop-blur-sm">
                {course.category}
            </Badge>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        
        <p className="text-xs text-gray-500 mb-2 font-medium">
            Instructor: <span className="text-gray-900">{course.instructor}</span>
        </p>

        <h3 className="text-base font-bold text-gray-900 mb-4 line-clamp-2 flex-1 group-hover:text-[#FF0055] transition-colors">
            {course.title}
        </h3>

        <div className="mt-auto space-y-3">
            <div className="flex justify-between items-end text-xs mb-1">
                <span className="text-gray-500">
                    {course.completedLessons} / {course.totalLessons} Lessons
                </span>
                <span className="font-bold text-[#FF0055]">{course.progress}%</span>
            </div>
            
            <Progress value={course.progress} className="h-2 bg-gray-100" indicatorColor="bg-[#FF0055]" />

            {/* Action Button */}
            <div className="pt-2">
                {isCompleted ? (
                    <Button className="w-full bg-[#10D876] hover:bg-green-600 text-white rounded-full h-10 font-bold gap-2">
                        <CheckCircle size={18} /> Completed
                    </Button>
                ) : (
                    <Link href={`/dashboard/student/courses/${course.id}/play`}>
                        <Button className="w-full bg-[#FF0055] hover:bg-pink-700 text-white rounded-full h-10 font-bold gap-2 shadow-md shadow-pink-100">
                            <PlayCircle size={18} /> Continue Learning
                        </Button>
                    </Link>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default EnrolledCourseCard;