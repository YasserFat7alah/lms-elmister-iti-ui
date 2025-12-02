import React from 'react'
import { TiMinus } from "react-icons/ti";

const DashboardHeader = () => {
  return (
    <div className='bg-gradient-to-r from-[#FEE0DE] via-[#E4F5FD] via-50% via-[#E2F2FE] to-[#DDEDFF] py-8 text-center'>
      <h1 className='font-bold text-2xl md:text-3xl mb-2' >Dashboard</h1>
      <p className='flex items-center justify-center gap-1'>
        <span>Home</span> 
        <span className=' '> <TiMinus color='#f6339a' size={25}/> </span> 
        <span className='text-gray-500'>Dashboard</span>
      </p>
    </div>
  )
}

export default DashboardHeader;