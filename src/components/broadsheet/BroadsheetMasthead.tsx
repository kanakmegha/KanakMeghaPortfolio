'use client';

import React from 'react';
import { Sun, Cloud, Calendar } from 'lucide-react';

export const BroadsheetMasthead: React.FC = () => {
  return (
    <header className="w-full flex flex-col items-center pt-8 pb-4 px-4 bg-white text-news-ink">
      <div className="w-full max-w-6xl flex justify-center items-center mb-6">
        <h1 className="font-sans text-6xl md:text-8xl font-black tracking-tighter text-center uppercase">
          Kanak Megha
        </h1>
      </div>

      <div className="w-full max-w-6xl border-t-2 border-b-2 border-news-ink flex justify-center items-center py-2 font-sans text-xs md:text-sm uppercase tracking-[0.3em] font-black">
        <span>BENGALURU EDITION | SOFTWARE & AI REPORTER</span>
      </div>
    </header>
  );
};
