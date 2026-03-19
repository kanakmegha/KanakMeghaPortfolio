"use client";

import React from "react";
import { EXPERIENCE } from "@/lib/data";

export const CareerChronicle: React.FC = () => {
  return (
    <aside className="w-full h-full pr-0 md:pr-8 border-r-0 md:border-r border-news-ink/10 bg-news-bg p-0 md:p-6">
      <div className="border-b-4 border-news-ink mb-10 pb-4 flex justify-between items-end">
        <div>
          <h3 className="font-serif font-black text-4xl tracking-tighter text-news-ink uppercase italic leading-none">
            Career Chronicle
          </h3>
          <p className="font-sans text-[9px] font-black uppercase tracking-[0.2em] text-news-accent mt-2">
            Professional Experience (Verified)
          </p>
        </div>
        <div className="hidden xl:block text-[10px] font-serif italic text-news-ink/40 pb-1">
          Issue No. 88
        </div>
      </div>

      <div className="space-y-12">
        {EXPERIENCE.map((item, index) => (
          <div
            key={index}
            className="relative group pb-10 border-b border-news-ink/10 last:border-0 pt-4"
          >
            <div className="absolute -top-4 left-0 bg-news-ink text-white px-2 py-0.5 font-sans text-[8px] font-black uppercase tracking-widest">
              RECORD #{1024 + index}
            </div>

            <div className="mb-4 mt-2">
              <span className="font-serif italic text-xs text-news-ink/60 border-b border-news-ink/20 pb-1">
                TENURE: {item.date}
              </span>
            </div>

            {/* Hybrid Title Layer - CRO Improvement */}
            <h4 className="font-sans font-black text-[10px] uppercase tracking-widest text-news-accent mb-1">
              {item.company}
            </h4>
            <h5 className="font-serif font-black text-2xl leading-tight mb-4 text-news-ink group-hover:text-news-accent transition-colors">
              {item.role}
            </h5>

            <p className="font-inter text-sm text-news-ink/80 leading-relaxed text-justify mb-6">
              <span className="font-black text-news-ink mr-1 uppercase">
                Dispatch:
              </span>
              {item.description}
            </p>

            {/* Added Tech Tags for Scannability */}
            <div className="flex flex-wrap gap-2 mt-4">
              {item.role.includes("AI") || item.role.includes("ML")
                ? (
                  ["Python", "Scikit-learn", "NLP", "API"].map((tech) => (
                    <span
                      key={tech}
                      className="text-[8px] font-black border border-news-ink/20 px-1.5 py-0.5 uppercase tracking-tighter"
                    >
                      {tech}
                    </span>
                  ))
                )
                : null}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 p-6 border-2 border-news-ink border-dashed text-news-ink text-center hover:bg-news-ink hover:text-white transition-all group">
        <div className="font-serif italic text-sm mb-2 group-hover:scale-110 transition-transform">
          "References available upon request"
        </div>
        <div className="font-sans font-black text-[8px] uppercase tracking-[0.4em] opacity-40 pt-2 border-t border-news-ink/20">
          Official Documents BUREAU
        </div>
      </div>
    </aside>
  );
};
