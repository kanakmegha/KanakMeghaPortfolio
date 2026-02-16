'use client';

import React from 'react';

export const VintageEditorial: React.FC = () => {
  return (
    <section className="bg-news-bg text-news-ink p-6 border-b border-news-ink md:col-span-2">
      <h2 className="font-serif-newspaper text-4xl md:text-5xl border-b border-news-ink pb-2 mb-4 leading-tight">
        Why Code is the New Journalism
      </h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 drop-cap font-inter text-justify leading-relaxed">
          Technology has transformed the way we communicate, breaking down the barriers between the creator and the consumer. Just as the printing press revolutionized the spread of knowledge in the 15th century, programming languages are now the ink and paper of the modern age. Every line of code tells a story, every algorithm serves a purpose, and every application is a publication that can reach a global audience in seconds.
        </div>
        <div className="flex-1 font-inter text-justify leading-relaxed md:border-l md:border-news-ink md:pl-6">
          As software developers, we are the new editors of digital space. We craft experiences that inform, entertain, and connect. The responsibility of building robust, ethical, and accessible software is akin to the journalistic duty of truth-seeking. In this portfolio, I invite you to explore the "editions" of my work—projects that serve as investigations into artificial intelligence, user experience, and the intersection of human creativity and machine logic.
        </div>
      </div>
      <div className="mt-6 italic font-serif-newspaper text-right border-t border-news-ink pt-2">
        — Kanak Megha, Chief Developer
      </div>
    </section>
  );
};
