"use client";

import React from "react";

export const ClassifiedAds: React.FC = () => {
  return (
    <section className="w-full border-t-4 border-news-ink pt-12 pb-24 px-6 md:px-0 mb-10">
      <div className="max-w-6xl mx-auto">
        <div className="border-b-2 border-news-ink mb-12 pb-2 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="font-sans font-black text-4xl uppercase tracking-tighter">
            Notice Board & Classifieds
          </h2>
          <p className="font-serif italic text-sm text-news-accent font-bold">
            "For immediate professional engagement"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Ad 1: Contact */}
          <div className="border-[3px] border-news-ink p-8 flex flex-col h-full bg-white shadow-[6px_6px_0px_0px_rgba(26,26,26,0.1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-default">
            <div className="bg-news-ink text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 mb-6 self-start">
              Immediate Opening
            </div>
            <h3 className="font-serif font-black text-2xl mb-4 leading-tight">
              Direct Correspondence
            </h3>
            <p className="font-inter text-sm mb-8 leading-relaxed text-news-ink/70">
              Seeking technical expertise? Inquiries regarding Machine Learning,
              RAG architectures, or full-stack developments are processed daily.
            </p>
            <div className="mt-auto pt-6 border-t border-news-ink/10">
              <a
                href="mailto:skanakmegha@gmail.com"
                className="block text-center bg-news-ink text-white py-3 font-serif font-black uppercase text-xs tracking-[0.2em] hover:bg-news-accent transition-colors"
              >
                Email Agent
              </a>
            </div>
          </div>

          {/* Ad 2: LinkedIn */}
          <div className="border-[3px] border-news-ink p-8 flex flex-col h-full bg-white shadow-[6px_6px_0px_0px_rgba(26,26,26,0.1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            <div className="bg-news-accent text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 mb-6 self-start">
              Verified Dossier
            </div>
            <h3 className="font-serif font-black text-2xl mb-4 leading-tight">
              Public Relations
            </h3>
            <p className="font-inter text-sm mb-8 leading-relaxed text-news-ink/70">
              Verify credentials and review corporate history via established
              professional social protocols. Connection requests processed
              periodically.
            </p>
            <div className="mt-auto pt-6 border-t border-news-ink/10 text-center">
              <a
                href="https://linkedin.com/in/kanak-megha"
                className="font-serif font-black uppercase text-xs tracking-widest underline decoration-2 underline-offset-8 hover:text-news-accent transition-all"
              >
                Access LinkedIn Profile
              </a>
            </div>
          </div>

          {/* Ad 3: Repository */}
          <div className="border-[3px] border-news-ink p-8 flex flex-col h-full bg-white shadow-[6px_6px_0px_0px_rgba(26,26,26,0.1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            <div className="bg-news-ink/10 text-news-ink text-[10px] font-black uppercase tracking-widest px-2 py-1 mb-6 self-start">
              Public Archives
            </div>
            <h3 className="font-serif font-black text-2xl mb-4 leading-tight">
              Codebase Inspection
            </h3>
            <p className="font-inter text-sm mb-8 leading-relaxed text-news-ink/70">
              Complete repository history, architectural blueprints, and
              performance audit reports are open for deep-dive technical
              assessment.
            </p>
            <div className="mt-auto pt-6 border-t border-news-ink/10">
              <a
                href="https://github.com/skanakmegha"
                className="block text-center border-2 border-news-ink py-3 font-serif font-black uppercase text-xs tracking-[0.2em] hover:bg-news-ink hover:text-white transition-all"
              >
                View Repositories
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block border-2 border-news-ink px-10 py-3 font-serif italic text-sm tracking-widest">
            "Authenticated by the Bureau of Tech & Design • MMXXVI"
          </div>
        </div>
      </div>
    </section>
  );
};
