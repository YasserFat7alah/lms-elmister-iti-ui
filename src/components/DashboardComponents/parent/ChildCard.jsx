import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react';

const ChildCard = ({student}) => {
  return (
    <Card className="w-full p-4 rounded-2xl shadow-sm hover:shadow-md transition-all bg-white">
        <CardHeader className="pb-2 mb-2 flex flex-row items-center gap-3">
            <Avatar className="w-18 h-18 border-4 border-white/20 shadow-xl">
                <AvatarImage src={student.avatar} />
                <AvatarFallback className="text-2xl font-bold bg-[#FF0055] text-white">
                    {student.name.charAt(0)}
                </AvatarFallback>
            </Avatar>
            <div>
                <CardTitle className="text-lg font-semibold">{student.name}</CardTitle>
                <CardDescription>{student.grade}</CardDescription>
            </div>
        </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4 text-sm">
        <div className='bg-green-400/10 text-green-800 px-5 py-4 rounded-lg'>
          <p className="">Average Grade</p>
          <p className="text-lg font-bold">{student.avgGrade}%</p>
        </div>

        <div className='bg-blue-400/10 text-blue-800 px-5 py-4 rounded-lg'>
          <p className="">Attendance</p>
          <p className="text-lg font-bold">{student.attendance}%</p>
        </div>

        <div className='bg-orange-400/10 text-orange-800 px-5 py-4 rounded-lg'>
          <p className="">Pending Tasks</p>
          <p className="text-lg font-bold">{student.pendingTasks}</p>
        </div>

        <div className='bg-purple-400/10 text-purple-800 px-5 py-4 rounded-lg'>
          <p className="">Active Courses</p>
          <p className="text-lg font-bold">{student.activeCourses}</p>
        </div>
      </CardContent>

      <CardFooter>
        <Button className='w-full bg bg-blue-800 hover:bg-[#FF0055] rounded-xl'>
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ChildCard