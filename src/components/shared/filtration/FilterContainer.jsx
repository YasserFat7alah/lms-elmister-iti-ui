"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FaFilter } from "react-icons/fa"; // Importing FontAwesome icon for filter
import { CiFilter } from "react-icons/ci"; // Importing another icon if needed

const FilterContainer = ({
    children,
    onClear,
    title = "Filters",
    className = ""
}) => {
    const [isOpen, setIsOpen] = useState(false);

    // Content Wrapper
    const FilterContent = (
        <div className="flex flex-col gap-4 h-full">
            {/* Header */}
            <div className="flex flex-row justify-between items-center pb-4 border-b border-gray-100 flex-none">
                <div className="flex items-center gap-2 text-gray-800 font-bold text-lg">
                    <CiFilter size={22} className="text-[#392b80]" />
                    <span>{title}</span>
                </div>
                {onClear && (
                    <button
                        onClick={onClear}
                        className="text-pink-500 text-sm font-semibold hover:underline cursor-pointer transition-colors"
                    >
                        Clear All
                    </button>
                )}
            </div>

            {/* Scrollable Filters Area */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-4
                scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
                [&::-webkit-scrollbar]:w-[2px]
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:bg-gray-300
                [&::-webkit-scrollbar-thumb]:rounded-full
                hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
                {children}
            </div>
        </div>
    );

    return (
        <>
            {/* 
        ------------------------------------------
        MOBILE: Floating Action Button (FAB)
        ------------------------------------------
      */}
            <div className="xl:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button
                            className="fixed bottom-6 left-6 z-50 rounded-full shadow-xl h-14 w-14 p-0 bg-[#392b80] text-white hover:bg-[#392b80]/90 hover:scale-105 transition-all duration-300"
                            size="icon"
                        >
                            <FaFilter size={20} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[350px] flex flex-col h-full bg-white/95 backdrop-blur-sm">
                        {/* Content is passed directly without extra header since we have a custom header inside FilterContent */}
                        <div className="mt-4 h-full">
                            {FilterContent}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* 
        ------------------------------------------
        DESKTOP / TABLET: Sidebar
        ------------------------------------------
        Sticky positioning, calculating height to fit viewport minus header offset.
      */}
            <div className={`hidden xl:flex flex-col w-full bg-white border border-gray-100 shadow-sm rounded-xl p-4 ${className}`}
                style={{
                    position: 'sticky',
                    top: '90px', // Adjusted alignment
                    height: 'calc(100vh - 100px)',
                    maxHeight: 'calc(100vh - 100px)'
                }}
            >
                {FilterContent}
            </div>
        </>
    );
};

export default FilterContainer;
