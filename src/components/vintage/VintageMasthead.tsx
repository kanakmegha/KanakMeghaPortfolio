'use client';

import React from 'react';

export const VintageMasthead: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="w-full flex flex-col items-center pt-8 pb-4 px-4 bg-news-bg text-news-ink">
      <div className="text-center mb-4">
        <h1 className="font-blackletter text-7xl md:text-9xl tracking-tight leading-none">
          Kanak Megha
        </h1>
      </div>
      
      <div className="w-full border-t border-b border-news-ink flex flex-col md:flex-row justify-between items-center py-2 px-6 font-serif-newspaper text-sm md:text-base border-double-black">
        <div className="order-2 md:order-1">{currentDate}</div>
        <div className="order-1 md:order-2 font-bold uppercase tracking-widest text-lg mb-2 md:mb-0">
          Bengaluru Edition
        </div>
        <div className="order-3">Price: 0.00 BTC</div>
      </div>
    </header>
  );
};
