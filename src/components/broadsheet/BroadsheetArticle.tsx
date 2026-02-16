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
    <article className={`relative group pb-8 mb-8 article-divider last:border-0 ${isFeatured ? 'md:col-span-2 border-b-4 border-news-ink' : ''}`}>
      <h3 className={`font-sans font-black text-news-ink uppercase leading-tight mb-3 hover:text-news-ink/70 transition-colors ${isFeatured ? 'text-4xl md:text-5xl' : 'text-xl md:text-2xl'}`}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {title.replace(/-/g, ' ')}
        </a>
      </h3>
      
      <p className={`font-sans text-news-ink/80 text-justify leading-relaxed mb-4 line-clamp-2 ${isFeatured ? 'line-clamp-none text-lg' : 'text-sm'}`}>
        {description || "A cutting-edge implementation focusing on software engineering principles and advanced computational logic. Delivering high-performance solutions for modern digital challenges."}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {getTechTags().map(t => (
          <span key={t} className="px-3 py-1 bg-news-ink/5 text-news-ink/70 text-[10px] font-black uppercase tracking-widest rounded-full border border-news-ink/10">
            {t}
          </span>
        ))}
      </div>

      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="font-sans font-black uppercase text-[10px] tracking-[0.2em] text-news-ink hover:text-news-ink/40 transition-colors border-b-2 border-news-ink pb-1"
      >
        View Full Repository &rarr;
      </a>
    </article>
  );
};
