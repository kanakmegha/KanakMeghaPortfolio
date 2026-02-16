'use client';

import React from 'react';
import { Sun, Cloud, Calendar } from 'lucide-react';

export const BroadsheetMasthead: React.FC = () => {
  return (
    <header className="w-full flex flex-col items-center pt-12 pb-6 px-4 bg-news-bg text-news-ink border-b-2 border-news-ink">
      <div className="w-full max-w-6xl flex justify-between items-end mb-4">
        {/* Left Weather */}
        <div className="hidden md:flex flex-col items-center text-[10px] uppercase font-bold tracking-tighter w-32 border border-news-ink p-1">
          <Sun className="w-4 h-4 mb-1 text-news-ink" />
          <span className="text-center">Clear Skies for Scalable Code</span>
        </div>

        {/* Nameplate */}
        <h1 className="font-blackletter text-7xl md:text-[120px] tracking-tighter leading-none text-center flex-1">
          Kanak Megha
        </h1>

        {/* Right Weather/Date */}
        <div className="hidden md:flex flex-col items-center text-[10px] uppercase font-bold tracking-tighter w-32 border border-news-ink p-1">
          <Calendar className="w-4 h-4 mb-1 text-news-ink" />
          <span className="text-center">Bengaluru Edition | Feb 16, 2026</span>
        </div>
      </div>

      <div className="w-full max-w-6xl border-t border-b-4 border-news-ink border-double flex justify-between items-center py-2 px-6 font-serif text-xs md:text-sm uppercase tracking-widest font-bold">
        <span>Est. 2026</span>
        <span className="md:block hidden italic text-[10px]">"All the Code That's Fit to Print"</span>
        <span>Price: 0.00 BTC</span>
      </div>
    </header>
  );
};
