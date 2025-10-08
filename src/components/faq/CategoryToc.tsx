"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { disableAnim } from "@/lib/flags";
import { useIsMounted } from "@/lib/use-is-mounted";

interface Category {
  id: string;
  title: string;
  count: number;
}

interface CategoryTocProps {
  categories: Category[];
  activeCategory: string;
  onCategoryClick: (categoryId: string) => void;
  className?: string;
}

export function CategoryToc({ 
  categories, 
  activeCategory, 
  onCategoryClick,
  className 
}: CategoryTocProps) {
  const isMounted = useIsMounted();
  const shouldAnimate = isMounted && !disableAnim();

  return (
    <div className={cn("space-y-1", className)}>
      <h3 className="text-sm font-semibold text-gray-900 mb-4 px-3">
        Categories
      </h3>
      <nav className="space-y-1" role="navigation" aria-label="FAQ Categories">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => onCategoryClick(category.id)}
            className={cn(
              "w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-gray-50",
              activeCategory === category.id
                ? "bg-blue-50 text-blue-700 border-l-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            )}
            whileHover={shouldAnimate ? { x: 2 } : undefined}
            whileTap={shouldAnimate ? { scale: 0.98 } : undefined}
          >
            <div className="flex items-center justify-between">
              <span>{category.title}</span>
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                activeCategory === category.id
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-500"
              )}>
                {category.count}
              </span>
            </div>
          </motion.button>
        ))}
      </nav>
    </div>
  );
}

export default CategoryToc;
