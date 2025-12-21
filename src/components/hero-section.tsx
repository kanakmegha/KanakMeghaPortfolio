"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { RotatingGlobe } from "./rotating-globe";
import { ChatbotDialog } from "./chatbot-dialog";

export function HeroSection() {
  const [headline, setHeadline] = useState("Innovating at the Intersection of AI and Engineering");
  const [bio, setBio] = useState(
    "I'm Kanak, a passionate engineer crafting intelligent solutions that bridge the gap between complex data and human-centric applications. Let's build the future, one line of code at a time."
  );

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                {headline}
              </h1>
              <p className="max-w-[600px] text-foreground/80 md:text-xl">{bio}</p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <a href="#contact">
                  Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <ChatbotDialog />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <RotatingGlobe />
          </div>
        </div>
      </div>
    </section>
  );
}
