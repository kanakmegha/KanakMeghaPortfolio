"use client";

import React from "react";

interface BroadsheetArticleProps {
  title: string;
  description: string;
  url: string;
  tag?: string;
  isFeatured?: boolean;
  language?: string;
}

export const BroadsheetArticle: React.FC<BroadsheetArticleProps> = (
  { title, description, url, tag, isFeatured, language },
) => {
  // Logic to extract technologies from description or tag - CRO Improvement: More robust matching
  const techMap: Record<string, string> = {
    "next.js": "Next.js",
    "react": "React",
    "python": "Python",
    "llama": "Llama 3",
    "rag": "RAG",
    "ml": "ML",
    "tensorflow": "TensorFlow",
    "pytorch": "PyTorch",
    "nlp": "NLP",
    "cv": "CV",
    "genai": "Gen AI",
    "typescript": "TypeScript",
  };

  const extractedTech = Object.keys(techMap).filter((key) =>
    (description || "").toLowerCase().includes(key) ||
    title.toLowerCase().includes(key)
  ).map((key) => techMap[key]).slice(0, 3);

  const displayTech = extractedTech.length > 0
    ? extractedTech
    : [tag || "Software"];

  return (
    <article
      className={`relative group p-8 mb-12 bg-white border-2 border-news-ink shadow-[8px_8px_0px_0px_rgba(26,26,26,0.05)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-300 ${
        isFeatured ? "md:col-span-2" : ""
      }`}
    >
      {/* GH Link Seal */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute -top-4 -right-4 w-20 h-20 bg-news-accent text-white flex flex-col items-center justify-center p-1 border-4 border-white shadow-xl transform rotate-6 hover:rotate-0 transition-transform cursor-pointer overflow-hidden z-10"
      >
        <div className="border border-white/30 w-full h-full flex flex-col items-center justify-center border-dashed">
          <span className="text-[7px] font-black uppercase tracking-tighter mb-1">
            SOURCE
          </span>
          <span className="text-[10px] font-black leading-none uppercase">
            GITHUB
          </span>
        </div>
      </a>

      {/* Categories / Tech Sub-headline */}
      <div className="flex flex-wrap gap-2 mb-4">
        {displayTech.map((tech) => (
          <span
            key={tech}
            className="bg-news-ink text-white text-[9px] font-black px-2 py-1 uppercase tracking-widest"
          >
            {tech}
          </span>
        ))}
      </div>

      <h3
        className={`font-serif font-black text-news-ink leading-[1.1] mb-6 pr-12 group-hover:text-news-accent transition-colors ${
          isFeatured ? "text-5xl md:text-6xl" : "text-3xl md:text-4xl"
        }`}
      >
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {title.replace(/-/g, " ")}
        </a>
      </h3>

      {language && (
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-block bg-yellow-200 text-news-ink text-[10px] font-black px-2 py-0.5 uppercase tracking-widest -rotate-1 shadow-sm">
            Primary: {language}
          </span>
          <span className="text-[9px] font-sans font-black uppercase tracking-widest text-news-ink/30 italic">
            Ref: 0-42-X
          </span>
        </div>
      )}

      <p
        className={`font-inter text-news-ink/80 text-justify leading-relaxed mb-8 indent-8 ${
          isFeatured ? "text-lg" : "text-base line-clamp-4"
        }`}
      >
        {description ||
          "A high-performance technical artifact demonstrating advanced software patterns, verified implementation, and production-ready architectural decisions for modern digital landscapes."}
      </p>

      <div className="flex justify-between items-center border-t-2 border-news-ink pt-6">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-serif font-black uppercase text-[11px] tracking-[0.2em] text-news-ink hover:text-news-accent transition-all flex items-center gap-2"
        >
          Inspect Artifact <span className="text-lg">&rarr;</span>
        </a>

        <div className="text-[9px] font-sans font-black text-news-ink/20 uppercase tracking-[0.3em] hidden sm:block">
          Bureau Classification: TOP SECRET
        </div>
      </div>
    </article>
  );
};
