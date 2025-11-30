import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import React, { useEffect, useState, useRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const FilterLevel = ({ gradeFilter, onGradeChange }) => {
  
    const levels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    const [selectedGrades, setSelectedGrades] = useState(
      Array.isArray(gradeFilter) ? gradeFilter : gradeFilter !== "all" ? [gradeFilter] : []
    );
    const isSyncingRef = useRef(false);

    const handleGradeToggle = (level) => {
      setSelectedGrades(prev => 
        prev.includes(level)
          ? prev.filter(g => g !== level)
          : [...prev, level]
      );
    };

    // Sync with external state when reset (only when external changes to reset)
    useEffect(() => {
      if (gradeFilter === "all" && selectedGrades.length > 0) {
        isSyncingRef.current = true;
        setSelectedGrades([]);
      } else if (Array.isArray(gradeFilter) && gradeFilter.length > 0) {
        const gradeFilterStr = JSON.stringify([...gradeFilter].sort());
        const selectedGradesStr = JSON.stringify([...selectedGrades].sort());
        if (gradeFilterStr !== selectedGradesStr) {
          isSyncingRef.current = true;
          setSelectedGrades(gradeFilter);
        }
      }
    }, [gradeFilter]);

    // Update parent when local state changes (only if different from current prop)
    useEffect(() => {
      if (isSyncingRef.current) {
        isSyncingRef.current = false;
        return;
      }

      if (selectedGrades.length === 0) {
        if (gradeFilter !== "all") {
          onGradeChange("all");
        }
      } else {
        const selectedGradesStr = JSON.stringify([...selectedGrades].sort());
        const gradeFilterStr = Array.isArray(gradeFilter) ? JSON.stringify([...gradeFilter].sort()) : "";
        if (selectedGradesStr !== gradeFilterStr) {
          onGradeChange(selectedGrades);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedGrades]);
  
    return (
      <Accordion type="single" collapsible className="lg:border lg:px-2 lg:py-1 lg:rounded-lg">
      <AccordionItem value="grade-level">
        <AccordionTrigger className="text-gray-800 data-[state=open]:bg-gray-100/50 lg:data-[state=open]:bg-white px-2 mb-3 lg:mb-1 rounded-none">Grade Level</AccordionTrigger>

        <AccordionContent>
          <div className="px-3">
            <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-4 lg:gap-x-12">
              {levels.map((level) => (
                <div key={level} className="flex gap-2 items-center">
                  <Checkbox
                    id={`grade-${level}`}
                    className="bg-white"
                    checked={selectedGrades.includes(level)}
                    onCheckedChange={() => handleGradeToggle(level)}
                  />
                  <Label className='text-gray-700' htmlFor={`grade-${level}`}>
                    Grade {level}
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
  
  export default FilterLevel;