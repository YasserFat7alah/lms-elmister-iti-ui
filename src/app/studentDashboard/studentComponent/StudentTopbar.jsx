import BtnHeader from '@/components/dashboardComponents/Header/BtnHeader';
import DashbpardMainHeader from '@/components/ui/dashboard/DashbpardMainHeader';
import React from 'react'

const StudentTopbar = () => {
  return (
    <DashbpardMainHeader fromColor="#2C7A9C" toColor="#0936CB" >            

      {/* BUTTONS FOR MORE OPTIONS */}
      <div className='flex flex-col md:flex-row gap-3 mt-3 md:mt-0'>
        <BtnHeader className="bg-white text-black hover:bg-gray-400 hover:text-white">
          Become an Instructor
        </BtnHeader>

        <BtnHeader className=" bg-pink-600 hover:bg-gray-400 hover:text-white">
          Instructor Dashboard
        </BtnHeader>
      </div>

      
    </DashbpardMainHeader>
  )
}

export default StudentTopbar;