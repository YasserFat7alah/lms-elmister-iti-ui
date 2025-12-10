"use client";
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const CourseSearch = ({ onSearch, className = "" }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <div className={`relative w-full md:w-72 lg:w-96 group ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400 group-hover:text-[#392b80] transition-colors" />
      </div>
      <Input
        className="pl-10 pr-4 py-2 h-10 w-full rounded-full border-gray-200 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-[#392b80]/30 focus:border-[#392b80] focus:ring-[#392b80]/20 transition-all duration-300 placeholder:text-gray-400 text-gray-700"
        type='search'
        placeholder="Search courses..."
        onChange={handleSearch}
      />
    </div>
  );
}

export default CourseSearch;