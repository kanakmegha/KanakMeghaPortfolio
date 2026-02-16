'use client';

import React from 'react';

const SECTIONS = [
  'ALL', 
  'NLP & AI', 
  'DEEP LEARNING', 
  'SOFTWARE DEV', 
  'FINANCE'
];

interface BroadsheetNavProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const BroadsheetNav: React.FC<BroadsheetNavProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <nav className="w-full bg-news-bg border-b-2 border-news-ink py-4 overflow-x-auto sticky top-0 z-30 shadow-sm px-4">
      <div className="max-w-6xl mx-auto flex justify-center items-center gap-4 font-serif text-xs md:text-sm font-black tracking-[0.1em] whitespace-nowrap">
        {SECTIONS.map((section, index) => (
          <button 
            key={section}
            onClick={() => onFilterChange(section)}
            className={`cursor-pointer px-4 py-2 transition-all duration-300 transform rounded-sm
              ${activeFilter === section 
                ? 'bg-news-ink text-news-bg shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3)] scale-95 border-b-4 border-news-ink' 
                : 'text-news-ink hover:bg-yellow-200 hover:rotate-1 hover:scale-105 shadow-[2px_2px_0px_0px_rgba(26,26,26,0.1)]'
              }`}
          >
            {section}
          </button>
        ))}
      </div>
    </nav>
  );
};
