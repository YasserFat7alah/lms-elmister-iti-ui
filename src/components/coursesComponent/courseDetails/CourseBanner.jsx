import Image from 'next/image'
import React from 'react'
import { IoBookSharp } from "react-icons/io5";
import { PiStudentDuotone } from "react-icons/pi";



const CourseBanner = ({imgsrc , course , teacher}) => {

    const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  return (
    <div className="relative w-full h-[350px] ">
        {/* Background Image */}
        <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${imgsrc})` }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div> 

        {/* Text */}
        <div className="absolute inset-0 flex flex-col items-start justify-center gap-y-2 px-8 mx-40">

            <h1 className="text-white text-3xl font-bold text-start">{course.title}</h1>
            
            <p className='text-white'>{course.description}</p>

            <div className='flex items-center gap-10'>
                <p className='flex items-center gap-1'>
                    <span className='text-yellow-400'> <IoBookSharp/> </span>
                   <span className='text-yellow-400'>{course.totalLessons}</span> 
                </p>
                <p className='flex items-center gap-1'>
                    <span className='text-blue-800'> < PiStudentDuotone/> </span>
                    <span className='text-blue-800'>{course.totalStudents}</span>
                </p>
            </div>

            <div className='mt-4'>
                <div className='flex items-center gap-3'>
                    <img src={teacher?.avatar || DEFAULT_AVATAR}
                    
                    
                    
                    height={100} width={100} alt="" className='w-16 h-16 rounded-full' />
                    <div className='flex flex-col'>
                        <span className='font-semibold'>{teacher?.name}</span>
                        <span className='text-gray-800'>teacher</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CourseBanner