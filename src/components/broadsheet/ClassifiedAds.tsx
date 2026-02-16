'use client';

import React from 'react';

export const ClassifiedAds: React.FC = () => {
  return (
    <section className="w-full border-t-2 border-news-ink pt-12 pb-24 px-6 mb-10">
      <div className="max-w-6xl mx-auto">
        <div className="border-b-4 border-news-ink mb-12 pb-2 text-center">
          <h2 className="font-sans font-black text-4xl uppercase tracking-[0.2em]">
            Notice Board
          </h2>
          <p className="font-serif italic text-sm mt-1">Formal Announcements & Public Tenders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Ad 1 */}
          <div className="border-2 border-dotted border-news-ink p-6 transition-colors hover:bg-news-accent/5">
            <h3 className="font-sans font-black border-b-2 border-news-ink mb-4 uppercase text-sm tracking-widest pb-1">
              Employment Notice
            </h3>
            <p className="font-serif text-sm mb-6 leading-relaxed">
              Applications are invited from engineering firms and innovative startups for high-end technical services. Specialized in Machine Learning, Scalable Backend Architectures, and Next.js Deployments.
            </p>
            <div className="font-sans font-black border-t border-news-ink/20 pt-4 text-sm text-center">
              EMAIL: skanakmegha@gmail.com
            </div>
          </div>

          {/* Ad 2 */}
          <div className="border-2 border-dotted border-news-ink p-6 transition-colors hover:bg-news-accent/5">
            <h3 className="font-sans font-black border-b-2 border-news-ink mb-4 uppercase text-sm tracking-widest pb-1">
              Public Relations
            </h3>
            <p className="font-serif text-sm mb-6 leading-relaxed">
              Verify credentials, view corporate history, and engage in professional dialogue via established networking protocols. Verified identity available on LinkedIn platform.
            </p>
            <div className="font-sans font-black border-t border-news-ink/20 pt-4 text-sm text-center">
              <a href="https://linkedin.com/in/kanak-megha" className="underline decoration-news-accent underline-offset-4">OFFICIAL PROFILE</a>
            </div>
          </div>

          {/* Ad 3 */}
          <div className="border-2 border-dotted border-news-ink p-6 transition-colors hover:bg-news-accent/5">
            <h3 className="font-sans font-black border-b-2 border-news-ink mb-4 uppercase text-sm tracking-widest pb-1">
              Tender: Code Review
            </h3>
            <p className="font-serif text-sm mb-6 leading-relaxed">
              Access to full project documentation, architectural blueprints, and codebase history is now open for public inspection. Performance metrics and audit reports attached.
            </p>
            <div className="font-sans font-black border-t border-news-ink/20 pt-4 text-sm text-center">
              <a href="https://github.com/skanakmegha" className="underline decoration-news-accent underline-offset-4">VIEW REPOSITORIES</a>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center opacity-40">
          <div className="inline-block border-2 border-news-ink px-6 py-2 font-sans font-black text-xs uppercase tracking-[0.3em]">
            Issued by the Office of Kanak Megha
          </div>
        </div>
      </div>
    </section>
  );
};
