"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Check, X, Clock, Save, Loader2, UserX } from "lucide-react";
import { toast } from "react-hot-toast";
import { useMarkAttendanceMutation } from "@/redux/api/endPoints/lessonsApiSlice";

export default function AttendanceSheet({ lessonId, students = [], existingAttendance = [] }) {
  const [markAttendance, { isLoading }] = useMarkAttendanceMutation();
  
  const [attendanceMap, setAttendanceMap] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const initialMap = {};
    
    students.forEach(student => {
      initialMap[student._id] = "absent"; 
    });

    if (existingAttendance && existingAttendance.length > 0) {
      existingAttendance.forEach(record => {
        const sId = record.studentId?._id || record.studentId; 
        
        if (sId) {
            initialMap[sId] = record.status;
        }
      });
    }

    setAttendanceMap(initialMap);
  }, [students, existingAttendance]);

  const handleStatusChange = (studentId, status) => {
    setAttendanceMap(prev => ({ ...prev, [studentId]: status }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      const attendanceArray = Object.entries(attendanceMap).map(([sId, status]) => ({
        studentId: sId, 
        status: status
      }));

      await markAttendance({ lessonId, attendance: attendanceArray }).unwrap();
      
      toast.success("Attendance saved successfully! ");
      setHasChanges(false);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to save attendance");
    }
  };

  const stats = {
    present: Object.values(attendanceMap).filter(s => s === 'present').length,
    absent: Object.values(attendanceMap).filter(s => s === 'absent').length,
    late: Object.values(attendanceMap).filter(s => s === 'late').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100 gap-4 sticky top-0 z-10 shadow-sm">
        <div className="flex gap-6 text-sm font-bold">
            <span className="flex items-center gap-1 text-green-600 bg-white px-3 py-1 rounded shadow-sm">
                <Check size={16}/> Present: {stats.present}
            </span>
            <span className="flex items-center gap-1 text-red-600 bg-white px-3 py-1 rounded shadow-sm">
                <X size={16}/> Absent: {stats.absent}
            </span>
            <span className="flex items-center gap-1 text-orange-600 bg-white px-3 py-1 rounded shadow-sm">
                <Clock size={16}/> Late: {stats.late}
            </span>
        </div>
        
        <Button 
            onClick={handleSave} 
            disabled={!hasChanges || isLoading}
            className={`w-full md:w-auto transition-all ${
                hasChanges 
                ? "bg-[#FF4667] hover:bg-[#ff2e53] text-white shadow-md" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
            {isLoading ? <Loader2 className="animate-spin mr-2" size={18}/> : <Save className="mr-2" size={18}/>}
            {hasChanges ? "Save Changes" : "Saved"}
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {students.length > 0 ? (
            students.map((student) => {
             const status = attendanceMap[student._id];
             
             return (
              <div key={student._id} className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 hover:bg-gray-50 transition">
                
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <Avatar className="border border-gray-200">
                    <AvatarImage src={student.avatar?.url} />
                    <AvatarFallback>{student.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                      <div className="font-bold text-gray-800">{student.name}</div>
                      <div className="text-xs text-gray-500">{student.phone}</div>
                  </div>
                </div>

                <div className="flex bg-gray-100 p-1 rounded-lg w-full sm:w-auto justify-center">
                    <button
                        onClick={() => handleStatusChange(student._id, 'present')}
                        className={`px-4 py-2 rounded-md text-xs font-bold uppercase transition-all flex items-center gap-2 ${
                            status === 'present' 
                            ? 'bg-white text-green-600 shadow-sm ring-1 ring-green-100' 
                            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        <Check size={14} /> Present
                    </button>
                    
                    <button
                        onClick={() => handleStatusChange(student._id, 'late')}
                        className={`px-4 py-2 rounded-md text-xs font-bold uppercase transition-all flex items-center gap-2 ${
                            status === 'late' 
                            ? 'bg-white text-orange-500 shadow-sm ring-1 ring-orange-100' 
                            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        <Clock size={14} /> Late
                    </button>

                    <button
                        onClick={() => handleStatusChange(student._id, 'absent')}
                        className={`px-4 py-2 rounded-md text-xs font-bold uppercase transition-all flex items-center gap-2 ${
                            status === 'absent' 
                            ? 'bg-white text-red-600 shadow-sm ring-1 ring-red-100' 
                            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        <X size={14} /> Absent
                    </button>
                </div>
              </div>
            );
          })
         ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <UserX size={48} className="mb-2 opacity-20"/>
                <p>No students in this group yet.</p>
            </div>
         )}
        </div>
      </div>
    </div>
  );
}