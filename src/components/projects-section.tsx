"use client"; // Important: Needed for useState

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useState } from "react";

type Repo = {
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  forks_count: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  openGraphImageUrl: string | null;
  pushed_at: string;
};

async function fetchPublicRepos(): Promise<Repo[]> {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  if (!username) {
    console.warn("⚠️ GITHUB_USERNAME is missing in .env.local");
    return [];
  }

  const url = `https://api.github.com/users/${username}/repos?sort=pushed&direction=desc&per_page=100&type=owner`;

  try {
    const headers: HeadersInit = {
      "Accept": "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(url, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`GitHub API error: ${res.status} ${res.statusText}`);
      return [];
    }

    const repos: any[] = await res.json();

    if (process.env.NODE_ENV === "development") {
      console.log(`Fetched ${repos.length} public repos (sorted by latest commit)`);
    }

    const ownedRepos = repos.filter(repo => !repo.fork);

    return ownedRepos.map((repo) => ({
      name: repo.name,
      description: repo.description || "No description provided.",
      html_url: repo.html_url,
      homepage: repo.homepage || repo.html_url,
      topics: repo.topics || [],
      forks_count: repo.forks_count,
      primaryLanguage: repo.language ? { name: repo.language, color: "#888" } : null,
      openGraphImageUrl: `https://opengraph.githubassets.com/1/${username}/${repo.name}`,
      pushed_at: repo.pushed_at,
    }));
  } catch (error) {
    console.error("Failed to fetch public repos:", error);
    return [];
  }
}

export async function ProjectsSection() {
  const allProjects = await fetchPublicRepos();
  const initialProjects = allProjects.slice(0, 6); // First 6 only

  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
              Recent Projects
            </h2>
            <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              My latest public repositories on GitHub — sorted by most recent activity.
            </p>
          </div>
        </div>

        {allProjects.length === 0 ? (
          <div className="mt-12 text-center text-muted-foreground">
            <p>No public projects found.</p>
          </div>
        ) : (
          <>
            <ProjectsGrid projects={initialProjects} />

            {allProjects.length > 6 && (
              <ShowMoreButton total={allProjects.length} remainingProjects={allProjects.slice(6)} />
            )}
          </>
        )}
      </div>
    </section>
  );
}

// Client component for the grid (to avoid duplicating logic)
function ProjectsGrid({ projects }: { projects: Repo[] }) {
  return (
    <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12">
      {projects.map((project) => (
        <Card
          key={project.name}
          className="group overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2"
        >
          <Link href={project.homepage} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative aspect-video bg-muted">
              {project.openGraphImageUrl ? (
                <Image
                  src={project.openGraphImageUrl}
                  alt={`${project.name} preview`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-background">
                  <span className="text-2xl font-semibold text-muted-foreground">
                    {project.name}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="absolute top-4 right-4 bg-background/80 p-2 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out">
                <ArrowUpRight className="h-5 w-5 text-foreground" />
              </div>
            </div>

            <CardHeader>
              <CardTitle className="text-xl font-bold">{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.topics.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-4 text-sm text-foreground/60">
                <span>🍴 {project.forks_count}</span>
                {project.primaryLanguage && (
                  <span className="flex items-center gap-1">
                    <span
                      className="w-3 h-3 rounded-full inline-block"
                      style={{ backgroundColor: project.primaryLanguage.color }}
                    />
                    {project.primaryLanguage.name}
                  </span>
                )}
              </div>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
}

// Client component for "Show More"
function ShowMoreButton({ total, remainingProjects }: { total: number; remainingProjects: Repo[] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-12 text-center">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        {isExpanded ? "Show Less" : `Show More (${total - 6} more)`}
        <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
      </button>

      {isExpanded && (
        <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ProjectsGrid projects={remainingProjects} />
        </div>
      )}
    </div>
  );
}