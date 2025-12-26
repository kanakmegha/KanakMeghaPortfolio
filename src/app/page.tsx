import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import ProjectsSection from "@/components/projects-section";
import { ToolsDemoSection } from "@/components/tools-demo-section";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ContactSection } from "@/components/contact-section";
import { ClientHydrationWrapper } from "@/components/ClientHydrationWrapper";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Wrap sections that need interactivity or had hydration issues */}
        <ClientHydrationWrapper>
          <HeroSection />
        </ClientHydrationWrapper>

        {/* This can now stay a Server Component and be 'async' safely! */}
        <ProjectsSection />

        <ClientHydrationWrapper>
          <ToolsDemoSection />
          <ExperienceTimeline />
          <ContactSection />
        </ClientHydrationWrapper>
      </main>
    </div>
  );
}