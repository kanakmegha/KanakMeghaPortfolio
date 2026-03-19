"use client";

import React from "react";

const SECTIONS = [
  "ALL",
  "NLP & AI",
  "DEEP LEARNING",
  "SOFTWARE DEV",
  "FINANCE",
];

interface BroadsheetNavProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const BroadsheetNav: React.FC<BroadsheetNavProps> = (
  { activeFilter, onFilterChange },
) => {
  return (
    <nav className="w-full bg-news-bg border-b-2 border-news-ink py-3 sticky top-0 z-30 shadow-sm px-4 md:px-8">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* News Sections (Filter) */}
        <div className="flex flex-wrap justify-center items-center gap-2 font-serif text-[10px] md:text-xs font-black tracking-widest whitespace-nowrap order-2 md:order-1">
          <span className="text-news-ink/40 mr-2 border-r border-news-ink/20 pr-4 italic">
            Sections:
          </span>
          {SECTIONS.map((section) =>
            (section === "ALL" || section === "NLP & AI" ||
              section === "DEEP LEARNING" || section === "SOFTWARE DEV") && (
              <button
                key={section}
                onClick={() => onFilterChange(section)}
                className={`cursor-pointer px-3 py-1.5 transition-all duration-300 border border-transparent
                ${
                  activeFilter === section
                    ? "bg-news-ink text-news-bg underline decoration-2 underline-offset-4"
                    : "text-news-ink hover:underline decoration-news-accent underline-offset-4"
                }`}
              >
                {section}
              </button>
            )
          )}
        </div>

        {/* Global CTAs - CRO Improvement */}
        <div className="flex items-center gap-3 order-1 md:order-2">
          <a
            href="/resume.pdf"
            target="_blank"
            className="group relative inline-flex items-center gap-2 bg-news-accent text-white px-4 py-2 font-serif text-[10px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(26,26,26,0.1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            <span>Download Resume</span>
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          </a>
          <a
            href="https://linkedin.com/in/kanakmegha"
            target="_blank"
            className="border-2 border-news-ink px-4 py-1.5 font-serif text-[10px] font-black uppercase tracking-widest hover:bg-news-ink hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </nav>
  );
};
