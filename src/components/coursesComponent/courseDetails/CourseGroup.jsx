'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import React from 'react';

const CourseGroupAccordion = ({ groups }) => {
  
  const safeGroups = Array.isArray(groups) ? groups : [];

  if (safeGroups.length === 0) {
      return (
          <div className="p-4 my-5 mx-4 border rounded-md text-gray-500">
              No groups available for this course yet.
          </div>
      );
  }

  // 1. تصنيف المجموعات بناءً على السعة القصوى
  const privateGroups = safeGroups.filter(group => group.capacity === 1);
  const sharedGroups = safeGroups.filter(group => group.capacity > 1);

  // دالة صغيرة لحساب الحالة بناءً على العدد والسعة (الشرط الجديد)
  const getStatusBadge = (current, max) => {
      // الشرط: لو العدد الحالي أكبر من أو يساوي السعة القصوى
      const isFull = (current || 0) >= max;
      
      if (isFull) {
          return <span className="text-red-600 font-bold bg-red-100 px-2 py-1 rounded text-sm">Full (Complete)</span>;
      }
      return <span className="text-green-600 font-bold bg-green-100 px-2 py-1 rounded text-sm">Available</span>;
  };

  return (
    <div className="p-4 my-5 mx-4 border rounded-md">
      <h3 className="font-bold text-gray-800 mb-4 text-xl">Course Groups</h3>

      <Accordion type="single" collapsible className="w-full">
        
        {/* __________________ Private Groups (Capacity = 1) __________________ */}
        {privateGroups.length > 0 && (
          <AccordionItem value="private">
            <AccordionTrigger className='text-pink-600 font-bold'>
               Private Sessions (1-on-1)
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {privateGroups.map((group) => (
                <div key={group._id} className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow relative">
                  <h5 className="font-bold text-lg mb-2 text-pink-900">{group.title}</h5>
                  <p className='mb-1'><span className="font-semibold mr-1">Start Date:</span> <span className='text-gray-600'> {new Date(group.startingDate).toLocaleDateString()} </span></p>
                  <p className='mb-1'><span className="font-semibold mr-1">Time:</span> <span className='text-gray-600'>{group.time || "Check schedule"}</span></p>
                  
                  {/* تطبيق الشرط هنا */}
                  <div className="mt-3 flex justify-between items-center">
                       {getStatusBadge(group.studentsCount, group.capacity)}
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        )}

        {/* __________________ Shared Groups (Capacity > 1) __________________ */}
        {sharedGroups.length > 0 && (
          <AccordionItem value="shared">
            <AccordionTrigger className="text-blue-800 font-bold">
              Shared Groups
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {sharedGroups.map((group) => (
                <div key={group._id} className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow">
                  <h5 className="font-bold text-lg mb-2 text-indigo-900">{group.title}</h5>
                  <p className='mb-1'><span className="font-semibold mr-1">Start Date:</span> <span className='text-gray-600'> {new Date(group.startingDate).toLocaleDateString()} </span></p>
                  <p className='mb-1'><span className="font-semibold mr-1">Time:</span> <span className='text-gray-600'>{group.time || "Check schedule"}</span></p>
                  
                  <p className="mb-2">
                    <span className="font-semibold mr-1">Students:</span> 
                    <span className='text-gray-600'> {group.studentsCount || 0} / {group.capacity} </span>
                  </p>

                   {/* تطبيق الشرط هنا */}
                  <div className="mt-2">
                      {getStatusBadge(group.studentsCount, group.capacity)}
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        )}

      </Accordion>
    </div>
  );
};

export default CourseGroupAccordion;