"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  hint: string;
  onClear?: () => void;
  className?: string;
}

export function EmptyState({ 
  title, 
  hint, 
  onClear,
  className 
}: EmptyStateProps) {
  return (
    <div className={cn("text-center py-12", className)}>
      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Search className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {hint}
      </p>
      {onClear && (
        <Button
          onClick={onClear}
          variant="outline"
          size="sm"
          className="inline-flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Clear search
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
