'use client';

import React, { useEffect, useState } from 'react';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
}

export const VintageGitHubWire: React.FC<{ username: string }> = ({ username }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
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
    return <div className="p-6 font-serif-newspaper animate-pulse">Loading the news wire...</div>;
  }

  return (
    <div className="p-6 border-b border-news-ink md:col-span-2">
      <div className="flex justify-between items-center border-b border-news-ink mb-6">
        <h3 className="font-serif-newspaper font-bold uppercase tracking-tight text-xl">
          The News Wire: Recent Dispatches
        </h3>
        <span className="bg-news-accent text-white px-2 py-0.5 text-xs font-bold animate-pulse">
          BREAKING NEWS
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {repos.map((repo, index) => (
          <article 
            key={repo.id} 
            className={`flex flex-col border-b border-news-ink md:border-b-0 pb-6 md:pb-0 highlighter-hover p-2 ${index === 0 ? 'md:col-span-2' : ''}`}
          >
            <div className="mb-2">
              <h4 className="font-serif-newspaper font-bold text-2xl md:text-3xl leading-none uppercase mb-1">
                {repo.name.replace(/-/g, ' ')}
              </h4>
              <p className="font-serif-newspaper italic text-xs border-b border-news-ink/30 pb-1 mb-2">
                Reported by Kanak Megha | Filed under {repo.language || 'Technology'}
              </p>
            </div>
            
            <p className="font-inter text-sm mb-4 line-clamp-3">
              {repo.description || "In a significant development today, the repository's documentation reveals a commitment to excellence in engineering. Sources close to the project suggest that this implementation could redefine standards in the field."}
            </p>
            
            <div className="mt-auto flex justify-between items-center text-xs font-bold">
              <a 
                href={repo.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-serif-newspaper italic underline hover:news-accent"
              >
                Continue on Page A{index + 1}
              </a>
              <span className="font-inter">☆ {repo.stargazers_count}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
