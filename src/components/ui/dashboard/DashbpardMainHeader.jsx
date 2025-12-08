import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const DashbpardMainHeader = ({fromColor , toColor , children}) => {
  return (
    <div
    style={{
      background: `linear-gradient(to right, ${fromColor}, ${toColor})`,
    }}

    className={`relative  overflow-hidden  flex flex-col md:flex-row  
        justify-between items-center py-5 px-4 md:px-8 mx-6 md:mx-12 my-8 rounded-md`}
    >

    {/* USER INFORMATION */}
    <div className='flex items-center gap-4'>
        <Avatar className="w-20 h-20 md:w-24 md:h-24">
          <AvatarImage src="/assets/imgs/imgtst.jpg" alt="User"/>
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>

        <div>
            <p className='font-bold text-gray-100'>User Name</p>
            <p className='text-white'>User Role</p>
            </div>
        </div>

        {children}    

    </div>
  )
}

export default DashbpardMainHeader