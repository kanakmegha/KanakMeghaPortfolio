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
    const name = repo.name;
    
    // Software Development
    if (['BudgetManager', 'Sourcebin', 'KanakMeghaPortfolio', 'IsItDownOrJustMe'].includes(name)) {
      return 'SOFTWARE DEVELOPMENT';
    }
    // AI & Machine Learning
    if (['QuickRead', 'Chatbot_using_llama3', 'PersonalisedStatLift', 'House-Price-Predictor'].includes(name)) {
      return 'AI & MACHINE LEARNING';
    }
    // Deep Learning
    if (['AI-Generated-Image-Detection', 'Disease-Prediction'].includes(name)) {
      return 'DEEP LEARNING';
    }
    // Research & Simulation
    if (['CPU-Scheduling-Simulator', 'CodeQuest'].includes(name)) {
      return 'RESEARCH & SIMULATION';
    }
    
    return 'DISPATCH';
  };

  const filteredRepos = repos.filter(repo => {
    if (activeFilter === 'ALL') return true;
    return getCategory(repo) === activeFilter;
  });

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-32 bg-white border-b border-news-ink/10">
        <div className="font-lora text-4xl animate-pulse mb-4 font-bold">Scanning Archives...</div>
        <p className="font-sans italic text-sm text-news-ink/40">Fetching the latest technical reports.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Front Page Headlines Section */}
      <div className="border-b-4 border-news-ink py-2 mb-12 flex justify-between items-center">
        <h2 className="font-sans font-black uppercase text-xs tracking-[0.4em] inline-block">
          {activeFilter === 'ALL' ? 'Main Stream Report' : `${activeFilter} Reports`}
        </h2>
        <div className="text-[10px] font-bold text-news-ink/40 uppercase tracking-widest">
          {filteredRepos.length} Stories Filed
        </div>
      </div>

      {/* Grid for Stories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 px-2">
        {filteredRepos.map((repo, index) => {
          const category = getCategory(repo);
          const isDeepLearning = category === 'DEEP LEARNING' && activeFilter === 'ALL';
          
          return (
            <BroadsheetArticle 
              key={repo.id}
              title={repo.name}
              description={repo.description}
              url={repo.html_url}
              tag={category}
              isFeatured={isDeepLearning}
            />
          );
        })}

        {filteredRepos.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-news-ink/10 rounded-lg">
            <h4 className="font-sans italic text-xl opacity-20 uppercase tracking-widest font-black">No Dispatches Filed in this Section.</h4>
          </div>
        )}
      </div>
    </div>
  );
};
