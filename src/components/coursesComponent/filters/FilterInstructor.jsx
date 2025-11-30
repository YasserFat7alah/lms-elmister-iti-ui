import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { mockTeachers } from '@/data/mockTeacher';
import React, { useState } from 'react';

const FilterInstructor = ({ onSearchInstructor, searchInstructor = [] }) => {
  const [showAll, setShowAll] = useState(false);

  const teachersToShow = showAll ? mockTeachers : mockTeachers.slice(0, 6);

  // Toggle checkbox selection
  const handleCheckboxChange = (teacherId) => {
    if (searchInstructor.includes(teacherId)) {
      onSearchInstructor(searchInstructor.filter((id) => id !== teacherId));
    } else {
      onSearchInstructor([...searchInstructor, teacherId]);
    }
  };

  return (
    <Accordion type="single" collapsible className="lg:border lg:px-2 lg:py-1 lg:rounded-lg">
      <AccordionItem value="instructor">
        
        <AccordionTrigger className="text-gray-800 data-[state=open]:bg-gray-100/50 lg:data-[state=open]:bg-white px-2 mb-3 lg:mb-1">
          Search by Instructor
        </AccordionTrigger>

        <AccordionContent className="px-3">
          <div className="flex flex-col gap-3">

            {/* LIST */}
            <div className={`flex flex-wrap items-center justify-start gap-x-3 gap-y-4 lg:gap-x-12 `}>
              {teachersToShow.map((teacher) => (
                <label key={teacher.id} className="flex items-center gap-2 text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    value={teacher.id}
                    checked={searchInstructor.includes(teacher.id)}
                    onChange={() => handleCheckboxChange(teacher.id)}
                  />
                  <span className='text-gray-700 font-semibold'>{teacher.name}</span>
                </label>
              ))}
            </div>

            {/* SEE MORE */}
            {mockTeachers.length > 6 && (
              <button
                className="text-sm text-start text-pink-600 font-semibold underline"
                onClick={() => setShowAll((prev) => !prev)}
              >
                {showAll ? "See Less" : "See More"}
              </button>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterInstructor;
