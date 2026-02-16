import { BroadsheetMasthead } from "@/components/broadsheet/BroadsheetMasthead";
import { BroadsheetNav } from "@/components/broadsheet/BroadsheetNav";
import { BroadsheetProjectGrid } from "@/components/broadsheet/BroadsheetProjectGrid";
import { DigitalTickerTape } from "@/components/broadsheet/DigitalTickerTape";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ContactSection } from "@/components/contact-section";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kanak Megha | Modern Broadsheet AI Engineer",
  description: "Portfolio of Kanak Megha, a Software Developer specializing in Machine Learning, Deep Learning, and AI-driven web applications.",
  keywords: ["Kanak Megha", "AI Developer", "Machine Learning Engineer", "Next.js Portfolio", "Broadsheet Newspaper Design"],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-news-bg text-news-ink selection:bg-news-accent selection:text-white grain-bg relative overflow-x-hidden font-serif">
      <div className="max-w-7xl mx-auto border-x border-news-ink min-h-screen bg-news-bg relative z-10 shadow-2xl flex flex-col md:flex-row">
        
        {/* Left Ticker Tape (Desktop) */}
        <div className="hidden md:block">
          <DigitalTickerTape />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col border-l border-news-ink">
          <BroadsheetMasthead />
          <BroadsheetNav />
          
          <main className="flex-1">
            <BroadsheetProjectGrid username="skanakmegha" />
            
            <div className="px-6 border-t border-news-ink py-12">
              <h4 className="font-serif font-black uppercase text-2xl mb-8 border-b-4 border-news-ink inline-block">Professional Chronicles</h4>
              <ExperienceTimeline />
            </div>

            <div className="px-6 border-t border-news-ink py-12 bg-news-ink/5">
              <h4 className="font-serif font-black uppercase text-2xl mb-8 border-b-4 border-news-ink inline-block">Consult Our Office</h4>
              <ContactSection />
            </div>
          </main>

          <footer className="w-full border-t-4 border-news-ink border-double py-6 px-8 flex justify-between items-center font-serif text-[10px] uppercase tracking-[0.2em] font-bold">
            <div>Vol. II ... No. 042</div>
            <div className="font-blackletter text-xl tracking-normal">Kanak Megha Dispatch</div>
            <div>© 2026 Code of the Century</div>
          </footer>
        </div>

        {/* Right Ticker Tape (Desktop) */}
        <div className="hidden md:block">
          <DigitalTickerTape />
        </div>
      </div>
      <Analytics />
    </div>
  );
}