import React, { useEffect, useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion';

const FilterCategory = ({ onFilter, selectedSubjects: externalSelectedSubjects = [], availableSubjects = [] }) => {

    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [showAll, setShowAll] = useState(false);

    // Sync with external state when reset
    useEffect(() => {
        if (Array.isArray(externalSelectedSubjects) && externalSelectedSubjects.length === 0 && selectedSubjects.length > 0) {
            setSelectedSubjects([]);
        }
    }, [externalSelectedSubjects]);

    const handleSubjectToggle = (subject) => {
        setSelectedSubjects(prev =>
            prev.includes(subject)
                ? prev.filter(s => s !== subject)
                : [...prev, subject]
        );
    };

    useEffect(() => {
        onFilter(selectedSubjects);
    }, [selectedSubjects]);

    // For large screens, show only 6 items 
    const displayedSubjects = showAll ? availableSubjects : availableSubjects.slice(0, 6);
    const hasMoreSubjects = availableSubjects.length > 6;



    return (
        <Accordion type="single" collapsible defaultValue="course-categories" className='lg:border lg:px-2 lg:py-1 lg:rounded-lg'>
            <AccordionItem value="course-categories">

                {/* ACCORDION TITLE */}
                <AccordionTrigger className="text-gray-800 data-[state=open]:bg-gray-100/50 lg:data-[state=open]:bg-white px-2 mb-3 lg:mb-1 rounded-none">
                    Categories
                </AccordionTrigger>

                {/* ACCORDION BODY */}
                <AccordionContent>
                    <div className="px-3">

                        {/* SUBJECTS CHECKBOXES */}
                        <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-4 ">
                            {/* Show all on mobile/tablet, limited on large screens */}
                            <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-4 w-full lg:hidden">
                                {availableSubjects.map((subject) => (
                                    <div key={subject} className="flex gap-2 items-center">
                                        <Checkbox
                                            id={`mobile-${subject}`}
                                            className="bg-white"
                                            checked={selectedSubjects.includes(subject)}
                                            onCheckedChange={() => handleSubjectToggle(subject)}
                                        />
                                        <Label className='text-gray-800' htmlFor={`mobile-${subject}`}>{subject}</Label>
                                    </div>
                                ))}
                            </div>

                            {/* Show limited items on large screens */}
                            <div className="hidden lg:flex flex-col w-full gap-3">
                                {displayedSubjects.map((subject) => (
                                    <div key={subject} className="flex gap-2 items-center w-full">
                                        <Checkbox
                                            id={`desktop-${subject}`}
                                            className="bg-white"
                                            checked={selectedSubjects.includes(subject)}
                                            onCheckedChange={() => handleSubjectToggle(subject)}
                                        />
                                        <Label className='text-gray-800' htmlFor={`desktop-${subject}`}>{subject}</Label>
                                    </div>
                                ))}
                                {hasMoreSubjects && (
                                    <button
                                        onClick={() => setShowAll(!showAll)}
                                        className="text-sm underline cursor-pointer text-pink-500 hover:text-pink-700 mt-2 text-left font-medium self-start"
                                    >
                                        {showAll ? 'See Less' : 'See More'}
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                </AccordionContent>

            </AccordionItem>
        </Accordion>

    )
}

export default FilterCategory