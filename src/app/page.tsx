'use client';

import React, { useState } from 'react';
import { BroadsheetMasthead } from "@/components/broadsheet/BroadsheetMasthead";
import { BroadsheetNav } from "@/components/broadsheet/BroadsheetNav";
import { BroadsheetProjectGrid } from "@/components/broadsheet/BroadsheetProjectGrid";
import { CareerChronicle } from "@/components/broadsheet/CareerChronicle";
import { ClassifiedAds } from "@/components/broadsheet/ClassifiedAds";
import { BreakingNewsTicker } from "@/components/broadsheet/BreakingNewsTicker";
import { Analytics } from "@vercel/analytics/react";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('ALL');

  return (
    <div className="min-h-screen bg-news-bg text-news-ink selection:bg-news-ink selection:text-white relative overflow-x-hidden font-inter pb-20">
      <div className="max-w-[1400px] mx-auto thick-border-top thick-border-bottom min-h-screen bg-news-bg relative z-10 shadow-2xl flex flex-col px-4 md:px-12">
        
        <BroadsheetMasthead />
        <BroadsheetNav activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        
        <main className="flex-1 grid grid-cols-12 gap-12 py-12">
          {/* Left Sidebar: Experience (3 Columns) */}
          <div className="col-span-12 lg:col-span-3">
            <CareerChronicle />
          </div>

          {/* Main Content Area: Projects (9 Columns) */}
          <div className="col-span-12 lg:col-span-9">
            <BroadsheetProjectGrid username="kanakmegha" activeFilter={activeFilter} />
          </div>

          {/* Contact Section / Notice Board (Full Width) */}
          <div className="col-span-12 section-rule">
            <ClassifiedAds />
          </div>
        </main>

        <footer className="w-full border-t-2 border-news-ink py-12 flex flex-col md:flex-row justify-between items-center gap-6 font-serif text-[10px] uppercase tracking-[0.4em] font-black border-double border-b-4 mt-12 pb-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div>Edition No. 042</div>
            <div>Bengaluru, India</div>
          </div>
          <div className="text-4xl tracking-tighter font-serif lowercase italic">kanak megha.</div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <div>© 2026 Bureau of Tech</div>
            <div>All Rights Reserved</div>
          </div>
        </footer>
      </div>
      <Analytics />
    </div>
  );
}