"use client";
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FilterSection = ({
    title,
    children,
    value,
    defaultOpen = true,
    className = ""
}) => {
    // Use 'value' or sanitize title as ID
    const itemId = value || title.toLowerCase().replace(/\s+/g, '-');

    return (
        <Accordion type="single" collapsible defaultValue={defaultOpen ? itemId : undefined} className={`w-full ${className}`}>
            <AccordionItem value={itemId} className="border-b-0">
                <AccordionTrigger className="text-gray-900 font-bold hover:text-[#392b80] hover:no-underline py-3 text-base">
                    {title}
                </AccordionTrigger>
                <AccordionContent>
                    <div className="pt-1 pb-2">
                        {children}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default FilterSection;
