import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit2, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const CardUser = ({user , fieldKey , className}) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="relative">
                <Avatar className={`w-24 h-24 border-4 border-white/20 shadow-xl ${className}`}>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-2xl font-bold bg-[#FF0055] text-white">
                        {user.name.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-1 right-1 bg-[#10D876] text-white p-1 rounded-full border-2 border-[#195EC2]">
                        <CheckCircle size={14} fill="white" className="text-[#10D876]" />
                </div>
            </div>

            <div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                    <h2 className="text-2xl font-bold text-[#392b80]">{user.name}</h2>
                    {fieldKey === "role" && <Edit2 size={16} className="text-gray-500 cursor-pointer hover:text-white" />}
                </div>
                <p className="mt-1 capitalize text-gray-500">{user[fieldKey]}</p>
            </div>
    </div>
  )
}

export default CardUser;