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
    <div className="min-h-screen bg-news-bg text-news-ink selection:bg-news-accent selection:text-white grain-bg relative overflow-x-hidden font-lora pb-12">
      <div className="max-w-7xl mx-auto thick-border-top thick-border-bottom min-h-screen bg-news-bg relative z-10 shadow-2xl flex flex-col">
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col border-x border-news-ink">
          <BroadsheetMasthead />
          <BroadsheetNav activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          
          <main className="flex-1 grid-12 py-12 px-6">
            {/* Main News Section (8 Columns) */}
            <div className="col-span-12 lg:col-span-8">
              <BroadsheetProjectGrid username="skanakmegha" activeFilter={activeFilter} />
            </div>

            {/* Career Chronicles Sidebar (4 Columns) */}
            <div className="col-span-12 lg:col-span-4 mt-12 lg:mt-0">
              <CareerChronicle />
            </div>

            {/* Classifieds Section (Full Width) */}
            <div className="col-span-12">
              <ClassifiedAds />
            </div>
          </main>

          <footer className="w-full border-t-2 border-news-ink py-10 px-10 flex justify-between items-center font-sans text-[12px] uppercase tracking-[0.3em] font-black italic">
            <div>Edition No. 042</div>
            <div className="text-xl tracking-normal not-italic font-blackletter">Kanak Megha Daily</div>
            <div>© 2026 Verified Bureau</div>
          </footer>
        </div>
      </div>
      
      <BreakingNewsTicker />
      <Analytics />
    </div>
  );
}