"use client";

import { FaList } from 'react-icons/fa';

const TableOfContents = ({ items }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-card border border-border rounded-xl p-6 sticky top-6">
      <div className="flex items-center gap-2 mb-4">
        <FaList className="h-5 w-5 text-[#FF0055]" />
        <h3 className="font-semibold text-foreground">Table of Contents</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200 flex items-center gap-2"
            >
              <span className="text-black font-medium">{String(index + 1).padStart(2, '0')}</span>
              <span>{item.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;