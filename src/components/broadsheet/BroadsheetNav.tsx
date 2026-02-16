'use client';

import React from 'react';

const SECTIONS = [
  'SECURITY',
  'NLP & AI',
  'COMPUTER VISION',
  'HEALTHCARE',
  'FINANCE',
  'WEB',
];

export const BroadsheetNav: React.FC = () => {
  return (
    <nav className="w-full bg-news-bg border-b-2 border-news-ink py-2 overflow-x-auto">
      <div className="max-w-6xl mx-auto flex justify-center items-center px-4 font-serif text-sm md:text-base font-bold tracking-tight whitespace-nowrap">
        {SECTIONS.map((section, index) => (
          <React.Fragment key={section}>
            {index > 0 && <span className="mx-4 text-news-ink opacity-50">|</span>}
            <a 
              href={`#${section.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
              className="hover:text-news-accent transition-colors duration-200"
            >
              [{section}]
            </a>
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};
