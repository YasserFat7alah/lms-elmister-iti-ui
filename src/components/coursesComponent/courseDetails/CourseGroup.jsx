'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import React from 'react';

const CourseGroupAccordion = ({ groups }) => {
  if (!groups) return null;

  return (
    <div className="p-4 my-5 mx-4 border rounded-md">
      <h3 className="font-bold text-gray-800 mb-4 text-xl">Course Groups</h3>

      <Accordion type="single" collapsible>
        {/* __________________________________Private Groups_______________________________ */}
        <AccordionItem value="private">
          <AccordionTrigger className='text-pink-600'>Private Groups</AccordionTrigger>
          <AccordionContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groups.privateGroups.map((group) => (
              <div key={group.id} className="p-4 border rounded-lg shadow-sm bg-white">
                <p><span className="font-semibold mr-1">Days :</span> <span className='text-gray-600'> {group.days.join(', ')} </span></p>
                <p><span className="font-semibold mr-1">Time :</span> <span className='text-gray-600'>{group.time}</span></p>
                <p>
                  <span className="font-semibold mr-1">Students :</span> 
                  <span className='text-gray-600'> {group.currentMembers} / {group.maxMembers} </span>
                </p>
                <p className={`font-semibold mt-2 ${group.status === 'full' ? 'text-red-600' : 'text-green-600'}`}>
                  {group.status === 'full' ? 'Full' : 'Available'}
                </p>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* ____________________________Shared Groups________________________________ */}
        <AccordionItem value="shared">
          <AccordionTrigger className="text-blue-800">Shared Groups</AccordionTrigger>
          <AccordionContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groups.sharedGroups.map((group) => (
              <div key={group.id} className="p-4 border rounded-lg shadow-sm bg-white">
                <p><span className="font-semibold mr-1">Days :</span> <span className='text-gray-600'> {group.days.join(', ')} </span></p>
                <p><span className="font-semibold mr-1">Time :</span> <span className='text-gray-600'> {group.time}</span> </p>
                <p>
                  <span className="font-semibold mr-1">Students :</span> 
                  <span className='text-gray-600'> {group.currentMembers} / {group.maxMembers}</span>
                </p>
                <p className={`font-semibold mt-2 ${group.status === 'full' ? 'text-red-600' : 'text-green-600'}`}>
                  {group.status === 'full' ? 'Full' : 'Available'}
                </p>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CourseGroupAccordion;
