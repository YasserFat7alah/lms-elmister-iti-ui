"use client"
import React, { useEffect, useState } from 'react'
import Chat from '../../../../components/dashboardComponents/chat/Chat'
import { useSearchParams } from 'next/navigation';
import { mockTeachers } from '@/data/mockTeacher';

const page = () => {

  const searchParams = useSearchParams();
  const teacherId = searchParams.get("teacherId");

  const [teachers, setTeachers] = useState(mockTeachers);
  const [selectedTeacher, setSelectedTeacher] = useState(
    teacherId ? mockTeachers.find((t) => t.id === teacherId) : mockTeachers[0]
  );

  useEffect(() => {
    if (teacherId) {
      const teacher = mockTeachers.find((t) => t.id === teacherId);
      if (teacher) setSelectedTeacher(teacher);
    }
  }, [teacherId]);

  const handleSelectTeacher = (teacher) => {
    setSelectedTeacher(teacher);
    setTeachers((prev) =>
      prev.map((t) => (t.id === teacher.id ? teacher : t))
    );
  };

  return (
    <Chat
      selectedTeacher={selectedTeacher}
      teachers={teachers}
      setSelectedTeacher={setSelectedTeacher}
      handleSelectTeacher={handleSelectTeacher}
    />
  );
};

export default page