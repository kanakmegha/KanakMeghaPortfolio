'use client';

import React from 'react';
import { SOCIAL_LINKS } from "@/lib/data";

export const ClassifiedAds: React.FC = () => {
  return (
    <section className="w-full border-t-4 border-news-ink border-double pt-12 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="border-b-2 border-news-ink mb-12 pb-2 text-center">
          <h2 className="font-blackletter text-4xl uppercase tracking-widest">
            Classifieds: Work with Kanak Megha
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Email Ad */}
          <div className="border-2 border-news-ink p-6 transition-transform hover:-rotate-1 hover:scale-105 bg-white shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
            <h3 className="font-serif font-black border-b border-news-ink mb-3 uppercase text-xs tracking-widest">
              Position Vacant: Lead Engineer
            </h3>
            <p className="font-inter text-sm mb-4 leading-snug">
              FOR HIRE: Talented Developer with expertise in AI, ML, and Next.js. Seeking innovative projects and complex engineering challenges. 
            </p>
            <div className="font-bold border-t border-news-ink pt-2 text-sm text-center">
              CONTACT: skanakmegha@gmail.com
            </div>
          </div>

          {/* LinkedIn Ad */}
          <div className="border-2 border-news-ink p-6 transition-transform hover:rotate-1 hover:scale-105 bg-white shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
            <h3 className="font-serif font-black border-b border-news-ink mb-3 uppercase text-xs tracking-widest">
              Professional Networking
            </h3>
            <p className="font-inter text-sm mb-4 leading-snug">
              Inquiries regarding professional background, verified endorsements, and collaborative history can be directed through established channels.
            </p>
            <div className="font-bold border-t border-news-ink pt-2 text-sm text-center">
              <a href="https://linkedin.com/in/kanak-megha" className="underline decoration-news-accent underline-offset-4">LINKEDIN PROFILE</a>
            </div>
          </div>

          {/* GitHub Ad */}
          <div className="border-2 border-news-ink p-6 transition-transform hover:-rotate-1 hover:scale-105 bg-white shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
            <h3 className="font-serif font-black border-b border-news-ink mb-3 uppercase text-xs tracking-widest">
              Open Source Intelligence
            </h3>
            <p className="font-inter text-sm mb-4 leading-snug">
              Full repository access granted for due diligence. Inspect architectures, algorithms, and documentation for verified performance metrics.
            </p>
            <div className="font-bold border-t border-news-ink pt-2 text-sm text-center">
              <a href="https://github.com/skanakmegha" className="underline decoration-news-accent underline-offset-4">GITHUB ARCHIVES</a>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block border border-news-ink px-4 py-1 font-serif italic text-xs opacity-60 uppercase tracking-widest font-bold">
            All Inquiries Treated with Absolute Confidentiality
          </div>
        </div>
      </div>
    </section>
  );
};
