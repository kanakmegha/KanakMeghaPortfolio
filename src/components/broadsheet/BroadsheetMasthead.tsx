"use client";

import React from "react";
import { Calendar, Cloud, Sun } from "lucide-react";

export const BroadsheetMasthead: React.FC = () => {
  return (
    <header className="w-full flex flex-col items-center pt-10 pb-4 px-4 bg-news-bg text-news-ink relative">
      {/* Tech Bulletin Box - CRO Improvement: Desktop */}
      <div className="absolute top-8 right-6 md:right-16 border-2 border-news-ink p-2 max-w-[150px] hidden lg:block transform rotate-1 shadow-[4px_4px_0px_0px_rgba(26,26,26,0.1)]">
        <div className="border-b border-news-ink bg-news-ink text-white text-[8px] font-black uppercase tracking-widest px-1 py-0.5 mb-1 text-center">
          Tech Bulletin
        </div>
        <div className="font-serif font-black text-[10px] leading-tight flex flex-col gap-0.5">
          <span>• PYTHON / RAG</span>
          <span>• LLAMA3 / GEN AI</span>
          <span>• NEXT.JS / REACT</span>
          <span>• TYPESCRIPT</span>
        </div>
      </div>

      <div className="w-full max-w-6xl flex justify-center items-center mb-4">
        <h1 className="font-serif text-6xl md:text-9xl font-bold tracking-tighter text-center uppercase">
          Kanak Megha
        </h1>
      </div>

      {/* Mobile Tech Bulletin */}
      <div className="lg:hidden border-2 border-news-ink p-2 mb-6 w-full max-w-[300px] text-center shadow-[4px_4px_0px_0px_rgba(26,26,26,0.1)]">
        <div className="bg-news-ink text-white text-[8px] font-black uppercase tracking-widest px-1 py-0.5 mb-2">
          Core Technical Stack
        </div>
        <div className="font-serif font-black text-[10px] uppercase tracking-widest flex flex-wrap justify-center gap-x-4 gap-y-1">
          <span>Python / RAG</span>
          <span>Llama3 / AI</span>
          <span>Next.js / React</span>
        </div>
      </div>

      <div className="w-full max-w-6xl border-t-2 border-b-4 border-news-ink border-double flex flex-col md:flex-row justify-between items-center py-2 px-6 font-serif text-[10px] md:text-xs uppercase tracking-[0.3em] font-black">
        <div className="flex items-center gap-4">
          <span>BENGALURU EDITION</span>
          <span className="hidden md:inline text-news-ink/30">|</span>
          <span className="italic text-news-accent">
            "The Daily Code Report"
          </span>
        </div>
        <div className="flex items-center gap-6 mt-2 md:mt-0">
          <span className="font-black">VOL. MMXXVI — NO. 42</span>
          <span className="hidden md:inline text-news-ink/30">|</span>
          <span className="bg-news-ink text-white px-2 py-0.5">EST. 2026</span>
        </div>
      </div>
    </header>
  );
};
