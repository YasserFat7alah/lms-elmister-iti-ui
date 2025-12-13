import Link from 'next/link';
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = ({ items = [], className = "" }) => {
    if (items.length === 0) return null;

    return (
        <nav className={`flex items-center space-x-2 text-sm text-gray-500 font-medium bg-white/50 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm ${className}`}>
            <Link href="/" className="hover:text-[#FF0055] transition-colors flex items-center gap-1">
                <Home size={14} />
                <span>Home</span>
            </Link>

            {items.map((crumb, index) => (
                <React.Fragment key={index}>
                    <ChevronRight size={14} className="text-gray-300" />
                    {crumb.href ? (
                        <Link href={crumb.href} className="hover:text-[#FF0055] transition-colors">
                            {crumb.label}
                        </Link>
                    ) : (
                        <span className={index === items.length - 1 ? "text-[#FF0055] font-semibold" : "text-gray-600"}>
                            {crumb.label}
                        </span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumbs;
