import { Progress } from '@/components/ui/progress'
import { mockCourses } from '@/data/mockCourses'
import { mockTeachers } from '@/data/mockTeacher'
import React from 'react'
import { FaBookOpen } from 'react-icons/fa'

const EnrollCourses = ({child}) => {
  return (
    <div className='border border-t-0 rounded-b-2xl p-6'>
        <h4 className='font-semibold flex  items-center gap-3'>
            <span className='text-pink-600'><FaBookOpen/></span>
            <span className='text-gray-800 '>Enrolled Courses</span>
        </h4>
        <div className='grid md:grid-cols-2 gap-4 mt-3'>
            {child.enrolledCourses.map(enrolled=>{
                const course = mockCourses.find(c => c.id === enrolled.courseId);
                const teacher = mockTeachers.find(t => t.id === course.teacherId);

                return(
                    <div className='border rounded-lg p-4'>
                        <div className={`flex items-center justify-between`}>
                            <p>{enrolled.title}</p>
                            <p  className={` font-semibold
                                    ${enrolled.progress < 30
                                    ? "text-red-500"
                                    : enrolled.progress < 70
                                    ? "text-yellow-500"
                                    : "text-green-500"}
                                `}
                                >
                                {enrolled.progress}%
                                </p>
                        </div>
                        <p className='text-gray-500 font-semibold'>{teacher.name}</p>
                        <Progress 
                            value={enrolled.progress}
                            className={
                                enrolled.progress < 30
                                ? "[&>[data-slot=progress-indicator]]:bg-red-500"
                                : enrolled.progress < 70
                                ? "[&>[data-slot=progress-indicator]]:bg-yellow-500"
                                : "[&>[data-slot=progress-indicator]]:bg-green-500"
                            }
                            />
                    </div>

                )
            })}
        </div>
    </div>
  )
}

export default EnrollCourses