"use client";

import { useState, useEffect, ReactNode } from "react";

export function ClientHydrationWrapper({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a ghost div to maintain layout during server-side render
    return <div className="opacity-0">{children}</div>;
  }

  return <>{children}</>;
}