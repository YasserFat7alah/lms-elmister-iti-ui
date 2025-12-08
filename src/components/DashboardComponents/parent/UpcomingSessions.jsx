import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { children, sessions } from '@/data/parentData';
import { PiDotOutlineFill } from 'react-icons/pi';

const UpcomingSessionsCard = () => {
  return (
    <Card className="w-full rounded-2xl shadow-sm hover:shadow-md transition-all bg-white">
        <CardHeader className='flex flex-row items-center justify-between border-b border-b-gray-100 py-3 mt-1 px-5' >
            <h4 className='font-semibold'>Upcomming Sessions</h4>
            <button className='text-sm text-pink-600 font-semibold'>View All</button>
        </CardHeader>
        <CardContent className=' '>
            {sessions.map(session =>{

                const child = children.find(c => c.id === session.childId);

                return(
                    <div key={session.id} className='border-b border-b-gray-100 last:border-b-0 py-4 '>
                        <div>
                            <div className='flex justify-between items-center text-gray-800 '>
                                <p className=''>
                                    <span>{session.subject} - </span>
                                    <span>{session.grade}</span>
                                </p>
                                <p>
                                {session.status === 'Online' ? 
                                    <span className='text-green-600 bg-green-500/20 py-1 px-2 rounded-lg'>{session.status}</span>
                                    : <span className='text-blue-600 bg-blue-500/20 py-1 px-2 rounded-lg'>{session.status}</span>
                                }
                                </p>
                            </div>
                            <p className='text-gray-500 flex items-center text-sm md:text-base'>
                                <span>{child?.name} </span>
                                <span> <PiDotOutlineFill size={20}/>  </span>
                                <span>{session.tutor}</span>
                            </p>
                            <p className='text-gray-500 text-sm md:text-base'>{session.time}</p>
                        </div>
                        
                    </div>
                )
            })}
        </CardContent>
     
    </Card>
  )
}

export default UpcomingSessionsCard