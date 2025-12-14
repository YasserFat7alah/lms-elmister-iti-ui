"use client";
import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { GraduationCap, CalendarCheck, ClipboardList, BookOpen, ChevronRight } from 'lucide-react';

const StatItem = ({ label, value, icon: Icon, colorClass, bgClass }) => (
  <div className={`flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-opacity-80 ${bgClass}`}>
    <div className={`p-2 rounded-lg bg-white/60 ${colorClass}`}>
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-xs text-gray-500 font-medium">{label}</p>
      <p className={`text-lg font-bold ${colorClass.replace('bg-', 'text-')}`}>{value}</p>
    </div>
  </div>
);

const ChildCard = ({ student }) => {
  const avatarUrl = student?.avatar?.url || student?.avatar || '';
  const studentName = student?.name || 'Unknown';
  const grade = student?.grade ? `Grade ${student.grade}` : 'N/A';

  // Helper to ensure we have valid student ID
  const studentId = student?._id || student?.id;

  return (
    <Card className="w-full border-0 shadow-lg shadow-gray-200/50 hover:shadow-md  transition-all duration-300 rounded-[2rem] overflow-hidden bg-white group">
      <CardHeader className="relative p-6 bg-gradient-to-br from-[#392b80]/5 to-transparent border-b border-gray-100">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16 border-4 border-white shadow-md ring-2 ring-[#392b80]/10">
            <AvatarImage src={avatarUrl} className="object-cover" />
            <AvatarFallback className="text-xl font-bold bg-[#392b80] text-white">
              {studentName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">{studentName}</h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#392b80] text-white shadow-sm">
              {grade}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4">
          <StatItem
            label="Avg Grade"
            value={`${student?.avgGrade || '0'}%`}
            icon={GraduationCap}
            bgClass="bg-green-50"
            colorClass="text-green-600"
          />
          <StatItem
            label="Attendance"
            value={`${student?.attendance || '0'}%`}
            icon={CalendarCheck}
            bgClass="bg-blue-50"
            colorClass="text-blue-600"
          />
          <StatItem
            label="Tasks"
            value={student?.pendingTasks || 0}
            icon={ClipboardList}
            bgClass="bg-orange-50"
            colorClass="text-orange-600"
          />
          <StatItem
            label="Courses"
            value={student?.activeCourses || 0}
            icon={BookOpen}
            bgClass="bg-purple-50"
            colorClass="text-purple-600"
          />
        </div>
      </CardContent>

      <CardFooter className="p-4 bg-gray-50/50 border-t border-gray-100">
        <Link href={`/dashboard/parent/children/${studentId || ''}`} className="w-full">
          <Button
            className='w-full bg-[#392b80] hover:bg-[#2a2060] text-white rounded-xl py-6 font-semibold shadow-md shadow-[#392b80]/20 group-hover:shadow-lg transition-all'
            disabled={!studentId}
          >
            <span>View Details</span>
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default ChildCard