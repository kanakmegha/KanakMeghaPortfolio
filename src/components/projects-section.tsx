import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ShowMoreWrapper } from "./show-more-wrapper";
import React from "react";

// 1. ADDED BACK THE REPO TYPE DEFINITION
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

// 2. ENSURE EXPLICIT RETURN TYPE Promise<Repo[]>
async function fetchPublicRepos(): Promise<Repo[]> {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  if (!username) {
    console.warn("⚠️ GITHUB_USERNAME is missing");
    return []; // Returns empty array instead of void
  }

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`, {
      headers: {
        "Accept": "application/vnd.github+json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const repos = await res.json();
    // Filter out forks and map to our Repo type
    return repos
      .filter((repo: any) => !repo.fork)
      .map((repo: any) => ({
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
    console.error(error);
    return []; // Returns empty array on error
  }
}

export default async function ProjectsSection() {
  const allProjects = await fetchPublicRepos();
  
  // These now work because allProjects is recognized as an Array, not void
  const initialProjects = allProjects.slice(0, 6);
  const remainingProjects = allProjects.slice(6);

  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Recent Projects</h2>

        {allProjects.length === 0 ? (
          <p className="text-center text-muted-foreground">No projects found.</p>
        ) : (
          <div className="space-y-12">
            <ProjectsGrid projects={initialProjects} />
            
            {allProjects.length > 6 && (
              <ShowMoreWrapper totalCount={allProjects.length}>
                <ProjectsGrid projects={remainingProjects} />
              </ShowMoreWrapper>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// 3. Helper Component using the Repo type
function ProjectsGrid({ projects }: { projects: Repo[] }) {
  return (
    <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.name} className="group overflow-hidden transition-all hover:shadow-xl">
          <Link href={project.homepage} target="_blank" className="block">
            <div className="relative aspect-video bg-muted">
              {project.openGraphImageUrl && (
                <Image 
                  src={project.openGraphImageUrl} 
                  alt={project.name} 
                  fill 
                  className="object-cover" 
                  unoptimized 
                />
              )}
            </div>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription className="line-clamp-2">{project.description}</CardDescription>
            </CardHeader>
          </Link>
        </Card>
      ))}
    </div>
  );
}