'use client';

import React from 'react';
import { Sun, Cloud, Calendar } from 'lucide-react';

export const BroadsheetMasthead: React.FC = () => {
  return (
    <header className="w-full flex flex-col items-center pt-8 pb-4 px-4 bg-news-bg text-news-ink">
      <div className="w-full max-w-6xl flex justify-center items-center mb-6">
        <h1 className="font-serif text-6xl md:text-9xl font-bold tracking-tight text-center">
          Kanak Megha
        </h1>
      </div>

      <div className="w-full max-w-6xl border-t-2 border-b-4 border-news-ink border-double flex justify-between items-center py-2 px-6 font-serif text-xs md:text-sm uppercase tracking-widest font-bold">
        <span>BENGALURU EDITION</span>
        <span className="italic">"The Daily Code Report"</span>
        <span>Est. 2026</span>
      </div>
    </header>
  );
};
