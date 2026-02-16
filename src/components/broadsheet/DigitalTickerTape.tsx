'use client';

import React, { useEffect, useState } from 'react';

const CODE_SNIPPETS = [
  "01101001 01101110 01101001 01110100",
  "import { GenAI } from '@google/generative-ai';",
  "const model = genAI.getGenerativeModel({ model: 'gemini-pro' });",
  "async function synthesize() { ... }",
  "01100101 01111000 01101001 01110100",
  "tensor = torch.randn(3, 3)",
  "optimizer.zero_grad()",
  "loss.backward()",
  "npm install @radix-ui/react-slot",
  "git commit -m 'Broadsheet Update'",
];

export const DigitalTickerTape: React.FC = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-12 border-l border-r border-news-ink bg-news-bg overflow-hidden flex flex-col items-center py-4 relative group">
      <div className="absolute inset-0 bg-news-ink/5 pointer-events-none" />
      
      <div 
        className="flex flex-col whitespace-nowrap text-[8px] font-mono font-bold text-green-700/60 transition-transform duration-500 linear"
        style={{ transform: `translateY(-${offset}px)` }}
      >
        {[...Array(20)].map((_, i) => (
          <div key={i} className="py-2 rotate-90 origin-center whitespace-nowrap">
            {CODE_SNIPPETS[i % CODE_SNIPPETS.length]}
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-4 left-0 w-full text-center">
        <div className="bg-news-accent text-white text-[8px] font-bold px-1 py-0.5 rotate-90 origin-center inline-block">
          LIVE WIRE
        </div>
      </div>
    </div>
  );
};
