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
    <div className="min-h-screen bg-white text-news-ink selection:bg-news-ink selection:text-white relative overflow-x-hidden font-sans">
      <div className="max-w-[1400px] mx-auto thick-border-top thick-border-bottom min-h-screen bg-white relative z-10 shadow-sm flex flex-col px-8">
        
        <BroadsheetMasthead />
        <BroadsheetNav activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        
        <main className="flex-1 grid grid-cols-12 gap-12 py-12">
          {/* Left Sidebar: Experience (3 Columns) */}
          <div className="col-span-12 lg:col-span-3">
            <CareerChronicle />
          </div>

          {/* Main Content Area: Projects (9 Columns) */}
          <div className="col-span-12 lg:col-span-9">
            <BroadsheetProjectGrid username="skanakmegha" activeFilter={activeFilter} />
          </div>

          {/* Notice Board (Full Width) */}
          <div className="col-span-12 mt-12">
            <ClassifiedAds />
          </div>
        </main>

        <footer className="w-full border-t border-news-ink/10 py-12 flex justify-between items-end font-sans text-[10px] uppercase tracking-[0.4em] font-black opacity-40">
          <div className="flex flex-col gap-2">
            <div>Edition No. 042</div>
            <div>Bengaluru, India</div>
          </div>
          <div className="text-2xl tracking-normal not-italic font-lora lowercase opacity-100">kanak megha.</div>
          <div className="flex flex-col items-end gap-2">
            <div>© 2026 Bureau of Tech</div>
            <div>All Rights Reserved</div>
          </div>
        </footer>
      </div>
      <Analytics />
    </div>
  );
}