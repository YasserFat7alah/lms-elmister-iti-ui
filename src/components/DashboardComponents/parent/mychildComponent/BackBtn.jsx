import Link from 'next/link'
import React from 'react'
import { IoReturnUpBack } from 'react-icons/io5'

const BackBtn = () => {
  return (
    <div className="">
            <Link href={`/dashboard/parent/children`} 
                className=" text-pink-500 font-semibold pb-2 flex items-center gap-2"
            >   
                <span className="p-1 bg-pink-500 text-white rounded-full"><IoReturnUpBack size={20} /></span>
                <span className="border-b pb-2">Back To My Children</span>
            </Link>
    </div>
  )
}

export default BackBtn