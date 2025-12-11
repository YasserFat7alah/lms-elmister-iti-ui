"use client";

import { useState } from "react";
import { Search, Phone, Mail, MoreVertical, Trash2, PieChart } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress"; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-hot-toast";

export default function GroupStudentsList({ students = [], groupId, lessons = [] }) {

      const [searchTerm, setSearchTerm] = useState("");

const getAttendanceStats = (studentId) => {
    if (!lessons || lessons.length === 0) return { percent: 0, attended: 0, total: 0 };

    const totalLessons = lessons.length;
    let attendedCount = 0;
    
    lessons.forEach(lesson => {
      if (!lesson.attendance || !Array.isArray(lesson.attendance)) return;

      const record = lesson.attendance.find(r => {
          const rId = r.studentId?._id || r.studentId || r.student;
          
          return rId?.toString() === studentId?.toString();
      });
      
      if (record && (record.status === 'present' || record.status === 'late')) {
        attendedCount++;
      }
    });

    const percent = Math.round((attendedCount / totalLessons) * 100);
    return { percent, attended: attendedCount, total: totalLessons };
  };

  const filteredStudents = students.filter((student) =>
    student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.phone?.includes(searchTerm)
  );

  const handleRemoveStudent = async (studentId) => {
    if (confirm("Are you sure?")) {
      try {
        await removeStudent({ groupId, studentId }).unwrap();
        toast.success("Student removed");
      } catch (err) {
        toast.error("Failed to remove");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search students..."
            className="pl-10 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="text-sm text-gray-500 font-medium">
            Total: {students.length} Students
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {filteredStudents.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredStudents.map((student) => {
              
              const stats = getAttendanceStats(student._id);
              
              let progressColor = "bg-green-500";
              if (stats.percent < 50) progressColor = "bg-red-500";
              else if (stats.percent < 75) progressColor = "bg-yellow-500";

              return (
                <div key={student._id} className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center hover:bg-gray-50 transition">
                  
                  <div className="md:col-span-5 flex items-center gap-4">
                    <Avatar className="h-10 w-10 border border-gray-100">
                      <AvatarImage src={student.avatar?.url} />
                      <AvatarFallback>{student.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{student.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-6 flex flex-col justify-center">
                    <div className="flex justify-between text-xs mb-1 font-medium text-gray-600">
                        <span className="flex items-center gap-1"><PieChart size={12}/> Attendance</span>
                        <span>{stats.attended}/{stats.total} ({stats.percent}%)</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                            className={`h-full ${progressColor} transition-all duration-500`} 
                            style={{ width: `${stats.percent}%` }}
                        />
                    </div>
                  </div>

                  <div className="md:col-span-1 flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical size={16} className="text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                            className="text-red-600 cursor-pointer"
                            onClick={() => handleRemoveStudent(student._id)}
                        >
                          <Trash2 size={16} className="mr-2" /> Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-10 text-center text-gray-500">No students found.</div>
        )}
      </div>
    </div>
  );
}