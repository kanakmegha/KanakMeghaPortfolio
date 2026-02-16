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
    <div className="min-h-screen bg-news-bg text-news-ink selection:bg-news-ink selection:text-white relative overflow-x-hidden font-inter pb-32">
      <div className="max-w-[1440px] mx-auto thick-border-top thick-border-bottom min-h-screen bg-news-bg relative z-10 shadow-2xl flex flex-col px-6 md:px-16">
        
        <BroadsheetMasthead />
        <BroadsheetNav activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        
        <main className="flex-1 grid grid-cols-12 gap-16 py-16">
          {/* Left Sidebar: Experience (3 Columns) */}
          <div className="col-span-12 lg:col-span-4 xl:col-span-3">
            <CareerChronicle />
          </div>

          {/* Main Content Area: Projects (8 Columns) */}
          <div className="col-span-12 lg:col-span-8 xl:col-span-9">
            <BroadsheetProjectGrid username="kanakmegha" activeFilter={activeFilter} />
          </div>

          {/* Contact Section / Notice Board (Full Width) */}
          <div className="col-span-12 section-rule mt-20">
            <ClassifiedAds />
          </div>
        </main>

        <footer className="w-full border-t-2 border-news-ink py-16 flex flex-col md:flex-row justify-between items-center gap-10 font-serif text-[11px] uppercase tracking-[0.5em] font-black border-double border-b-8 mb-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div>Archive No. 042</div>
            <div>BENGALURU, IN</div>
          </div>
          <div className="text-5xl tracking-tighter font-serif lowercase italic opacity-80">kanak megha.</div>
          <div className="flex flex-col items-center md:items-end gap-4">
            <div>© MMXXVI BUREAU</div>
            <div>STRICTLY CONFIDENTIAL</div>
          </div>
        </footer>
      </div>
      <Analytics />
    </div>
  );
}