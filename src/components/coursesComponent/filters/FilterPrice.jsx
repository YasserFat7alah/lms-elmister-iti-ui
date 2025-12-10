import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState, useRef } from "react";

const PRICE_RANGES = [
  { label: "Free", value: "Free" },
  { label: "0-50 EGP", value: "0-50" },
  { label: "50-100 EGP", value: "50-100" },
  { label: "100-150 EGP", value: "100-150" },
  { label: "150+ EGP", value: "150-10000" } // Open ended catch-all
];

const FilterPrice = ({ priceFilter, onPriceChange }) => {
  const [selectedRanges, setSelectedRanges] = useState(priceFilter || []);
  const isSyncingRef = useRef(false);

  const handleRangeToggle = (value) => {
    setSelectedRanges(prev =>
      prev.includes(value) ? prev.filter(r => r !== value) : [...prev, value]
    );
  };

  // Sync with prop
  useEffect(() => {
    const propStr = JSON.stringify([...(priceFilter || [])].sort());
    const stateStr = JSON.stringify([...selectedRanges].sort());
    if (propStr !== stateStr) {
      isSyncingRef.current = true;
      setSelectedRanges(priceFilter || []);
    }
  }, [priceFilter]);

  // Sync to parent
  useEffect(() => {
    if (isSyncingRef.current) {
      isSyncingRef.current = false;
      return;
    }
    const propStr = JSON.stringify([...(priceFilter || [])].sort());
    const stateStr = JSON.stringify([...selectedRanges].sort());
    if (propStr !== stateStr) {
      onPriceChange(selectedRanges);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRanges]);

  return (
    <Accordion type="single" collapsible defaultValue="price" className="lg:border lg:px-2 lg:py-1 lg:rounded-lg">
      <AccordionItem value="price">
        <AccordionTrigger className="text-gray-800 data-[state=open]:bg-gray-100/50 lg:data-[state=open]:bg-white px-2 mb-3 lg:mb-1 rounded-none">
          Price
        </AccordionTrigger>
        <AccordionContent>
          <div className="px-3">
            <div className="flex flex-col gap-3">
              {PRICE_RANGES.map((range) => (
                <div key={range.value} className="flex gap-2 items-center">
                  <Checkbox
                    id={`price-${range.value}`}
                    className="bg-white"
                    checked={selectedRanges.includes(range.value)}
                    onCheckedChange={() => handleRangeToggle(range.value)}
                  />
                  <Label className='text-gray-700' htmlFor={`price-${range.value}`}>
                    {range.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterPrice;