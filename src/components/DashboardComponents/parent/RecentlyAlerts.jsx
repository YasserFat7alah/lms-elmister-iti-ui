import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { alerts, children } from '@/data/parentData';
import { PiDotOutlineFill } from 'react-icons/pi';
import { HiBellAlert } from "react-icons/hi2";



const RecentlyAlerts = () => {
  return (
    <Card className="w-full rounded-2xl shadow-sm hover:shadow-md transition-all bg-white">
        <CardHeader className='border-b border-b-gray-100 py-3 mt-1 px-5' >
            <h4 className='font-semibold'>Recently Alerts</h4>
        </CardHeader>
        <CardContent className=' '>
            {alerts.map(alert =>{

                const child = children.find(c => c.id === alert.childId);

                return(
                    <div key={alert.id} className='border-b last:border-b-0 py-4 '>
                            <div className='flex gap-2  '>
                                <p className='text-yellow-400 mt-1'><HiBellAlert size={20} /></p>
                                <div >
                                    <p className='text-gray-800'>{alert.message}</p>
                                    <p className='text-gray-500 flex items-center text-sm md:text-base'>
                                        <span>{child?.name}</span>
                                        <span> <PiDotOutlineFill size={20}/>  </span>
                                        <span>{alert.timeAgo}</span>
                                    </p>
                                </div>
                            </div>                        
                    </div>
                )
            })}
        </CardContent>
     
    </Card>
  )
}

export default RecentlyAlerts