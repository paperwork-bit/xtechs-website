"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Lazy load the recommender to avoid blocking hero
const RecommenderEntry = dynamic(() => import("./RecommenderEntry"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <div className="text-center space-y-4">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-muted-foreground">Loading recommender...</p>
      </div>
    </div>
  ),
});

export default function RecommenderWrapper() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading recommender...</p>
        </div>
      </div>
    );
  }

  return <RecommenderEntry />;
}
