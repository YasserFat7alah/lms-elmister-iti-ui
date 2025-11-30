import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import React, { useEffect, useState, useRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const FilterPrice = ({ priceFilter, onPriceChange }) => {
  const priceTypes = ["free", "paid"];
  const [selectedPrices, setSelectedPrices] = useState(
    Array.isArray(priceFilter) ? priceFilter : priceFilter !== "all" ? [priceFilter] : []
  );
  const isSyncingRef = useRef(false);

  const handlePriceToggle = (priceType) => {
    setSelectedPrices(prev => 
      prev.includes(priceType)
        ? prev.filter(p => p !== priceType)
        : [...prev, priceType]
    );
  };

  // Sync with external state when reset (only when external changes to reset)
  useEffect(() => {
    if (priceFilter === "all" && selectedPrices.length > 0) {
      isSyncingRef.current = true;
      setSelectedPrices([]);
    } else if (Array.isArray(priceFilter) && priceFilter.length > 0) {
      const priceFilterStr = JSON.stringify([...priceFilter].sort());
      const selectedPricesStr = JSON.stringify([...selectedPrices].sort());
      if (priceFilterStr !== selectedPricesStr) {
        isSyncingRef.current = true;
        setSelectedPrices(priceFilter);
      }
    }
  }, [priceFilter]);

  // Update parent when local state changes (only if different from current prop)
  useEffect(() => {
    if (isSyncingRef.current) {
      isSyncingRef.current = false;
      return;
    }

    if (selectedPrices.length === 0) {
      if (priceFilter !== "all") {
        onPriceChange("all");
      }
    } else {
      const selectedPricesStr = JSON.stringify([...selectedPrices].sort());
      const priceFilterStr = Array.isArray(priceFilter) ? JSON.stringify([...priceFilter].sort()) : "";
      if (selectedPricesStr !== priceFilterStr) {
        onPriceChange(selectedPrices);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPrices]);

  return (
    <Accordion type="single" collapsible className='lg:border lg:px-2 lg:py-1 lg:rounded-lg'>
      <AccordionItem value="price-filter">
        <AccordionTrigger className='text-gray-800 data-[state=open]:bg-gray-100/50 lg:data-[state=open]:bg-white px-2 mb-3 lg:mb-1'>Price Filter</AccordionTrigger>
        <AccordionContent>
          <div className="px-3">
            <div className="flex flex-wrap items-center lg:items-start justify-start gap-x-3 gap-y-4  lg:flex-col">
              {priceTypes.map((priceType) => (
                <div key={priceType} className="flex gap-2 items-center">
                  <Checkbox
                    id={`price-${priceType}`}
                    className="bg-white"
                    checked={selectedPrices.includes(priceType)}
                    onCheckedChange={() => handlePriceToggle(priceType)}
                  />
                  <Label className='text-gray-700 capitalize' htmlFor={`price-${priceType}`}>
                    {priceType}
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