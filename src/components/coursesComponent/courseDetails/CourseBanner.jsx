import Image from 'next/image'
import React from 'react'
import { IoBookSharp } from "react-icons/io5";
import { PiStudentDuotone } from "react-icons/pi";



const CourseBanner = ({imgsrc , course , teacher}) => {
  return (
    <div className="relative w-full h-64 ">
        {/* Background Image */}
        <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${imgsrc})` }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div> 

        {/* Text */}
        <div className="absolute inset-0 flex flex-col items-start justify-center gap-y-2 px-18">

            <h1 className="text-white text-3xl font-bold text-start">{course.title}</h1>
            
            <p className='text-white'>{course.description}</p>

            <div className='flex items-center gap-10'>
                <p className='flex items-center gap-1'>
                    <span> <IoBookSharp/> </span>
                   <span>{course.totalLessons}</span> 
                </p>
                <p className='flex items-center gap-1'>
                    <span> < PiStudentDuotone/> </span>
                    <span>{course.totalStudents}</span>
                </p>
            </div>

            <div className='mt-4'>
                <div className='flex items-center gap-2'>
                    <Image src={teacher.avatar} height={100} width={100} alt="" className='w-16 h-16 rounded-full' />
                    <div>
                        <span>{teacher.name}</span>
                        <span>Instructor</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CourseBanner