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

interface BroadsheetProjectGridProps {
  username: string;
  activeFilter: string;
}

export const BroadsheetProjectGrid: React.FC<BroadsheetProjectGridProps> = ({ username, activeFilter }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`, {
          headers: {
            Accept: 'application/vnd.github.mercy-preview+json',
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

  const getCategory = (repo: Repo) => {
    const topics = repo.topics.map(t => t.toLowerCase());
    if (topics.includes('security')) return 'SECURITY';
    if (topics.includes('ai') || topics.includes('nlp')) return 'NLP & AI';
    if (topics.includes('cv') || topics.includes('vision')) return 'COMPUTER VISION';
    if (topics.includes('healthcare') || topics.includes('medical')) return 'HEALTHCARE';
    if (topics.includes('finance')) return 'FINANCE';
    if (topics.includes('web') || topics.includes('react')) return 'WEB';
    return 'DISPATCH';
  };

  const filteredRepos = repos.filter(repo => {
    if (activeFilter === 'ALL') return true;
    return getCategory(repo) === activeFilter;
  });

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-32 bg-news-bg/50 border-b border-news-ink">
        <div className="font-blackletter text-4xl animate-pulse mb-4">Printing in Progress...</div>
        <p className="font-serif italic text-sm">Waiting for the morning edition to hit the press.</p>
      </div>
    );
  }

  // Define Featured Story (Top of the page)
  const featured = filteredRepos.find(r => r.topics.includes('featured')) || filteredRepos[0];
  const others = filteredRepos.filter(r => r.id !== featured?.id);

  return (
    <div className="w-full">
      {/* Front Page Headlines Section */}
      <div className="border-b-4 border-news-ink border-double py-2 mb-8 bg-news-ink text-white px-6">
        <h2 className="font-serif font-black uppercase text-sm tracking-[0.3em] inline-block">
          {activeFilter === 'ALL' ? 'Front Page Headlines' : `Front Page: ${activeFilter} Section`}
        </h2>
      </div>

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

      {/* 2-Column Grid for Secondary Stories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 px-6 pb-20">
        {others.map((repo, index) => (
          <BroadsheetArticle 
            key={repo.id}
            title={repo.name}
            description={repo.description}
            url={repo.html_url}
            tag={getCategory(repo)}
          />
        ))}

        {filteredRepos.length === 0 && (
          <div className="col-span-2 py-20 text-center border-2 border-dashed border-news-ink/20">
            <h4 className="font-serif italic text-xl opacity-40 uppercase">No Dispatches currently filed under this section.</h4>
          </div>
        )}
      </div>
    </div>
  );
};
