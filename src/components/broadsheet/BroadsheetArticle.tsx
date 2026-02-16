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
    <article className={`relative group pb-8 mb-8 article-divider last:border-0 ${isFeatured ? 'md:col-span-2' : ''}`}>
      <h3 className={`font-serif font-bold text-news-ink leading-tight mb-2 hover:text-news-accent transition-colors ${isFeatured ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {title.replace(/-/g, ' ')}
        </a>
      </h3>

      {language && (
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block bg-news-ink text-white text-[9px] font-black px-2 py-0.5 uppercase tracking-widest">
            {language}
          </span>
          <span className="text-[10px] font-serif italic text-news-ink/40">Technical Dispatch</span>
        </div>
      )}
      
      <p className={`font-inter text-news-ink/90 text-justify leading-relaxed mb-6 line-clamp-3 ${isFeatured ? 'line-clamp-none text-lg' : 'text-base'}`}>
        {description || "A comprehensive technical report on this implementation, detailing architectural decisions and performance outcomes in a production environment."}
      </p>
      
      <div className="flex justify-between items-center">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-serif font-black uppercase text-xs tracking-widest text-news-ink border-b-2 border-news-ink pb-1 hover:text-news-accent hover:border-news-accent transition-all"
        >
          Read Full Report &rarr;
        </a>
        
        {tag && (
          <span className="text-[10px] font-serif italic opacity-40 uppercase">
            Section: {tag}
          </span>
        )}
      </div>
    </article>
  );
};
