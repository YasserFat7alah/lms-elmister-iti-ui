"use client"
import React, { useEffect, useState } from 'react'
import Chat from '@/components/DashboardComponents/chat/Chat'
import { useSearchParams } from 'next/navigation';
import { mockTeachers } from '@/data/mockTeacher';

import { Suspense } from "react";
import { Spinner } from "@/components/shared/Loader";

const MessagesContent = () => {

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
    <div className="-m-4 md:-mx-6 md:-my-3">
      <Chat
        selectedTeacher={selectedTeacher}
        teachers={teachers}
        setSelectedTeacher={setSelectedTeacher}
        handleSelectTeacher={handleSelectTeacher}
      />
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div className="h-full w-full flex items-center justify-center"><Spinner /></div>}>
      <MessagesContent />
    </Suspense>
  )
}

export default Page