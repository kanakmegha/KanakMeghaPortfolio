'use client';

import React from 'react';

const SECTIONS = [
  'ALL', 
  'SOFTWARE DEVELOPMENT', 
  'AI & MACHINE LEARNING', 
  'DEEP LEARNING', 
  'RESEARCH & SIMULATION'
];

interface BroadsheetNavProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const BroadsheetNav: React.FC<BroadsheetNavProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <nav className="w-full bg-white border-b border-news-ink/10 py-4 overflow-x-auto sticky top-0 z-30 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-center items-center px-4 font-sans text-[10px] md:text-xs font-black tracking-[0.2em] whitespace-nowrap">
        {SECTIONS.map((section, index) => (
          <React.Fragment key={section}>
            {index > 0 && <span className="mx-4 text-news-ink opacity-10">/</span>}
            <button 
              onClick={() => onFilterChange(section)}
              className={`hover:text-news-accent transition-all duration-200 px-2 py-1 ${
                activeFilter === section ? 'bg-news-ink text-white' : 'text-news-ink/60'
              }`}
            >
              {section}
            </button>
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};
