import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { PiDotOutlineFill } from 'react-icons/pi';
import ChildPercentCard from './ChildPercentCard';

const ChildBanner = ({ child }) => {
    // Handle both API response structure and fallback values
    const avatarUrl = child?.avatar?.url || child?.avatar || '';
    const childName = child?.name || 'Unknown';
    const grade = child?.grade ? `Grade ${child.grade}` : 'N/A';
    const childId = child?._id || child?.id || 'N/A';

    return (
        <div className="relative p-6 w-full rounded-t-2xl overflow-hidden bg-gradient-to-r from-[#195EC2] via-[#2176E3] to-[#0A264F] shadow-lg ">
            {/* __________CHILD INFO IN BANNER */}
            <div className='flex items-center gap-3'>
                <Avatar className="w-18 h-18 border-4 border-white/20 shadow-xl">
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback className="text-2xl font-bold bg-[#FF0055] text-white">
                        {childName.charAt(0)}
                    </AvatarFallback>
                </Avatar>

                <div className='text-white'>
                    <p className='font-semibold'>{childName}</p>
                    <p className='flex items-center gap-1 text-gray-100 text-sm md:text-base'>
                        <span>{grade}</span>
                        <span> <PiDotOutlineFill size={20} />  </span>
                        <span>Student ID : {childId}</span>
                    </p>
                </div>
            </div>

            <ChildPercentCard child={child} />

        </div>
    )
}

export default ChildBanner