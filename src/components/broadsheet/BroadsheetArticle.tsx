'use client';

import React from 'react';

interface BroadsheetArticleProps {
  title: string;
  description: string;
  url: string;
  tag?: string;
  isFeatured?: boolean;
}

export const BroadsheetArticle: React.FC<BroadsheetArticleProps> = ({ title, description, url, tag, isFeatured }) => {
  return (
    <article className={`relative group border-b border-news-ink pb-8 mb-8 article-hover ${isFeatured ? 'md:col-start-1 md:col-end-13 border-b-4' : ''}`}>
      <div className="scan-line" />
      
      {tag && (
        <span className="inline-block bg-news-accent text-white text-[11px] font-bold px-2 py-0.5 mb-3 uppercase tracking-[0.2em]">
          {tag}
        </span>
      )}
      
      <h3 className={`font-serif font-black text-news-ink uppercase leading-tight mb-4 ${isFeatured ? 'text-5xl md:text-7xl' : 'text-2xl md:text-3xl hover:text-news-accent transition-colors underline decoration-news-ink/30'}`}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {title.replace(/-/g, ' ')}
        </a>
      </h3>
      
      <div className="font-serif italic text-sm mb-4 border-b border-news-ink/20 pb-2">
        <span className="font-bold uppercase not-italic mr-2">Lead Report:</span>
        By Kanak Megha | Bengaluru Bureau
      </div>
      
      <p className={`font-inter text-[#1A1A1A] text-justify leading-relaxed line-clamp-2 mb-6 ${isFeatured ? 'text-xl md:text-2xl line-clamp-none' : 'text-base'}`}>
        {description || "In a significant development today, this deployment demonstrates advanced architectural patterns and a commitment to high-performance computational engineering. Detailed reports confirm full scalability."}
      </p>
      
      <div className="flex justify-between items-center">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-serif font-bold uppercase text-xs tracking-widest bg-news-ink text-white px-4 py-2 hover:bg-news-accent transition-colors"
        >
          Read Full Report &rarr;
        </a>
        
        {!isFeatured && (
          <div className="text-[10px] font-mono opacity-40 uppercase tracking-tighter">
            Dispatch ID: GH-{Math.floor(Math.random() * 9000) + 1000}
          </div>
        )}
      </div>
    </article>
  );
};
