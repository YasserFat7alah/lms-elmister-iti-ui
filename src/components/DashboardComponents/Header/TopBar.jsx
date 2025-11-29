import React from 'react'
import BtnHeader from './BtnHeader';
import Image from 'next/image';
import DashbpardMainHeader from '@/components/ui/dashboard/DashbpardMainHeader';

const TopBar = () => {
  return (
    <DashbpardMainHeader fromColor="#2C7A9C" toColor="#0936CB" >
      {/* <Image src="/assets/imgs/BG4.png" className='absolute -z-10 top-0 right-0' width={200} height={300}/> */}
            

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

export default TopBar;