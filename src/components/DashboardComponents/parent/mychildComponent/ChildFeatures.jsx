"use client"
import React from 'react'
import { AiOutlineUserAdd } from "react-icons/ai";
import { LuCreditCard } from "react-icons/lu";
import { IoMdNotificationsOutline } from "react-icons/io";
import Link from 'next/link';
import { useSelector } from 'react-redux';


const ChildFeatures = () => {

    const { notifications } = useSelector(state => state.notifications);
    const unreadCount = notifications.filter(n => !n.read).length;

    const feature = [
       { icon : <AiOutlineUserAdd size={25}/> , title : "Add Child" , href :"/dashboard/parent/children/add-child" } ,
       { icon : <LuCreditCard size={25}/> , title : "View Subscriptions" , href:"/dashboard/parent/subscriptions"} ,
       { icon : <IoMdNotificationsOutline size={25}/> , title : "Notifications" , href : "/dashboard/parent/notifications"} ,
    ]

  return (
    <div className='grid md:grid-cols-3 gap-4 mb-4 '>
        {feature.map((f,i)=>(
            <Link key={i}  href={f.href}>
                <div className='border relative  border-gray-300 border-dashed hover:bg-blue-400/10 hover:border-blue-400 transition-all ease-in-out duration-500 cursor-pointer flex flex-col py-5 rounded-lg items-center justify-center'>
                    <p className='text-gray-500'> {f.icon} </p>
                    <p className="text-gray-600">
                    {f.title === 'Notifications' ? (
                            <>
                                <span>{f.title}</span>

                                {unreadCount > 0 && (
                                    <span className='absolute top-2 right-5 bg-red-500 text-white w-5 h-5
                                                    text-sm font-semibold text-center rounded-full'>
                                        {unreadCount}
                                    </span>
                                )}
                            </>
                        ) : (
                            f.title
                        )}
                    </p>
                </div>
            </Link>
        ))}
    </div>
  )
}

export default ChildFeatures