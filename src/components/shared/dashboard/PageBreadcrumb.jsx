import React from 'react';
import Link from 'next/link';

const PageBreadcrumb = ({ title = "Dashboard", currentPage = "Dashboard" }) => {
  return (
    <div className="bg-gradient-to-r from-[#FFF0F0] to-[#E8F0FF] py-10 w-full border-b border-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 font-medium">
            <Link href="/" className="hover:text-[#FF0055] transition-colors">Home</Link>
            <span className="text-gray-300">•</span>
            <span className="text-[#FF0055]">{currentPage}</span>
        </div>
      </div>
    </div>
  );
};

export default PageBreadcrumb;