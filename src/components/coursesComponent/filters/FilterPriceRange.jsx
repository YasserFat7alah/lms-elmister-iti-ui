import React from 'react'
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';



const FilterPriceRange = ({ priceRange, onPriceRangeChange, maxPrice = 100 }) => {
  return (
    <Accordion type="single" collapsible  className="lg:border lg:px-2 lg:py-1 lg:rounded-lg">
      <AccordionItem value="price-range">
        <AccordionTrigger className="text-gray-800 data-[state=open]:bg-gray-100/50 lg:data-[state=open]:bg-white px-2 mb-3 lg:mb-1 rounded-none">Price Range</AccordionTrigger>
        <AccordionContent>
          <div className=" w-64 px-3 lg:pl-2 lg:pr-7">
            <label className="block mb-2 font-medium">
              ${priceRange?.min || 0} - ${priceRange?.max || maxPrice}
            </label>
            
            <Slider
              value={[priceRange?.min || 0, priceRange?.max || maxPrice]}
              min={0}
              max={maxPrice}
              step={1}
              onValueChange={([min, max]) => onPriceRangeChange({ min, max })}
              className="w-full"
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default FilterPriceRange