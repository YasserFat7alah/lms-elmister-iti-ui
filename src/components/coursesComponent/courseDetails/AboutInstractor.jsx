import { mockCourses } from '@/data/mockCourses';
import { FaGooglePlay } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import Image from 'next/image'
import React from 'react'

const AboutInstractor = ({course , teacher}) => {

    const coursesCount = mockCourses.filter(c => c.teacherId === teacher.id).length;

    const totalLessons = mockCourses
        .filter(c => c.teacherId === teacher.id) 
        .reduce((sum, course) => {
            const lessonsInCourse = course.sections.reduce((secSum, section) => secSum + section.lessons.length, 0);
            return sum + lessonsInCourse;
    }, 0)

  return (
    <div className='p-4 border rounded-md my-5 mx-4'>
        <h3 className='font-bold text-gray-900'>About the teacher</h3>
        {/* MAIN INFO */}
        <div>
            <div className='flex gap-2 items-center'>
                <Image src={teacher.avatar} width={100} height={100} alt={teacher.name}
                    className='w-20 h-20 rounded-full'
                />
                <div>
                    <p className='text-gray-800 font-bold'>{teacher.name}</p>
                    <p className='text-gray-500'>{teacher.specialization}</p>
                </div>
            </div>
        </div>
        {/* EXPERIENCES */}
        <div className=' gap-10 '>
            <div className='flex gap-10 items-center border-t border-b py-4 px-2'>
                <div className='flex items-center gap-2 font-semibold'>
                    <p className='text-pink-500'> <FaGooglePlay/> </p>
                    <p className='text-gray-800'>{coursesCount > 1 ? `${coursesCount} Courses` : `${coursesCount} Course`}</p>
                </div>

                <div className='flex items-center gap-2 font-semibold'>
                    <p className='text-yellow-400'><FaBookOpen /></p>
                    <p className='text-gray-800'>{totalLessons}+ Lesson</p>
                </div>
            </div>

            <p className='my-3 text-gray-500'>{teacher.degree} - {teacher.subjects.join(", ")}</p>

            <div>
                <h3 className='font-semibold text-gray-900'>Available for :</h3>
                <p className='text-gray-500'>{teacher.availability.join(" / ")}</p>
            </div>
        </div>
    </div>
  )
}

export default AboutInstractor