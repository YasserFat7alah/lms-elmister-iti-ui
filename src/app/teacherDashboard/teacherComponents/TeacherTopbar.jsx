import BtnHeader from '@/components/dashboardComponents/Header/BtnHeader';
import DashbpardMainHeader from '@/components/ui/dashboard/DashbpardMainHeader';
import React from 'react'

const TeacherTopbar = () => {
  return (
    <DashbpardMainHeader fromColor="#392C7D" toColor="#6850E3" >            

      {/* BUTTONS FOR MORE OPTIONS */}
      <div className='flex flex-col md:flex-row gap-3 mt-3 md:mt-0'>
        <BtnHeader className="bg-white text-black hover:bg-gray-400 hover:text-white">
          Add New Course
        </BtnHeader>

        <BtnHeader className=" bg-pink-600 hover:bg-gray-400 hover:text-white">
          Student Dashboard
        </BtnHeader>
      </div>

      
    </DashbpardMainHeader>
  )
}

export default TeacherTopbar;