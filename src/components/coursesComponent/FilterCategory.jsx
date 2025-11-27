import React, { useEffect, useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label"
import { subjects } from '@/data/mockSubjects';
import { RxReset } from "react-icons/rx";
import { Button } from '../ui/button';

const FilterCategory = ({onFilter}) => {

    const [selectedSubjects , setSelectedSubjects] = useState([]);

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

    //RESET CHECKBOXS
    const handleReset = () => {
        setSelectedSubjects([]);
    };



  return (
    <div  className='bg-gray-100 flex lg:w-[25%] flex-col px-4 py-6 mb-4 rounded-md relative'>

        {/* CATEGORY FILTER AND SELECTION */}
        <div className='mb-1'>
            <div className='flex flex-row justify-between items-center mb-2 '> 
                <h4 className='font-semibold text-lg pb-2 mb-4 relative'>
                    Course Categories
                    <span className='absolute left-0 bottom-0 w-38 h-0.5 bg-black'></span>
                </h4>

                {/* RESET BUTTON */}
                <div onClick={handleReset} className="bg-yellow-400 text-white p-1 rounded-full relative -top-2 cursor-pointer" >
                    <RxReset size={20}/>
                </div>
            </div>
            <div className="flex flex-wrap items-center justify-start gap-5 ">
                {subjects.map(subject=>(
                    <div key={subject} className='flex gap-2 items-center'>
                        <Checkbox id={subject} className='bg-white' 
                                    checked={selectedSubjects.includes(subject)}
                                    onCheckedChange={() => handleSubjectToggle(subject)}
                        />
                        <Label htmlFor={subject}>{subject}</Label>
                    </div>
                ))}
            </div>

            
        </div>

    </div>
  )
}

export default FilterCategory