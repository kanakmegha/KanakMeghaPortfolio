'use client';

import React from 'react';
import { EXPERIENCE } from "@/lib/data";

export const CareerChronicle: React.FC = () => {
  return (
    <aside className="w-full h-full pr-8 border-r border-news-ink/20 bg-[#F5F2ED]/50 p-6 shadow-sm border-2 border-dashed border-news-ink/10">
      <div className="border-b-2 border-news-ink mb-10 pb-4">
        <h3 className="font-serif font-black text-3xl tracking-tighter text-news-ink uppercase italic border-l-8 border-news-ink pl-4">
          Press Releases
        </h3>
        <p className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-news-ink/40 mt-2">
          Official Career Correspondence
        </p>
      </div>

      <div className="space-y-16">
        {EXPERIENCE.map((item, index) => (
          <div key={index} className="relative group pb-10 border-b-2 border-news-ink last:border-0 border-double pt-4">
            <div className="absolute -top-4 -left-2 bg-news-ink text-white px-2 py-1 font-sans text-[8px] font-black uppercase tracking-widest -rotate-2">
              REF-ORD: {1024 + index}
            </div>
            
            <div className="mb-4">
              <span className="font-serif italic text-xs text-news-ink/60">
                Dated: {item.date}
              </span>
            </div>
            
            <h4 className="font-serif font-black text-2xl leading-tight mb-4 text-news-ink">
              {item.role}
            </h4>
            
            <div className="font-sans font-black text-[10px] uppercase tracking-[0.2em] text-news-accent mb-4 border-l-2 border-news-accent pl-2">
              {item.company}
            </div>
            
            <p className="font-inter text-xs text-news-ink/80 leading-relaxed text-justify indent-8">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 p-6 border-4 border-double border-news-ink text-news-ink text-center">
        <div className="font-serif italic text-sm mb-2">"Authenticated by the Bureau"</div>
        <div className="font-sans font-black text-[8px] uppercase tracking-[0.5em] opacity-40 pt-2 border-t border-news-ink/20">
          Official Dispatch Confirmed
        </div>
      </div>
    </aside>
  );
};
