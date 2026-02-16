'use client';

import React from 'react';

interface BroadsheetArticleProps {
  title: string;
  description: string;
  url: string;
  tag?: string;
  isFeatured?: boolean;
  language?: string;
}

export const BroadsheetArticle: React.FC<BroadsheetArticleProps> = ({ title, description, url, tag, isFeatured, language }) => {
  // Logic to extract technologies from description or tag
  const getTechTags = () => {
    const techMap: Record<string, string[]> = {
      'next.js': ['Next.js', 'React'],
      'react': ['React', 'Tailwind'],
      'python': ['Python'],
      'llama': ['Llama 3', 'GenAI'],
      'ml': ['ML'],
      'deep learning': ['Deep Learning', 'PyTorch'],
      'ai': ['AI'],
      'software': ['Software'],
    };
    
    const tags: string[] = [];
    const text = (description || '').toLowerCase();
    
    Object.keys(techMap).forEach(key => {
      if (text.includes(key)) tags.push(...techMap[key]);
    });
    
    const uniqueTags = Array.from(new Set(tags)).slice(0, 3);
    return uniqueTags.length > 0 ? uniqueTags : [tag || 'Project'];
  };

  return (
    <article className={`relative group p-6 mb-8 bg-white border-2 border-dashed border-news-ink/20 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${isFeatured ? 'md:col-span-2' : ''}`}>
      {/* Postage Stamp / Seal in Corner */}
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute -top-3 -right-3 w-16 h-16 bg-[#B22222] text-white flex flex-col items-center justify-center p-1 border-2 border-white shadow-md transform rotate-12 hover:rotate-0 transition-transform cursor-pointer overflow-hidden group-hover:bg-news-ink"
      >
        <div className="border border-white/30 w-full h-full flex flex-col items-center justify-center border-dashed">
          <span className="text-[6px] font-black uppercase tracking-tighter mb-1">GH-SOURCE</span>
          <span className="text-[8px] font-black leading-none uppercase">VERIFIED</span>
          <span className="text-[6px] font-serif italic mt-1 font-bold">2026</span>
        </div>
      </a>

      <h3 className={`font-serif font-bold text-news-ink leading-tight mb-2 pr-12 ${isFeatured ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>
        <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-news-accent transition-colors">
          {title.replace(/-/g, ' ')}
        </a>
      </h3>

      {language && (
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-block bg-yellow-200 text-news-ink text-[10px] font-black px-2 py-0.5 uppercase tracking-widest shadow-sm -rotate-1">
            {language}
          </span>
          <span className="text-[10px] font-serif italic text-news-ink/40">Official Posting</span>
        </div>
      )}
      
      <p className={`font-inter text-news-ink/80 text-justify leading-relaxed mb-6 line-clamp-3 ${isFeatured ? 'line-clamp-none text-lg' : 'text-sm'}`}>
        {description || "A technical artifact cataloged for public review, demonstrating verified software engineering patterns and production-ready implementation."}
      </p>
      
      <div className="flex justify-between items-center border-t border-dashed border-news-ink/10 pt-4">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-serif font-black uppercase text-[10px] tracking-widest text-news-ink hover:underline transition-all"
        >
          View Full Artifact &rarr;
        </a>
        
        {tag && (
          <span className="text-[10px] font-sans font-black bg-news-ink/5 px-2 py-1 uppercase tracking-tighter text-news-ink/60">
            CAT: {tag}
          </span>
        )}
      </div>
    </article>
  );
};
