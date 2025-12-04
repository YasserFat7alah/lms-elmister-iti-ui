import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress';



const ChildCourseDetails = ({child}) => {


    const getScoreColor = (score, fullMark) => {
        const half = fullMark / 2;
        const almostFull = fullMark - 15;
      
        if (score < half) return "text-red-600";      
        if (score < almostFull) return "text-yellow-500"; 
        return "text-green-600";                          
    };


    const getProgressTextColor = (value) => {
        const fullMark = 100;
        const half = fullMark / 2;       
        const almostFull = fullMark - 15; 
      
        if (value < half) return "text-red-600";          
        if (value < almostFull) return "text-yellow-500"; 
        return "text-green-600";                          
    };

    const getProgressBgColor = (value) => {
        if (value < 50) return "bg-red-500";
        if (value < 90) return "bg-yellow-500";
        return "bg-green-600";
    };


  return (
    <div className='space-y-6'>
            {child.enrolledCourses.map((c, idx) => (
            <Card key={idx} className='bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden'>
                {/* Course Header */}
                <CardHeader className='pb-4 pt-6 px-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100'> 
                <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                    <div>
                    <h3 className='font-bold text-[#392b80] text-xl mb-1'>{c.title}</h3>
                    <p className='text-gray-600 text-sm font-medium '>{c.instructor}</p>
                    </div>
                    <div className='flex flex-wrap gap-3 text-sm'>
                    <span className='px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg font-medium border border-blue-100'>
                        {c.groupId}
                    </span>
                    <span className='px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg font-medium border border-teal-100'>
                        {c.groupType}
                    </span>
                    <span className='px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg font-medium'>
                        {c.groupSchedule.join(" / ")}
                    </span>
                    </div>
                </div>
                </CardHeader>

                {/* Course Details Grid */}
                <CardContent className='p-6'>
                <div className='grid md:grid-cols-3 gap-4'>
                    {/* Student Status */}
                    <div className='p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-50/50 border border-blue-100'>
                        <p className='text-sm font-semibold text-gray-600 mb-2'>Student Status</p>
                        <p className='text-lg font-bold text-gray-900'>
                            {c.studentStatus === "Excellent" ? (
                                <span className='text-green-600'>{c.studentStatus}</span>
                            ) : c.studentStatus === "Good" ? (
                                <span className='text-yellow-500'>{c.studentStatus}</span>
                            ) : (
                                <span className='text-red-500'>{c.studentStatus}</span>
                            )}
                        </p>
                    </div>

                    {/* Attendance Percentage */}
                    <div className='p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-50/50 border border-green-100'>
                    <p className='text-sm font-semibold text-gray-600 mb-2'>Attendance Rate</p>
                    <p className={`text-2xl font-bold ${getProgressTextColor(c.attendancePercentage)}`}>{c.attendancePercentage}%</p>
                    </div>

                    {/* Attendance Details */}
                    <div className='p-4 rounded-lg bg-gradient-to-br from-amber-50 to-amber-50/50 border border-amber-100'>
                    <p className='text-sm font-semibold text-gray-600 mb-2'>Class Attendance</p>
                    <p className='text-xs text-gray-600 mb-1'>Last: {c.lastAttendance}</p>
                    <p className='text-lg font-bold text-gray-900'>
                        <span className={getScoreColor(c.attendedClasses, c.totalClasses)}> {c.attendedClasses} </span>
                        <span className='text-gray-600'> / </span> 
                        <span className='text-green-500'>{c.totalClasses}</span> 
                    </p>
                    </div>

                    {/* Tests */}
                    <div className='p-4 rounded-lg bg-white border border-gray-200'>
                    <p className='text-sm font-semibold text-gray-600 mb-3'>Test Scores</p>
                    <div className='space-y-2'>
                        {c.tests.map((t, testIdx) => (
                        <div key={testIdx} className='flex justify-between items-center p-2 bg-gray-50 rounded-md'>
                            <p className='text-sm font-medium text-gray-700'>{t.testName}</p>
                            <p className='text-sm font-bold '>
                                <span className={getScoreColor(t.score, t.fullMark)}>{t.score}</span>
                                <span className='text-gray-600'> / </span> 
                                <span className='text-green-500'>{t.fullMark}</span>
                            </p>
                        </div>
                        ))}
                    </div>
                    </div>

                    {/* Assignments */}
                    <div className='p-4 rounded-lg bg-white border border-gray-200'>
                    <p className='text-sm font-semibold text-gray-600 mb-3'>Assignments</p>
                    <div className='space-y-2'>
                        <div className='flex justify-between items-center p-2 bg-green-50 rounded-md'>
                        <span className='text-sm text-gray-700'>Submitted</span>
                        <span className='text-sm font-bold text-green-700'>{c.assignments.submitted}</span>
                        </div>
                        <div className='flex justify-between items-center p-2 bg-orange-50 rounded-md'>
                        <span className='text-sm text-gray-700'>Pending</span>
                        <span className='text-sm font-bold text-orange-700'>{c.assignments.pending}</span>
                        </div>
                    </div>
                    </div>

                    {/* Course Progress */}
                    <div className='p-4 rounded-lg bg-white border border-gray-200'>
                        <p className='text-sm font-semibold text-gray-600 mb-3'>Course Progress</p>
                        <div className='space-y-2'>
                            <p className={`text-2xl font-bold ${getProgressTextColor(c.progress)}`}>{c.progress}%</p>
                            <Progress 
                                value={c.progress} 
                                indicatorColor={getProgressBgColor(c.progress)}
                            />
                        </div>
                    </div>
                </div>
                </CardContent>
            </Card>
            ))}
         </div>
  )
}

export default ChildCourseDetails