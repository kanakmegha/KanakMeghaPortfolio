"use client";

import React from "react";
import Image from "next/image";
import { CERTIFICATIONS } from "@/lib/data";

export const VerifiedCredentials: React.FC = () => {
    return (
        <section className="w-full py-12 border-t-4 border-news-ink bg-news-bg">
            <div className="max-w-6xl mx-auto px-4 md:px-0">
                {/* Section Header: Official Gazette Style */}
                <div className="border-b-2 border-news-ink mb-12 pb-4 flex flex-col md:flex-row justify-between items-end gap-4">
                    <div>
                        <h2 className="font-serif font-black text-4xl uppercase tracking-tighter italic">
                            Official Gazette: Personnel Registry
                        </h2>
                        <p className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-news-accent mt-2">
                            Verified Technical Credentials & Professional
                            Certifications
                        </p>
                    </div>
                    <div className="text-[10px] font-serif italic text-news-ink/40 pb-1 uppercase tracking-widest hidden md:block">
                        Registry No: ARCHIVE-SEC-2026
                    </div>
                </div>

                {/* Credentials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {CERTIFICATIONS.map((cert, index) => (
                        <div
                            key={index}
                            className="group relative flex flex-col bg-white border-2 border-news-ink p-6 shadow-[6px_6px_0px_0px_rgba(26,26,26,0.05)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-300"
                        >
                            {/* High-Contrast Verified Badge */}
                            <div className="absolute -top-3 -right-3 bg-news-accent text-white px-3 py-1 font-sans text-[9px] font-black uppercase tracking-widest shadow-md z-10">
                                Verified ✓
                            </div>

                            {/* Logo with Grayscale-to-Color Effect */}
                            <div className="relative w-16 h-16 mb-6 border-2 border-news-ink p-1 bg-news-bg overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                                <Image
                                    src={cert.logo}
                                    alt={cert.issuer}
                                    fill
                                    className="object-contain p-1"
                                    priority={index < 3}
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-news-ink text-white text-[8px] font-black px-1.5 py-0.5 uppercase tracking-tighter">
                                        CAT: {cert.category}
                                    </span>
                                    <span className="text-[10px] font-serif italic text-news-ink/40">
                                        Dated: {cert.date}
                                    </span>
                                </div>

                                <h3 className="font-serif font-black text-xl leading-tight mb-2 text-news-ink">
                                    {cert.title}
                                </h3>

                                <p className="font-sans font-black text-[10px] uppercase tracking-widest text-news-ink/60 mb-6 border-l-2 border-news-ink/20 pl-2">
                                    ISSUER: {cert.issuer}
                                </p>
                            </div>

                            {/* CTA: Verify Credential Button */}
                            <div className="mt-auto pt-6 border-t border-dashed border-news-ink/20">
                                <a
                                    href={cert.verificationUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-center bg-news-ink text-white py-3 font-serif font-black uppercase text-[10px] tracking-[0.2em] hover:bg-news-accent transition-colors"
                                >
                                    Verify Credential &rarr;
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Seal */}
                <div className="mt-16 text-center opacity-40">
                    <div className="inline-block border-2 border-news-ink px-6 py-2 font-sans font-black text-[8px] uppercase tracking-[0.4em]">
                        Authenticated by the Bureau of Technical Standards •
                        MMXXVI
                    </div>
                </div>
            </div>
        </section>
    );
};
