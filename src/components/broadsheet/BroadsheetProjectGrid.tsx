'use client';

import React, { useEffect, useState } from 'react';
import { BroadsheetArticle } from './BroadsheetArticle';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  topics: string[];
}

export const BroadsheetProjectGrid: React.FC<{ username: string }> = ({ username }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`, {
          headers: {
            Accept: 'application/vnd.github.mercy-preview+json', // Required for topics
          }
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setRepos(data);
        }
      } catch (error) {
        console.error('Error fetching repos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  if (loading) {
    return <div className="p-12 font-serif text-center animate-pulse">Consulting the Archives...</div>;
  }

  // Logic to categorize
  const featured = repos.find(r => r.topics.includes('featured') || r.name.toLowerCase().includes('quickread')) || repos[0];
  const others = repos.filter(r => r.id !== featured?.id);

  const getTag = (repo: Repo) => {
    if (repo.topics.includes('security')) return 'SECURITY';
    if (repo.topics.includes('ai') || repo.topics.includes('nlp')) return 'NLP & AI';
    if (repo.topics.includes('cv') || repo.topics.includes('vision')) return 'COMPUTER VISION';
    if (repo.topics.includes('healthcare') || repo.topics.includes('medical')) return 'HEALTHCARE';
    if (repo.topics.includes('finance')) return 'FINANCE';
    if (repo.topics.includes('web') || repo.topics.includes('react')) return 'WEB';
    return 'DISPATCH';
  };

  return (
    <div className="w-full">
      {/* Featured Story */}
      {featured && (
        <section className="mb-12 border-b-2 border-news-ink pb-8 px-6">
          <BroadsheetArticle 
            title={featured.name}
            description={featured.description}
            url={featured.html_url}
            tag="SPECIAL REPORT"
            isFeatured={true}
          />
        </section>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 pb-12">
        {/* Left Column: Secondary Stories */}
        <div className="flex flex-col border-r-0 md:border-r border-news-ink md:pr-8">
          <h4 className="font-serif font-black uppercase text-sm mb-6 border-b border-news-ink pb-1">Regional News</h4>
          {others.slice(0, 3).map(repo => (
            <BroadsheetArticle 
              key={repo.id}
              title={repo.name}
              description={repo.description}
              url={repo.html_url}
              tag={getTag(repo)}
            />
          ))}
        </div>

        {/* Middle Column: Current Affairs */}
        <div className="flex flex-col border-r-0 md:border-r border-news-ink md:px-4">
          <h4 className="font-serif font-black uppercase text-sm mb-6 border-b border-news-ink pb-1">Current Affairs</h4>
          {others.slice(3, 6).map(repo => (
            <BroadsheetArticle 
              key={repo.id}
              title={repo.name}
              description={repo.description}
              url={repo.html_url}
              tag={getTag(repo)}
            />
          ))}
        </div>

        {/* Right Column: The Archives */}
        <div className="flex flex-col md:pl-8">
          <h4 className="font-serif font-black uppercase text-sm mb-6 border-b border-news-ink pb-1">Historical Data</h4>
          {others.slice(6).map(repo => (
            <article key={repo.id} className="mb-4 pb-4 border-b border-news-ink/10 last:border-0 hover:bg-news-ink/5 p-1 transition-colors">
              <h5 className="font-serif font-bold text-sm uppercase">
                <a href={repo.html_url}>{repo.name}</a>
              </h5>
              <div className="text-[10px] font-mono opacity-60">REF #{repo.id}</div>
            </article>
          ))}
          
          <div className="mt-auto border-2 border-news-ink p-4 bg-white/40 italic text-xs text-justify">
            <p className="font-serif">"The archive section represents foundational work in computational theory, scheduling algorithms, and early software engineering paradigms. These entries are preserved for academic and historical reference."</p>
            <div className="text-right mt-2 font-bold">— THE ARCHIVIST</div>
          </div>
        </div>
      </div>
    </div>
  );
};
