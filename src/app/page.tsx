import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { ToolsDemoSection } from "@/components/tools-demo-section";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProjectsSection />
        <ToolsDemoSection />
        <ExperienceTimeline />
        <ContactSection />
      </main>
    </div>
  );
}
