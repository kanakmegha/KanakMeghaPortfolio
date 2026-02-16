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
    <article className={`relative group border-b border-news-ink pb-6 mb-6 article-hover ${isFeatured ? 'md:col-span-3 border-b-4' : ''}`}>
      <div className="scan-line" />
      
      {tag && (
        <span className="inline-block bg-news-accent text-white text-[10px] font-bold px-2 py-0.5 mb-2 uppercase tracking-widest">
          {tag}
        </span>
      )}
      
      <h3 className={`font-serif font-bold text-news-ink uppercase leading-tight mb-2 ${isFeatured ? 'text-4xl md:text-6xl' : 'text-xl md:text-2xl hover:text-news-accent transition-colors'}`}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {title.replace(/-/g, ' ')}
        </a>
      </h3>
      
      <div className="font-serif italic text-xs mb-3 border-b border-news-ink/20 pb-1">
        By Kanak Megha | Dispatched from Bengaluru
      </div>
      
      <p className={`font-serif text-news-ink text-justify leading-relaxed ${isFeatured ? 'text-lg md:text-xl' : 'text-sm'}`}>
        {description || "In a significant development for the open-source community, this project demonstrates a pioneering approach to system architecture. Detailed reports suggest high efficiency and a modular design that scales seamlessly."}
      </p>
      
      {isFeatured && (
        <div className="mt-6 flex gap-4">
          <a href={url} className="px-4 py-2 bg-news-ink text-white font-serif font-bold uppercase text-sm hover:bg-news-accent transition-colors">
            Read Full Report
          </a>
          <div className="flex-1 border-t-2 border-news-ink mt-4 border-double" />
        </div>
      )}

      {!isFeatured && (
        <div className="mt-4 text-[10px] font-bold uppercase tracking-widest flex justify-between items-center opacity-70 group-hover:opacity-100 transition-opacity">
          <span>Continued on GitHub</span>
          <span>&rarr;</span>
        </div>
      )}
    </article>
  );
};
