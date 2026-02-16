'use client';

import React from 'react';
import { EXPERIENCE } from "@/lib/data";

export const CareerChronicle: React.FC = () => {
  return (
    <aside className="w-full h-full border-l border-news-ink pl-8 pr-4">
      <div className="border-b-4 border-news-ink mb-6 pb-2">
        <h2 className="font-serif font-black text-2xl uppercase tracking-tighter text-center">
          The Chronicles: Career Timeline
        </h2>
      </div>

      <div className="space-y-12">
        {EXPERIENCE.map((item, index) => (
          <div key={index} className="relative group">
            <div className="flex justify-between items-baseline border-b border-news-ink/30 pb-1 mb-2">
              <span className="font-mono text-[10px] font-bold bg-news-ink text-white px-1.5 py-0.5 uppercase tracking-widest">
                {item.date}
              </span>
              <span className="font-serif italic text-xs uppercase tracking-widest opacity-70">
                Location: {item.company}
              </span>
            </div>
            
            <h3 className="font-serif font-bold text-lg leading-tight uppercase mb-2 group-hover:text-news-accent transition-colors">
              {item.role}
            </h3>
            
            <p className="font-inter text-sm text-justify leading-relaxed opacity-90">
              <span className="font-bold mr-1">REPORTING:</span>
              {item.description}
            </p>
            
            <div className="mt-4 border-t border-dotted border-news-ink/20 pt-2 text-[10px] font-bold uppercase tracking-widest opacity-50">
              Dispatch ID: CL-{index + 101}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-4 border-2 border-dashed border-news-ink bg-news-ink/5">
        <p className="font-serif italic text-[10px] text-center leading-tight">
          "The record above represents a verified sequence of professional engagements, compiled by the Archival Department for public review."
        </p>
      </div>
    </aside>
  );
};
