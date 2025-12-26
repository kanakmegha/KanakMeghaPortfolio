"use client"; // This is now the ONLY client boundary for projects

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function ShowMoreWrapper({ children, totalCount }: { children: React.ReactNode; totalCount: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-12 text-center">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg"
      >
        {isExpanded ? "Show Less" : `Show More (${totalCount - 6} more)`}
        <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
      </button>

      {isExpanded && (
        <div className="mt-12 animate-in fade-in slide-in-from-bottom-4">
          {children}
        </div>
      )}
    </div>
  );
}