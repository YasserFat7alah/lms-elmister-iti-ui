"use client";
import { Progress } from '@/components/ui/progress'
import React from 'react'
import { FaBookOpen } from 'react-icons/fa'
import { useGetMyEnrollmentsQuery } from '@/redux/api/endPoints/enrollmentApiSlice';

const EnrollCourses = ({child}) => {
  const { data: enrollmentsData, isLoading } = useGetMyEnrollmentsQuery();
  
  // Filter enrollments for this specific child
  const childEnrollments = enrollmentsData?.enrollments?.filter(
    (enrollment) => enrollment.student?._id === child?._id || enrollment.student === child?._id
  ) || [];

  if (isLoading) {
    return (
      <div className='border border-t-0 rounded-b-2xl p-6'>
        <h4 className='font-semibold flex items-center gap-3'>
          <span className='text-pink-600'><FaBookOpen/></span>
          <span className='text-gray-800'>Enrolled Courses</span>
        </h4>
        <p className="text-gray-500 mt-3">Loading enrollments...</p>
      </div>
    );
  }

  if (childEnrollments.length === 0) {
    return (
      <div className='border border-t-0 rounded-b-2xl p-6'>
        <h4 className='font-semibold flex items-center gap-3'>
          <span className='text-pink-600'><FaBookOpen/></span>
          <span className='text-gray-800'>Enrolled Courses</span>
        </h4>
        <div className='mt-3 text-center py-8'>
          <p className="text-gray-500">No enrolled courses yet</p>
          <p className="text-gray-400 text-sm mt-1">This child hasn't enrolled in any courses.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='border border-t-0 rounded-b-2xl p-6'>
        <h4 className='font-semibold flex items-center gap-3'>
            <span className='text-pink-600'><FaBookOpen/></span>
            <span className='text-gray-800'>Enrolled Courses</span>
        </h4>
        <div className='grid md:grid-cols-2 gap-4 mt-3'>
            {childEnrollments.map((enrollment, idx) => {
                const course = enrollment.course || enrollment.group?.course;
                const group = enrollment.group;
                
                // Get teacher - handle both populated objects and string IDs
                // Check if teacher is a populated object (has name/username properties)
                // Priority: enrollment.teacher (if object) > course.teacherId (if object) > fallback
                const getTeacherName = () => {
                    // Check enrollment.teacher first
                    if (enrollment.teacher && typeof enrollment.teacher === 'object' && !Array.isArray(enrollment.teacher)) {
                        // enrollment.teacher is a populated object
                        return enrollment.teacher.name || enrollment.teacher.username || null;
                    }
                    
                    // Check course.teacherId
                    if (course?.teacherId && typeof course.teacherId === 'object' && !Array.isArray(course.teacherId)) {
                        // course.teacherId is a populated object
                        return course.teacherId.name || course.teacherId.username || null;
                    }
                    
                    // If both are IDs (strings), we can't get the name
                    return null;
                };
                
                const teacherName = getTeacherName() || 'Teacher';
                
                // Calculate progress (you may need to adjust this based on your data structure)
                const progress = 0; // Placeholder - adjust based on your actual progress calculation

                return (
                    <div key={enrollment._id || idx} className='border rounded-lg p-4 bg-white hover:shadow-md transition-shadow'>
                        <div className='flex items-center justify-between mb-2'>
                            <p className='font-semibold text-gray-800'>{course?.title || group?.title || 'Course'}</p>
                            <p className={`font-semibold ${
                                progress < 30
                                    ? "text-red-500"
                                    : progress < 70
                                    ? "text-yellow-500"
                                    : "text-green-500"
                            }`}>
                                {progress}%
                            </p>
                        </div>
                        <p className='text-gray-500 text-sm mb-3'>
                            {teacherName}
                        </p>
                        {group && (
                            <p className='text-gray-400 text-xs mb-2'>
                                Group: {group.title}
                            </p>
                        )}
                        <Progress 
                            value={progress}
                            className={
                                progress < 30
                                ? "[&>[data-slot=progress-indicator]]:bg-red-500"
                                : progress < 70
                                ? "[&>[data-slot=progress-indicator]]:bg-yellow-500"
                                : "[&>[data-slot=progress-indicator]]:bg-green-500"
                            }
                        />
                        <p className='text-xs text-gray-400 mt-2'>
                            Status: <span className={`font-medium ${
                                enrollment.status === 'active' ? 'text-green-600' : 
                                enrollment.status === 'trialing' ? 'text-blue-600' : 
                                'text-gray-600'
                            }`}>
                                {enrollment.status || 'N/A'}
                            </span>
                        </p>
                    </div>
                );
            })}
        </div>
    </div>
  )
}

export default EnrollCourses