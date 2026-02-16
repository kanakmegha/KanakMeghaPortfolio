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
    <article className={`relative group pb-8 mb-8 article-divider last:border-0 article-hover ${isFeatured ? 'md:col-start-1 md:col-end-13 border-b-4 border-news-ink' : ''}`}>
      <div className="scan-line" />
      
      {tag && (
        <span className="inline-block bg-news-accent text-white text-[11px] font-bold px-2 py-0.5 mb-3 uppercase tracking-[0.2em] font-sans">
          {tag}
        </span>
      )}
      
      <h3 className={`font-sans font-black text-news-ink uppercase leading-tight mb-4 ${isFeatured ? 'text-5xl md:text-7xl' : 'text-2xl md:text-3xl hover:text-news-accent transition-colors'}`}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {title.replace(/-/g, ' ')}
        </a>
      </h3>
      
      <div className="font-serif italic text-sm mb-4 border-b border-news-ink/10 pb-2">
        <span className="font-bold uppercase not-italic mr-2 font-sans">Special Report:</span>
        By Kanak Megha | Bengaluru Bureau
      </div>
      
      <p className={`font-serif text-[#1A1A1A] text-justify leading-relaxed mb-6 ${isFeatured ? 'text-xl md:text-2xl' : 'text-base line-clamp-3'}`}>
        {description || "In a significant development today, this deployment demonstrates advanced architectural patterns and a commitment to high-performance computational engineering. Detailed reports confirm full scalability and modular design."}
      </p>
      
      <div className="flex justify-between items-center">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-sans font-black uppercase text-xs tracking-widest bg-news-ink text-white px-4 py-2 hover:bg-news-accent transition-colors"
        >
          Read Full Report &rarr;
        </a>
        
        {!isFeatured && (
          <div className="text-[10px] font-mono opacity-40 uppercase tracking-tighter">
            FILE REF: GH-{Math.floor(Math.random() * 9000) + 1000}
          </div>
        )}
      </div>
    </article>
  );
};
