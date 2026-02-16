'use client';

import React, { useState } from 'react';
import { BroadsheetMasthead } from "@/components/broadsheet/BroadsheetMasthead";
import { BroadsheetNav } from "@/components/broadsheet/BroadsheetNav";
import { BroadsheetProjectGrid } from "@/components/broadsheet/BroadsheetProjectGrid";
import { DigitalTickerTape } from "@/components/broadsheet/DigitalTickerTape";
import { CareerChronicle } from "@/components/broadsheet/CareerChronicle";
import { ClassifiedAds } from "@/components/broadsheet/ClassifiedAds";
import { Analytics } from "@vercel/analytics/react";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('ALL');

  return (
    <div className="min-h-screen bg-news-bg text-news-ink selection:bg-news-accent selection:text-white grain-bg relative overflow-x-hidden font-inter">
      <div className="max-w-7xl mx-auto border-x border-news-ink min-h-screen bg-news-bg relative z-10 shadow-2xl flex flex-col md:flex-row">
        
        {/* Left Ticker Tape (Desktop) */}
        <div className="hidden lg:block">
          <DigitalTickerTape />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col border-l border-news-ink">
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

          <footer className="w-full border-t-4 border-news-ink border-double py-8 px-10 flex justify-between items-center font-serif text-[12px] uppercase tracking-[0.3em] font-black">
            <div>Edition No. 042</div>
            <div className="font-blackletter text-2xl tracking-normal">Kanak Megha Dispatch</div>
            <div>© 2026 Verified Daily</div>
          </footer>
        </div>

        {/* Right Ticker Tape (Desktop) */}
        <div className="hidden lg:block">
          <DigitalTickerTape />
        </div>
      </div>
      <Analytics />
    </div>
  );
}