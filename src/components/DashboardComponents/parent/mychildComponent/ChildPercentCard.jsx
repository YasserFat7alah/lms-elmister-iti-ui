import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

const ChildPercentCard = ({child}) => {
  return (
    <div className='grid md:grid-cols-3 gap-4 mt-4'>
        <Card className='bg-white/20 border-0  text-white'>
            <CardHeader className='pb-1'> Avvarage Grade </CardHeader>
            <CardContent className='text-lg font-semibold mt-0'> {child.avgGrade} %</CardContent>
        </Card>

        <Card className='bg-white/20 border-0  text-white'>
            <CardHeader className='pb-1'> Attendance </CardHeader>
            <CardContent className='text-lg font-semibold mt-0'> {child.attendance} %</CardContent>
        </Card>

        <Card className='bg-white/20 border-0  text-white'>
            <CardHeader className='pb-1'> Courses</CardHeader>
            <CardContent className='text-lg font-semibold mt-0'> {child.activeCourses}</CardContent>
        </Card>
    </div>
  )
}

export default ChildPercentCard