import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState, useRef } from "react";

const FilterLanguage = ({ languageFilter, onLanguageChange, availableLanguages = [] }) => {
    const [selectedLanguages, setSelectedLanguages] = useState(languageFilter || []);
    const isSyncingRef = useRef(false);

    const handleLanguageToggle = (lang) => {
        setSelectedLanguages(prev =>
            prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
        );
    };

    // Sync with prop
    useEffect(() => {
        const propStr = JSON.stringify([...(languageFilter || [])].sort());
        const stateStr = JSON.stringify([...selectedLanguages].sort());
        if (propStr !== stateStr) {
            isSyncingRef.current = true;
            setSelectedLanguages(languageFilter || []);
        }
    }, [languageFilter]);

    // Sync to parent
    useEffect(() => {
        if (isSyncingRef.current) {
            isSyncingRef.current = false;
            return;
        }
        const propStr = JSON.stringify([...(languageFilter || [])].sort());
        const stateStr = JSON.stringify([...selectedLanguages].sort());
        if (propStr !== stateStr) {
            onLanguageChange(selectedLanguages);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedLanguages]);

    // If no available languages, maybe show common ones or hide?
    // Showing defaults if empty for better UX
    const languagesToShow = availableLanguages.length > 0 ? availableLanguages : ["English", "Arabic"];

    return (
        <Accordion type="single" collapsible defaultValue="language" className="lg:border lg:px-2 lg:py-1 lg:rounded-lg">
            <AccordionItem value="language">
                <AccordionTrigger className="text-gray-800 data-[state=open]:bg-gray-100/50 lg:data-[state=open]:bg-white px-2 mb-3 lg:mb-1 rounded-none">
                    Language
                </AccordionTrigger>
                <AccordionContent>
                    <div className="px-3">
                        <div className="flex flex-col gap-3">
                            {languagesToShow.map((lang) => (
                                <div key={lang} className="flex gap-2 items-center">
                                    <Checkbox
                                        id={`lang-${lang}`}
                                        className="bg-white"
                                        checked={selectedLanguages.includes(lang)}
                                        onCheckedChange={() => handleLanguageToggle(lang)}
                                    />
                                    <Label className='text-gray-700' htmlFor={`lang-${lang}`}>
                                        {lang}
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

export default FilterLanguage;
