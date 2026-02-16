'use client';

import React from 'react';

const ClassifiedAd: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="border border-news-ink p-3 mb-4 bg-white/50 shadow-sm transition-all duration-300 hover:rotate-1 hover:scale-[1.02] transform">
    <h4 className="font-serif-newspaper font-bold border-b border-news-ink mb-2 uppercase text-xs tracking-tighter">
      {title}
    </h4>
    <div className="text-xs font-inter leading-tight">
      {children}
    </div>
  </div>
);

export const VintageSidebar: React.FC = () => {
  return (
    <aside className="p-6 md:border-l border-news-ink">
      <div className="border-b-2 border-news-ink pb-1 mb-6">
        <h3 className="font-blackletter text-2xl text-center">The Classifieds</h3>
      </div>

      <ClassifiedAd title="Situation Wanted: Quick Links">
        <ul className="space-y-1">
          <li>
            <a href="https://github.com/skanakmegha" className="hover:news-accent underline decoration-news-accent">GitHub</a>
          </li>
          <li>
            <a href="https://linkedin.com/in/kanak-megha" className="hover:news-accent underline decoration-news-accent">LinkedIn</a>
          </li>
          <li>
            <a href="https://stackoverflow.com/users/yourid" className="hover:news-accent underline decoration-news-accent">Stack Overflow</a>
          </li>
        </ul>
      </ClassifiedAd>

      <ClassifiedAd title="Specialized Services: AI & ML">
        <p>Expertise in Machine Learning, Deep Learning, and AI-driven web architectures. Deep knowledge of LLMs, GenAI, and RAG systems.</p>
      </ClassifiedAd>

      <ClassifiedAd title="Educational Notice: Skills">
        <div className="flex flex-wrap gap-2">
          {['Next.js', 'React', 'TypeScript', 'Tailwind', 'Python', 'PyTorch', 'TensorFlow', 'PostgreSQL'].map(skill => (
            <span key={skill} className="px-1 border border-news-ink bg-news-bg">{skill}</span>
          ))}
        </div>
      </ClassifiedAd>

      <ClassifiedAd title="For Hire: Software Engineer">
        <p>Seeking challenges in Bengaluru or Remote. Specialized in high-performance web applications and AI integration.</p>
        <p className="mt-2 font-bold italic">Contact for Portfolio A2</p>
      </ClassifiedAd>

      <div className="mt-8 pt-4 border-t-2 border-news-ink text-center">
        <p className="font-blackletter text-sm uppercase">Advertisements</p>
        <div className="border border-news-ink p-2 mt-2 aspect-square flex items-center justify-center text-[10px] uppercase font-bold text-center">
          Space for Rent
        </div>
      </div>
    </aside>
  );
};
