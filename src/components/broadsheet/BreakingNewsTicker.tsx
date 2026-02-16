'use client';

import React from 'react';

const SKILLS = [
  "JAVA", "PYTHON", "REACT", "NEXT.JS", "MACHINE LEARNING", "DEEP LEARNING", "NLP", "COMPUTER VISION", "GEN AI", "TYPESCRIPT", "TAILWIND CSS", "BENGALURU DEVELOPER HITS NEW MILESTONE"
];

export const BreakingNewsTicker: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-news-accent text-white h-10 flex items-center overflow-hidden z-50 border-t-2 border-white/20">
      <div className="bg-white text-news-accent px-4 h-full flex items-center font-black uppercase text-xs tracking-widest z-10 shadow-[4px_0_10px_rgba(0,0,0,0.1)]">
        Breaking News
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div className="whitespace-nowrap animate-ticker flex items-center">
          {[...SKILLS, ...SKILLS].map((skill, i) => (
            <span key={i} className="inline-block px-8 font-mono text-sm font-bold uppercase tracking-widest">
              {skill} <span className="mx-4 text-white/40">●</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
