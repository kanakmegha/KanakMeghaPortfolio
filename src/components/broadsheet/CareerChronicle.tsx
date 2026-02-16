'use client';

import React from 'react';
import { EXPERIENCE } from "@/lib/data";

export const CareerChronicle: React.FC = () => {
  return (
    <aside className="w-full h-full pr-8 border-r border-news-ink/10">
      <div className="border-b-2 border-news-ink mb-8 pb-2">
        <h3 className="font-sans font-black text-2xl uppercase tracking-tighter text-news-ink">
          Professional Chronicle
        </h3>
      </div>

      <div className="space-y-12">
        {EXPERIENCE.map((item, index) => (
          <div key={index} className="relative group pb-8 border-b border-news-ink/5 last:border-0">
            <div className="mb-3">
              <span className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-news-ink/40">
                {item.date}
              </span>
            </div>
            
            <h4 className="font-sans font-black text-lg leading-tight mb-3 uppercase">
              {item.role}
            </h4>
            
            <div className="font-sans font-bold text-[10px] uppercase tracking-widest text-news-ink/60 mb-3">
              {item.company}
            </div>
            
            <p className="font-sans text-xs text-news-ink/70 leading-relaxed text-justify">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 p-4 bg-news-ink text-white font-sans text-[10px] font-black uppercase tracking-widest text-center">
        Verified Employment History
      </div>
    </aside>
  );
};
