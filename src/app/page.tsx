import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import ProjectsSection, { fetchPublicRepos } from "@/components/projects-section";
import { ToolsDemoSection } from "@/components/tools-demo-section";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ContactSection } from "@/components/contact-section"; // Named import matches named export
import { ClientHydrationWrapper } from "@/components/ClientHydrationWrapper";
import ChatbotDialog from "@/components/chatbot-dialog";
import React from 'react';
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
export const metadata: Metadata = { // Add the : Metadata type here
  title: "Kanak Megha | AI Software Developer Portfolio",
  description: "Portfolio of Kanak Megha, a Software Developer specializing in Machine Learning, Deep Learning, and AI-driven web applications.",
  keywords: ["Kanak Megha", "AI Developer", "Machine Learning Engineer", "Next.js Portfolio", "Llama3 Chatbot"],
};
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
      <Analytics />
    </div>
  );
}