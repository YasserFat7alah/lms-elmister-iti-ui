import React from 'react'
import FilterCategory from './filters/FilterCategory'
import FilterInstructor from './filters/FilterInstructor'
import FilterPrice from './filters/FilterPrice'
import FilterLevel from './filters/FilterLevel'
import FilterPriceRange from './filters/FilterPriceRange'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { FaFilter } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";



const Filterition = ({ onFilter , selectedSubjects, onInstructorSearch , searchInstructor, priceFilter, onPriceChange , gradeFilter , onGradeChange , priceRange , onPriceRangeChange}) => {
  
   //RESET ALL FILTERS
    const handleReset = () => {
      onFilter([]); 
      onInstructorSearch([]); 
      onPriceChange("all"); 
      onGradeChange("all"); 
      onPriceRangeChange({ min: "", max: "" }); 
    };

  
  
  return (
    <div>
      {/* _________________________________ACCORDION FOR SMALL AND MEDIUM SCREENS________________________ */}
      <div  className="lg:hidden">
        <Accordion type="single" collapsible>
          <AccordionItem value="all-filters">
            
            <AccordionTrigger className='bg-gray-400/30 px-5 text-gray-800 font-bold text-md '>
              <p className='m-auto flex items-center gap-2'>
                <FaFilter size={18} />
                <span>Filter</span>
              </p>
            </AccordionTrigger>

            <AccordionContent className='px-3'>
              {/* RESET BUTTON  */}
              <div className="flex flex-row justify-between font-bold items-center  mt-4">
                    <p>Filters</p>
                  <div
                      onClick={handleReset}
                      className="text-pink-500 text-sm font-semibold underline  cursor-pointer"
                  >
                      Clear
                  </div>
              </div>

              <div className="flex flex-col gap-4 mt-2">
                <FilterCategory onFilter={onFilter} selectedSubjects={selectedSubjects}/>
                <FilterInstructor onSearchInstructor={onInstructorSearch} searchInstructor={searchInstructor}/>
                <FilterPrice priceFilter={priceFilter} onPriceChange={onPriceChange}/>
                <FilterLevel gradeFilter={gradeFilter} onGradeChange={onGradeChange}/>
                <FilterPriceRange priceRange={priceRange} onPriceRangeChange={onPriceRangeChange} maxPrice={100}/>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

      </div>


      {/* __________________________________________sTYLE FOR LARGE SCREENS_____________________________________________________ */}
      <div className="hidden lg:block  p-4 rounded-md w-72 h-fit">
        <div className="flex flex-row justify-between font-bold items-center mb-4">
          <p className="flex items-center gap-1 ">
            <span> <CiFilter size={20}/> </span>
            <span className='text-gray-800'>Filters</span>
          </p>
          <div
            onClick={handleReset}
            className="text-pink-500 text-sm font-semibold underline cursor-pointer"
          >
            Clear
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <FilterCategory onFilter={onFilter} selectedSubjects={selectedSubjects}/>
          <FilterInstructor onSearchInstructor={onInstructorSearch} searchInstructor={searchInstructor}/>
          <FilterPrice priceFilter={priceFilter} onPriceChange={onPriceChange}/>
          <FilterLevel gradeFilter={gradeFilter} onGradeChange={onGradeChange}/>
          <FilterPriceRange priceRange={priceRange} onPriceRangeChange={onPriceRangeChange} maxPrice={100}/>
        </div>
      </div>
    </div>
  )
}

export default Filterition