'use client';

import React from 'react';
import { EXPERIENCE } from "@/lib/data";

export const CareerChronicle: React.FC = () => {
  return (
    <aside className="w-full h-full border-l border-news-ink md:pl-8 pr-4">
      <div className="bg-news-ink text-white py-1 px-4 mb-6">
        <h2 className="font-sans font-black text-lg uppercase tracking-widest text-center italic">
          Business Special
        </h2>
      </div>
      
      <div className="border-b-2 border-news-ink mb-6 pb-2">
        <h3 className="font-sans font-black text-2xl uppercase tracking-tighter">
          The Chronicles: Career Timeline
        </h3>
      </div>

      <div className="space-y-12">
        {EXPERIENCE.map((item, index) => (
          <div key={index} className="relative group article-divider pb-8 last:border-0">
            <div className="flex justify-between items-baseline mb-3">
              <span className="font-sans text-xs font-black uppercase tracking-widest text-news-accent">
                {item.date}
              </span>
              <span className="font-sans font-bold text-[10px] uppercase tracking-widest opacity-60">
                Location: {item.company}
              </span>
            </div>
            
            <h4 className="font-sans font-black text-xl leading-tight uppercase mb-3 px-2 border-l-4 border-news-ink">
              {item.role}
            </h4>
            
            <p className="font-serif text-sm text-[#1A1A1A] text-justify leading-relaxed">
              <span className="font-sans font-black mr-2 text-[10px] uppercase">Market Report:</span>
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 border-2 border-news-ink p-4 bg-white shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
        <p className="font-serif italic text-xs text-center leading-snug">
          "Expert analysts predict continued growth in the AI engineering sector following this streak of high-performance deployments."
        </p>
      </div>
    </aside>
  );
};
