'use client';

import React, { useEffect, useState } from 'react';
import { BroadsheetArticle } from './BroadsheetArticle';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  topics: string[];
  language?: string;
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
    const text = `${repo.name} ${repo.description || ''}`.toLowerCase();
    
    // NLP & AI
    if (text.includes('summarizer') || text.includes('nlp') || text.includes('llama') || text.includes('chatbot')) {
      return 'NLP & AI';
    }
    // DEEP LEARNING
    if (text.includes('detection') || text.includes('ai-generated') || text.includes('disease') || text.includes('prediction')) {
      return 'DEEP LEARNING';
    }
    // SOFTWARE DEV
    if (text.includes('budget') || text.includes('sourcebin') || text.includes('statlift') || text.includes('portfolio')) {
      return 'SOFTWARE DEV';
    }
    // FINANCE
    if (text.includes('price') || text.includes('budget') || text.includes('finance')) {
      return 'FINANCE';
    }
    
    return 'DISPATCH';
  };

  const initialFilteredRepos = repos.filter(repo => {
    if (activeFilter === 'ALL') return true;
    return getCategory(repo) === activeFilter;
  });

  // Fallback Logic: If category results are blank, show all
  const filteredRepos = initialFilteredRepos.length > 0 ? initialFilteredRepos : repos;
  const isFallback = initialFilteredRepos.length === 0 && activeFilter !== 'ALL';

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-32 bg-news-bg/50 border-b border-news-ink/20">
        <div className="font-serif text-4xl animate-pulse mb-4 font-black">Printing Bureau Archives...</div>
        <p className="font-serif italic text-sm text-news-ink/60">Fetching the latest digital chronicles.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Front Page Headlines Section */}
      <div className="border-b-4 border-news-ink py-2 mb-12 flex justify-between items-center px-2">
        <h2 className="font-serif font-black uppercase text-sm tracking-[0.2em] inline-block">
          {activeFilter === 'ALL' ? 'Lead Stories: All Reports' : `Front Page: ${activeFilter} Section`}
        </h2>
        {isFallback && (
          <div className="text-[10px] font-bold text-news-accent uppercase tracking-widest italic animate-bounce">
            Showing All Dispatch (No Specific Matches)
          </div>
        )}
      </div>

      {/* Grid for Stories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 px-2">
        {filteredRepos.map((repo, index) => {
          const category = getCategory(repo);
          
          return (
            <BroadsheetArticle 
              key={repo.id}
              title={repo.name}
              description={repo.description}
              url={repo.html_url}
              tag={category}
              language={repo.language}
            />
          );
        })}
      </div>
    </div>
  );
};
