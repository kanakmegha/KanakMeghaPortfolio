import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import ProjectsSection, { fetchPublicRepos } from "@/components/projects-section";
import { ToolsDemoSection } from "@/components/tools-demo-section";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ContactSection } from "@/components/contact-section"; // Named import matches named export
import { ClientHydrationWrapper } from "@/components/ClientHydrationWrapper";
import ChatbotDialog from "@/components/chatbot-dialog";
import React from 'react';

export default async function Home() {
  const allProjects = await fetchPublicRepos();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ClientHydrationWrapper>
          <HeroSection />
        </ClientHydrationWrapper>

        <ProjectsSection initialData={allProjects} />

        <ClientHydrationWrapper>
          <ToolsDemoSection />
          <ExperienceTimeline />
          <ContactSection /> 
        </ClientHydrationWrapper>
      </main>

      <ChatbotDialog liveProjects={allProjects} />
    </div>
  );
}