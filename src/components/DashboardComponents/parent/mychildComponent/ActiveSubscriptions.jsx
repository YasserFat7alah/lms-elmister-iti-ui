"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import React, { useState, useEffect } from 'react'
import { PiDotOutlineBold } from 'react-icons/pi'
import { RiCalendarEventFill } from 'react-icons/ri'
import { Skeleton } from '@/components/ui/skeleton'

const ActiveSubscriptions = ({ data = [], isLoading = false }) => {

    const [openValue, setOpenValue] = useState("");

    // Set default open value when data loads
    useEffect(() => {
        if (data && data.length > 0 && !openValue) {
            setOpenValue(data[0].id);
        }
    }, [data, openValue]);

    if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-20 w-full rounded-xl" />
                <Skeleton className="h-20 w-full rounded-xl" />
                <Skeleton className="h-20 w-full rounded-xl" />
            </div>
        )
    }

    if (!data || data.length === 0) {
        return (
            <div className="text-center py-10 bg-white rounded-2xl border shadow-sm">
                <p className="text-gray-500">No active subscriptions found.</p>
            </div>
        )
    }

    return (
        <div>
            <h4 className='font-semibold text-lg text-[#392b80] py-4'>Active Subscriptions</h4>

            <Accordion type="single" collapsible className="w-full" value={openValue} onValueChange={setOpenValue}>
                {data.map((child) => {

                    // Data is pre-calculated from backend
                    const totalPrice = child.totalChildPrice || 0;
                    const courseCount = child.enrolledCourses ? child.enrolledCourses.length : 0;

                    return (
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
                                        <p className='flex items-center text-gray-600 space-x-2 text-sm md:text-base'>
                                            <span>{courseCount === 1 ? `${courseCount} Course` : `${courseCount} Courses`}</span>
                                            <PiDotOutlineBold />
                                            <span>{totalPrice === 0 ? "Free" : `${totalPrice.toLocaleString()} EGP/month`}</span>
                                        </p>
                                    </div>
                                </div>
                            </AccordionTrigger>

                            <AccordionContent className='p-4 '>
                                {child.enrolledCourses && child.enrolledCourses.length > 0 ? (
                                    child.enrolledCourses.map((c, idx) => (
                                        <Card key={idx} className='p-4 mb-3 shadow-none border-gray-100'>
                                            <div className='flex justify-between items-start'>
                                                <div>
                                                    <p className='text-gray-900 font-bold mb-1 flex items-center gap-2'>
                                                        {c.title}
                                                        <span className="text-xs font-normal px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                                            {child.grade}
                                                        </span>
                                                    </p>
                                                    <p className='text-gray-600 text-sm mb-2'>{c.instructor}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold text-[#FF0055] text-sm">
                                                        {c.price === 0 ? "Free" : `${c.price} EGP`}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className='flex items-center gap-2 font-medium text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg w-fit'>
                                                <RiCalendarEventFill />
                                                <span> Next: {c.nextAttendance}</span>
                                            </div>
                                            {c.paidAt && (
                                                <p className="text-xs text-gray-400 mt-2">
                                                    Paid: {new Date(c.paidAt).toLocaleDateString()}
                                                </p>
                                            )}
                                        </Card>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center italic">No active courses.</p>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    )
                })}
            </Accordion>
        </div>
    )
}

export default ActiveSubscriptions