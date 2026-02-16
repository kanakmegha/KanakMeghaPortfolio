'use client';

import React from 'react';
import { VintageMasthead } from '@/components/vintage/VintageMasthead';
import { VintageEditorial } from '@/components/vintage/VintageEditorial';
import { VintageGitHubWire } from '@/components/vintage/VintageGitHubWire';
import { VintageSidebar } from '@/components/vintage/VintageSidebar';

export default function VintagePortfolioPage() {
  return (
    <div className="min-h-screen bg-news-bg text-news-ink selection:bg-yellow-200 grain-bg relative overflow-x-hidden" style={{ backgroundColor: '#FDFBF7' }}>
      <div className="max-w-6xl mx-auto border-x border-news-ink min-h-screen bg-news-bg relative z-10 shadow-2xl pb-20">
        
        {/* Proof of Concept Masthead */}
        <div className="w-full border-b-4 border-black py-8 px-4 text-center mb-8">
          <h1 className="text-6xl md:text-8xl font-blackletter uppercase tracking-tighter" style={{ fontFamily: "'UnifrakturMaguntia', serif" }}>
            Kanak Megha
          </h1>
          <p className="font-serif italic mt-2">Special Edition • Established 2026</p>
        </div>

        <VintageMasthead />
        
        <main className="grid grid-cols-1 md:grid-cols-3 gap-0">
          <div className="md:col-span-2 flex flex-col">
            <VintageEditorial />
            <VintageGitHubWire username="skanakmegha" />
          </div>
          
          <VintageSidebar />
        </main>
        
        <footer className="w-full border-t-4 border-news-ink border-double-black py-4 px-8 flex justify-between items-center font-serif-newspaper text-xs uppercase tracking-widest mt-12 bg-white/30">
          <div>Vol. I ... No. 001</div>
          <div className="font-blackletter text-lg">Kanak Megha Portfolio</div>
          <div>© 2026 All Rights Reserved</div>
        </footer>
      </div>
    </div>
  );
}
