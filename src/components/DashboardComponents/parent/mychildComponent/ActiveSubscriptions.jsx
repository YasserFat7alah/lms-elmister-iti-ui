"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { mockCourses } from '@/data/mockCourses'
import { children } from '@/data/parentData'
import React, { useState } from 'react'
import { PiDotOutlineBold } from 'react-icons/pi'
import { RiCalendarEventFill } from 'react-icons/ri'

const ActiveSubscriptions = () => {

    const [openValue, setOpenValue] = useState(children[0]?.id || "");


  return (
    <div>
        <h4 className='font-semibold text-lg text-[#392b80] py-4'>Active Subscriptions</h4>

        <Accordion type="single" collapsible className="w-full  " value={openValue} onValueChange={setOpenValue}>
            {children.map((child) => {

                // CALCULATE TOTAL PRICE FOR ONE CHILD COURSES
                const totalPrice = child.enrolledCourses.reduce((sum, enrolled) => {
                    const course = mockCourses.find(c => c.id === enrolled.courseId);
                    return sum + (course?.pricing?.price ?? "Free"); 
                }, 0);

                return(
                    <AccordionItem key={child.id} value={child.id} className='mb-3 border-b-0 bg-white rounded-2xl border '>
                        <AccordionTrigger className='relative p-6 w-full text-[#392b80] 
                            bg-white border  rounded-b-none data-[state=open]:bg-gray-100  overflow-hidden '
                        >
                            <div className='flex items-center gap-2'>
                                <Avatar className="w-10 h-10 ">
                                    <AvatarImage src={child?.avatar} />
                                    <AvatarFallback className="text-lg font-bold bg-[#FF0055] text-white">
                                    {child?.name?.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className='text-[#392b80] '>{child.name}</p>
                                    <p className='flex items-center text-gray-600'>
                                        <span>{child.enrolledCourses.length ===1 ? `${child.enrolledCourses.length} Course` : `${child.enrolledCourses.length} Courses`}</span> 
                                        <span><PiDotOutlineBold/></span>
                                        <span>{totalPrice=== 0 ? "Free" : `${totalPrice} EGP/month`}</span>
                                    </p>
                                </div>
                            </div>
                        </AccordionTrigger>

                    <AccordionContent className='p-4 '>
                        {child.enrolledCourses.map(c=>(
                            <Card className='p-4 mb-3 shadow-none'>
                                <p className='text-gray-700 font-semibold mb-1'>
                                    <span> {c.title} - </span>
                                    <span>{child.grade}</span>
                                </p>
                                <p className='text-gray-600 mb-1'>{c.instructor}</p>
                                <div className='flex items-center gap-2 font-semibold text-sm text-gray-500'>
                                    <span><RiCalendarEventFill/></span>
                                    <span> Next : {c.nextAttendance}</span>
                                </div>
                            </Card>
                        ))}
                    </AccordionContent>
                    </AccordionItem>
                )
            })}
        </Accordion>
    </div>
  )
}

export default ActiveSubscriptions