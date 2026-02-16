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
    <nav className="w-full bg-news-bg border-b-2 border-news-ink py-3 overflow-x-auto sticky top-0 z-30 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-center items-center px-4 font-serif text-xs md:text-sm font-black tracking-[0.15em] whitespace-nowrap">
        {SECTIONS.map((section, index) => (
          <React.Fragment key={section}>
            {index > 0 && <span className="mx-6 text-news-ink opacity-30">|</span>}
            <button 
              onClick={() => onFilterChange(section)}
              className={`hover:text-news-accent transition-colors duration-200 ${
                activeFilter === section ? 'text-news-accent border-b-2 border-news-accent font-black' : 'text-news-ink'
              }`}
            >
              [{section}]
            </button>
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};
