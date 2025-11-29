import React from 'react';
import { FaGraduationCap } from "react-icons/fa6";
import CardPercentage from '@/components/dashboardComponents/Notification/CardPercentage'


const Totals = () => {
  return (
    <div className=' flex flex-col md:flex-row flex-wrap items-center justify-evenly  gap-4'>
    <div>
        <CardPercentage 
            icon={FaGraduationCap}
            title="Enrolled Courses"
            total={12}
            iconSize={25}
            iconClassName={`text-purple-950 bg-purple-100/50`}
        />
    </div>

    <div>
        <CardPercentage 
            icon={FaGraduationCap}
            title="Enrolled Courses"
            total={12}
            iconSize={25}
            iconClassName={`text-purple-950 bg-purple-100/50`}
        />
    </div>

    <div>
        <CardPercentage 
            icon={FaGraduationCap}
            title="Enrolled Courses"
            total={12}
            iconSize={25}
            iconClassName={`text-purple-950 bg-purple-100/50`}
        />
    </div>
    
    </div>

    
  )
}

export default Totals