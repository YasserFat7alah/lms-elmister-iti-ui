import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

const ChildPercentCard = ({child}) => {
  // Handle missing data with fallbacks
  const avgGrade = child?.avgGrade ?? 'N/A';
  const attendance = child?.attendance ?? 'N/A';
  const activeCourses = child?.activeCourses ?? 0;

  return (
    <div className='grid md:grid-cols-3 gap-4 mt-4'>
        <Card className='bg-white/20 border-0  text-white'>
            <CardHeader className='pb-1'> Average Grade </CardHeader>
            <CardContent className='text-lg font-semibold mt-0'> {avgGrade} {avgGrade !== 'N/A' && '%'}</CardContent>
        </Card>

        <Card className='bg-white/20 border-0  text-white'>
            <CardHeader className='pb-1'> Attendance </CardHeader>
            <CardContent className='text-lg font-semibold mt-0'> {attendance} {attendance !== 'N/A' && '%'}</CardContent>
        </Card>

        <Card className='bg-white/20 border-0  text-white'>
            <CardHeader className='pb-1'> Courses</CardHeader>
            <CardContent className='text-lg font-semibold mt-0'> {activeCourses}</CardContent>
        </Card>
    </div>
  )
}

export default ChildPercentCard