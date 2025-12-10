import React from 'react';

const SectionHeader = ({
    title,
    children,
    className = ""
}) => {
    return (
        <div className={`w-full bg-linear-to-r from-[#FFF0F0] to-[#E8F0FF] border-b border-gray-100 py-6 mb-6 ${className}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

                    {/* Left Column: Title */}
                    <h1 className="text-2xl md:text-3xl font-extrabold text-[#392b80] tracking-tight">
                        {title}
                    </h1>

                    {/* Right Column: Key Content (Children) */}
                    <div className="w-full md:w-auto shrink-0">
                        {children}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SectionHeader;
